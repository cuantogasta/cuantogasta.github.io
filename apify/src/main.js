// Spain Electricity Prices (PVPC): official hourly prices of the regulated tariff and the day-ahead spot market,
// from Red Eléctrica (REData), with 2.0TD tariff periods, daily ranks and the cheapest hours.
import { Actor, log } from 'apify';

const API = 'https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real';
const SOURCE = 'Red Eléctrica (REData API) – PVPC and day-ahead market prices, peninsular system';
const CHUNK_DAYS = 28; // the API rejects requests longer than about a month

// 2.0TD tariff: weekends and fixed-date national holidays are off-peak all day.
const FIXED_HOLIDAYS = ['01-01', '01-06', '05-01', '08-15', '10-12', '11-01', '12-06', '12-08', '12-25'];
const PERIOD_NAME = { P1: 'peak', P2: 'mid-peak', P3: 'off-peak' };

const madridDate = (d = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(d);
const addDays = (s, n) => { const d = new Date(`${s}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const weekday = (s) => new Date(`${s}T12:00:00Z`).getUTCDay();
const isOffPeakDay = (s) => [0, 6].includes(weekday(s)) || FIXED_HOLIDAYS.includes(s.slice(5));
const periodOf = (date, hour) => {
    if (isOffPeakDay(date) || hour < 8) return 'P3';
    if ((hour >= 10 && hour < 14) || (hour >= 18 && hour < 22)) return 'P1';
    return 'P2';
};
const madridIso = (ms) => {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23', timeZoneName: 'longOffset',
    }).formatToParts(new Date(ms)).map((x) => [x.type, x.value]));
    return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}${p.timeZoneName.replace('GMT', '') || '+00:00'}`;
};
const r = (x, n) => (x === null || x === undefined ? null : Math.round(x * 10 ** n) / 10 ** n);
const avg = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

await Actor.init();

const input = (await Actor.getInput()) ?? {};
const today = madridDate();
const {
    startDate = '',
    endDate = '',
    includeTomorrow = true,
    output = 'hourly',
    cheapestHoursPerDay = 0,
    tariffPeriods = [],
    includeSpotQuarterHours = false,
    maxResults = 0,
} = input;

const fail = async (msg) => { log.error(msg); await Actor.fail(msg); };

// ---------------------------------------------------------------- validate input
const isDate = (s) => /^\d{4}-\d{2}-\d{2}/.test(s);
const tomorrow = addDays(today, 1);
const start = startDate ? String(startDate).slice(0, 10) : today;
let end = endDate ? String(endDate).slice(0, 10) : (startDate ? start : (includeTomorrow ? tomorrow : today));
if (!isDate(start) || !isDate(end)) await fail('Dates must be YYYY-MM-DD.');
if (start > tomorrow) await fail(`Prices are published one day ahead: the latest available day is ${tomorrow}.`);
if (end > tomorrow) { log.info(`Prices are published one day ahead: the end date is limited to ${tomorrow}.`); end = tomorrow; }
if (start > end) await fail(`"startDate" (${start}) is after "endDate" (${end}).`);
if (start < '2014-04-01') await fail('Data is available from 2014-04-01 (spot market) and 2021-06-01 (PVPC 2.0TD).');
if (!['hourly', 'daily'].includes(output)) await fail('"output" must be "hourly" or "daily".');
const badPeriod = tariffPeriods.find((p) => !PERIOD_NAME[p]);
if (badPeriod) await fail(`Unknown tariff period "${badPeriod}". Valid values: P1, P2, P3.`);

// ---------------------------------------------------------------- download
async function fetchChunk(from, to) {
    const url = `${API}?start_date=${from}T00:00&end_date=${to}T23:59&time_trunc=hour`;
    for (let attempt = 1; attempt <= 4; attempt++) {
        try {
            const res = await fetch(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(60000) });
            const json = await res.json().catch(() => null);
            if (res.ok && json?.included) return json.included;
            // 400 "data not available" = nothing published for these days (e.g. tomorrow before ~20:30).
            if (res.status === 400) return [];
            throw new Error(`HTTP ${res.status}`);
        } catch (err) {
            log.warning(`Request ${from}..${to} failed (${err.message}), attempt ${attempt}/4`);
            await new Promise((ok) => setTimeout(ok, 4000 * attempt));
        }
    }
    throw new Error(`Red Eléctrica API did not answer for ${from}..${to}`);
}

const keyOf = (dt) => dt.slice(0, 13) + dt.slice(23); // "2026-10-14T05+02:00": one key per local hour, DST-safe
const hours = new Map();
const slot = (dt) => {
    const k = keyOf(dt);
    if (!hours.has(k)) hours.set(k, { startTime: `${dt.slice(0, 13)}:00:00${dt.slice(23)}`, pvpc: null, spot: [] });
    return hours.get(k);
};

log.info(`Downloading official prices from ${start} to ${end}…`);
for (let from = start; from <= end; from = addDays(from, CHUNK_DAYS)) {
    const to = addDays(from, CHUNK_DAYS - 1) < end ? addDays(from, CHUNK_DAYS - 1) : end;
    let series;
    try { series = await fetchChunk(from, to); } catch (err) { await fail(err.message); }
    for (const s of series) {
        const isPvpc = s.type === 'PVPC' || s.attributes?.title === 'PVPC';
        const isSpot = /spot/i.test(s.type) || /spot/i.test(s.attributes?.title || '');
        for (const v of s.attributes?.values || []) {
            if (isPvpc) slot(v.datetime).pvpc = v.value;
            else if (isSpot) slot(v.datetime).spot.push(v.value);
        }
    }
}

// ---------------------------------------------------------------- hourly records
const byDay = new Map();
for (const h of [...hours.values()].sort((a, b) => Date.parse(a.startTime) - Date.parse(b.startTime))) {
    const date = h.startTime.slice(0, 10);
    const hour = Number(h.startTime.slice(11, 13));
    const spot = avg(h.spot);
    const period = periodOf(date, hour);
    const rec = {
        date,
        hour,
        startTime: h.startTime,
        endTime: madridIso(Date.parse(h.startTime) + 3600000),
        pvpcEURPerMWh: r(h.pvpc, 2),
        pvpcEURPerKWh: r(h.pvpc === null ? null : h.pvpc / 1000, 5),
        spotEURPerMWh: r(spot, 2),
        spotEURPerKWh: r(spot === null ? null : spot / 1000, 5),
        ...(includeSpotQuarterHours ? { spotQuarterHoursEURPerMWh: h.spot.length > 1 ? h.spot.map((x) => r(x, 2)) : null } : {}),
        tariffPeriod: period,
        tariffPeriodName: PERIOD_NAME[period],
        weekday: new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', { weekday: 'long', timeZone: 'UTC' }),
        offPeakDay: isOffPeakDay(date),
    };
    if (!byDay.has(date)) byDay.set(date, []);
    byDay.get(date).push(rec);
}

// Rank every hour of the day (1 = cheapest) by PVPC, or by the spot price if PVPC is not published yet.
for (const recs of byDay.values()) {
    const usePvpc = recs.every((x) => x.pvpcEURPerMWh !== null);
    const field = usePvpc ? 'pvpcEURPerMWh' : 'spotEURPerMWh';
    const valid = recs.filter((x) => x[field] !== null);
    const sorted = [...valid].sort((a, b) => a[field] - b[field]);
    const mean = avg(valid.map((x) => x[field]));
    for (const x of recs) {
        const i = sorted.indexOf(x);
        x.dayRank = i === -1 ? null : i + 1;
        x.rankedBy = usePvpc ? 'pvpc' : 'spot';
        x.priceLevel = i === -1 ? null : i < sorted.length / 3 ? 'low' : i < (2 * sorted.length) / 3 ? 'medium' : 'high';
        x.vsDayAveragePct = i === -1 || !mean ? null : r(((x[field] - mean) / mean) * 100, 1);
        x.isCheapestHour = i === 0;
        x.isMostExpensiveHour = i !== -1 && i === sorted.length - 1;
        x.source = SOURCE;
    }
}

// ---------------------------------------------------------------- daily records
const cheapestWindow = (recs, field, len) => {
    let best = null;
    for (let i = 0; i + len <= recs.length; i++) {
        const w = recs.slice(i, i + len);
        if (w.some((x) => x[field] === null)) continue;
        const a = avg(w.map((x) => x[field]));
        if (!best || a < best.average) best = { startTime: w[0].startTime, endTime: w.at(-1).endTime, average: a };
    }
    return best;
};
const dailyOf = (date, recs) => {
    const p = recs.filter((x) => x.pvpcEURPerMWh !== null);
    const s = recs.filter((x) => x.spotEURPerMWh !== null);
    const min = p.length ? p.reduce((a, b) => (b.pvpcEURPerMWh < a.pvpcEURPerMWh ? b : a)) : null;
    const max = p.length ? p.reduce((a, b) => (b.pvpcEURPerMWh > a.pvpcEURPerMWh ? b : a)) : null;
    const w = (len) => { const b = cheapestWindow(recs, p.length === recs.length ? 'pvpcEURPerKWh' : 'spotEURPerKWh', len); return b && { ...b, average: r(b.average, 5) }; };
    const byPeriod = Object.fromEntries(['P1', 'P2', 'P3'].map((k) => [k, r(avg(p.filter((x) => x.tariffPeriod === k).map((x) => x.pvpcEURPerKWh)), 5)]));
    return {
        date,
        weekday: recs[0].weekday,
        offPeakDay: recs[0].offPeakDay,
        hours: recs.length,
        pvpcPublished: p.length === recs.length,
        pvpcAverageEURPerKWh: r(avg(p.map((x) => x.pvpcEURPerKWh)), 5),
        pvpcMinEURPerKWh: min && min.pvpcEURPerKWh,
        pvpcMinHour: min && min.hour,
        pvpcMaxEURPerKWh: max && max.pvpcEURPerKWh,
        pvpcMaxHour: max && max.hour,
        pvpcAverageByPeriodEURPerKWh: byPeriod,
        spotAverageEURPerMWh: r(avg(s.map((x) => x.spotEURPerMWh)), 2),
        spotMinEURPerMWh: s.length ? Math.min(...s.map((x) => x.spotEURPerMWh)) : null,
        spotMaxEURPerMWh: s.length ? Math.max(...s.map((x) => x.spotEURPerMWh)) : null,
        cheapestHours: [...recs].filter((x) => x.dayRank !== null).sort((a, b) => a.dayRank - b.dayRank).slice(0, 6).map((x) => x.hour),
        cheapest2hWindow: w(2),
        cheapest3hWindow: w(3),
        cheapest4hWindow: w(4),
        rankedBy: recs[0].rankedBy,
        source: SOURCE,
    };
};

let out = [];
for (const [date, recs] of byDay) {
    if (output === 'daily') { out.push(dailyOf(date, recs)); continue; }
    let keep = recs;
    if (tariffPeriods.length) keep = keep.filter((x) => tariffPeriods.includes(x.tariffPeriod));
    if (Number(cheapestHoursPerDay) > 0) {
        const ranked = [...keep].filter((x) => x.dayRank !== null).sort((a, b) => a.dayRank - b.dayRank);
        const chosen = new Set(ranked.slice(0, Number(cheapestHoursPerDay)));
        keep = keep.filter((x) => chosen.has(x));
    }
    out.push(...keep);
}

if (!out.length) log.warning('No prices found for these dates. Prices for tomorrow are published around 20:30 (Spanish time).');

let limit = Number(maxResults) > 0 ? Number(maxResults) : out.length;
const maxPaid = Number(process.env.ACTOR_MAX_PAID_DATASET_ITEMS || 0);
if (maxPaid > 0 && maxPaid < limit) { log.info(`Limited to ${maxPaid} results by the run's maximum paid items.`); limit = maxPaid; }
out = out.slice(0, limit);

// ---------------------------------------------------------------- save
for (let i = 0; i < out.length; i += 1000) await Actor.pushData(out.slice(i, i + 1000));

const allHours = [...byDay.values()].flat();
const pv = allHours.filter((x) => x.pvpcEURPerKWh !== null);
await Actor.setValue('SUMMARY', {
    from: start,
    to: end,
    days: byDay.size,
    hours: allHours.length,
    pvpcAverageEURPerKWh: r(avg(pv.map((x) => x.pvpcEURPerKWh)), 5),
    pvpcMin: pv.length ? (({ startTime, pvpcEURPerKWh }) => ({ startTime, pvpcEURPerKWh }))(pv.reduce((a, b) => (b.pvpcEURPerKWh < a.pvpcEURPerKWh ? b : a))) : null,
    pvpcMax: pv.length ? (({ startTime, pvpcEURPerKWh }) => ({ startTime, pvpcEURPerKWh }))(pv.reduce((a, b) => (b.pvpcEURPerKWh > a.pvpcEURPerKWh ? b : a))) : null,
    spotAverageEURPerMWh: r(avg(allHours.filter((x) => x.spotEURPerMWh !== null).map((x) => x.spotEURPerMWh)), 2),
    lastDays: [...byDay.keys()].map((d) => dailyOf(d, byDay.get(d))).map(({ date, pvpcAverageEURPerKWh, pvpcMinHour, pvpcMaxHour, cheapest3hWindow }) => ({ date, pvpcAverageEURPerKWh, pvpcMinHour, pvpcMaxHour, cheapest3hWindow })).slice(-62),
});
log.info(`Done: ${out.length} ${output === 'daily' ? 'days' : 'hours'} saved. Averages and extremes in the key-value store (SUMMARY).`);

await Actor.exit();
