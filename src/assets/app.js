import * as C from './core.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const num = (el) => {
  const v = parseFloat(String(el?.value ?? '').replace(',', '.'));
  return Number.isFinite(v) ? v : 0;
};
const NOW = C.madridNow();
const pd = (() => {
  try { return JSON.parse($('#page-data')?.textContent || 'null'); } catch { return null; }
})();
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sin almacenamiento */ } },
};

// ---------------------------------------------------------------- datos de precios
let recentCache;
async function recent() {
  if (recentCache) return recentCache;
  try {
    const r = await fetch(`/datos/ultimos.json?t=${Math.floor(Date.now() / 300000)}`);
    recentCache = r.ok ? (await r.json()).dias || {} : {};
  } catch { recentCache = {}; }
  return recentCache;
}
async function fromREE(date) {
  try {
    const url = `https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=${date}T00:00&end_date=${date}T23:59&time_trunc=hour`;
    const r = await fetch(url);
    if (!r.ok) return null;
    const j = await r.json();
    const s = j.included?.find((x) => x.type === 'PVPC');
    const v = s?.attributes.values.filter((x) => x.datetime.startsWith(date)).map((x) => Math.round(x.value * 100) / 100);
    return v && v.length >= 23 ? v : null;
  } catch { return null; }
}
async function pricesFor(date) {
  const r = await recent();
  return r[date] || (await fromREE(date));
}

// ---------------------------------------------------------------- bloque de precios
function skeleton() {
  return `<div class="price-block"><div id="pb-stats"></div>
<div class="card chart-card"><div class="chart-head"><h2 class="h3">Precio por horas (€/kWh)</h2><span class="legend"><i class="lg-b"></i>barata <i class="lg-m"></i>media <i class="lg-c"></i>cara</span></div><div id="pb-chart"></div></div>
<div class="card"><h2 class="h3">Mejores franjas para usar electrodomésticos</h2><div id="pb-windows"></div></div></div>
<div class="card"><h2 class="h3">Precio de la luz hora a hora</h2><div class="table-wrap" id="pb-table"></div></div>`;
}

function renderDay(date, values, tomorrow) {
  const pending = $('#pending-tomorrow');
  if (pending) pending.outerHTML = skeleton();
  const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  set('pb-stats', C.priceSummary(date, values));
  set('pb-chart', C.hourlyChart(date, values));
  set('pb-windows', C.windowsBlock(date, values));
  set('pb-table', C.hourlyTable(date, values));
  const st = C.dayStats(values);
  const lead = $('#pb-date');
  if (lead) lead.innerHTML = `${cap(C.fechaLarga(date, true))}. El precio medio ${tomorrow ? 'será' : 'es'} de <strong>${C.fmt(st.avg, 3)} €/kWh</strong>; la hora más barata, ${C.rangoHora(st.minH)} (${C.fmt(st.min, 3)} €/kWh).`;
}

function highlightNow(date, values) {
  if (date !== NOW.date) return;
  const st = C.dayStats(values);
  const i = C.hourIndex(values.length, NOW.hour);
  $(`#pb-chart rect[data-i="${i}"]`)?.classList.add('now');
  $(`#pb-table tr[data-i="${i}"]`)?.classList.add('now');
  const box = $('#ahora');
  if (!box) return;
  const v = st.p[i];
  const per = C.periodo(date, NOW.hour);
  const rel = v < st.t1 ? 'de las horas más baratas del día' : v < st.t2 ? 'un precio intermedio' : 'de las horas más caras del día';
  const next = C.bestWindow(st.p, 1, i);
  const nextTxt = next && next.start !== i
    ? `La hora más barata de lo que queda de hoy: <strong>${C.rangoHora(st.labels[next.start])}</strong> (${C.fmt(next.avg, 3)} €/kWh).`
    : 'Es la hora más barata de lo que queda de día: buen momento para poner electrodomésticos.';
  box.innerHTML = `<div>Ahora (${C.rangoHora(NOW.hour)}): <strong>${C.fmt(v, 3)} €/kWh</strong> <span class="per">${per}</span> · ${rel}.</div><div>${nextTxt}</div>`;
  box.hidden = false;
}

async function initDay() {
  const target = pd.tomorrow ? C.addDays(NOW.date, 1) : NOW.date;
  if (pd.date !== target || !pd.values) {
    const v = await pricesFor(target);
    if (v) {
      pd.date = target; pd.values = v;
      renderDay(target, v, pd.tomorrow);
    } else if (pd.tomorrow && pd.date < target) {
      const lead = $('#pb-date');
      if (lead) lead.innerHTML = `El precio de la luz para ${C.fechaLarga(target, true)} todavía no se ha publicado. Red Eléctrica lo publica hacia las 20:15-20:30.`;
      $$('.price-block, #pb-table').forEach((el) => el.closest('.card, .price-block')?.remove());
    }
  }
  if (!pd.tomorrow && pd.values) highlightNow(pd.date, pd.values);
}

