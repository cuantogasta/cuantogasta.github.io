// Lógica compartida entre el generador (Node) y el navegador.
// Sin dependencias ni APIs de Node: se sirve tal cual como módulo ES.

export const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
export const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

const nfCache = {};
export function fmt(n, d = 2) {
  const key = d;
  nfCache[key] ||= new Intl.NumberFormat('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: true });
  return nfCache[key].format(n);
}
// es-ES no agrupa miles en números de 4 cifras; forzamos el punto para 1.000-9.999.
export function fmtInt(n) {
  const s = fmt(Math.round(n), 0);
  return /^\-?\d{4}$/.test(s) ? s.replace(/(\d)(\d{3})$/, '$1.$2') : s;
}
export const eur = (n, d = 2) => `${fmt(n, d)} €`;
export function eurAuto(n) {
  // Céntimos con más precisión cuando la cifra es pequeña.
  if (Math.abs(n) < 0.1) return eur(n, 3);
  if (Math.abs(n) >= 1000) return `${fmtInt(n)} €`;
  return eur(n, 2);
}
export const kwh = (n) => `${fmt(n, n < 10 ? 2 : n < 100 ? 1 : 0).replace(/(,\d)0$/, '$1').replace(/,0$/, '')} kWh`;
export const watts = (w) => (w >= 1000 ? `${fmtInt(w)} W` : `${w} W`);
export const pad = (n) => String(n).padStart(2, '0');

// ---------- Fechas (siempre en hora peninsular española) ----------
export function madridNow(date = new Date()) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(date).map((x) => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, hour: Number(p.hour) % 24, minute: Number(p.minute) };
}
export function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
export function weekday(dateStr) {
  return new Date(dateStr + 'T12:00:00Z').getUTCDay();
}
export function fechaLarga(dateStr, conDia = false) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const base = `${d} de ${MESES[m - 1]} de ${y}`;
  return conDia ? `${DIAS[weekday(dateStr)]}, ${base}` : base;
}
export function fechaCorta(dateStr) {
  const [, m, d] = dateStr.split('-').map(Number);
  return `${d} de ${MESES[m - 1]}`;
}
export function mesLargo(ym) {
  const [y, m] = ym.split('-').map(Number);
  return `${MESES[m - 1]} de ${y}`;
}

// Etiquetas de hora según la longitud del día (cambios de hora: 23 o 25 horas).
export function hourLabels(n) {
  const h = Array.from({ length: 24 }, (_, i) => i);
  if (n === 23) return h.filter((x) => x !== 2);
  if (n === 25) return [0, 1, 2, 2, ...h.slice(3)];
  return h.slice(0, n);
}
export const rangoHora = (h) => `${pad(h)}:00–${pad((h + 1) % 24)}:00`;
export function hourIndex(n, hour) {
  const labels = hourLabels(n);
  const i = labels.indexOf(hour);
  return i === -1 ? Math.min(hour, n - 1) : i;
}

// ---------- Tramos de la tarifa 2.0TD ----------
// Valle: 0-8 h, fines de semana y festivos nacionales de fecha fija.
const FESTIVOS_FIJOS = ['01-01', '01-06', '05-01', '08-15', '10-12', '11-01', '12-06', '12-08', '12-25'];
export function esDiaValle(dateStr) {
  const wd = weekday(dateStr);
  return wd === 0 || wd === 6 || FESTIVOS_FIJOS.includes(dateStr.slice(5));
}
export function periodo(dateStr, hour) {
  if (esDiaValle(dateStr) || hour < 8) return 'valle';
  if ((hour >= 10 && hour < 14) || (hour >= 18 && hour < 22)) return 'punta';
  return 'llano';
}

// ---------- Estadísticas de un día ----------
// values en €/MWh (como los publica REE). Devuelve €/kWh.
export function dayStats(values) {
  const p = values.map((v) => v / 1000);
  const labels = hourLabels(p.length);
  const sorted = [...p].sort((a, b) => a - b);
  const avg = p.reduce((a, b) => a + b, 0) / p.length;
  const minI = p.indexOf(sorted[0]);
  const maxI = p.indexOf(sorted[sorted.length - 1]);
  const t1 = sorted[Math.floor(p.length / 3)];
  const t2 = sorted[Math.floor((2 * p.length) / 3)];
  const level = (x) => (x < t1 ? 'b' : x < t2 ? 'm' : 'c');
  const ranking = p.map((v, i) => ({ i, h: labels[i], v })).sort((a, b) => a.v - b.v);
  return {
    p, labels, avg, min: sorted[0], max: sorted[sorted.length - 1],
    minH: labels[minI], maxH: labels[maxI], minI, maxI, level, t1, t2,
    baratas: ranking.slice(0, 3), caras: ranking.slice(-3).reverse(),
  };
}

