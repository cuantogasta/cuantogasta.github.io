// Generador estático de CuántoGasta. Sin dependencias: `node src/build.mjs` crea dist/.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import * as C from './assets/core.js';
import { APARATOS, CATEGORIAS, PRODUCTOS_AHORRO } from './content/aparatos.mjs';
import { GUIAS } from './content/guias.mjs';
import { icon, ICONO_APARATO } from './content/iconos.mjs';
import { COMPRAS, MEJORAS, CATEGORIAS_INFO } from './content/compras.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const CFG = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8'));
const SITE = CFG.siteUrl.replace(/\/$/, '');
const MON = CFG.monetizacion || {};
const IMP = CFG.impuestos;
const NOW = C.madridNow();
const TODAY = NOW.date;
const TOMORROW = C.addDays(TODAY, 1);
const YEAR = TODAY.slice(0, 4);
const BUILD_ISO = new Date().toISOString();
const PUBLICADO = '2026-10-08';

// ---------------------------------------------------------------- datos
const PRICES = {};
for (const f of fs.readdirSync(path.join(ROOT, 'data', 'prices')).filter((f) => f.endsWith('.json')).sort()) {
  Object.assign(PRICES, JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'prices', f), 'utf8')));
}
const DATES = Object.keys(PRICES).sort();
const PAST = DATES.filter((d) => d <= TODAY);
const LATEST = PAST.at(-1); // normalmente hoy
const HAS_TOMORROW = Boolean(PRICES[TOMORROW]);
const HAS_TODAY = LATEST === TODAY;
const dayAvg = (d) => PRICES[d].reduce((a, b) => a + b, 0) / PRICES[d].length / 1000;
const last30 = PAST.slice(-30);
const MEDIA30 = last30.reduce((a, d) => a + dayAvg(d), 0) / last30.length; // €/kWh sin impuestos
const MEDIA30_CON = C.conImpuestos(MEDIA30, IMP);
const conImp = (p) => C.conImpuestos(p, IMP);
const MONTHS = [...new Set(DATES.map((d) => d.slice(0, 7)))].sort();
const ADS = Boolean(MON.adsenseClient);

// ---------------------------------------------------------------- utilidades
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const p3 = (n) => C.fmt(n, 3);
const hash = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 8);
const sitemap = [];
const horaBuild = (() => { const n = C.madridNow(); return `${C.pad(n.hour)}:${C.pad(n.minute)}`; })();

function write(urlPath, content, { sitemapEntry = true, lastmod = TODAY, priority } = {}) {
  const isFile = /\.[a-z0-9]+$/i.test(urlPath);
  const file = isFile ? path.join(DIST, urlPath) : path.join(DIST, urlPath, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  if (sitemapEntry && !isFile) sitemap.push({ loc: SITE + urlPath, lastmod, priority });
}

function amazonUrl(q) {
  const u = new URL('https://www.amazon.es/s');
  u.searchParams.set('k', q);
  if (MON.amazonTag) u.searchParams.set('tag', MON.amazonTag);
  return u.toString();
}
const amazonAttrs = 'rel="sponsored nofollow noopener" target="_blank"';
const btnBuy = (q, label = 'Ver precios en Amazon') => `<a class="btn btn-buy" href="${esc(amazonUrl(q))}" ${amazonAttrs}>${icon('cart')}<span>${esc(label)}</span></a>`;
const disclosure = () => (MON.amazonTag ? '<p class="disclosure">Enlaces de afiliado: si compras a través de ellos, la web recibe una pequeña comisión sin coste extra para ti. Así se mantiene gratis.</p>' : '');

// ---------------------------------------------------------------- assets
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, 'assets', 'fonts'), { recursive: true });
const ASSET_V = {};
for (const f of ['style.css', 'core.js', 'app.js']) {
  let src = fs.readFileSync(path.join(ROOT, 'src', 'assets', f), 'utf8');
  // app.js importa core.js: versionamos el import para que nunca se mezclen versiones en caché.
  if (f === 'app.js') src = src.replace("from './core.js'", `from './core.js?v=${ASSET_V['core.js']}'`);
  ASSET_V[f] = hash(src);
  fs.writeFileSync(path.join(DIST, 'assets', f), src);
}
fs.copyFileSync(path.join(ROOT, 'src', 'assets', 'fonts', 'jakarta-latin.woff2'), path.join(DIST, 'assets', 'fonts', 'jakarta-latin.woff2'));
for (const f of ['og.png', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'favicon.ico']) {
  const src = path.join(ROOT, 'src', 'assets', f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(DIST, f === 'og.png' ? 'assets/og.png' : f));
}
const LOGO = '<svg class="logo" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="#0f766e"/><path d="M18.5 4 8 18h7l-1.5 10L24 14h-7z" fill="#fde047"/></svg>';
fs.writeFileSync(path.join(DIST, 'favicon.svg'), LOGO.replace('<svg class="logo" ', '<svg xmlns="http://www.w3.org/2000/svg" '));
const BRAND = esc(CFG.siteName).replace(/^(Cuánto)(.+)$/, '$1<b>$2</b>');

// ---------------------------------------------------------------- layout
const NAV = [
  ['/', 'Precio hoy'],
  ['/precio-luz-manana/', 'Mañana'],
  ['/mejor-hora/', 'Mejor hora'],
  ['/cuanto-gasta/', '¿Cuánto gasta?'],
  ['/calculadora-consumo-electrico/', 'Calculadora'],
  ['/guias/', 'Guías'],
];
const ORG = { '@type': 'Organization', name: CFG.siteName, url: SITE + '/', logo: { '@type': 'ImageObject', url: `${SITE}/icon-512.png` } };

function layout({ title, desc, urlPath, body, crumbs = [], jsonld = [], pageData = null, ogType = 'website', noindex = false }) {
  const url = SITE + urlPath;
  const fullTitle = title.includes(CFG.siteName) || title.length > 52 ? title : `${title} | ${CFG.siteName}`;
  const ld = [...jsonld];
  if (crumbs.length) {
    ld.push({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [['/', 'Inicio'], ...crumbs].map(([href, name], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + href })),
    });
  }
  const crumbHtml = crumbs.length
    ? `<nav class="crumbs" aria-label="Migas de pan"><a href="/">Inicio</a>${crumbs.map(([href, name], i) => (i === crumbs.length - 1 ? `<span aria-current="page">${esc(name)}</span>` : `<a href="${href}">${esc(name)}</a>`)).join('')}</nav>`
    : '';
  const section = '/' + (urlPath.split('/')[1] || '');
  const nav = NAV.map(([href, label]) => `<a href="${href}"${href === urlPath || (href !== '/' && section === href.replace(/\/$/, '')) ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const v = CFG.verificacion || {};
  return `<!doctype html>
<html lang="es-ES">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="${noindex ? 'noindex' : 'index,follow,max-image-preview:large,max-snippet:-1'}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(CFG.siteName)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="es_ES">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0f766e">
<link rel="preload" href="/assets/fonts/jakarta-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/style.css?v=${ASSET_V['style.css']}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
${v.googleSiteVerification ? `<meta name="google-site-verification" content="${esc(v.googleSiteVerification)}">\n` : ''}${v.bingSiteVerification ? `<meta name="msvalidate.01" content="${esc(v.bingSiteVerification)}">\n` : ''}${ADS ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${esc(MON.adsenseClient)}" crossorigin="anonymous"></script>\n` : ''}${ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>
<body>
<a class="skip" href="#main">Saltar al contenido</a>
<header class="site-header"><div class="wrap hdr">
<a class="brand" href="/" aria-label="${esc(CFG.siteName)}: inicio">${LOGO}<span>${BRAND}</span></a>
<nav class="main-nav" aria-label="Principal">${nav}</nav>
<a class="hdr-now" id="hdr-now" href="/" hidden></a>
</div></header>
<main id="main" class="wrap">
${crumbHtml}
${body}
</main>
${footer()}
${pageData ? `<script type="application/json" id="page-data">${JSON.stringify(pageData)}</script>\n` : ''}<script type="module" src="/assets/app.js?v=${ASSET_V['app.js']}"></script>
${CFG.analitica?.cloudflareToken ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"${esc(CFG.analitica.cloudflareToken)}"}'></script>\n` : ''}</body>
</html>
`;
}

function footer() {
  const top = ['radiador-de-aceite', 'bomba-de-calor', 'freidora-de-aire', 'lavadora', 'termo-electrico', 'coche-electrico', 'horno', 'frigorifico'].map((s) => APARATOS.find((a) => a.slug === s));
  return `<footer class="site-footer"><div class="wrap">
<div class="foot-cols">
<div class="foot-brand"><a class="brand" href="/">${LOGO}<span>${BRAND}</span></a><p>${esc(CFG.lema)}. Una herramienta gratuita para entender tu factura y pagar menos.</p>
<ul class="trust-list"><li>${icon('shield')} Datos oficiales de Red Eléctrica</li><li>${icon('clock')} Actualizado el ${C.fechaCorta(TODAY)} a las ${horaBuild}</li><li>${icon('check')} Gratis y sin registro${ADS ? '' : ', sin cookies'}</li></ul>
${MON.kofiUrl ? `<p><a class="btn btn-small" href="${esc(MON.kofiUrl)}" rel="noopener" target="_blank">☕ Invítame a un café</a></p>` : ''}</div>
<div><strong>Precio de la luz</strong><ul><li><a href="/">Hoy por horas</a></li><li><a href="/precio-luz-manana/">Mañana</a></li><li><a href="/mejor-hora/">Mejor hora para…</a></li><li><a href="/precio-luz/">Histórico</a></li><li><a href="/guias/horario-luz-tramos-punta-llano-valle/">Horarios punta y valle</a></li></ul></div>
<div><strong>¿Cuánto gasta?</strong><ul>${top.map((a) => `<li><a href="/cuanto-gasta/${a.slug}/">${esc(cap(a.corto || a.nombre))}</a></li>`).join('')}</ul></div>
<div><strong>Más</strong><ul><li><a href="/calculadora-consumo-electrico/">Calculadora de consumo</a></li><li><a href="/guias/">Guías de ahorro</a></li><li><a href="/sobre/">Quiénes somos y método</a></li><li><a href="/aviso-legal/">Aviso legal</a></li><li><a href="/privacidad/">Privacidad y cookies</a></li></ul></div>
</div>
<p class="legal">Precios PVPC de la tarifa 2.0TD para la península, Baleares y Canarias (fuente: <a href="https://www.ree.es/es/apidatos" rel="noopener">Red Eléctrica, REData</a>). Los precios por hora no incluyen impuestos; las estimaciones de coste incluyen impuesto eléctrico (${C.fmt(IMP.impuestoElectrico * 100, 2)} %) e IVA (${C.fmt(IMP.iva * 100, 0)} %). Información orientativa, no constituye asesoramiento.${MON.amazonTag ? ' En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.' : ''}</p>
</div></footer>`;
}

// ---------------------------------------------------------------- componentes
function pageHead({ ico, eyebrow, h1, sub, meta = true }) {
  return `<header class="page-head">
<span class="head-ico">${icon(ico)}</span>
<div>${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<h1>${esc(h1)}</h1>${sub ? `<p class="sub">${sub}</p>` : ''}${meta ? `<p class="meta">${icon('clock')} Actualizado el ${C.fechaLarga(TODAY)} · Datos de Red Eléctrica</p>` : ''}</div>
</header>`;
}

function shareBar(text, urlPath, label = '¿Te ha sido útil? Compártelo') {
  const url = SITE + urlPath;
  const e = encodeURIComponent;
  const ext = 'rel="noopener" target="_blank"';
  return `<div class="share" data-share-text="${esc(text)}" data-share-url="${url}">
<span class="share-label">${icon('share')} ${esc(label)}</span>
<div class="share-btns">
<a class="sh sh-wa" ${ext} href="https://wa.me/?text=${e(`${text} ${url}`)}">${icon('chat')}<span>WhatsApp</span></a>
<a class="sh sh-tg" ${ext} href="https://t.me/share/url?url=${e(url)}&amp;text=${e(text)}">${icon('send')}<span>Telegram</span></a>
<a class="sh sh-x" ${ext} href="https://twitter.com/intent/tweet?text=${e(text)}&amp;url=${e(url)}"><span>𝕏</span></a>
<a class="sh sh-fb" ${ext} href="https://www.facebook.com/sharer/sharer.php?u=${e(url)}"><span>Facebook</span></a>
<button class="sh sh-copy" type="button">${icon('link')}<span>Copiar enlace</span></button>
</div></div>`;
}

function priceBlock(date, values) {
  return `<div class="price-block" data-date="${date}">
<div id="pb-stats">${C.priceSummary(date, values)}</div>
<div class="card chart-card"><div class="chart-head"><h2 class="h3">${icon('chart')} Precio por horas (€/kWh)</h2><span class="legend"><i class="lg-b"></i>barata <i class="lg-m"></i>media <i class="lg-c"></i>cara</span></div>
<div id="pb-chart">${C.hourlyChart(date, values)}</div>
<p class="chart-note">La línea discontinua marca la media del día. Pasa el dedo o el ratón por las barras para ver cada hora.</p></div>
<div class="card"><h2 class="h3">${icon('clock')} Las mejores franjas del día</h2><div id="pb-windows">${C.windowsBlock(date, values)}</div></div>
</div>`;
}

function tableBlock(date, values) {
  return `<div class="card" id="tabla"><h2 class="h3">${icon('calendar')} Precio de la luz hora a hora</h2><div class="table-wrap" id="pb-table">${C.hourlyTable(date, values)}</div></div>`;
}

function faqBlock(items, title = 'Preguntas frecuentes') {
  return {
    html: `<section class="faq"><h2>${title}</h2>${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${a}</p></details>`).join('')}</section>`,
    ld: {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })),
    },
  };
}