// ---------------------------------------------------------------- mejor hora (desde ahora)
async function initMejorHora() {
  const box = $('#ahora-ventana');
  if (!box) return;
  const values = pd.date === NOW.date ? pd.values : await pricesFor(NOW.date);
  if (!values) return;
  const st = C.dayStats(values);
  const i = C.hourIndex(values.length, NOW.hour) + (NOW.minute > 15 ? 1 : 0);
  const imp = pd.imp;
  const coste = (avg) => C.eurAuto(pd.kwh * C.conImpuestos(avg, imp));
  const best = C.bestWindow(st.p, pd.horas, i);
  if (!best) {
    box.innerHTML = `Hoy ya no quedan franjas de ${pd.horas} ${pd.horas === 1 ? 'hora' : 'horas'}. <a href="/precio-luz-manana/">Mira el precio de mañana</a>.`;
  } else {
    const nowAvg = i + pd.horas <= st.p.length ? st.p.slice(i, i + pd.horas).reduce((a, b) => a + b, 0) / pd.horas : null;
    box.innerHTML = best.start === i || nowAvg == null
      ? `<strong>Ahora es buen momento:</strong> empezando a las ${C.pad(st.labels[best.start])}:00 pagarás ${coste(best.avg)}, lo mínimo de lo que queda de día.`
      : `Si empiezas ahora (${C.pad(NOW.hour)}:${C.pad(NOW.minute)}) pagarás unos <strong>${coste(nowAvg)}</strong>. Esperando a las <strong>${C.windowLabel(st.labels, best)}</strong> pagarás <strong>${coste(best.avg)}</strong>.`;
  }
  box.hidden = false;
}

// ---------------------------------------------------------------- calculadoras de aparato
function initCalcs() {
  for (const form of $$('form[data-calc]')) {
    const cfg = JSON.parse(form.dataset.calc);
    const inp = Object.fromEntries($$('input', form).map((i) => [i.name, i]));
    const out = (k, v) => { const el = $(`[data-out="${k}"]`, form); if (el) el.textContent = v; };
    const update = () => {
      const p = { ...cfg };
      if (cfg.modo === 'potencia') Object.assign(p, { potencia: num(inp.potencia), horas: num(inp.horas), dias: num(inp.dias), ciclo: num(inp.ciclo) / 100 });
      else if (cfg.modo === 'ciclo') Object.assign(p, { kwhCiclo: num(inp.kwhCiclo), usosSemana: num(inp.usosSemana) });
      else p.kwhAnio = num(inp.kwhAnio);
      const r = C.calcCoste(p, num(inp.precio));
      out('unidad', C.eurAuto(r.unidad)); out('kwhUnidad', C.kwh(r.kwhUnidad));
      out('mes', C.eurAuto(r.mes)); out('kwhMes', C.kwh(r.kwhMes));
      out('anio', C.eurAuto(r.anio)); out('kwhAnio', C.kwh(r.kwhAnio));
      for (const group of $$('.chips', form)) {
        const val = num(inp[group.dataset.for]);
        $$('button', group).forEach((b) => b.setAttribute('aria-pressed', String(Math.abs(Number(b.dataset.v) - val) < 1e-9)));
      }
    };
    form.addEventListener('input', update);
    $$('.chips button', form).forEach((b) => b.addEventListener('click', () => {
      const target = inp[b.parentElement.dataset.for];
      if (target) { target.value = b.dataset.v; update(); }
    }));
  }
}

// ---------------------------------------------------------------- calculadora general
function initSimple() {
  const form = $('#calc-simple');
  if (!form) return;
  const g = (n) => num(form.elements[n]);
  const out = (k, v) => { $(`[data-out="${k}"]`, form).textContent = v; };
  const update = () => {
    const kwhH = g('potencia') / 1000, precio = g('precio');
    const kwhMes = kwhH * g('horas') * g('dias');
    out('hora', C.eurAuto(kwhH * precio)); out('kwhHora', C.kwh(kwhH));
    out('mes', C.eurAuto(kwhMes * precio)); out('kwhMes', C.kwh(kwhMes));
    out('anio', C.eurAuto(kwhMes * 12 * precio)); out('kwhAnio', C.kwh(kwhMes * 12));
  };
  form.addEventListener('input', update);
  update();
}