// Mejor ventana de n horas consecutivas (desde el índice `from`).
export function bestWindow(p, n, from = 0) {
  let best = null;
  for (let i = from; i + n <= p.length; i++) {
    let s = 0;
    for (let j = i; j < i + n; j++) s += p[j];
    if (!best || s < best.sum) best = { start: i, sum: s };
  }
  if (!best) return null;
  return { start: best.start, end: best.start + n, avg: best.sum / n };
}
export function worstWindow(p, n, from = 0) {
  let worst = null;
  for (let i = from; i + n <= p.length; i++) {
    let s = 0;
    for (let j = i; j < i + n; j++) s += p[j];
    if (!worst || s > worst.sum) worst = { start: i, sum: s };
  }
  return worst && { start: worst.start, end: worst.start + n, avg: worst.sum / n };
}
export function windowLabel(labels, w) {
  const last = labels[w.end - 1];
  return `${pad(labels[w.start])}:00 a ${pad((last + 1) % 24)}:00`;
}

// ---------- Coste ----------
export function conImpuestos(precioKwh, imp) {
  return precioKwh * (1 + imp.impuestoElectrico) * (1 + imp.iva);
}

// ---------- Gráfico de barras SVG ----------
// Coordenadas en porcentaje y sin viewBox: el gráfico se adapta a cualquier ancho
// sin deformar el texto. items: [{v, label, cls, title, href}]
export function barChart(items, { unit = '€/kWh', decimals = 3, labelEvery = 2, ariaLabel = 'Gráfico', markIndex = -1, refLine = null } = {}) {
  const L = 8, R = 99.5, T = 5, B = 88;
  const vals = items.map((x) => x.v);
  const maxV = Math.max(...vals, refLine ?? -Infinity) * 1.08 || 1;
  const minV = Math.min(0, ...vals);
  const span = maxV - minV || 1;
  const y = (v) => T + (B - T) * (1 - (v - minV) / span);
  const bw = (R - L) / items.length;
  const f = (n) => n.toFixed(2);
  const zeroY = y(0);
  let s = `<svg class="chart" role="img" aria-label="${ariaLabel}" width="100%" height="100%">`;
  for (const t of niceTicks(minV, maxV, 4)) {
    s += `<line class="grid" x1="${L}%" x2="${R}%" y1="${f(y(t))}%" y2="${f(y(t))}%"/>`;
    s += `<text class="tick" x="0" y="${f(y(t))}%" dominant-baseline="middle">${fmt(t, t !== 0 && Math.abs(t) < 1 ? 2 : 0)}</text>`;
  }
  items.forEach((it, i) => {
    const top = Math.min(y(it.v), zeroY), h = Math.max(0.4, Math.abs(zeroY - y(it.v)));
    const cls = `bar ${it.cls || ''}${i === markIndex ? ' now' : ''}`;
    const rect = `<rect class="${cls}" data-i="${i}" x="${f(L + i * bw + bw * 0.12)}%" y="${f(top)}%" width="${f(bw * 0.76)}%" height="${f(h)}%" rx="2"><title>${it.title || `${it.label}: ${fmt(it.v, decimals)} ${unit}`}</title></rect>`;
    s += it.href ? `<a href="${it.href}">${rect}</a>` : rect;
    if (i % labelEvery === 0) {
      const odd = (i / labelEvery) % 2 === 1 ? ' odd' : '';
      s += `<text class="tick${odd}" x="${f(L + i * bw + bw / 2)}%" y="100%" dy="-4" text-anchor="middle">${it.label}</text>`;
    }
  });
  if (refLine != null) s += `<line class="ref" x1="${L}%" x2="${R}%" y1="${f(y(refLine))}%" y2="${f(y(refLine))}%"/>`;
  return s + '</svg>';
}
function niceTicks(min, max, count) {
  const span = max - min;
  const step0 = span / count;
  const mag = 10 ** Math.floor(Math.log10(step0));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= step0) || step0;
  const out = [];
  for (let t = Math.ceil(min / step) * step; t <= max + 1e-9; t += step) out.push(Math.round(t * 1e6) / 1e6);
  return out;
}

export function hourlyChart(dateStr, values, markIndex = -1) {
  const st = dayStats(values);
  const items = st.p.map((v, i) => ({
    v, cls: st.level(v), label: pad(st.labels[i]),
    title: `${rangoHora(st.labels[i])}: ${fmt(v, 3)} €/kWh (${periodo(dateStr, st.labels[i])})`,
  }));
  return barChart(items, { ariaLabel: `Precio de la luz por horas el ${fechaLarga(dateStr)}`, markIndex, refLine: st.avg });
}