function costeHoyLista(date, items) {
  const st = C.dayStats(PRICES[date]);
  return `<div class="table-wrap"><table class="data"><thead><tr><th>Uso</th><th class="num">Hora más barata<br><small>${C.rangoHora(st.minH)}</small></th><th class="num">Hora más cara<br><small>${C.rangoHora(st.maxH)}</small></th></tr></thead><tbody>${items.map(([label, kwh, href]) => `<tr><td>${href ? `<a href="${href}">${label}</a>` : label}</td><td class="num good">${C.eurAuto(kwh * conImp(st.min))}</td><td class="num bad">${C.eurAuto(kwh * conImp(st.max))}</td></tr>`).join('')}</tbody></table></div>`;
}

function productosAhorro() {
  return `<section class="affiliate"><div class="sec-head"><p class="eyebrow">${icon('leaf')} Pequeñas compras, gran ahorro</p><h2>Tres cosas que se pagan solas</h2></div><div class="prod-grid">${PRODUCTOS_AHORRO.map((p, i) => `<a class="prod" href="${esc(amazonUrl(p.q))}" ${amazonAttrs}><span class="prod-ico">${icon(['chart', 'clock', 'bolt'][i])}</span><strong>${esc(p.t)}</strong><span>${esc(p.d)}</span><em>Ver precios en Amazon ${icon('arrow')}</em></a>`).join('')}</div>${disclosure()}</section>`;
}

function ofertaTarifa() {
  const o = MON.ofertaTarifa || {};
  return o.url ? `<aside class="promo">${icon('euro')}<p>${esc(o.texto || '¿Pagas demasiado de luz? Compara tu tarifa.')}</p><a class="btn btn-buy" href="${esc(o.url)}" rel="sponsored noopener" target="_blank">Ver oferta</a></aside>` : '';
}

const articulo = (a) => `${a.art} ${a.nombre}`;
const usando = (a) => (a.art === 'una' ? 'Usándola' : 'Usándolo');
const duracion = (h) => (h < 1 ? `${Math.round(h * 60)} minutos` : h === 1 ? '1 hora' : `${C.fmt(h, h % 1 ? 1 : 0)} horas`);
const preciosHoyData = (date) => {
  const st = C.dayStats(PRICES[date]);
  return { media: conImp(st.avg), min: conImp(st.min), max: conImp(st.max) };
};
const ahorroMejora = (m) => (m.kwhDe - m.kwhA) * MEDIA30_CON;

// ---------------------------------------------------------------- mejor hora (datos)
const MEJOR_HORA = [
  { slug: 'lavadora', nombre: 'poner la lavadora', corto: 'Lavadora', horas: 2, kwh: 0.7, aparato: 'lavadora', nota: 'Un lavado típico dura entre 1 y 3 horas; calculamos la mejor franja de 2 horas.' },
  { slug: 'lavavajillas', nombre: 'poner el lavavajillas', corto: 'Lavavajillas', horas: 3, kwh: 0.8, aparato: 'lavavajillas', nota: 'El programa ECO suele durar unas 3 horas.' },
  { slug: 'secadora', nombre: 'poner la secadora', corto: 'Secadora', horas: 2, kwh: 1.5, aparato: 'secadora', nota: 'Un secado completo dura entre 1,5 y 3 horas.' },
  { slug: 'horno', nombre: 'usar el horno', corto: 'Horno', horas: 1, kwh: 1.1, aparato: 'horno', nota: 'Una hora de horno a 180-200 °C con precalentamiento.' },
  { slug: 'termo-electrico', nombre: 'calentar el termo', corto: 'Termo', horas: 3, kwh: 3.6, aparato: 'termo-electrico', nota: 'Un termo de 80 litros necesita unas 2-3 horas para recuperar el agua caliente de una pareja.' },
  { slug: 'coche-electrico', nombre: 'cargar el coche eléctrico', corto: 'Coche eléctrico', horas: 5, kwh: 18, aparato: 'coche-electrico', nota: 'Carga de unos 18 kWh (100 km) con un cargador de 3,7 kW: unas 5 horas.' },
  { slug: 'plancha', nombre: 'planchar', corto: 'Plancha', horas: 1, kwh: 1.2, aparato: 'plancha', nota: 'Una hora de plancha a vapor.' },
];

function bestTimeCards(date) {
  const st = C.dayStats(PRICES[date]);
  return `<div class="best-grid" data-date="${date}" data-imp='${JSON.stringify(IMP)}'>${MEJOR_HORA.slice(0, 6).map((m) => {
    const w = C.bestWindow(st.p, m.horas), bad = C.worstWindow(st.p, m.horas);
    return `<a class="best" href="/mejor-hora/${m.slug}/" data-horas="${m.horas}" data-kwh="${m.kwh}"><span class="best-ico">${icon(ICONO_APARATO[m.aparato])}</span><span class="best-name">${m.corto}<em class="best-when"></em></span><strong class="best-win">${C.pad(st.labels[w.start])}:00 – ${C.pad((st.labels[w.end - 1] + 1) % 24)}:00</strong><span class="best-cost"><b>${C.eurAuto(m.kwh * conImp(w.avg))}</b> en vez de <s>${C.eurAuto(m.kwh * conImp(bad.avg))}</s></span></a>`;
  }).join('')}</div>`;
}

function mejorasDestacadas() {
  const sel = ['radiador-de-aceite', 'termo-electrico', 'secadora', 'bombilla'];
  return `<div class="save-grid">${sel.map((s) => {
    const m = MEJORAS[s], a = APARATOS.find((x) => x.slug === s);
    return `<a class="save-card" href="/cuanto-gasta/${s}/#ahorro"><span class="save-ico">${icon(ICONO_APARATO[s])}</span><span class="save-txt">De ${esc(m.de)} a ${esc(m.a)}</span><strong>−${C.fmtInt(ahorroMejora(m))} €<small>/año</small></strong><em>Ver cómo ${icon('arrow')}</em></a>`;
  }).join('')}</div>`;
}

function mejoraBox(slug) {
  const m = MEJORAS[slug];
  if (!m) return '';
  const ahorro = ahorroMejora(m);
  return `<aside class="saving" id="ahorro">
<span class="saving-ico">${icon('trend')}</span>
<div class="saving-body"><p class="eyebrow">${m.ajuste ? 'Un ajuste que ahorra' : '¿Y si lo cambias?'}</p>
<h2>Ahorra unos <span class="money">${C.fmtInt(ahorro)} €</span> al año</h2>
<p>Pasar de ${esc(m.de)} a ${esc(m.a)} baja el consumo de <strong>${C.fmtInt(m.kwhDe)}</strong> a <strong>${C.fmtInt(m.kwhA)} kWh</strong> al año. En 5 años son unos <strong>${C.fmtInt(ahorro * 5)} €</strong> menos en tu factura${m.ajuste ? ', sin comprar nada' : ''}.</p>
${btnBuy(m.q, m.boton)}${disclosure()}</div>
</aside>`;
}

function compraBox(a) {
  const c = COMPRAS[a.slug];
  if (!c) {
    return `<aside class="buy card"><div class="buy-head"><span class="buy-ico">${icon('cart')}</span><div><h2>¿Vas a comprar ${esc(articulo(a))}?</h2><p>Fíjate en la etiqueta energética y en la potencia, y calcula su coste real con la calculadora de arriba antes de decidir.</p></div></div>${btnBuy(a.amazon, `Ver ${a.plural} en Amazon`)}${disclosure()}</aside>`;
  }
  return `<section class="buy card" id="comprar">
<div class="buy-head"><span class="buy-ico">${icon('cart')}</span><div><p class="eyebrow">Guía de compra</p><h2>${esc(c.titulo || `Qué ${a.nombre} comprar para gastar menos`)}</h2></div></div>
<ul class="checks">${c.criterios.map((x) => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul>
<div class="buy-grid">${c.opciones.map((o) => `<div class="opt"><h3>${esc(o.t)}</h3><p>${esc(o.d)}</p>${btnBuy(o.q)}</div>`).join('')}</div>
${disclosure()}</section>`;
}

// ---------------------------------------------------------------- páginas de precio
function dayPageCommon(date) {
  const values = PRICES[date];
  const st = C.dayStats(values);
  const prev = PRICES[C.addDays(date, -1)] ? dayAvg(C.addDays(date, -1)) : null;
  const diff = prev ? ((st.avg - prev) / prev) * 100 : null;
  const vs30 = ((st.avg - MEDIA30) / MEDIA30) * 100;
  const cmp = `${diff != null ? `un <strong>${C.fmt(Math.abs(diff), 1)} % ${diff >= 0 ? 'más caro' : 'más barato'}</strong> que el día anterior y ` : ''}un ${C.fmt(Math.abs(vs30), 1)} % ${vs30 >= 0 ? 'por encima' : 'por debajo'} de la media de los últimos 30 días`;
  return { values, st, cmp };
}

// Resumen narrativo con datos únicos de cada día (evita páginas "calcadas").
function resumenDia(date) {
  const st = C.dayStats(PRICES[date]);
  const fut = date > TODAY;
  const V = fut ? { fue: 'será', fueron: 'serán', costo: 'costará', hubo: 'habrá', ahorraba: 'ahorrará' } : { fue: 'fue', fueron: 'fueron', costo: 'costó', hubo: 'hubo', ahorraba: 'ahorraba' };
  const out = [];
  const ym = date.slice(0, 7);
  const mes = C.MESES[Number(date.slice(5, 7)) - 1];
  const delMes = DATES.filter((d) => d.startsWith(ym) && d <= (fut ? date : TODAY));
  const cerrado = ym < TODAY.slice(0, 7);
  const rank = [...delMes].sort((x, y) => dayAvg(x) - dayAvg(y)).indexOf(date) + 1;
  const n = delMes.length;
  const ambito = cerrado ? `de todo ${mes}` : `de ${mes} hasta la fecha`;
  if (n >= 5) {
    if (rank === 1) out.push(`${cap(V.fue)} el día más barato ${ambito}.`);
    else if (rank === n) out.push(`${cap(V.fue)} el día más caro ${ambito}.`);
    else if (rank <= 3) out.push(`${cap(V.fue)} el ${rank}.º día más barato ${ambito}.`);
    else if (rank > n - 3) out.push(`${cap(V.fue)} el ${n - rank + 1}.º día más caro ${ambito}.`);
  }
  if (st.min <= 0.01) out.push(`${cap(V.hubo)} horas prácticamente gratis, por debajo de un céntimo el kWh antes de impuestos.`);
  else out.push(`La hora más cara ${V.costo} ${C.fmt(st.max / st.min, 1)} veces más que la más barata.`);
  const solar = st.p.filter((_, i) => st.labels[i] >= 12 && st.labels[i] < 17);
  const solarAvg = solar.reduce((x, y) => x + y, 0) / solar.length;
  const dSolar = ((st.avg - solarAvg) / st.avg) * 100;
  if (dSolar > 15) out.push(`Las horas centrales (12:00-17:00) ${V.fueron} un ${C.fmt(dSolar, 0)} % más baratas que la media gracias a la producción solar.`);
  const w = C.bestWindow(st.p, 2), bad = C.worstWindow(st.p, 2);
  out.push(`Poner la lavadora de ${C.windowLabel(st.labels, w)} en lugar de ${C.windowLabel(st.labels, bad)} ${V.ahorraba} un ${C.fmt(((bad.avg - w.avg) / bad.avg) * 100, 0)} %.`);
  if (C.esDiaValle(date)) out.push(`Al ser ${[0, 6].includes(C.weekday(date)) ? 'fin de semana' : 'festivo nacional'}, las 24 horas ${V.fueron} tramo valle.`);
  return out.join(' ');
}

