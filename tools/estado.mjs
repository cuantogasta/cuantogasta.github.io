// Comprueba la web publicada. Si faltan los precios de hoy, termina con error para que
// GitHub envíe un correo de aviso al propietario del repositorio (la web sigue funcionando).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CFG = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8'));
const SITE = CFG.siteUrl.replace(/\/$/, '');

const res = await fetch(`${SITE}/datos/ultimos.json?t=${Date.now()}`);
if (!res.ok) {
  console.error(`::error::La web no responde (${res.status}) en ${SITE}`);
  process.exit(1);
}
const data = await res.json();
const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' })
  .formatToParts(new Date()).map((x) => [x.type, x.value]));
const today = `${p.year}-${p.month}-${p.day}`;
if (!data.dias?.[today]) {
  const last = Object.keys(data.dias || {}).sort().at(-1);
  console.error(`::error::No hay precios de hoy (${today}); el último día publicado es ${last}. Puede que la API de Red Eléctrica haya cambiado o esté caída.`);
  process.exit(1);
}
console.log(`Estado OK: precios de hoy (${today}) publicados${data.dias[Object.keys(data.dias).sort().at(-1)] && Object.keys(data.dias).sort().at(-1) > today ? ' y también los de mañana' : ''}.`);
