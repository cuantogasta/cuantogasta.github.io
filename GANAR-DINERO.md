# Cómo activar los ingresos de CuántoGasta

La web ya está publicada y se actualiza sola. Para que **el dinero llegue a ti**, las cuentas de cobro tienen que estar a tu nombre, porque piden tus datos fiscales y bancarios. Nadie puede crearlas por ti. Son tres pasos, unos 30 minutos en total, y solo se hacen una vez.

> **Cómo pegar un código en la web:** abre <https://github.com/Shikimokami/Shikimokami.github.io/edit/main/site.config.json>, pega el valor entre las comillas que correspondan y pulsa **Commit changes**. En 1-2 minutos la web se regenera sola.
> También puedes pasarle el código a Claude y lo hará por ti.

---

## 1. Google Search Console (gratis, 5 min) — **lo más importante**

Sin esto, Google puede tardar meses en encontrar la web. Search Console es lo que le dice a Google que existe.

1. Entra en <https://search.google.com/search-console> con tu cuenta de Google.
2. Pulsa **Añadir propiedad** → **Prefijo de la URL** → `https://shikimokami.github.io/`.
3. Elige el método **Etiqueta HTML**. Copia solo el valor de `content="..."`, por ejemplo `AbCdEf123...`.
4. Pégalo en `site.config.json` → `"verificacion"` → `"googleSiteVerification"` y guarda.
5. Espera 2 minutos y pulsa **Verificar** en Search Console.
6. En el menú **Sitemaps**, añade `sitemap.xml` y pulsa **Enviar**.

(Opcional) En <https://www.bing.com/webmasters> puedes importar la web desde Search Console con un clic. Bing ya recibe avisos automáticos por IndexNow.

## 2. Amazon Afiliados (gratis, 10 min) — ingresos por compras

Cada página de aparato y cada guía enlaza a Amazon: radiadores, enchufes medidores, splits… Si alguien compra, Amazon te paga una comisión, normalmente entre el 3 % y el 7 %.

1. Regístrate en <https://afiliados.amazon.es> con tu cuenta de Amazon.
2. En "Sitios web", añade `https://shikimokami.github.io`.
3. Elige un ID de seguimiento, por ejemplo `cuantogasta-21`.
4. Pégalo en `site.config.json` → `"monetizacion"` → `"amazonTag"` y guarda.
5. Completa la información fiscal y de pago dentro de Afiliados.

La web añade sola el aviso legal obligatorio ("En calidad de Afiliado de Amazon…"). Amazon revisa la cuenta cuando llegan las **3 primeras ventas en 180 días**. Si no se alcanzan, puedes volver a solicitarlo más adelante.

## 3. Google AdSense (gratis) — ingresos por publicidad

**Cuándo hacerlo:** cuando Search Console muestre que Google ya ha indexado páginas, normalmente entre 2 y 6 semanas después del paso 1. AdSense rechaza las webs que aún no reciben visitas.

1. Solicita la cuenta en <https://adsense.google.com> con el sitio `shikimokami.github.io`.
2. Copia tu ID de editor (`ca-pub-1234567890123456`) en `site.config.json` → `"monetizacion"` → `"adsenseClient"` y guarda. La web añade sola el código de AdSense, el fichero `ads.txt` y el texto de cookies en la política de privacidad.
3. En AdSense, pulsa **Solicitar revisión**.
4. **Obligatorio en Europa:** ve a **Privacidad y mensajes** → **Reglamentos europeos** y crea y publica el mensaje de consentimiento (GDPR). Es gratis y lo gestiona Google.
5. Cuando aprueben la web, activa **Anuncios automáticos**.

---

## Opcionales

| Opción | Dónde | Qué poner |
|---|---|---|
| Botón de donaciones | <https://ko-fi.com> | `monetizacion.kofiUrl` → `https://ko-fi.com/tu-usuario` |
| Enlace de invitación de tu compañía de luz (muchas pagan 25-50 € por cada amigo que se cambia) | La app de tu compañía | `monetizacion.ofertaTarifa.url` y un `texto` breve |
| Estadísticas de visitas sin cookies | <https://dash.cloudflare.com> → Web Analytics | `analitica.cloudflareToken` |
| Datos del titular para el aviso legal | — | `titular.nombre`, `titular.nif`, `titular.email` |

## Qué esperar (con honestidad)

- **Mes 1-3:** Google indexa las ~460 páginas y empiezan las primeras visitas, sobre todo de búsquedas concretas como "cuánto gasta un radiador de aceite de 2000w" o "precio de la luz 15 de octubre".
- **Mes 3-12:** cada día se añade una página nueva y el tráfico crece poco a poco. Es temporada alta de calefacción (octubre-febrero) y de aire acondicionado (junio-agosto).
- Los ingresos dependen del tráfico y no están garantizados. Como referencia, la publicidad en España paga unos 1-4 € por cada 1.000 visitas, y la afiliación suma según las ventas.
- **Para acelerar** (opcional): compra un dominio propio, como `cuantogasta.es` (unos 10 €/año), y compártelo en foros, Reddit o grupos de ahorro.

## Impuestos

Los ingresos por publicidad y afiliación se declaran en la renta. Si se vuelven regulares, consulta con un gestor si tienes que darte de alta en Hacienda. Con importes pequeños suele bastar con declararlos.

## Mantenimiento

Ninguno. La web se actualiza 5 veces al día de forma automática. Si algún día faltan los precios (por ejemplo, porque Red Eléctrica cambia su API), **GitHub te enviará un correo**. La web seguirá funcionando con los últimos datos mientras se arregla.