function buildHome() {
  const date = LATEST;
  const { values, st, cmp } = dayPageCommon(date);
  const esHoy = date === TODAY;
  const nivelDia = st.avg < MEDIA30 * 0.9 ? 'b' : st.avg > MEDIA30 * 1.1 ? 'c' : 'm';
  const tomorrowBlock = HAS_TOMORROW ? (() => {
    const t = C.dayStats(PRICES[TOMORROW]);
    const d = ((t.avg - st.avg) / st.avg) * 100;
    return `<a class="card tomorrow" href="/precio-luz-manana/"><div class="tomorrow-head"><span>${icon('moon')}</span><div><p class="eyebrow">Ya disponible</p><h2 class="h3">Mañana, ${C.fechaCorta(TOMORROW)}: ${d >= 0 ? 'sube' : 'baja'} un ${C.fmt(Math.abs(d), 0)} %</h2></div></div>${C.hourStrip(TOMORROW, PRICES[TOMORROW])}<p>Media de <strong>${p3(t.avg)} €/kWh</strong> · hora más barata ${C.rangoHora(t.minH)} <em>Ver el precio de mañana ${icon('arrow')}</em></p></a>`;
  })() : `<a class="card tomorrow" href="/precio-luz-manana/"><div class="tomorrow-head"><span>${icon('moon')}</span><div><p class="eyebrow">Hacia las 20:30</p><h2 class="h3">El precio de mañana aún no se ha publicado</h2></div></div><p>Red Eléctrica lo publica cada tarde. La web se actualiza sola en cuanto sale. <em>Ir a mañana ${icon('arrow')}</em></p></a>`;
  const populares = ['radiador-de-aceite', 'calefactor', 'bomba-de-calor', 'freidora-de-aire', 'horno', 'lavadora', 'secadora', 'termo-electrico', 'aire-acondicionado', 'frigorifico', 'coche-electrico', 'vitroceramica'];
  const faq = faqBlock([
    ['¿Qué es el PVPC?', 'Es el Precio Voluntario para el Pequeño Consumidor, la tarifa regulada de la luz en España. Su precio cambia cada hora y Red Eléctrica lo publica cada tarde para el día siguiente. Lo ofrecen solo las comercializadoras de referencia.'],
    ['¿Los precios incluyen impuestos?', `No. Los precios por hora son el término de energía del PVPC (energía, peajes y cargos) sin impuestos. Para saber lo que pagas por cada kWh súmale el impuesto eléctrico (${C.fmt(IMP.impuestoElectrico * 100, 2)} %) y el IVA (${C.fmt(IMP.iva * 100, 0)} %): aproximadamente un 27 % más. En las calculadoras de la web ya están incluidos.`],
    ['¿A qué hora se publica el precio de la luz de mañana?', 'Red Eléctrica publica el PVPC del día siguiente hacia las 20:15-20:30. Esta web se actualiza automáticamente poco después.'],
    ['¿Por qué las horas centrales son a veces las más baratas?', 'Por la producción solar: entre las 12:00 y las 17:00 hay mucha energía fotovoltaica, que abarata el mercado mayorista. Por la tarde-noche, cuando cae el sol y sube la demanda, los precios suelen ser los más altos.'],
    ['¿Me afecta si tengo tarifa de mercado libre?', 'Si tienes un precio fijo, no: pagas lo mismo a cualquier hora (o según tus tramos, si tu tarifa tiene discriminación horaria). Estos precios sí te sirven para comparar si tu tarifa te compensa: mira <a href="/guias/pvpc-o-mercado-libre/">PVPC o mercado libre</a>.'],
  ]);
  const shareText = `💡 Precio de la luz hoy (${C.fechaCorta(date)}): la hora más barata es ${C.rangoHora(st.minH)} (${p3(st.min)} €/kWh) y la más cara ${C.rangoHora(st.maxH)}. Todas las horas aquí:`;
  const body = `
<section class="hero-home">
<div class="hero-copy">
<p class="eyebrow">${icon('calendar')} ${cap(C.fechaLarga(date, true))}${esHoy ? '' : ' (últimos datos)'}</p>
<h1>Precio de la luz hoy</h1>
<p class="lead" id="pb-date">Mira cuánto cuesta la luz <strong>hora a hora</strong>, descubre <strong>cuándo poner la lavadora</strong> y calcula lo que gasta cada aparato. Hoy la media es de <strong>${p3(st.avg)} €/kWh</strong>, ${cmp}.</p>
<div class="hero-actions"><a class="btn btn-sun" href="#mejores-horas">${icon('clock')}<span>¿Cuándo pongo la lavadora?</span></a><a class="btn btn-glass" href="/precio-luz-manana/">${icon('moon')}<span>Precio de mañana</span></a></div>
<ul class="hero-trust"><li>${icon('shield')} Datos oficiales de Red Eléctrica</li><li>${icon('check')} Gratis, sin registro</li></ul>
</div>
<div class="now-card st-${nivelDia}" id="now-card">
<p class="now-label" id="now-label">Media de hoy</p>
<p class="now-price"><span id="now-price">${p3(st.avg)}</span><small>€/kWh</small></p>
<p class="now-state" id="now-state">${C.ESTADO[nivelDia].label}</p>
<p class="now-next" id="now-next">Hora más barata: <strong>${C.rangoHora(st.minH)}</strong> (${p3(st.min)} €/kWh)</p>
<div id="pb-strip">${C.hourStrip(date, values)}</div>
<p class="now-foot">PVPC 2.0TD · sin impuestos</p>
</div>
</section>
<section class="sec" id="mejores-horas"><div class="sec-head"><p class="eyebrow">${icon('clock')} Ahorra sin esfuerzo</p><h2>¿A qué hora pongo cada cosa hoy?</h2><p>La franja más barata del día para cada electrodoméstico y lo que te ahorras frente a la peor.</p></div>
${bestTimeCards(date)}</section>
${tomorrowBlock}
<section class="sec"><div class="sec-head"><p class="eyebrow">${icon('chart')} Hoy, hora a hora</p><h2>El precio de la luz de hoy en detalle</h2></div>
${priceBlock(date, values)}
${tableBlock(date, values)}</section>
${shareBar(shareText, '/', 'Pásale las horas baratas a tu familia')}
${ofertaTarifa()}
<section class="sec"><div class="sec-head"><p class="eyebrow">${icon('trend')} Donde está el ahorro de verdad</p><h2>Cambios que se notan en la factura</h2><p>Calculado con el precio medio de la luz de los últimos 30 días (${p3(MEDIA30_CON)} €/kWh con impuestos).</p></div>
${mejorasDestacadas()}</section>
<section class="sec"><div class="sec-head"><p class="eyebrow">${icon('euro')} En euros, no en vatios</p><h2>¿Cuánto gasta cada aparato?</h2></div><div class="grid-cards">${populares.map((s) => applianceCard(APARATOS.find((a) => a.slug === s))).join('')}</div><p class="more"><a class="btn btn-ghost" href="/cuanto-gasta/">Ver los ${APARATOS.length} aparatos ${icon('arrow')}</a></p></section>
<section class="sec prose"><h2>Cómo leer el precio de la luz de hoy</h2>
<p>Son los precios del <strong>PVPC</strong> (la tarifa regulada) que publica Red Eléctrica para cada hora del día. Las horas verdes son las más baratas y las rojas, las más caras. Si tienes PVPC, mover la lavadora, el lavavajillas, la secadora, el termo o la carga del coche a las horas verdes puede reducir su coste a la mitad o menos.</p>
<p>Si tienes una tarifa de precio fijo, la hora no cambia lo que pagas, pero te sirve para saber si tu tarifa es competitiva. Más detalles en los <a href="/guias/horario-luz-tramos-punta-llano-valle/">tramos punta, llano y valle</a> y en el <a href="/precio-luz/">histórico del precio de la luz</a>.</p></section>
${faq.html}
<section class="sec"><div class="sec-head"><p class="eyebrow">${icon('book')} Aprende a pagar menos</p><h2>Guías prácticas</h2></div><div class="guide-grid">${GUIAS.slice(0, 6).map(guideCard).join('')}</div></section>
${productosAhorro()}`;
  write('/', layout({
    title: `Precio de la luz hoy por horas, ${C.fechaCorta(date)} | ${CFG.siteName}`,
    desc: `Precio de la luz hoy ${C.fechaLarga(date)} (PVPC): media ${p3(st.avg)} €/kWh, hora más barata ${C.rangoHora(st.minH)}. Mejor hora para la lavadora y cuánto gasta cada aparato.`,
    urlPath: '/', body,
    jsonld: [
      { '@context': 'https://schema.org', '@type': 'WebSite', name: CFG.siteName, url: SITE + '/', inLanguage: 'es-ES', publisher: ORG },
      { '@context': 'https://schema.org', ...ORG },
      faq.ld,
    ],
    pageData: { type: 'day', date, values, live: true },
  }), { priority: '1.0' });
}

function buildTomorrow() {
  const date = HAS_TOMORROW ? TOMORROW : null;
  let body;
  const head = (lead) => `<section class="hero-band"><p class="eyebrow">${icon('moon')} Tarifa PVPC 2.0TD · publicado por Red Eléctrica</p><h1>Precio de la luz mañana</h1><p class="lead" id="pb-date">${lead}</p></section>`;
  if (date) {
    const { values, st, cmp } = dayPageCommon(date);
    body = `${head(`${cap(C.fechaLarga(date, true))}. El precio medio será de <strong>${p3(st.avg)} €/kWh</strong>, ${cmp}.`)}
<div class="card strip-card"><h2 class="h3">${icon('clock')} Mañana de un vistazo</h2><div id="pb-strip">${C.hourStrip(date, values)}</div><p class="resumen">${resumenDia(date)}</p></div>
${priceBlock(date, values)}${shareBar(`💡 Precio de la luz mañana (${C.fechaCorta(date)}): la hora más barata será ${C.rangoHora(st.minH)} (${p3(st.min)} €/kWh). Todas las horas:`, '/precio-luz-manana/', 'Avisa a tu familia de las horas baratas de mañana')}${ofertaTarifa()}${tableBlock(date, values)}`;
  } else {
    body = `${head(`El precio de la luz para ${C.fechaLarga(TOMORROW, true)} se publica hacia las 20:15-20:30. Esta página se actualiza sola en cuanto esté disponible.`)}
<div id="pending-tomorrow" class="card"><p>Mientras tanto, consulta el <a href="/">precio de la luz de hoy</a> y la <a href="/mejor-hora/">mejor hora para cada electrodoméstico</a>.</p></div>`;
  }
  body += `<section class="sec prose"><h2>¿Cuándo se sabe el precio de la luz de mañana?</h2>
<p>Red Eléctrica de España publica cada tarde, hacia las 20:15, los precios del PVPC para cada hora del día siguiente. Se calculan a partir del mercado mayorista (que cierra a mediodía) y de los peajes y cargos regulados. Si tienes PVPC, es el momento de planificar la lavadora, el lavavajillas, el termo o la carga del coche.</p>
<p>¿Quieres saber exactamente cuándo poner cada aparato? Mira la <a href="/mejor-hora/">mejor hora para cada electrodoméstico</a>.</p></section>`;
  write('/precio-luz-manana/', layout({
    title: `Precio de la luz mañana, ${C.fechaCorta(TOMORROW)}, por horas`,
    desc: date ? `Precio de la luz mañana ${C.fechaLarga(date)} (PVPC): media ${p3(C.dayStats(PRICES[date]).avg)} €/kWh. Horas más baratas y más caras.` : `Precio de la luz mañana ${C.fechaLarga(TOMORROW)} por horas (PVPC). Se publica hacia las 20:30.`,
    urlPath: '/precio-luz-manana/', body,
    crumbs: [['/precio-luz-manana/', 'Precio de la luz mañana']],
    pageData: { type: 'day', date: date || TOMORROW, values: date ? PRICES[date] : null, live: true, tomorrow: true },
  }), { priority: '0.9' });
}

function buildDayArchive() {
  for (const date of DATES) {
    const { values, st, cmp } = dayPageCommon(date);
    const prev = PRICES[C.addDays(date, -1)] ? C.addDays(date, -1) : null;
    const next = PRICES[C.addDays(date, 1)] ? C.addDays(date, 1) : null;
    const ym = date.slice(0, 7);
    const futuro = date > TODAY;
    const body = `<section class="hero-band"><p class="eyebrow">${icon('calendar')} Histórico PVPC 2.0TD · ${cap(C.DIAS[C.weekday(date)])}</p>
<h1>Precio de la luz el ${C.fechaLarga(date)}</h1>
<p class="lead">El precio medio ${futuro ? 'será' : 'fue'} de <strong>${p3(st.avg)} €/kWh</strong> sin impuestos, ${cmp}.</p></section>
<div class="card strip-card"><h2 class="h3">${icon('clock')} El día de un vistazo</h2>${C.hourStrip(date, values)}<p class="resumen">${resumenDia(date)}</p></div>
${priceBlock(date, values)}
<section class="card"><h2 class="h3">${icon('euro')} Lo que ${futuro ? 'costará' : 'costó'} usar estos aparatos ese día</h2>
${costeHoyLista(date, [['Una lavadora (ECO, 0,7 kWh)', 0.7, '/cuanto-gasta/lavadora/'], ['1 hora de horno (1,1 kWh)', 1.1, '/cuanto-gasta/horno/'], ['1 hora de radiador de 2.000 W (1,2 kWh)', 1.2, '/cuanto-gasta/radiador-de-aceite/'], ['Cargar el coche para 100 km (18 kWh)', 18, '/cuanto-gasta/coche-electrico/']])}</section>
${tableBlock(date, values)}
<nav class="pager">${prev ? `<a href="/precio-luz/${prev}/">← ${C.fechaCorta(prev)}</a>` : '<span></span>'}<a href="/precio-luz/${ym}/">${cap(C.mesLargo(ym))}</a>${next ? `<a href="/precio-luz/${next}/">${C.fechaCorta(next)} →</a>` : '<span></span>'}</nav>`;
    write(`/precio-luz/${date}/`, layout({
      title: `Precio de la luz el ${C.fechaLarga(date)} por horas`,
      desc: `PVPC del ${C.fechaLarga(date)}: media ${p3(st.avg)} €/kWh, mínimo ${p3(st.min)} (${C.rangoHora(st.minH)}) y máximo ${p3(st.max)} (${C.rangoHora(st.maxH)}).`,
      urlPath: `/precio-luz/${date}/`, body,
      crumbs: [['/precio-luz/', 'Histórico'], [`/precio-luz/${ym}/`, cap(C.mesLargo(ym))], [`/precio-luz/${date}/`, C.fechaCorta(date)]],
    }), { lastmod: date > TODAY ? TODAY : date, priority: '0.5' });
  }
}

