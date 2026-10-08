// Comprobaciones de calidad sobre dist/. Sale con código 1 si algo está roto,
// así el workflow no publica una versión defectuosa (se queda la anterior).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const errors = [];
const warns = [];
const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p); else files.push(p);
  }
})(DIST);

const html = files.filter((f) => f.endsWith('.html'));
const exists = (urlPath) => {
  const clean = urlPath.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return fs.existsSync(path.join(DIST, 'index.html'));
  const p = path.join(DIST, clean);
  return fs.existsSync(p) && (fs.statSync(p).isFile() || fs.existsSync(path.join(p, 'index.html')));
};

for (const f of html) {
  const rel = '/' + path.relative(DIST, f).replace(/\\/g, '/');
  const s = fs.readFileSync(f, 'utf8');
  const text = s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
  for (const bad of ['undefined', 'NaN', '{{', 'Infinity', '[object Object]']) {
    if (text.includes(bad)) errors.push(`${rel}: contiene "${bad}"`);
  }
  const title = s.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) errors.push(`${rel}: sin <title>`);
  else if (title.length > 75) warns.push(`${rel}: título largo (${title.length})`);
  if (!/<meta name="description" content="[^"]{50,}/.test(s) && !rel.endsWith('404.html')) warns.push(`${rel}: descripción corta o ausente`);
  if ((s.match(/<h1[\s>]/g) || []).length !== 1) errors.push(`${rel}: debe tener exactamente un <h1>`);
  for (const m of s.matchAll(/href="(\/[^"]*)"/g)) {
    if (!exists(m[1])) errors.push(`${rel}: enlace roto ${m[1]}`);
  }
}
for (const required of ['index.html', 'sitemap.xml', 'robots.txt', '404.html', 'datos/ultimos.json', 'assets/app.js', 'assets/core.js', 'assets/style.css']) {
  if (!fs.existsSync(path.join(DIST, required))) errors.push(`falta ${required}`);
}
const unique = [...new Set(warns)];
if (unique.length) console.warn(`Avisos (${unique.length}):\n  ` + unique.slice(0, 20).join('\n  '));
if (errors.length) {
  console.error(`ERRORES (${errors.length}):\n  ` + [...new Set(errors)].slice(0, 50).join('\n  '));
  process.exit(1);
}
console.log(`Comprobación OK: ${html.length} páginas HTML, ${files.length} ficheros.`);