export function hourlyTable(dateStr, values) {
  const st = dayStats(values);
  const max = Math.max(st.max, 0.0001);
  const rows = st.p.map((v, i) => {
    const h = st.labels[i];
    const per = periodo(dateStr, h);
    const w = Math.max(2, Math.round((Math.max(v, 0) / max) * 100));
    return `<tr class="lvl-${st.level(v)}" data-i="${i}"><td>${rangoHora(h)}</td><td class="num"><strong>${fmt(v, 3)}</strong></td><td><span class="per per-${per}">${per}</span></td><td class="bar-cell" aria-hidden="true"><span style="width:${w}%"></span></td></tr>`;
  }).join('');
  return `<table class="prices"><thead><tr><th>Hora</th><th class="num">€/kWh</th><th>Tramo</th><th class="bar-cell"><span class="sr">Nivel</span></th></tr></thead><tbody>${rows}</tbody></table>`;
}

// ---------- Bloques de precio (los usa el build y el navegador para refrescar) ----------
export function priceSummary(dateStr, values) {
  const st = dayStats(values);
  return `<div class="stats">
<div class="stat"><span class="k">Precio medio</span><span class="v">${fmt(st.avg, 3)}</span><span class="s">€/kWh</span></div>
<div class="stat stat-b"><span class="k">Hora más barata</span><span class="v">${fmt(st.min, 3)}</span><span class="s">${rangoHora(st.minH)}</span></div>
<div class="stat stat-c"><span class="k">Hora más cara</span><span class="v">${fmt(st.max, 3)}</span><span class="s">${rangoHora(st.maxH)}</span></div>
</div>`;
}

export function windowsBlock(dateStr, values) {
  const st = dayStats(values);
  const rows = [1, 2, 3, 4].map((n) => {
    const w = bestWindow(st.p, n);
    return `<li><span class="w-n">${n === 1 ? '1 hora' : `${n} horas seguidas`}</span><span class="w-h">${windowLabel(st.labels, w)}</span><span class="w-p">${fmt(w.avg, 3)} €/kWh</span></li>`;
  }).join('');
  return `<ul class="windows">${rows}</ul>`;
}

// ---------- Cálculo de coste de un aparato ----------
// p: { modo, potencia, ciclo, horas, dias, diasAnio, kwhCiclo, usosSemana, kwhAnio }, precio en €/kWh (con impuestos)
export function calcCoste(p, precio) {
  let kwhUnidad, kwhDia, kwhMes, kwhAnio;
  if (p.modo === 'ciclo') {
    kwhUnidad = p.kwhCiclo;
    const semana = p.kwhCiclo * p.usosSemana;
    kwhDia = semana / 7; kwhMes = (semana * 52) / 12; kwhAnio = semana * 52;
  } else if (p.modo === 'anual') {
    kwhAnio = p.kwhAnio; kwhMes = kwhAnio / 12; kwhDia = kwhAnio / 365; kwhUnidad = kwhDia;
  } else {
    kwhUnidad = (p.potencia / 1000) * p.ciclo; // kWh por hora de uso
    kwhDia = kwhUnidad * p.horas;
    kwhMes = kwhDia * p.dias;
    kwhAnio = kwhDia * (p.dias / 30) * (p.diasAnio ?? 365);
  }
  return {
    kwhUnidad, kwhDia, kwhMes, kwhAnio,
    unidad: kwhUnidad * precio, dia: kwhDia * precio, mes: kwhMes * precio, anio: kwhAnio * precio,
  };
}

// ---------- Tira de 24 horas y estado actual ----------
export const ESTADO = {
  b: { cls: 'b', label: 'Luz barata', corto: 'barata' },
  m: { cls: 'm', label: 'Precio normal', corto: 'normal' },
  c: { cls: 'c', label: 'Luz cara', corto: 'cara' },
};
export function hourStrip(dateStr, values) {
  const st = dayStats(values);
  const cells = st.p.map((v, i) => `<span class="s-${st.level(v)}" data-i="${i}" title="${rangoHora(st.labels[i])}: ${fmt(v, 3)} €/kWh"></span>`).join('');
  return `<div class="strip" data-date="${dateStr}" role="img" aria-label="Horas baratas y caras del ${fechaLarga(dateStr)}"><div class="strip-bar">${cells}</div><div class="strip-axis"><i>0h</i><i>6h</i><i>12h</i><i>18h</i><i>24h</i></div></div>`;
}