function monthStats(ym) {
  const days = DATES.filter((d) => d.startsWith(ym));
  const avgs = days.map((d) => ({ d, avg: dayAvg(d), st: C.dayStats(PRICES[d]) }));
  const avg = avgs.reduce((a, x) => a + x.avg, 0) / avgs.length;
  const sorted = [...avgs].sort((a, b) => a.avg - b.avg);
  const prof = Array.from({ length: 24 }, () => []);
  for (const d of days) { const st = C.dayStats(PRICES[d]); st.p.forEach((v, i) => prof[st.labels[i]].push(v)); }
  const profile = prof.map((arr) => arr.reduce((a, b) => a + b, 0) / arr.length);
  return { days, avgs, avg, cheapest: sorted[0], priciest: sorted.at(-1), profile };
}

function buildMonths() {
  const all = MONTHS.map((ym) => ({ ym, ...monthStats(ym) }));
  for (const m of all) {
    const i = MONTHS.indexOf(m.ym);
    const prevM = all[i - 1];
    const lastYear = all.find((x) => x.ym === `${Number(m.ym.slice(0, 4)) - 1}${m.ym.slice(4)}`);
    const dChart = C.barChart(m.avgs.map((x) => ({
      v: x.avg, label: x.d.slice(8), cls: x.avg < m.avg * 0.9 ? 'b' : x.avg > m.avg * 1.1 ? 'c' : 'm',
      title: `${C.fechaCorta(x.d)}: ${p3(x.avg)} €/kWh`, href: `/precio-luz/${x.d}/`,
    })), { ariaLabel: `Precio medio diario en ${C.mesLargo(m.ym)}`, labelEvery: 3, refLine: m.avg });
    const pChart = C.barChart(m.profile.map((v, h) => ({ v, label: C.pad(h), cls: v < m.avg * 0.85 ? 'b' : v > m.avg * 1.15 ? 'c' : 'm', title: `${C.rangoHora(h)}: ${p3(v)} €/kWh de media` })), { ariaLabel: 'Precio medio por hora del día', refLine: m.avg });
    const bestH = m.profile.indexOf(Math.min(...m.profile));
    const worstH = m.profile.indexOf(Math.max(...m.profile));
    const pct = (a, b) => C.fmt((Math.abs(a - b) / b) * 100, 1);
    const cmpTxt = [
      prevM ? `un ${pct(m.avg, prevM.avg)} % ${m.avg >= prevM.avg ? 'más caro' : 'más barato'} que ${C.mesLargo(prevM.ym)} (${p3(prevM.avg)} €/kWh)` : null,
      lastYear ? `un ${pct(m.avg, lastYear.avg)} % ${m.avg >= lastYear.avg ? 'más caro' : 'más barato'} que el mismo mes del año anterior` : null,
    ].filter(Boolean).join(' y ');
    const enCurso = m.ym === TODAY.slice(0, 7);
    const body = `<section class="hero-band"><p class="eyebrow">${icon('chart')} Histórico PVPC 2.0TD</p><h1>Precio de la luz en ${C.mesLargo(m.ym)}</h1>
<p class="lead">${enCurso ? `En lo que va de mes (${m.days.length} días con datos), el` : 'El'} precio medio del PVPC ${enCurso ? 'es' : 'fue'} de <strong>${p3(m.avg)} €/kWh</strong> sin impuestos (${p3(conImp(m.avg))} €/kWh con impuestos)${cmpTxt ? ', ' + cmpTxt : ''}.</p></section>
<div class="stats">
<div class="stat"><span class="k">Media del mes</span><span class="v">${p3(m.avg)}</span><span class="s">€/kWh</span></div>
<div class="stat stat-b"><span class="k">Día más barato</span><span class="v">${p3(m.cheapest.avg)}</span><span class="s"><a href="/precio-luz/${m.cheapest.d}/">${C.fechaCorta(m.cheapest.d)}</a></span></div>
<div class="stat stat-c"><span class="k">Día más caro</span><span class="v">${p3(m.priciest.avg)}</span><span class="s"><a href="/precio-luz/${m.priciest.d}/">${C.fechaCorta(m.priciest.d)}</a></span></div>
</div>
<div class="card chart-card"><h2 class="h3">${icon('calendar')} Precio medio de cada día</h2>${dChart}<p class="chart-note">Pulsa en una barra para ver el detalle por horas de ese día.</p></div>
<div class="card chart-card"><h2 class="h3">${icon('clock')} ¿A qué hora fue más barata la luz?</h2>${pChart}<p>De media, la hora más barata del mes ${enCurso ? 'está siendo' : 'fue'} la de las <strong>${C.rangoHora(bestH)}</strong> (${p3(m.profile[bestH])} €/kWh) y la más cara la de las <strong>${C.rangoHora(worstH)}</strong> (${p3(m.profile[worstH])} €/kWh).</p></div>
<div class="card"><h2 class="h3">${icon('chart')} Todos los días</h2><div class="table-wrap"><table class="data"><thead><tr><th>Día</th><th class="num">Media</th><th class="num">Mínimo</th><th class="num">Máximo</th></tr></thead><tbody>
${m.avgs.map((x) => `<tr><td><a href="/precio-luz/${x.d}/">${cap(C.DIAS[C.weekday(x.d)]).slice(0, 3)} ${x.d.slice(8)}</a></td><td class="num">${p3(x.avg)}</td><td class="num">${p3(x.st.min)}</td><td class="num">${p3(x.st.max)}</td></tr>`).join('')}
</tbody></table></div></div>
<nav class="pager">${prevM ? `<a href="/precio-luz/${prevM.ym}/">← ${cap(C.mesLargo(prevM.ym))}</a>` : '<span></span>'}<a href="/precio-luz/">Histórico</a>${all[i + 1] ? `<a href="/precio-luz/${all[i + 1].ym}/">${cap(C.mesLargo(all[i + 1].ym))} →</a>` : '<span></span>'}</nav>`;
    write(`/precio-luz/${m.ym}/`, layout({
      title: `Precio de la luz en ${C.mesLargo(m.ym)}: media y días más baratos`,
      desc: `PVPC de ${C.mesLargo(m.ym)}: precio medio ${p3(m.avg)} €/kWh. Día más barato ${C.fechaCorta(m.cheapest.d)}, más caro ${C.fechaCorta(m.priciest.d)} y precio medio por horas.`,
      urlPath: `/precio-luz/${m.ym}/`, body,
      crumbs: [['/precio-luz/', 'Histórico'], [`/precio-luz/${m.ym}/`, cap(C.mesLargo(m.ym))]],
    }), { lastmod: enCurso ? TODAY : m.days.at(-1), priority: '0.6' });
  }
  const chart = C.barChart(all.map((m) => ({ v: m.avg, label: `${C.MESES[Number(m.ym.slice(5)) - 1].slice(0, 3)}${m.ym.endsWith('-01') || m === all[0] ? ` ${m.ym.slice(2, 4)}` : ''}`, cls: 'm', title: `${C.mesLargo(m.ym)}: ${p3(m.avg)} €/kWh`, href: `/precio-luz/${m.ym}/` })), { ariaLabel: 'Precio medio mensual del PVPC', labelEvery: 1 });
  const year12 = PAST.slice(-365);
  const avg12 = year12.reduce((a, d) => a + dayAvg(d), 0) / year12.length;
  const body = `<section class="hero-band"><p class="eyebrow">${icon('chart')} PVPC 2.0TD · datos de Red Eléctrica</p><h1>Histórico del precio de la luz</h1>
<p class="lead">Precio medio del PVPC mes a mes. En los últimos 12 meses la media ha sido de <strong>${p3(avg12)} €/kWh</strong> sin impuestos (${p3(conImp(avg12))} €/kWh con impuestos), y en los últimos 30 días de <strong>${p3(MEDIA30)} €/kWh</strong>.</p></section>
<div class="card chart-card"><h2 class="h3">${icon('chart')} Precio medio mensual (€/kWh)</h2>${chart}</div>
<div class="card"><div class="table-wrap"><table class="data"><thead><tr><th>Mes</th><th class="num">Media €/kWh</th><th>Día más barato</th><th>Día más caro</th></tr></thead><tbody>
${[...all].reverse().map((m) => `<tr><td><a href="/precio-luz/${m.ym}/">${cap(C.mesLargo(m.ym))}</a></td><td class="num">${p3(m.avg)}</td><td><a href="/precio-luz/${m.cheapest.d}/">${C.fechaCorta(m.cheapest.d)}</a> (${p3(m.cheapest.avg)})</td><td><a href="/precio-luz/${m.priciest.d}/">${C.fechaCorta(m.priciest.d)}</a> (${p3(m.priciest.avg)})</td></tr>`).join('')}
</tbody></table></div></div>
<section class="sec prose"><h2>Descarga los datos</h2><p>Puedes descargar todos los precios horarios del PVPC recopilados en esta web en formato CSV: <a href="/datos/pvpc.csv">pvpc.csv</a>. Fuente original: Red Eléctrica de España (REData). Puedes reutilizarlos citando la fuente.</p></section>`;
  write('/precio-luz/', layout({
    title: 'Histórico del precio de la luz (PVPC) mes a mes',
    desc: `Evolución del precio de la luz PVPC: media de los últimos 12 meses ${p3(avg12)} €/kWh. Precio medio de cada mes, días más baratos y más caros, y descarga en CSV.`,
    urlPath: '/precio-luz/', body, crumbs: [['/precio-luz/', 'Histórico del precio de la luz']],
    jsonld: [{
      '@context': 'https://schema.org', '@type': 'Dataset', name: 'Precio horario de la luz PVPC 2.0TD en España',
      description: 'Precio horario del término de energía del PVPC (tarifa 2.0TD) en €/MWh, recopilado diariamente de la API REData de Red Eléctrica de España.',
      url: `${SITE}/precio-luz/`, creator: ORG, isBasedOn: 'https://www.ree.es/es/apidatos', temporalCoverage: `${DATES[0]}/${DATES.at(-1)}`, spatialCoverage: 'España',
      distribution: [{ '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: `${SITE}/datos/pvpc.csv` }],
    }],
  }), { priority: '0.7' });
}

// ---------------------------------------------------------------- mejor hora
function mejorHoraContent(m, date) {
  const st = C.dayStats(PRICES[date]);
  const best = C.bestWindow(st.p, m.horas);
  const worst = C.worstWindow(st.p, m.horas);
  const cBest = m.kwh * conImp(best.avg), cWorst = m.kwh * conImp(worst.avg), cAvg = m.kwh * conImp(st.avg);
  const ahorro = ((cWorst - cBest) / cWorst) * 100;
  const tops = [];
  const used = new Set();
  const cand = [];
  for (let i = 0; i + m.horas <= st.p.length; i++) cand.push({ start: i, end: i + m.horas, avg: st.p.slice(i, i + m.horas).reduce((a, b) => a + b, 0) / m.horas });
  cand.sort((a, b) => a.avg - b.avg);
  for (const c of cand) {
    if (tops.length === 3) break;
    let ok = true;
    for (let j = c.start; j < c.end; j++) if (used.has(j)) ok = false;
    if (!ok) continue;
    for (let j = c.start; j < c.end; j++) used.add(j);
    tops.push(c);
  }
  const items = st.p.map((v, i) => ({ v, label: C.pad(st.labels[i]), cls: i >= best.start && i < best.end ? 'b' : 'm', title: `${C.rangoHora(st.labels[i])}: ${p3(v)} €/kWh` }));
  return {
    best, html: `<div class="answer answer-big"><p class="answer-k">La franja más barata del ${C.fechaLarga(date, true)}</p><p class="big">${C.windowLabel(st.labels, best)}</p><p>${p3(best.avg)} €/kWh de media · ahorras un <strong>${C.fmt(ahorro, 0)} %</strong> frente a la peor franja</p></div>
<div class="stats">
<div class="stat stat-b"><span class="k">En la mejor franja</span><span class="v">${C.eurAuto(cBest)}</span><span class="s">${C.windowLabel(st.labels, best)}</span></div>
<div class="stat"><span class="k">A precio medio</span><span class="v">${C.eurAuto(cAvg)}</span><span class="s">${p3(st.avg)} €/kWh</span></div>
<div class="stat stat-c"><span class="k">En la peor franja</span><span class="v">${C.eurAuto(cWorst)}</span><span class="s">${C.windowLabel(st.labels, worst)}</span></div>
</div>
<div class="card chart-card"><h3>${icon('chart')} Precio por horas y mejor franja (en verde)</h3>${C.barChart(items, { ariaLabel: 'Precio por horas con la mejor franja resaltada', refLine: st.avg })}</div>
<div class="card"><h3>${icon('check')} Las 3 mejores franjas</h3><ol class="tops">${tops.map((t) => `<li><strong>${C.windowLabel(st.labels, t)}</strong><span>${p3(t.avg)} €/kWh · ${C.eurAuto(m.kwh * conImp(t.avg))}</span></li>`).join('')}</ol><p class="muted">Coste de ${C.fmt(m.kwh, m.kwh < 10 ? 1 : 0)} kWh con impuestos.</p></div>`,
  };
}

function buildMejorHora() {
  for (const m of MEJOR_HORA) {
    const a = APARATOS.find((x) => x.slug === m.aparato);
    const hoy = mejorHoraContent(m, LATEST);
    const man = HAS_TOMORROW ? mejorHoraContent(m, TOMORROW) : null;
    const stH = C.dayStats(PRICES[LATEST]);
    const body = `${pageHead({ ico: ICONO_APARATO[m.aparato], eyebrow: `Tarifa PVPC · ${C.fechaLarga(LATEST, true)}`, h1: `Mejor hora para ${m.nombre} hoy`, sub: `${m.nota} La calculamos cada día con los precios oficiales.` })}
<div id="ahora-ventana" class="now-box" hidden data-horas="${m.horas}" data-kwh="${m.kwh}"></div>
<h2 class="day-title">${icon('sun')} Hoy, ${C.fechaCorta(LATEST)}</h2>${hoy.html}
${man ? `<h2 class="day-title">${icon('moon')} Mañana, ${C.fechaCorta(TOMORROW)}</h2>${man.html}` : '<p class="card">La mejor hora de mañana estará disponible a partir de las 20:30, cuando Red Eléctrica publique los precios.</p>'}
${shareBar(`⏰ Hoy la hora más barata para ${m.nombre} es de ${C.windowLabel(stH.labels, hoy.best)}. Míralo aquí:`, `/mejor-hora/${m.slug}/`)}
<section class="sec prose"><h2>Consejos para ahorrar más</h2><ul class="checks">
<li>${icon('check')}<span>Usa el <strong>inicio diferido</strong> del electrodoméstico para que arranque a la hora indicada aunque no estés en casa.</span></li>
<li>${icon('check')}<span>Los fines de semana y festivos todas las horas son tramo valle, pero con PVPC sigue habiendo diferencias entre horas.</span></li>
<li>${icon('check')}<span>Si tienes una tarifa de precio fijo, la hora da igual; si tienes tres periodos, usa el valle (00:00-08:00 y fines de semana).</span></li>
</ul><p>Más sobre su consumo: <a href="/cuanto-gasta/${a.slug}/">¿cuánto gasta ${articulo(a)}?</a></p></section>
${compraBox(a)}`;
    write(`/mejor-hora/${m.slug}/`, layout({
      title: `Mejor hora para ${m.nombre} hoy, ${C.fechaCorta(LATEST)}`,
      desc: `La hora más barata para ${m.nombre} hoy ${C.fechaLarga(LATEST)} es de ${C.windowLabel(stH.labels, hoy.best)} con tarifa PVPC. Coste y ahorro calculados.`,
      urlPath: `/mejor-hora/${m.slug}/`, body,
      crumbs: [['/mejor-hora/', 'Mejor hora'], [`/mejor-hora/${m.slug}/`, cap(m.nombre)]],
      pageData: { type: 'mejorhora', date: LATEST, values: PRICES[LATEST], horas: m.horas, kwh: m.kwh, imp: IMP },
    }), { priority: '0.8' });
  }
  const body = `${pageHead({ ico: 'clock', eyebrow: cap(C.fechaLarga(LATEST, true)), h1: 'Mejor hora para cada electrodoméstico hoy', sub: 'La franja más barata del día con tarifa PVPC y lo que te ahorras frente a la peor hora.' })}
${bestTimeCards(LATEST)}
<p class="more"><a href="/mejor-hora/plancha/">Mejor hora para planchar ${icon('arrow')}</a></p>
${shareBar('⏰ Las horas más baratas de hoy para poner la lavadora, el lavavajillas o cargar el coche:', '/mejor-hora/')}`;
  write('/mejor-hora/', layout({
    title: 'Mejor hora para poner la lavadora, el lavavajillas y más hoy',
    desc: `Las franjas más baratas de hoy ${C.fechaLarga(LATEST)} para lavadora, lavavajillas, secadora, horno, termo y coche eléctrico con tarifa PVPC.`,
    urlPath: '/mejor-hora/', body, crumbs: [['/mejor-hora/', 'Mejor hora']],
  }), { priority: '0.8' });
}

// ---------------------------------------------------------------- aparatos
function paramsAparato(a) {
  return {
    modo: a.modo, potencia: a.potencia, ciclo: a.ciclo ?? 1, horas: a.horas, dias: a.dias, diasAnio: a.diasAnio,
    kwhCiclo: a.kwhCiclo, usosSemana: a.usosSemana, kwhAnio: a.kwhAnio,
  };
}

function applianceCard(a) {
  const c = C.calcCoste(paramsAparato(a), MEDIA30_CON);
  const sub = a.modo === 'potencia' ? `${C.eurAuto(c.unidad)} por hora` : a.modo === 'ciclo' ? `${C.eurAuto(c.unidad)} por ${a.unidad}` : `${C.eurAuto(c.mes)} al mes`;
  return `<a class="app-card" href="/cuanto-gasta/${a.slug}/"><span class="app-ico">${icon(ICONO_APARATO[a.slug])}</span><span class="app-txt"><strong>${esc(cap(a.corto || a.nombre))}</strong><span>${sub}</span></span></a>`;
}

function guideCard(g) {
  return `<a class="guide-card" href="/guias/${g.slug}/"><span class="guide-ico">${icon('book')}</span><strong>${esc(g.titulo)}</strong><span>${esc(g.resumen)}</span></a>`;
}

function resumenAparato(a, c) {
  if (a.modo === 'potencia') {
    const real = a.ciclo < 1 ? ` (el termostato ${a.art === 'una' ? 'la' : 'lo'} desconecta a ratos)` : '';
    return `${cap(articulo(a))} de ${C.watts(a.potencia)} consume unos <strong>${C.kwh(c.kwhUnidad)} por cada hora</strong> encendido${a.art === 'una' ? 'a' : ''}${real}. ${usando(a)} ${duracion(a.horas)} al día${a.dias < 30 ? `, ${a.dias} días al mes,` : ''} la factura sube unos <strong>${C.eurAuto(c.mes)} al mes</strong>.`;
  }
  if (a.modo === 'ciclo') {
    const preset = a.presets.find((x) => x[1] === a.kwhCiclo);
    return `${cap(articulo(a))} consume unos <strong>${C.kwh(a.kwhCiclo)} por ${a.unidad}</strong>${preset ? ` (${preset[0]})` : ''}. ${a.unidad === 'día' ? 'Al mes son' : `Con ${C.fmt(a.usosSemana, a.usosSemana % 1 ? 1 : 0)} ${a.unidadPlural} por semana, son`} unos <strong>${C.eurAuto(c.mes)} al mes</strong>.`;
  }
  const preset = a.presets.find((x) => x[1] === a.kwhAnio);
  return `${cap(articulo(a))} típico${preset ? ` (${preset[0]})` : ''} consume unos <strong>${C.fmtInt(a.kwhAnio)} kWh al año</strong>, ${C.kwh(c.kwhDia)} al día: unos <strong>${C.eurAuto(c.mes)} al mes</strong>.`;
}

function tilesAparato(a, c) {
  const t1 = a.modo === 'potencia' ? ['Por hora', C.kwh(c.kwhUnidad)] : a.modo === 'ciclo' ? [`Por ${a.unidad}`, C.kwh(c.kwhUnidad)] : ['Al día', C.kwh(c.kwhDia)];
  const uso = a.modo === 'potencia' ? `${duracion(a.horas)}/día${a.dias < 30 ? `, ${a.dias} días` : ''}` : a.modo === 'ciclo' ? (a.unidad === 'día' ? 'uso diario' : `${C.fmt(a.usosSemana, a.usosSemana % 1 ? 1 : 0)} ${a.unidadPlural}/semana`) : 'etiqueta energética';
  const anioTxt = a.modo === 'potencia' && a.diasAnio < 365 ? `temporada de ${a.diasAnio} días` : C.kwh(c.kwhAnio);
  return `<div class="tiles">
<div class="tile"><span>${t1[0]}</span><strong>${C.eurAuto(a.modo === 'anual' ? c.dia : c.unidad)}</strong><small>${t1[1]}</small></div>
<div class="tile tile-main"><span>Al mes</span><strong>${C.eurAuto(c.mes)}</strong><small>${uso}</small></div>
<div class="tile"><span>Al año</span><strong>${C.eurAuto(c.anio)}</strong><small>${anioTxt}</small></div>
</div>`;
}

function tablasAparato(a) {
  const P = MEDIA30_CON;
  const base = paramsAparato(a);
  if (a.modo === 'potencia') {
    const t1 = `<h2>¿Cuánto gasta según su potencia?</h2><div class="table-wrap"><table class="data"><thead><tr><th>${a.etiquetaPotencia || 'Potencia'}</th><th class="num">kWh por hora</th><th class="num">€ por hora</th><th class="num">€ al mes*</th></tr></thead><tbody>
${a.potencias.map((w) => { const c = C.calcCoste({ ...base, potencia: w }, P); return `<tr${w === a.potencia ? ' class="hl"' : ''}><td>${C.watts(w)}</td><td class="num">${C.fmt(c.kwhUnidad, 2)}</td><td class="num">${C.eurAuto(c.unidad)}</td><td class="num">${C.eurAuto(c.mes)}</td></tr>`; }).join('')}
</tbody></table></div><p class="muted">*${duracion(a.horas)} al día, ${a.dias} días al mes${a.ciclo < 1 ? `, funcionando a plena potencia el ${Math.round(a.ciclo * 100)} % del tiempo` : ''}.</p>`;
    const horas = [...new Set([0.5, 1, 2, 4, 6, 8, a.horas].filter((h) => h <= 24))].sort((x, y) => x - y);
    const t2 = `<h2>Gasto al mes según las horas de uso</h2><div class="table-wrap"><table class="data"><thead><tr><th>Uso diario</th><th class="num">kWh al mes</th><th class="num">€ al mes</th><th class="num">€ al año${a.diasAnio < 365 ? ` (${a.diasAnio} días)` : ''}</th></tr></thead><tbody>
${horas.map((h) => { const c = C.calcCoste({ ...base, horas: h }, P); return `<tr${h === a.horas ? ' class="hl"' : ''}><td>${h < 1 ? `${Math.round(h * 60)} min` : `${C.fmt(h, h % 1 ? 1 : 0)} h`}</td><td class="num">${C.fmt(c.kwhMes, 1)}</td><td class="num">${C.eurAuto(c.mes)}</td><td class="num">${C.eurAuto(c.anio)}</td></tr>`; }).join('')}
</tbody></table></div>`;
    return t1 + t2;
  }
  if (a.modo === 'ciclo') {
    return `<h2>¿Cuánto gasta según el uso?</h2><div class="table-wrap"><table class="data"><thead><tr><th>Tipo de uso</th><th class="num">kWh por ${esc(a.unidad)}</th><th class="num">€ por ${esc(a.unidad)}</th><th class="num">€ al mes*</th></tr></thead><tbody>
${a.presets.map(([label, k]) => { const c = C.calcCoste({ ...base, kwhCiclo: k }, P); return `<tr${k === a.kwhCiclo ? ' class="hl"' : ''}><td>${esc(label)}</td><td class="num">${C.fmt(k, k < 0.1 ? 3 : 2)}</td><td class="num">${C.eurAuto(c.unidad)}</td><td class="num">${C.eurAuto(c.mes)}</td></tr>`; }).join('')}
</tbody></table></div><p class="muted">*${a.unidad === 'día' ? 'Uso diario' : `${C.fmt(a.usosSemana, a.usosSemana % 1 ? 1 : 0)} ${esc(a.unidadPlural)} por semana`}.</p>`;
  }
  return `<h2>¿Cuánto gasta según su clase energética?</h2><div class="table-wrap"><table class="data"><thead><tr><th>Tipo</th><th class="num">kWh al año</th><th class="num">€ al mes</th><th class="num">€ al año</th></tr></thead><tbody>
${a.presets.map(([label, k]) => { const c = C.calcCoste({ ...base, kwhAnio: k }, P); return `<tr${k === a.kwhAnio ? ' class="hl"' : ''}><td>${esc(label)}</td><td class="num">${C.fmtInt(k)}</td><td class="num">${C.eurAuto(c.mes)}</td><td class="num">${C.eurAuto(c.anio)}</td></tr>`; }).join('')}
</tbody></table></div>`;
}

function calculadoraHtml(a, hoy) {
  const cfg = { ...paramsAparato(a), unidad: a.unidad, presets: a.presets, potencias: a.potencias, precios: { media30: MEDIA30_CON, ...hoy } };
  const c = C.calcCoste(paramsAparato(a), MEDIA30_CON);
  const unidadLabel = a.modo === 'potencia' ? 'Por hora' : a.modo === 'ciclo' ? `Por ${a.unidad}` : 'Al día';
  let inputs = '';
  if (a.modo === 'potencia') {
    inputs = `<label>${a.etiquetaPotencia || 'Potencia'} (W)<input type="number" name="potencia" min="1" step="1" value="${a.potencia}" inputmode="numeric"></label>
<div class="chips" data-for="potencia">${a.potencias.map((w) => `<button type="button" data-v="${w}"${w === a.potencia ? ' aria-pressed="true"' : ''}>${C.watts(w)}</button>`).join('')}</div>
<label>Horas al día<input type="number" name="horas" min="0" max="24" step="0.25" value="${a.horas}" inputmode="decimal"></label>
<label>Días al mes<input type="number" name="dias" min="1" max="31" step="1" value="${a.dias}" inputmode="numeric"></label>
<label>Funcionamiento real (%)<input type="number" name="ciclo" min="1" max="100" step="5" value="${Math.round((a.ciclo ?? 1) * 100)}" inputmode="numeric"><small>100 % si no tiene termostato.</small></label>`;
  } else if (a.modo === 'ciclo') {
    inputs = `<label>kWh por ${esc(a.unidad)}<input type="number" name="kwhCiclo" min="0" step="0.01" value="${a.kwhCiclo}" inputmode="decimal"></label>
<div class="chips" data-for="kwhCiclo">${a.presets.map(([l, k]) => `<button type="button" data-v="${k}"${k === a.kwhCiclo ? ' aria-pressed="true"' : ''}>${esc(l)}</button>`).join('')}</div>
<label>${cap(esc(a.unidadPlural))} por semana<input type="number" name="usosSemana" min="0" step="0.5" value="${a.usosSemana}" inputmode="decimal"></label>`;
  } else {
    inputs = `<label>Consumo anual (kWh/año, en la etiqueta)<input type="number" name="kwhAnio" min="1" step="1" value="${a.kwhAnio}" inputmode="numeric"></label>
<div class="chips" data-for="kwhAnio">${a.presets.map(([l, k]) => `<button type="button" data-v="${k}"${k === a.kwhAnio ? ' aria-pressed="true"' : ''}>${esc(l)}</button>`).join('')}</div>`;
  }
  return `<form class="calc card" id="calculadora" data-calc='${esc(JSON.stringify(cfg))}' onsubmit="return false">
<div class="calc-head"><span class="calc-ico">${icon('calc')}</span><div><h2 class="h3">Calcula lo que te cuesta a ti</h2><p>Cambia los valores: el resultado se actualiza al momento.</p></div></div>
<div class="calc-grid">${inputs}
<label>Precio de la luz (€/kWh con impuestos)<input type="number" name="precio" min="0" step="0.001" value="${MEDIA30_CON.toFixed(3)}" inputmode="decimal"></label>
<div class="chips" data-for="precio">
<button type="button" data-v="${MEDIA30_CON.toFixed(3)}" aria-pressed="true">Media 30 días</button>
${hoy ? `<button type="button" data-v="${hoy.media.toFixed(3)}">Media de hoy</button><button type="button" data-v="${hoy.min.toFixed(3)}">Hora más barata hoy</button><button type="button" data-v="${hoy.max.toFixed(3)}">Hora más cara hoy</button>` : ''}
</div>
</div>
<output class="calc-out">
<div><span>${unidadLabel}</span><strong data-out="unidad">${C.eurAuto(c.unidad)}</strong><small data-out="kwhUnidad">${C.kwh(c.kwhUnidad)}</small></div>
<div><span>Al mes</span><strong data-out="mes">${C.eurAuto(c.mes)}</strong><small data-out="kwhMes">${C.kwh(c.kwhMes)}</small></div>
<div><span>Al año</span><strong data-out="anio">${C.eurAuto(c.anio)}</strong><small data-out="kwhAnio">${C.kwh(c.kwhAnio)}</small></div>
</output>
</form>`;
}

const catInfo = (cat) => CATEGORIAS_INFO[cat];
const catTieneHub = (cat) => APARATOS.filter((a) => a.cat === cat).length >= 2;

function buildAparatos() {
  const hoy = preciosHoyData(LATEST);
  const stHoy = C.dayStats(PRICES[LATEST]);
  for (const a of APARATOS) {
    const c = C.calcCoste(paramsAparato(a), MEDIA30_CON);
    const nombreCorto = a.corto || a.nombre;
    const h1 = a.titulo || `¿Cuánto gasta ${articulo(a)}?`;
    const faqItems = [];
    if (a.modo === 'potencia') {
      faqItems.push([`¿Cuánto gasta ${articulo(a)} por hora?`, `Con una potencia de ${C.watts(a.potencia)}${a.ciclo < 1 ? ` y el termostato actuando (${Math.round(a.ciclo * 100)} % del tiempo a plena potencia)` : ''}, unos ${C.kwh(c.kwhUnidad)} por hora: ${C.eurAuto(c.unidad)} con el precio medio de la luz de los últimos 30 días.`]);
      faqItems.push([`¿Cuánto gasta ${articulo(a)} al mes?`, `${usando(a)} ${duracion(a.horas)} al día durante ${a.dias} días, unos ${C.kwh(c.kwhMes)} al mes, es decir, ${C.eurAuto(c.mes)} con impuestos.`]);
    } else if (a.modo === 'ciclo') {
      faqItems.push([a.unidad === 'día' ? `¿Cuánto gasta ${articulo(a)} al día?` : `¿Cuánto cuesta cada ${a.unidad}?`, `Unos ${C.eurAuto(c.unidad)} (${C.kwh(a.kwhCiclo)}) con el precio medio de la luz de los últimos 30 días.${a.unidad === 'día' ? '' : ` En la hora más barata de hoy costaría ${C.eurAuto(a.kwhCiclo * hoy.min)} y en la más cara ${C.eurAuto(a.kwhCiclo * hoy.max)}.`}`]);
    } else {
      faqItems.push([`¿Cuánto gasta ${articulo(a)} al mes?`, `Uno de ${C.fmtInt(a.kwhAnio)} kWh/año consume unos ${C.kwh(c.kwhMes)} al mes: ${C.eurAuto(c.mes)} con el precio medio actual de la luz.`]);
    }
    faqItems.push(...a.faq);
    const faq = faqBlock(faqItems);
    const unaHora = a.modo === 'potencia' ? c.kwhUnidad : a.modo === 'ciclo' && a.unidad !== 'día' ? a.kwhCiclo : null;
    const hoyBlock = unaHora != null ? `<section class="card today"><h2 class="h3">${icon('clock')} Hoy, ${C.fechaCorta(LATEST)}: la hora importa</h2>${C.hourStrip(LATEST, PRICES[LATEST])}
<p>${a.modo === 'potencia' ? `Una hora de ${esc(nombreCorto)} a ${C.watts(a.potencia)}` : `Cada ${esc(a.unidad)}`} cuesta hoy <strong class="good">${C.eurAuto(unaHora * hoy.min)}</strong> en la hora más barata (${C.rangoHora(stHoy.minH)}) y <strong class="bad">${C.eurAuto(unaHora * hoy.max)}</strong> en la más cara (${C.rangoHora(stHoy.maxH)}), con tarifa PVPC e impuestos.</p>
<a class="link-arrow" href="${a.mejorHora ? `/mejor-hora/${a.mejorHora}/` : '/'}">${a.mejorHora ? 'Ver la mejor hora de hoy' : 'Ver el precio de la luz de hoy'} ${icon('arrow')}</a></section>` : '';
    const rel = a.rel.map((s) => APARATOS.find((x) => x.slug === s)).filter(Boolean);
    const cat = catInfo(a.cat);
    const shareText = `🔌 ${h1.replace(/\?$/, '')}: unos ${C.eurAuto(c.mes)} al mes con el precio actual de la luz. Calcúlalo tú:`;
    const body = `<article class="appliance">
${pageHead({ ico: ICONO_APARATO[a.slug], eyebrow: CATEGORIAS[a.cat], h1, sub: 'Consumo real, coste en euros y cómo pagar menos.' })}
${tilesAparato(a, c)}
<p class="summary">${resumenAparato(a, c)}</p>
<p class="price-note">${icon('info')}<span>Calculado con <strong>${p3(MEDIA30_CON)} €/kWh</strong>, el precio medio de la luz de los últimos 30 días con impuestos. <a href="#calculadora">Ajústalo a tu caso</a>.</span></p>
${mejoraBox(a.slug)}
${calculadoraHtml(a, hoy)}
${hoyBlock}
<section class="sec">${tablasAparato(a)}</section>
<section class="sec prose"><h2>Cómo funciona y cuánto consume</h2>${a.intro}
<h2>¿De qué depende su consumo?</h2><ul>${a.depende.map((x) => `<li>${x}</li>`).join('')}</ul>
<h2>Consejos para que gaste menos</h2><ul class="checks">${a.consejos.map((x) => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul></section>
${compraBox(a)}
${faq.html}
${shareBar(shareText, `/cuanto-gasta/${a.slug}/`)}
<section class="sec"><div class="sec-head"><h2>Compara con otros aparatos</h2></div><div class="grid-cards">${rel.map(applianceCard).join('')}</div>${catTieneHub(a.cat) ? `<p class="more"><a class="link-arrow" href="/cuanto-gasta/${cat.slug}/">${esc(cat.titulo.replace(/^¿|\?$/g, ''))} ${icon('arrow')}</a></p>` : ''}</section>
${productosAhorro()}
<p class="method">${icon('info')} <span>Por la <a href="/sobre/">redacción de ${esc(CFG.siteName)}</a>. Cálculos con el precio medio PVPC de los últimos 30 días (${p3(MEDIA30)} €/kWh sin impuestos; ${p3(MEDIA30_CON)} €/kWh con impuesto eléctrico e IVA), actualizado el ${C.fechaLarga(TODAY)}. Potencias y consumos típicos del mercado: para tu caso concreto, consulta la placa de características o mide con un enchufe medidor. <a href="/guias/como-calcular-consumo-electrico/">Cómo lo calculamos</a>.</span></p>
</article>`;
    const title = a.titulo ? `${a.titulo} (${YEAR})` : `¿Cuánto gasta ${articulo(a)}? Coste por ${a.modo === 'ciclo' ? a.unidad : a.modo === 'anual' ? 'mes' : 'hora'} (${YEAR})`;
    const desc = `${cap(articulo(a))}${a.modo === 'potencia' ? ` de ${C.watts(a.potencia)} gasta ${C.kwh(c.kwhUnidad)} por hora (${C.eurAuto(c.unidad)})` : a.modo === 'ciclo' ? ` gasta ${C.kwh(a.kwhCiclo)} por ${a.unidad} (${C.eurAuto(c.unidad)})` : ` gasta ${C.fmtInt(a.kwhAnio)} kWh al año (${C.eurAuto(c.mes)}/mes)`}. Calculadora con el precio de la luz de hoy, tablas y trucos para pagar menos.`;
    const crumbs = [['/cuanto-gasta/', '¿Cuánto gasta?']];
    if (catTieneHub(a.cat)) crumbs.push([`/cuanto-gasta/${cat.slug}/`, CATEGORIAS[a.cat]]);
    crumbs.push([`/cuanto-gasta/${a.slug}/`, cap(nombreCorto)]);
    write(`/cuanto-gasta/${a.slug}/`, layout({
      title, desc, urlPath: `/cuanto-gasta/${a.slug}/`, body, ogType: 'article', crumbs,
      jsonld: [faq.ld, {
        '@context': 'https://schema.org', '@type': 'Article', headline: h1, description: desc, inLanguage: 'es-ES',
        datePublished: PUBLICADO, dateModified: TODAY, image: `${SITE}/assets/og.png`, mainEntityOfPage: `${SITE}/cuanto-gasta/${a.slug}/`,
        author: { '@type': 'Organization', name: `Redacción de ${CFG.siteName}`, url: `${SITE}/sobre/` }, publisher: ORG,
      }],
    }), { priority: '0.8' });
  }

  // Hubs de categoría
  for (const [cat, info] of Object.entries(CATEGORIAS_INFO)) {
    if (!catTieneHub(cat)) continue;
    const list = APARATOS.filter((a) => a.cat === cat).map((a) => ({ a, c: C.calcCoste(paramsAparato(a), MEDIA30_CON) })).sort((x, y) => y.c.mes - x.c.mes);
    const guia = { calefaccion: 'calefaccion-electrica-que-gasta-menos', climatizacion: 'aire-acondicionado-o-ventilador', cocina: 'freidora-de-aire-o-horno', electronica: 'consumo-standby-aparatos-apagados' }[cat];
    const body = `${pageHead({ ico: info.icono, eyebrow: 'Comparativa', h1: info.titulo, sub: info.intro })}
<div class="card"><h2 class="h3">${icon('euro')} Comparativa de consumo (uso típico)</h2><div class="table-wrap"><table class="data cmp"><thead><tr><th>Aparato</th><th>Uso típico</th><th class="num">Coste por uso u hora</th><th class="num">Al mes</th></tr></thead><tbody>
${list.map(({ a, c }) => `<tr><td><a href="/cuanto-gasta/${a.slug}/">${esc(cap(a.corto || a.nombre))}</a></td><td>${a.modo === 'potencia' ? `${C.watts(a.potencia)}, ${duracion(a.horas)}/día` : a.modo === 'ciclo' ? `${C.kwh(a.kwhCiclo)} por ${a.unidad}` : `${C.fmtInt(a.kwhAnio)} kWh/año`}</td><td class="num">${a.modo === 'anual' ? '—' : `${C.eurAuto(c.unidad)}${a.modo === 'potencia' ? '/h' : ''}`}</td><td class="num"><strong>${C.eurAuto(c.mes)}</strong></td></tr>`).join('')}
</tbody></table></div><p class="muted">Precio: ${p3(MEDIA30_CON)} €/kWh con impuestos (media PVPC de los últimos 30 días). Ordenado de mayor a menor gasto mensual.</p></div>
<section class="sec"><div class="grid-cards">${list.map(({ a }) => applianceCard(a)).join('')}</div></section>
${guia ? `<p class="more"><a class="btn btn-ghost" href="/guias/${guia}/">${icon('book')}<span>Lee la guía: ${esc(GUIAS.find((g) => g.slug === guia).titulo)}</span></a></p>` : ''}
${shareBar(`🔌 ${info.titulo.replace(/^¿|\?$/g, '')}: comparativa en euros con el precio actual de la luz.`, `/cuanto-gasta/${info.slug}/`)}
${productosAhorro()}`;
    write(`/cuanto-gasta/${info.slug}/`, layout({
      title: info.titulo.replace(/\?$/, `? Comparativa ${YEAR}`), desc: info.desc, urlPath: `/cuanto-gasta/${info.slug}/`, body,
      crumbs: [['/cuanto-gasta/', '¿Cuánto gasta?'], [`/cuanto-gasta/${info.slug}/`, CATEGORIAS[cat]]],
    }), { priority: '0.8' });
  }

  // Índice
  const cats = Object.entries(CATEGORIAS).map(([k, label]) => {
    const list = APARATOS.filter((a) => a.cat === k);
    if (!list.length) return '';
    const info = catInfo(k);
    return `<section class="sec"><div class="sec-head row"><h2>${icon(info.icono)} ${label}</h2>${catTieneHub(k) ? `<a class="link-arrow" href="/cuanto-gasta/${info.slug}/">Comparativa ${icon('arrow')}</a>` : ''}</div><div class="grid-cards">${list.map(applianceCard).join('')}</div></section>`;
  }).join('');
  write('/cuanto-gasta/', layout({
    title: `¿Cuánto gasta? Consumo de ${APARATOS.length} electrodomésticos en euros`,
    desc: `Cuánto gasta cada electrodoméstico por hora, por uso y al mes con el precio actual de la luz: calefacción, aire acondicionado, cocina, lavadora, termo, coche eléctrico y más.`,
    urlPath: '/cuanto-gasta/',
    body: `${pageHead({ ico: 'euro', eyebrow: `${APARATOS.length} aparatos`, h1: '¿Cuánto gasta cada aparato?', sub: `Consumo y coste en euros con el precio medio de la luz de los últimos 30 días (${p3(MEDIA30_CON)} €/kWh con impuestos). Cada página tiene una calculadora para tu caso.` })}${cats}`,
    crumbs: [['/cuanto-gasta/', '¿Cuánto gasta?']],
  }), { priority: '0.9' });
}

// ---------------------------------------------------------------- calculadora general
function buildCalculadora() {
  const lista = APARATOS.map((a) => ({ s: a.slug, n: cap(a.corto || a.nombre), ...paramsAparato(a), unidad: a.unidad }));
  const body = `${pageHead({ ico: 'calc', eyebrow: 'Gratis y sin registro', h1: 'Calculadora de consumo eléctrico', sub: 'Pasa de vatios a euros en segundos, o suma los aparatos de tu casa para estimar tu factura del mes.' })}
<form class="calc card" id="calc-simple" onsubmit="return false"><div class="calc-head"><span class="calc-ico">${icon('bolt')}</span><div><h2 class="h3">Un aparato: de vatios a euros</h2><p>Mira la potencia en la pegatina del aparato.</p></div></div>
<div class="calc-grid">
<label>Potencia (W)<input type="number" name="potencia" value="2000" min="1" inputmode="numeric"></label>
<label>Horas de uso al día<input type="number" name="horas" value="3" min="0" max="24" step="0.25" inputmode="decimal"></label>
<label>Días al mes<input type="number" name="dias" value="30" min="1" max="31" inputmode="numeric"></label>
<label>Precio (€/kWh con impuestos)<input type="number" name="precio" value="${MEDIA30_CON.toFixed(3)}" step="0.001" min="0" inputmode="decimal"></label>
</div>
<output class="calc-out">
<div><span>Por hora</span><strong data-out="hora">—</strong><small data-out="kwhHora"></small></div>
<div><span>Al mes</span><strong data-out="mes">—</strong><small data-out="kwhMes"></small></div>
<div><span>Al año</span><strong data-out="anio">—</strong><small data-out="kwhAnio"></small></div>
</output></form>
<section class="card" id="calc-casa"><div class="calc-head"><span class="calc-ico">${icon('home')}</span><div><h2 class="h3">Toda la casa: estima tu factura</h2><p>Añade tus aparatos y ajusta el uso. Solo incluye el consumo (no la potencia contratada ni el alquiler del contador).</p></div></div>
<div class="casa-add"><select id="casa-select" aria-label="Aparato">${lista.map((a) => `<option value="${a.s}">${esc(a.n)}</option>`).join('')}</select><button type="button" class="btn" id="casa-add">Añadir</button></div>
<div class="table-wrap"><table class="data casa"><thead><tr><th>Aparato</th><th>Uso</th><th class="num">kWh/mes</th><th class="num">€/mes</th><th></th></tr></thead><tbody id="casa-body"></tbody>
<tfoot><tr><th colspan="2">Total al mes</th><th class="num" id="casa-kwh">0</th><th class="num" id="casa-eur">0 €</th><th></th></tr></tfoot></table></div>
<p class="casa-foot"><label class="inline">Precio (€/kWh con impuestos) <input type="number" id="casa-precio" value="${MEDIA30_CON.toFixed(3)}" step="0.001" min="0"></label> <button type="button" class="btn btn-ghost" id="casa-share">${icon('link')}<span>Copiar enlace con mis datos</span></button></p>
<noscript><p>Esta calculadora necesita JavaScript.</p></noscript></section>
${shareBar('🧮 Calculadora gratis para saber cuánto gasta cada aparato de casa en euros:', '/calculadora-consumo-electrico/')}
<section class="sec prose"><h2>Cómo se calcula el consumo</h2>
<p>La fórmula es <strong>kWh = W × horas ÷ 1.000</strong>, y el coste <strong>€ = kWh × precio del kWh</strong>. Un aparato de 2.000 W usado 3 horas consume 6 kWh. Para aparatos con termostato (radiadores, hornos), el consumo real es menor que la potencia porque no funcionan a tope todo el tiempo; en cada página de <a href="/cuanto-gasta/">¿cuánto gasta?</a> tienes valores típicos.</p>
<p>El precio por defecto es la media del PVPC de los últimos 30 días con impuesto eléctrico e IVA. Si tienes tarifa fija, usa el precio del kWh de tu factura multiplicado por 1,27 aproximadamente.</p></section>
${productosAhorro()}`;
  write('/calculadora-consumo-electrico/', layout({
    title: 'Calculadora de consumo eléctrico: de vatios a kWh y euros',
    desc: 'Calcula el consumo en kWh y el coste en euros de cualquier aparato o de toda tu casa con el precio actual de la luz. Gratis y sin registro.',
    urlPath: '/calculadora-consumo-electrico/', body,
    crumbs: [['/calculadora-consumo-electrico/', 'Calculadora de consumo']],
    jsonld: [{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Calculadora de consumo eléctrico', url: `${SITE}/calculadora-consumo-electrico/`, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', inLanguage: 'es-ES', offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }, publisher: ORG }],
    pageData: { type: 'calculadora', aparatos: lista, precio: MEDIA30_CON },
  }), { priority: '0.8' });
}

// ---------------------------------------------------------------- guías
function buildGuias() {
  const P = MEDIA30_CON;
  const fila = (n, kwh, href) => `<tr><td>${href ? `<a href="${href}">${n}</a>` : n}</td><td class="num">${C.fmt(kwh, 2)}</td><td class="num">${C.eurAuto(kwh * P)}</td></tr>`;
  const vars = {
    anio: YEAR,
    media30sin: p3(MEDIA30), media30con: p3(P),
    ejemploCalefactor: C.fmt(6 * P, 2),
    standbyMin: C.fmt(100 * P, 0), standbyMax: C.fmt(400 * P, 0),
    tablaCalefaccion: `<div class="table-wrap"><table class="data"><thead><tr><th>Sistema</th><th class="num">kWh eléctricos</th><th class="num">Coste por hora</th></tr></thead><tbody>
${fila('Radiador de aceite', 1.5, '/cuanto-gasta/radiador-de-aceite/')}${fila('Emisor térmico', 1.5, '/cuanto-gasta/emisor-termico/')}${fila('Calefactor cerámico', 1.5, '/cuanto-gasta/calefactor/')}${fila('Estufa halógena / infrarrojos', 1.5, '/cuanto-gasta/estufa-electrica/')}${fila('Bomba de calor (SCOP 3)', 0.5, '/cuanto-gasta/bomba-de-calor/')}${fila('Bomba de calor (SCOP 4)', 0.375, '/cuanto-gasta/bomba-de-calor/')}
</tbody></table></div>`,
    tablaFreidoraHorno: `<div class="table-wrap"><table class="data"><thead><tr><th>Receta</th><th class="num">Freidora de aire</th><th class="num">Horno</th></tr></thead><tbody>
${[['Patatas fritas (2 raciones)', 20, 35], ['Muslos de pollo', 25, 45], ['Verduras asadas', 15, 30], ['Recalentar pizza', 5, 15]].map(([n, tf, th]) => { const kf = 1.5 * 0.7 * (tf / 60) + 0.05; const kh = 2.5 * 0.45 * (th / 60) + 0.35; return `<tr><td>${n}</td><td class="num">${C.fmt(kf, 2)} kWh · ${C.eurAuto(kf * P)}</td><td class="num">${C.fmt(kh, 2)} kWh · ${C.eurAuto(kh * P)}</td></tr>`; }).join('')}
</tbody></table></div>`,
    tablaVerano: `<div class="table-wrap"><table class="data"><thead><tr><th>Aparato</th><th class="num">kWh/mes</th><th class="num">€/mes</th></tr></thead><tbody>
${fila('Ventilador (50 W)', 0.05 * 240, '/cuanto-gasta/ventilador/')}${fila('Climatizador evaporativo (80 W)', 0.08 * 240, '/cuanto-gasta/climatizador-evaporativo/')}${fila('Aire acondicionado split inverter (800 W medios)', 0.8 * 240, '/cuanto-gasta/aire-acondicionado/')}${fila('Aire acondicionado portátil (1.000 W, 80 %)', 0.8 * 240, '/cuanto-gasta/aire-acondicionado-portatil/')}
</tbody></table></div>`,
  };
  const fill = (s) => s.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in vars ? vars[k] : `{{${k}}}`));
  for (const g of GUIAS) {
    const otras = GUIAS.filter((x) => x.slug !== g.slug).slice(0, 4);
    const html = fill(g.html);
    const minutos = Math.max(2, Math.round(html.replace(/<[^>]+>/g, ' ').split(/\s+/).length / 200));
    const body = `<article>
${pageHead({ ico: 'book', eyebrow: `Guía · ${minutos} min de lectura`, h1: g.titulo, sub: esc(g.descripcion) })}
<div class="prose guide">${html}</div>
${g.slug === 'calefaccion-electrica-que-gasta-menos' ? `<section class="buy card"><div class="buy-head"><span class="buy-ico">${icon('cart')}</span><div><p class="eyebrow">Opciones eficientes</p><h2>Lo que más ahorra este invierno</h2></div></div><div class="buy-grid"><div class="opt"><h3>Split con bomba de calor</h3><p>La calefacción eléctrica más barata de usar: 3-4 veces menos que un radiador.</p>${btnBuy('aire acondicionado split inverter bomba de calor')}</div><div class="opt"><h3>Manta eléctrica</h3><p>Calor en el sofá por céntimos al día.</p>${btnBuy('manta electrica sofa')}</div><div class="opt"><h3>Burletes</h3><p>Menos corrientes, menos horas de calefacción.</p>${btnBuy('burlete puerta ventana')}</div></div>${disclosure()}</section>` : ''}
${shareBar(`📘 ${g.titulo}`, `/guias/${g.slug}/`)}
<p class="method">${icon('info')} <span>Por la <a href="/sobre/">redacción de ${esc(CFG.siteName)}</a>. Actualizado el ${C.fechaLarga(TODAY)} con los últimos precios publicados por Red Eléctrica.</span></p>
</article>
<section class="sec"><div class="sec-head"><h2>Otras guías</h2></div><div class="guide-grid">${otras.map(guideCard).join('')}</div></section>`;
    write(`/guias/${g.slug}/`, layout({
      title: fill(g.seoTitulo || g.titulo), desc: g.descripcion, urlPath: `/guias/${g.slug}/`, body, ogType: 'article',
      crumbs: [['/guias/', 'Guías'], [`/guias/${g.slug}/`, g.titulo]],
      jsonld: [{ '@context': 'https://schema.org', '@type': 'Article', headline: g.titulo, description: g.descripcion, datePublished: PUBLICADO, dateModified: TODAY, inLanguage: 'es-ES', image: `${SITE}/assets/og.png`, mainEntityOfPage: `${SITE}/guias/${g.slug}/`, author: { '@type': 'Organization', name: `Redacción de ${CFG.siteName}`, url: `${SITE}/sobre/` }, publisher: ORG }],
      pageData: g.slug.startsWith('horario') ? { type: 'tramo' } : null,
    }), { priority: '0.7' });
  }
  write('/guias/', layout({
    title: 'Guías para ahorrar en la factura de la luz',
    desc: 'Guías prácticas sobre tarifas, horarios, calefacción eléctrica, standby y potencia contratada para pagar menos luz.',
    urlPath: '/guias/',
    body: `${pageHead({ ico: 'book', eyebrow: `${GUIAS.length} guías`, h1: 'Guías para pagar menos luz', sub: 'Explicaciones claras, con números reales y actualizadas automáticamente con el precio de la luz.' })}<div class="guide-grid">${GUIAS.map(guideCard).join('')}</div>`,
    crumbs: [['/guias/', 'Guías']],
  }), { priority: '0.6' });
}

