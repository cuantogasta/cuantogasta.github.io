// Notifica a Bing, Yandex, Seznam, Naver… (protocolo IndexNow) las URLs nuevas o actualizadas.
// Uso: node tools/indexnow.mjs diario|todo
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CFG = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8'));
const SITE = CFG.siteUrl.replace(/\/$/, '');
const modo = process.argv[2] || 'diario';

if (!CFG.indexNowKey) { console.log('Sin indexNowKey: nada que hacer.'); process.exit(0); }

let urls;
if (modo === 'todo') {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
} else {
  urls = await (await fetch(`${SITE}/datos/indexnow-diario.json?t=${Date.now()}`)).json();
}
urls = urls.slice(0, 10000);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE).host, key: CFG.indexNowKey, keyLocation: `${SITE}/${CFG.indexNowKey}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${urls.length} URLs enviadas → HTTP ${res.status}`);