function initCasa() {
  const body = $('#casa-body');
  if (!body || !pd?.aparatos) return;
  const byS = Object.fromEntries(pd.aparatos.map((a) => [a.s, a]));
  const precioEl = $('#casa-precio');
  const defaults = ['frigorifico', 'lavadora', 'television', 'horno', 'router-wifi', 'termo-electrico'];
  const fromHash = (() => {
    try { return JSON.parse(decodeURIComponent(escape(atob(location.hash.slice(1))))); } catch { return null; }
  })();
  let rows = fromHash || store.get('casa') || defaults.map((s) => ({ s }));
  rows = rows.filter((r) => byS[r.s]).map((r) => ({ ...byS[r.s], ...r }));

  const field = (i, k, v, step, label) => `<label>${label}<input type="number" data-i="${i}" data-k="${k}" value="${v}" step="${step}" min="0"></label>`;
  const render = () => {
    body.innerHTML = rows.map((r, i) => {
      let uso;
      if (r.modo === 'potencia') uso = field(i, 'potencia', r.potencia, 1, 'W') + field(i, 'horas', r.horas, 0.25, 'h/día') + field(i, 'dias', r.dias, 1, 'días/mes');
      else if (r.modo === 'ciclo') uso = field(i, 'kwhCiclo', r.kwhCiclo, 0.01, 'kWh/uso') + field(i, 'usosSemana', r.usosSemana, 0.5, 'usos/sem');
      else uso = field(i, 'kwhAnio', r.kwhAnio, 1, 'kWh/año');
      return `<tr><td><a href="/cuanto-gasta/${r.s}/">${r.n}</a></td><td><div class="uso">${uso}</div></td><td class="num" data-kwh="${i}"></td><td class="num" data-eur="${i}"></td><td><button type="button" data-del="${i}" aria-label="Quitar">×</button></td></tr>`;
    }).join('');
    totals();
  };
  const totals = () => {
    const precio = num(precioEl);
    let tk = 0;
    rows.forEach((r, i) => {
      const k = C.calcCoste(r, precio).kwhMes;
      tk += k;
      $(`[data-kwh="${i}"]`, body).textContent = C.fmt(k, 1);
      $(`[data-eur="${i}"]`, body).textContent = C.eurAuto(k * precio);
    });
    $('#casa-kwh').textContent = C.fmt(tk, 0);
    $('#casa-eur').textContent = C.eurAuto(tk * precio);
    store.set('casa', rows.map(({ s, potencia, horas, dias, ciclo, kwhCiclo, usosSemana, kwhAnio }) => ({ s, potencia, horas, dias, ciclo, kwhCiclo, usosSemana, kwhAnio })));
  };
  body.addEventListener('input', (e) => {
    const t = e.target;
    if (t.dataset.k) { rows[t.dataset.i][t.dataset.k] = num(t); totals(); }
  });
  body.addEventListener('click', (e) => {
    const d = e.target.dataset.del;
    if (d != null) { rows.splice(Number(d), 1); render(); }
  });
  precioEl.addEventListener('input', totals);
  $('#casa-add').addEventListener('click', () => { rows.push({ ...byS[$('#casa-select').value] }); render(); });
  $('#casa-share').addEventListener('click', async (e) => {
    const data = rows.map(({ s, potencia, horas, dias, ciclo, kwhCiclo, usosSemana, kwhAnio }) => ({ s, potencia, horas, dias, ciclo, kwhCiclo, usosSemana, kwhAnio }));
    const url = `${location.origin}${location.pathname}#${btoa(unescape(encodeURIComponent(JSON.stringify(data))))}`;
    try { await navigator.clipboard.writeText(url); e.target.textContent = '¡Enlace copiado!'; } catch { location.hash = url.split('#')[1]; }
  });
  render();
}

// ---------------------------------------------------------------- tramo horario actual
function initTramo() {
  const box = $('[data-widget="tramo"]');
  if (!box) return;
  const per = C.periodo(NOW.date, NOW.hour);
  let d = NOW.date, h = NOW.hour, steps = 0;
  do { h++; if (h === 24) { h = 0; d = C.addDays(d, 1); } steps++; } while (C.periodo(d, h) === per && steps < 72);
  const cuando = d === NOW.date ? `a las ${C.pad(h)}:00` : `el ${C.DIAS[C.weekday(d)]} a las ${C.pad(h)}:00`;
  box.innerHTML = `Ahora mismo (${C.DIAS[C.weekday(NOW.date)]}, ${C.pad(NOW.hour)}:${C.pad(NOW.minute)}) estás en tramo <span class="per per-${per}">${per}</span>. Cambia a <span class="per per-${C.periodo(d, h)}">${C.periodo(d, h)}</span> ${cuando}.`;
}

// ---------------------------------------------------------------- arranque
initCalcs();
initSimple();
initCasa();
initTramo();
if (pd?.type === 'day') initDay();
if (pd?.type === 'mejorhora') initMejorHora();