// ---------------------------------------------------------------- páginas estáticas
function buildStatic() {
  const t = CFG.titular || {};
  const repoIssues = `https://github.com/${CFG.repo}/issues`;
  const contacto = t.email ? `<a href="mailto:${esc(t.email)}">${esc(t.email)}</a>` : `<a href="${repoIssues}" rel="noopener">abriendo una incidencia en GitHub</a>`;
  write('/sobre/', layout({
    title: 'Quiénes somos y cómo calculamos', desc: 'Qué es CuántoGasta, de dónde salen los datos, cómo se calculan los costes y cómo se financia la web.', urlPath: '/sobre/',
    crumbs: [['/sobre/', 'Sobre la web']],
    body: `<article>${pageHead({ ico: 'bolt', h1: `Sobre ${CFG.siteName}`, sub: 'Una herramienta gratuita para entender la factura de la luz y pagar menos.', meta: false })}<div class="prose">
<p>${esc(CFG.siteName)} nace para responder rápido y con datos reales a dos preguntas que todos nos hacemos: <strong>¿cuánto cuesta la luz ahora?</strong> y <strong>¿cuánto me cuesta usar este aparato?</strong> Sin registros, sin letra pequeña y en euros, no en vatios.</p>
<h2>De dónde salen los datos</h2>
<p>Los precios horarios del PVPC se descargan automáticamente varias veces al día de la API pública de <a href="https://www.ree.es/es/apidatos" rel="noopener">Red Eléctrica de España (REData)</a>. Corresponden al término de energía de la tarifa 2.0TD (energía, peajes y cargos) sin impuestos, para la península, Baleares y Canarias.</p>
<h2>Cómo calculamos el coste de cada aparato</h2>
<p>Usamos potencias y consumos típicos de los modelos que se venden en España, las etiquetas energéticas de la UE y el porcentaje de tiempo que los aparatos con termostato funcionan a plena potencia. A ese consumo le aplicamos el precio medio del PVPC de los últimos 30 días con impuesto eléctrico (${C.fmt(IMP.impuestoElectrico * 100, 2)} %) e IVA (${C.fmt(IMP.iva * 100, 0)} %). No incluimos el término de potencia ni el alquiler del contador, porque no dependen del uso de cada aparato.</p>
<p>Son estimaciones orientativas: el consumo real depende de cada modelo y de cómo se use. Para conocerlo con exactitud recomendamos un enchufe medidor de consumo.</p>
<h2>Cómo se financia</h2>
<p>La web es gratuita. Se financia con enlaces de afiliado (si compras algo a través de ellos, la tienda nos paga una pequeña comisión sin coste para ti)${ADS ? ' y con publicidad' : ''}. Ninguna marca paga por aparecer ni influye en los cálculos ni en las recomendaciones, que son por tipo de producto y no por marca.</p>
<h2>Contacto</h2><p>¿Has visto un error o tienes una sugerencia? Puedes escribirnos ${contacto}.</p></div></article>`,
  }), { priority: '0.3' });

  const titularHtml = t.nombre ? `<ul><li>Titular: ${esc(t.nombre)}</li>${t.nif ? `<li>NIF: ${esc(t.nif)}</li>` : ''}${t.email ? `<li>Correo electrónico: ${esc(t.email)}</li>` : ''}</ul>` : `<p>Para cualquier comunicación puedes contactar ${contacto}.</p>`;
  write('/aviso-legal/', layout({
    title: 'Aviso legal', desc: `Aviso legal de ${CFG.siteName}: titularidad, objeto de la web, exactitud de la información, enlaces y legislación aplicable.`, urlPath: '/aviso-legal/', crumbs: [['/aviso-legal/', 'Aviso legal']],
    body: `<article>${pageHead({ ico: 'shield', h1: 'Aviso legal', meta: false })}<div class="prose">
<h2>Titularidad</h2>${titularHtml}
<h2>Objeto</h2><p>${esc(CFG.siteName)} ofrece información sobre el precio de la luz en España y estimaciones del consumo eléctrico de electrodomésticos, con fines exclusivamente informativos.</p>
<h2>Exactitud de la información</h2><p>Los precios proceden de fuentes públicas (Red Eléctrica de España) y se actualizan de forma automática. Aunque se procura su exactitud, pueden existir retrasos o errores. Las estimaciones de coste son orientativas y no sustituyen a la información de tu factura ni constituyen asesoramiento. El titular no se responsabiliza de las decisiones tomadas a partir de esta información.</p>
<h2>Enlaces</h2><p>La web contiene enlaces a sitios de terceros, algunos de ellos de afiliado. El titular no se responsabiliza del contenido ni de las condiciones de dichos sitios.</p>
<h2>Propiedad intelectual</h2><p>Los textos, diseño y código de la web pertenecen a su titular. Los datos de precios son de Red Eléctrica de España y se reutilizan citando la fuente.</p>
<h2>Legislación</h2><p>Este aviso se rige por la legislación española.</p></div></article>`,
  }), { priority: '0.1' });

  write('/privacidad/', layout({
    title: 'Política de privacidad y cookies', desc: `Política de privacidad y cookies de ${CFG.siteName}: qué datos se tratan, cookies, alojamiento y enlaces de afiliado.`, urlPath: '/privacidad/', crumbs: [['/privacidad/', 'Privacidad y cookies']],
    body: `<article>${pageHead({ ico: 'shield', h1: 'Política de privacidad y cookies', meta: false })}<div class="prose">
<h2>Datos personales</h2><p>${esc(CFG.siteName)} no tiene formularios de registro ni recoge datos personales. Las calculadoras funcionan íntegramente en tu navegador: los valores que introduces no se envían a ningún servidor.</p>
<h2>Alojamiento</h2><p>La web está alojada en GitHub Pages (GitHub, Inc.), que puede registrar la dirección IP de los visitantes por motivos de seguridad. Más información en la <a href="https://docs.github.com/es/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">declaración de privacidad de GitHub</a>.</p>
<h2>Cookies</h2>
${ADS ? `<p>Esta web utiliza <strong>Google AdSense</strong> para mostrar publicidad. Google y sus socios pueden usar cookies para mostrar anuncios basados en tus visitas a esta y otras webs. Antes de usar cookies no necesarias se solicita tu consentimiento mediante la plataforma de gestión de consentimiento de Google, desde la que puedes cambiar tu elección en cualquier momento. Puedes configurar la publicidad personalizada en <a href="https://adssettings.google.com" rel="noopener">la configuración de anuncios de Google</a> y consultar <a href="https://policies.google.com/technologies/ads?hl=es" rel="noopener">cómo usa Google las cookies en publicidad</a>.</p>` : '<p>Esta web <strong>no utiliza cookies</strong> propias ni de terceros con fines analíticos o publicitarios.</p>'}
<p>Las preferencias de las calculadoras pueden guardarse en el almacenamiento local de tu navegador para tu comodidad; no se usan para identificarte y puedes borrarlas desde la configuración del navegador.</p>
${CFG.analitica?.cloudflareToken ? '<h2>Estadísticas</h2><p>Usamos Cloudflare Web Analytics, que mide visitas de forma agregada sin cookies y sin identificar a los usuarios.</p>' : ''}
<h2>Enlaces de afiliado y para compartir</h2><p>Algunos enlaces a tiendas (por ejemplo, Amazon) son de afiliado. Al pulsarlos, la tienda puede usar sus propias cookies para atribuir la compra, según su política de privacidad. Los botones para compartir son enlaces normales: no cargan nada de las redes sociales hasta que los pulsas.</p>
<h2>Contacto</h2><p>Para cualquier consulta sobre privacidad puedes contactar ${contacto}.</p></div></article>`,
  }), { priority: '0.1' });

  write('/404.html', layout({
    title: 'Página no encontrada', desc: 'La página que buscas no existe.', urlPath: '/404.html', noindex: true,
    body: `${pageHead({ ico: 'info', h1: 'Esta página no existe', sub: 'Puede que la dirección haya cambiado. Prueba con alguna de estas:', meta: false })}<div class="guide-grid"><a class="guide-card" href="/"><span class="guide-ico">${icon('bolt')}</span><strong>Precio de la luz hoy</strong><span>Hora a hora, en directo.</span></a><a class="guide-card" href="/cuanto-gasta/"><span class="guide-ico">${icon('euro')}</span><strong>¿Cuánto gasta cada aparato?</strong><span>${APARATOS.length} aparatos en euros.</span></a><a class="guide-card" href="/calculadora-consumo-electrico/"><span class="guide-ico">${icon('calc')}</span><strong>Calculadora de consumo</strong><span>De vatios a euros.</span></a></div>`,
  }), { sitemapEntry: false });
}

