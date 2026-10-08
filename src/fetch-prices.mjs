// Descarga el PVPC por horas desde la API pública de Red Eléctrica (REData)
// y lo guarda en data/prices/AAAA-MM.json como { "AAAA-MM-DD": [€/MWh por hora] }.
// Es idempotente: solo pide los días que faltan y nunca rompe el build si la API falla.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT, 'data', 'prices');
const CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8'));
const API = 'https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real';

function madridToday() {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date()).map((x) => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day}`;
}

function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function lastDayOfMonth(ym) {
  const [y, m] = ym.split('-').map(Number);
  return new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
}

function loadMonth(ym) {
  const f = path.join(DATA_DIR, `${ym}.json`);
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {};
}

function saveMonth(ym, data) {
  const sorted = Object.fromEntries(Object.keys(data).sort().map((k) => [k, data[k]]));
  const f = path.join(DATA_DIR, `${ym}.json`);
  // Una línea por día: diffs legibles en el historial de git.
  const body = '{\n' + Object.entries(sorted)
    .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(',\n') + '\n}\n';
  const prev = fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '';
  if (prev !== body) fs.writeFileSync(f, body);
  return prev !== body;
}

async function fetchRange(start, end) {
  const url = `${API}?start_date=${start}T00:00&end_date=${end}T23:59&time_trunc=hour`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(30000) });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.included) {
        const pvpc = json.included.find((s) => s.type === 'PVPC' || s.attributes?.title === 'PVPC');
        return pvpc ? pvpc.attributes.values : [];
      }
      // 400/502 con "datos no disponibles" = aún no publicados (p. ej. mañana antes de las 20:30).
      if (res.status === 400 || res.status === 502) return [];
    } catch (err) {
      console.warn(`  intento ${attempt} fallido (${start}..${end}): ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 3000 * attempt));
  }
  return null;
}

function groupByDay(values) {
  const days = {};
  for (const v of values) {
    const day = v.datetime.slice(0, 10); // fecha local (la API devuelve hora peninsular con offset)
    (days[day] ||= []).push(Math.round(v.value * 100) / 100);
  }
  // Solo días completos (23 o 25 horas en los cambios de hora).
  return Object.fromEntries(Object.entries(days).filter(([, arr]) => arr.length >= 23 && arr.length <= 25));
}

export async function updatePrices() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const today = madridToday();
  const until = addDays(today, 1); // mañana, si ya está publicado
  let cursor = CONFIG.inicioHistorico || addDays(today, -365);
  const added = [];
  let failures = 0;

  while (cursor <= until) {
    const ym = cursor.slice(0, 7);
    const monthEnd = lastDayOfMonth(ym) < until ? lastDayOfMonth(ym) : until;
    const month = loadMonth(ym);
    // Primer día que falta dentro de este tramo
    let first = cursor;
    while (first <= monthEnd && month[first]) first = addDays(first, 1);
    if (first <= monthEnd) {
      const values = await fetchRange(first, monthEnd);
      if (values === null) failures++;
      else {
        const days = groupByDay(values);
        for (const [d, arr] of Object.entries(days)) {
          if (!month[d]) added.push(d);
          month[d] = arr;
        }
        saveMonth(ym, month);
      }
    }
    cursor = addDays(monthEnd, 1);
  }

  added.sort();
  console.log(added.length ? `PVPC: ${added.length} días nuevos (${added[0]} … ${added.at(-1)})` : 'PVPC: sin días nuevos');
  if (failures) console.warn(`PVPC: ${failures} tramos no se pudieron descargar; se usarán los datos existentes.`);
  fs.writeFileSync(path.join(ROOT, 'data', 'last-update.json'), JSON.stringify({ added }, null, 2) + '\n');
  return added;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  updatePrices().catch((err) => {
    console.error('Error inesperado actualizando precios:', err);
    process.exitCode = 0; // nunca bloquear la publicación por la API
  });
}
