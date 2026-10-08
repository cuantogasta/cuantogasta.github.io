# CuántoGasta ⚡

**https://cuantogasta.github.io** · Precio de la luz hoy por horas (PVPC) y cuánto gasta cada aparato en euros.

Web estática que **se actualiza sola** cada día con los precios oficiales de Red Eléctrica y genera páginas nuevas automáticamente. No necesita servidor, base de datos ni mantenimiento.

## Qué incluye

- **Precio de la luz hoy y mañana** por horas, con la hora actual resaltada, mejores franjas y tramos punta/llano/valle.
- **44 páginas "¿Cuánto gasta…?"** (radiador, aire acondicionado, freidora de aire, lavadora, termo, coche eléctrico…) con calculadora, tablas y consejos.
- **Mejor hora para** poner la lavadora, el lavavajillas, la secadora, el horno, el termo o cargar el coche.
- **Histórico** diario y mensual desde octubre de 2025 (una página nueva cada día) y descarga en CSV.
- **Calculadora de consumo** de un aparato y de toda la casa.
- **Guías** de ahorro (tarifas, horarios, calefacción, standby, potencia contratada…).
- SEO técnico: sitemap, datos estructurados (FAQ, migas, artículo), Open Graph, IndexNow, modo oscuro, accesible y muy rápido (sin frameworks ni dependencias).

## Cómo funciona

| Pieza | Qué hace |
|---|---|
| `src/fetch-prices.mjs` | Descarga el PVPC de la API pública REData y lo guarda en `data/prices/AAAA-MM.json`. |
| `src/build.mjs` | Genera toda la web en `dist/` a partir de los datos y del contenido de `src/content/`. |
| `src/assets/` | CSS, JS del navegador y lógica compartida (`core.js`). |
| `tools/check.mjs` | Verifica enlaces rotos, textos vacíos, títulos… Si falla, no se publica. |
| `tools/estado.mjs` | Avisa por correo (vía GitHub) si algún día faltan los precios. |
| `.github/workflows/publicar.yml` | 5 veces al día: precios → build → comprobación → publicación en GitHub Pages → aviso a buscadores. |

## Configuración

Todo lo configurable está en [`site.config.json`](site.config.json). Para activar ingresos (Amazon, AdSense…) consulta [GANAR-DINERO.md](GANAR-DINERO.md). Al guardar un cambio en GitHub, la web se regenera y publica sola en 1-2 minutos.

## Desarrollo local

```bash
npm run dev      # descarga precios, genera dist/ y lo sirve en http://localhost:4173
```

Requiere Node 20 o superior. No hay dependencias que instalar.

Datos: [Red Eléctrica de España – REData](https://www.ree.es/es/apidatos). Tipografía: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (SIL Open Font License 1.1), alojada en la propia web. Iconos propios.