// ---------------------------------------------------------------- ficheros técnicos
function buildTech() {
  const recent = Object.fromEntries(DATES.slice(-10).map((d) => [d, PRICES[d]]));
  write('/datos/ultimos.json', JSON.stringify({ generado: BUILD_ISO, hoy: TODAY, dias: recent }));
  const csv = ['fecha,hora,pvpc_eur_mwh', ...DATES.flatMap((d) => { const lb = C.hourLabels(PRICES[d].length); return PRICES[d].map((v, i) => `${d},${C.pad(lb[i])}:00,${v}`); })].join('\n');
  write('/datos/pvpc.csv', csv + '\n');
  write('/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
  write('/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap.map((u) => `<url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod>${u.priority ? `<priority>${u.priority}</priority>` : ''}</url>`).join('\n')}\n</urlset>\n`);
  if (ADS) write('/ads.txt', `google.com, ${MON.adsenseClient.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0\n`);
  if (CFG.indexNowKey) write(`/${CFG.indexNowKey}.txt`, CFG.indexNowKey);
  write('/manifest.webmanifest', JSON.stringify({
    name: `${CFG.siteName} · Precio de la luz`, short_name: CFG.siteName, start_url: '/', display: 'standalone', lang: 'es-ES',
    background_color: '#ffffff', theme_color: '#0f766e',
    icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }, { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }));
  const daily = ['/', '/precio-luz-manana/', '/mejor-hora/', ...MEJOR_HORA.map((m) => `/mejor-hora/${m.slug}/`), `/precio-luz/${LATEST}/`, `/precio-luz/${TODAY.slice(0, 7)}/`]
    .concat(HAS_TOMORROW ? [`/precio-luz/${TOMORROW}/`] : []);
  write('/datos/indexnow-diario.json', JSON.stringify(daily.map((p) => SITE + p)));
}

// ---------------------------------------------------------------- run
buildHome();
buildTomorrow();
buildDayArchive();
buildMonths();
buildMejorHora();
buildAparatos();
buildCalculadora();
buildGuias();
buildStatic();
buildTech();
console.log(`Build OK: ${sitemap.length} páginas · hoy=${TODAY} · último dato=${LATEST} · mañana=${HAS_TOMORROW ? 'sí' : 'no'} · media30=${p3(MEDIA30)} €/kWh (${p3(MEDIA30_CON)} con impuestos)`);
if (!HAS_TODAY) console.warn(`AVISO: no hay precios de hoy (${TODAY}); se muestran los del ${LATEST}.`);
