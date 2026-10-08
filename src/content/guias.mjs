// Guías evergreen. El cuerpo es HTML; los marcadores {{...}} se sustituyen en el build
// con datos reales (precio medio de los últimos 30 días, etc.).

export const GUIAS = [
  {
    slug: 'horario-luz-tramos-punta-llano-valle',
    titulo: 'Horario de la luz: horas punta, llano y valle',
    seoTitulo: 'Horario de la luz {{anio}}: horas punta, llano y valle (tarifa 2.0TD)',
    descripcion: 'Qué horas son punta, llano y valle en la tarifa 2.0TD, cómo cambian los fines de semana y festivos, y en qué tramo estamos ahora mismo.',
    resumen: 'Tramos horarios de la tarifa 2.0TD y en cuál estamos ahora.',
    html: `
<p>Desde junio de 2021 todos los consumidores domésticos con menos de 15 kW contratados en España tienen la <strong>tarifa de acceso 2.0TD</strong>, que divide el día en tres tramos con peajes distintos. Tanto si estás en PVPC como en mercado libre con discriminación horaria, estos tramos determinan cuánto pagas por cada kWh.</p>
<div class="callout" id="tramo-actual" data-widget="tramo">Calculando el tramo actual…</div>
<h2>Tramos de lunes a viernes</h2>
<table class="data">
<thead><tr><th>Tramo</th><th>Horario</th><th>Precio</th></tr></thead>
<tbody>
<tr><td><span class="per per-valle">valle</span></td><td>00:00 a 08:00</td><td>El más barato</td></tr>
<tr><td><span class="per per-llano">llano</span></td><td>08:00 a 10:00 · 14:00 a 18:00 · 22:00 a 24:00</td><td>Intermedio</td></tr>
<tr><td><span class="per per-punta">punta</span></td><td>10:00 a 14:00 · 18:00 a 22:00</td><td>El más caro</td></tr>
</tbody></table>
<h2>Fines de semana y festivos: todo el día valle</h2>
<p>Los <strong>sábados, domingos y festivos nacionales de fecha fija</strong> (1 y 6 de enero, 1 de mayo, 15 de agosto, 12 de octubre, 1 de noviembre, 6, 8 y 25 de diciembre) las 24 horas son periodo valle. Los festivos autonómicos o locales y los que cambian de fecha cada año, como el Viernes Santo, no cuentan.</p>
<h2>¿Es lo mismo tramo valle que hora más barata?</h2>
<p>No exactamente. Si tienes <strong>tarifa PVPC</strong>, el precio cambia cada hora según el mercado mayorista. Los peajes hacen que la punta sea más cara, pero desde que hay tanta energía solar las horas centrales del día (de 13:00 a 17:00) a menudo son más baratas que la madrugada, especialmente en primavera y verano. Por eso, con PVPC conviene mirar el <a href="/">precio de la luz de hoy por horas</a> en vez de guiarse solo por los tramos.</p>
<p>Si tienes una <strong>tarifa de mercado libre con tres periodos</strong>, el precio de cada tramo es fijo y basta con concentrar el consumo en valle. Con una tarifa de precio único, la hora da igual.</p>
<h2>Tramos de potencia: solo dos</h2>
<p>La potencia contratada tiene solo dos periodos: <strong>P1 (punta + llano)</strong>, de 8:00 a 24:00 en días laborables, y <strong>P2 (valle)</strong>. Puedes contratar más potencia en valle que en punta, útil por ejemplo si cargas un coche eléctrico de noche.</p>
<h2>Canarias, Baleares, Ceuta y Melilla</h2>
<p>Los tramos horarios son los mismos en Baleares y Canarias (en Canarias con su hora local). En Ceuta y Melilla los horarios de punta y llano son distintos y el precio PVPC también.</p>
<h2>Qué electrodomésticos mover al valle</h2>
<ul>
<li><a href="/cuanto-gasta/lavadora/">Lavadora</a>, <a href="/cuanto-gasta/lavavajillas/">lavavajillas</a> y <a href="/cuanto-gasta/secadora/">secadora</a>: usa el inicio diferido.</li>
<li><a href="/cuanto-gasta/termo-electrico/">Termo eléctrico</a>: con un enchufe programable, que caliente solo en horas baratas.</li>
<li><a href="/cuanto-gasta/coche-electrico/">Coche eléctrico</a>: programa la carga de madrugada o en las horas solares.</li>
</ul>`,
  },
  {
    slug: 'pvpc-o-mercado-libre',
    titulo: '¿PVPC o mercado libre? Cómo saber qué tarifa te conviene',
    seoTitulo: '¿PVPC o mercado libre? Qué tarifa de luz conviene en {{anio}}',
    descripcion: 'Diferencias entre la tarifa regulada PVPC y las tarifas de mercado libre, cuándo conviene cada una y cómo compararlas con tu propio consumo.',
    resumen: 'Las diferencias reales y cómo decidir con tu factura.',
    html: `
<p>En España puedes elegir entre dos tipos de tarifa de luz: la <strong>tarifa regulada (PVPC)</strong>, que solo ofrecen las comercializadoras de referencia y cuyo precio cambia cada hora, y las <strong>tarifas de mercado libre</strong>, con precios fijados por cada compañía durante un periodo.</p>
<h2>Cómo funciona el PVPC</h2>
<p>El Precio Voluntario para el Pequeño Consumidor se calcula cada día a partir del mercado mayorista (y, desde 2024, en parte de mercados a plazo), más peajes y cargos. Red Eléctrica publica hacia las 20:15 los precios de cada hora del día siguiente; puedes verlos en <a href="/precio-luz-manana/">el precio de la luz de mañana</a>.</p>
<p>En los últimos 30 días, el PVPC ha costado de media <strong>{{media30sin}} €/kWh</strong> antes de impuestos ({{media30con}} €/kWh con impuesto eléctrico e IVA).</p>
<h3>Ventajas del PVPC</h3>
<ul>
<li>No hay margen comercial oculto en la energía y no tiene permanencia.</li>
<li>Si puedes mover consumo a las horas baratas, el precio medio que pagas baja mucho.</li>
<li>Es la única tarifa que da acceso al <strong>bono social</strong>.</li>
</ul>
<h3>Inconvenientes</h3>
<ul>
<li>Es imprevisible: en momentos de crisis energética se dispara.</li>
<li>Exige estar pendiente de las horas si quieres sacarle partido.</li>
</ul>
<h2>Cómo funciona el mercado libre</h2>
<p>La compañía te ofrece un precio por kWh fijo durante un año (a veces con tres precios según el tramo horario) y un precio por kW de potencia. Lo importante es comparar el precio del <strong>kWh</strong> y de la <strong>potencia</strong>, sin dejarse llevar por descuentos de los primeros meses ni servicios adicionales (mantenimientos, seguros) que encarecen la factura.</p>
<h2>¿Cuál me conviene?</h2>
<ol>
<li><strong>Mira tu consumo real</strong>: en la web de tu distribuidora (i-DE, e-distribución, UFD…) puedes descargar tu consumo por horas.</li>
<li><strong>Calcula tu precio medio PVPC</strong>: si consumes sobre todo de noche, fines de semana o en horas solares, el PVPC suele salir mejor.</li>
<li><strong>Compara con el precio fijo</strong> de la oferta de mercado libre. Si está claramente por debajo del precio medio PVPC de los últimos meses y no tiene permanencia, puede compensar por tranquilidad.</li>
</ol>
<p>Una referencia rápida: si te ofrecen un precio fijo de energía inferior a la media PVPC de los últimos 12 meses (lo tienes en el <a href="/precio-luz/">histórico de precios</a>), sin permanencia y sin servicios añadidos, es una oferta competitiva.</p>
<h2>Cambiar de tarifa es gratis</h2>
<p>Cambiar de comercializadora o pasarte al PVPC no tiene coste ni requiere obras, no hay corte de suministro y tu contador sigue siendo el mismo. Solo necesitas tu DNI, el CUPS (aparece en la factura) y el IBAN.</p>`,
  },
  {
    slug: 'como-calcular-consumo-electrico',
    titulo: 'Cómo calcular el consumo eléctrico de un aparato',
    seoTitulo: 'Cómo calcular el consumo eléctrico de un aparato: vatios, kWh y euros',
    descripcion: 'La fórmula para pasar de vatios a kWh y a euros, con ejemplos reales, y cómo medir el consumo exacto de cualquier electrodoméstico.',
    resumen: 'La fórmula para pasar de vatios a euros, con ejemplos.',
    html: `
<p>Para saber cuánto te cuesta un aparato solo necesitas tres datos: su <strong>potencia</strong>, el <strong>tiempo</strong> que lo usas y el <strong>precio del kWh</strong>.</p>
<h2>La fórmula</h2>
<div class="formula">Consumo (kWh) = Potencia (W) × Horas ÷ 1.000<br>Coste (€) = Consumo (kWh) × Precio (€/kWh)</div>
<p><strong>Ejemplo:</strong> un <a href="/cuanto-gasta/calefactor/">calefactor</a> de 2.000 W encendido 3 horas consume 2.000 × 3 ÷ 1.000 = 6 kWh. Con el precio medio de los últimos 30 días ({{media30con}} €/kWh con impuestos) serían {{ejemploCalefactor}} €.</p>
<h2>Vatios (W) y kilovatios hora (kWh) no son lo mismo</h2>
<ul>
<li>El <strong>vatio</strong> mide potencia: la “velocidad” a la que el aparato gasta energía.</li>
<li>El <strong>kilovatio hora</strong> mide energía: lo que gasta un aparato de 1.000 W durante una hora. Es lo que te cobran en la factura.</li>
</ul>
<h2>Por qué el consumo real es menor que la potencia</h2>
<p>Muchos aparatos no funcionan siempre a plena potencia. Los que tienen <strong>termostato</strong> (radiadores, hornos, planchas, freidoras de aire, frigoríficos) desconectan la resistencia o el compresor cuando alcanzan la temperatura. Un <a href="/cuanto-gasta/radiador-de-aceite/">radiador de aceite</a> de 2.000 W, en una habitación templada, puede estar a tope solo el 50-70 % del tiempo.</p>
<p>En cambio, en los aparatos que calientan agua (<a href="/cuanto-gasta/lavadora/">lavadora</a>, <a href="/cuanto-gasta/lavavajillas/">lavavajillas</a>) lo útil es el consumo <strong>por ciclo</strong> que aparece en la etiqueta energética, y en los que están siempre encendidos (<a href="/cuanto-gasta/frigorifico/">frigorífico</a>), el consumo <strong>anual</strong>.</p>
<h2>Dónde encontrar la potencia</h2>
<ul>
<li>En la placa de características (pegatina con los datos técnicos, detrás o debajo del aparato).</li>
<li>En la etiqueta energética: kWh por ciclo o por año.</li>
<li>En el manual o la ficha del producto.</li>
</ul>
<h2>La forma más exacta: medirlo</h2>
<p>Un <strong>enchufe medidor de consumo</strong> (10-20 €) se coloca entre el aparato y la pared y te dice los kWh reales que ha gastado en un día, una semana o un ciclo completo. Es la mejor forma de descubrir “devoradores” ocultos.</p>
<h2>Qué precio usar</h2>
<p>Si tienes una tarifa de mercado libre, busca en tu factura el precio del término de energía (€/kWh) y súmale aproximadamente un 27 % de impuestos (impuesto eléctrico del 5,11 % e IVA del 21 %). Si tienes PVPC, usa el precio de la hora en la que vas a usar el aparato o la media del día.</p>
<p>¿Quieres hacerlo sin cuentas? Usa la <a href="/calculadora-consumo-electrico/">calculadora de consumo eléctrico</a>.</p>`,
  },
  {
    slug: 'calefaccion-electrica-que-gasta-menos',
    titulo: '¿Qué calefacción eléctrica gasta menos?',
    seoTitulo: '¿Qué calefacción eléctrica gasta menos? Comparativa real {{anio}}',
    descripcion: 'Radiador de aceite, calefactor, emisor térmico, estufa, bomba de calor, brasero y manta eléctrica: cuánto cuesta cada uno con el precio actual de la luz.',
    resumen: 'Radiador, emisor, calefactor o bomba de calor: comparativa con números.',
    html: `
<p>La respuesta corta: <strong>la bomba de calor</strong> (un aire acondicionado con modo calor) es, con mucha diferencia, la calefacción eléctrica más barata para calentar una habitación. Todos los demás aparatos que funcionan con una resistencia (radiadores de aceite, emisores, calefactores, estufas) producen exactamente <strong>el mismo calor por cada kWh</strong>: 1 kWh de electricidad = 1 kWh de calor.</p>
<h2>Comparativa: coste de 1 hora de calor equivalente</h2>
<p>Para producir 1,5 kW de calor durante una hora, con el precio medio de los últimos 30 días ({{media30con}} €/kWh con impuestos):</p>
{{tablaCalefaccion}}
<p>La bomba de calor gasta 3-4 veces menos porque no genera el calor, sino que lo extrae del aire exterior. Esa diferencia se mide con el <strong>SCOP</strong>: un SCOP de 4 significa que, de media en la temporada, da 4 kWh de calor por cada kWh eléctrico.</p>
<h2>Entonces, ¿por qué hay radiadores “de bajo consumo”?</h2>
<p>Es un reclamo comercial. Lo que sí cambia entre aparatos es el <strong>control</strong>: un buen termostato y la programación horaria evitan horas innecesarias, y la inercia de un emisor o un radiador de aceite reparte mejor el calor. Pero un emisor de 1.500 W funcionando una hora a tope consume 1,5 kWh, igual que un calefactor de 1.500 W.</p>
<h2>Qué usar en cada caso</h2>
<ul>
<li><strong>Calefacción principal de una vivienda</strong>: bomba de calor (split o aerotermia).</li>
<li><strong>Una habitación varias horas al día</strong>: <a href="/cuanto-gasta/radiador-de-aceite/">radiador de aceite</a> o <a href="/cuanto-gasta/emisor-termico/">emisor térmico</a> con termostato y programación.</li>
<li><strong>Calentar el baño 15 minutos</strong>: <a href="/cuanto-gasta/calefactor/">calefactor</a> o <a href="/cuanto-gasta/toallero-electrico/">toallero</a> con temporizador.</li>
<li><strong>Calentarte tú, no la habitación</strong>: <a href="/cuanto-gasta/manta-electrica/">manta eléctrica</a>, <a href="/cuanto-gasta/brasero-electrico/">brasero</a> o <a href="/cuanto-gasta/estufa-electrica/">estufa de infrarrojos</a>. Es lo más barato de todo.</li>
</ul>
<h2>5 trucos que ahorran más que cambiar de aparato</h2>
<ol>
<li>Baja el termostato a 19-20 °C: cada grado menos ahorra en torno a un 7 %.</li>
<li>Con tarifa PVPC, calienta en las horas baratas y aprovecha la inercia en las caras.</li>
<li>Cierra puertas y calienta solo las habitaciones que usas.</li>
<li>Burletes en puertas y ventanas: frenan corrientes que obligan al aparato a trabajar más.</li>
<li>Por la noche, baja persianas y corre cortinas.</li>
</ol>`,
  },
  {
    slug: 'consumo-standby-aparatos-apagados',
    titulo: 'Consumo en standby: lo que gastan tus aparatos “apagados”',
    seoTitulo: 'Consumo en standby: cuánto gastan los aparatos apagados (y cómo evitarlo)',
    descripcion: 'Cuánta electricidad consumen la tele, la consola, el microondas o el router en reposo, y cuánto puedes ahorrar al año cortando el standby.',
    resumen: 'Cuánto suman los pilotos encendidos al año.',
    html: `
<p>El <strong>consumo en espera (standby)</strong> es la electricidad que gastan los aparatos que parecen apagados pero siguen enchufados: el piloto de la tele, el reloj del microondas, el decodificador o la consola esperando actualizaciones. Por separado son pocos vatios, pero funcionan las 8.760 horas del año.</p>
<h2>Consumos típicos en reposo</h2>
<table class="data"><thead><tr><th>Aparato</th><th class="num">W en reposo</th><th class="num">kWh/año</th></tr></thead><tbody>
<tr><td>Televisión moderna</td><td class="num">0,5</td><td class="num">4</td></tr>
<tr><td>Decodificador de TV</td><td class="num">8-15</td><td class="num">70-130</td></tr>
<tr><td>Consola en modo de encendido rápido</td><td class="num">10-15</td><td class="num">90-130</td></tr>
<tr><td>Barra de sonido</td><td class="num">2-5</td><td class="num">18-44</td></tr>
<tr><td>Ordenador “apagado” + periféricos</td><td class="num">2-6</td><td class="num">18-53</td></tr>
<tr><td>Microondas (reloj)</td><td class="num">1-3</td><td class="num">9-26</td></tr>
<tr><td>Cafetera superautomática en espera</td><td class="num">1-5</td><td class="num">9-44</td></tr>
<tr><td>Cargador sin móvil</td><td class="num">0,1</td><td class="num">1</td></tr>
</tbody></table>
<p>En una casa típica el standby suma entre 100 y 400 kWh al año. Con el precio medio actual ({{media30con}} €/kWh con impuestos), <strong>entre {{standbyMin}} y {{standbyMax}} € al año</strong> por aparatos que no estás usando.</p>
<h2>Cómo reducirlo</h2>
<ul>
<li><strong>Regletas con interruptor</strong> para el rincón de la tele y del ordenador: un clic y se corta todo.</li>
<li>Desactiva el <strong>modo de encendido instantáneo</strong> de consolas y teles.</li>
<li>Pide a tu operador si el decodificador tiene modo de bajo consumo, o apágalo por completo si apenas lo usas.</li>
<li>Usa un <strong>enchufe medidor</strong> para descubrir qué aparatos gastan más de la cuenta en reposo.</li>
</ul>
<h2>Lo que no merece la pena desenchufar</h2>
<p>El frigorífico (obviamente), el router si lo usas a diario, los cargadores modernos (menos de 0,1 W) y los aparatos que pierden la configuración al desenchufarlos si eso te hace perder tiempo cada día.</p>`,
  },
  {
    slug: 'trucos-ahorrar-factura-luz',
    titulo: '20 trucos para ahorrar en la factura de la luz',
    seoTitulo: '20 trucos para ahorrar en la factura de la luz que funcionan de verdad',
    descripcion: 'Trucos concretos y medibles para pagar menos luz: horarios, temperatura, electrodomésticos, potencia contratada y tarifa.',
    resumen: 'Medidas concretas ordenadas por impacto.',
    html: `
<p>Estas son las medidas que más ahorran, ordenadas aproximadamente por impacto en una vivienda típica. Muchas no cuestan nada.</p>
<h2>Calefacción y aire acondicionado (lo que más pesa)</h2>
<ol>
<li><strong>19-20 °C en invierno y 25-26 °C en verano.</strong> Cada grado supone un 7-8 % del gasto de climatización.</li>
<li><strong>Usa la bomba de calor</strong> en lugar de radiadores de resistencia: gasta 3-4 veces menos (ver <a href="/guias/calefaccion-electrica-que-gasta-menos/">comparativa</a>).</li>
<li><strong>Calienta solo donde estás</strong>: cierra puertas y usa <a href="/cuanto-gasta/manta-electrica/">manta eléctrica</a> o <a href="/cuanto-gasta/brasero-electrico/">brasero</a> en el sofá.</li>
<li><strong>Persianas</strong>: abiertas al sol en invierno, bajadas en verano.</li>
</ol>
<h2>Horarios (si tienes PVPC)</h2>
<ol start="5">
<li><strong>Pon la lavadora, el lavavajillas y la secadora en la hora más barata</strong>. Consulta <a href="/mejor-hora/lavadora/">la mejor hora de hoy</a> y usa el inicio diferido.</li>
<li><strong>Programa el termo eléctrico</strong> para que caliente solo en horas baratas.</li>
<li><strong>Evita los aparatos potentes entre las 19:00 y las 22:00</strong>, que suelen ser las horas más caras.</li>
<li><strong>Carga el coche eléctrico</strong> de madrugada o en las horas solares.</li>
</ol>
<h2>Electrodomésticos</h2>
<ol start="9">
<li>Lava a 30 °C o en frío: el 80-90 % del consumo de la lavadora es calentar agua.</li>
<li>Lavavajillas siempre lleno y en ECO.</li>
<li>Usa la <a href="/cuanto-gasta/freidora-de-aire/">freidora de aire</a> o el microondas en lugar del horno para raciones pequeñas.</li>
<li>Cocina con tapa y apaga la vitro unos minutos antes.</li>
<li>Frigorífico a 4-5 °C, congelador a -18 °C y separado de la pared.</li>
<li>Hierve solo el agua que necesitas.</li>
<li>Cambia las bombillas que más se usan por LED.</li>
<li>Corta el standby con regletas.</li>
</ol>
<h2>Contrato</h2>
<ol start="17">
<li><strong>Ajusta la potencia contratada</strong>: cada kW de más se paga todos los días aunque no lo uses (ver <a href="/guias/potencia-contratada/">qué potencia contratar</a>).</li>
<li><strong>Revisa la tarifa</strong> una vez al año: compara tu precio con la media del PVPC (<a href="/guias/pvpc-o-mercado-libre/">PVPC o mercado libre</a>).</li>
<li><strong>Quita servicios añadidos</strong> (mantenimientos, seguros) que no uses.</li>
<li>Comprueba si cumples los requisitos del <strong>bono social</strong>: descuentos de hasta el 50 % o más para hogares vulnerables.</li>
</ol>`,
  },
  {
    slug: 'freidora-de-aire-o-horno',
    titulo: '¿Freidora de aire u horno? Cuál gasta menos',
    seoTitulo: '¿Freidora de aire u horno? Cuál gasta menos luz (con números)',
    descripcion: 'Comparamos el consumo de la freidora de aire y del horno eléctrico con recetas reales y el precio actual de la luz.',
    resumen: 'Consumo real de cada uno con recetas típicas.',
    html: `
<p>Para la mayoría de comidas del día a día, <strong>la freidora de aire gasta bastante menos que el horno</strong>, normalmente entre un 40 % y un 70 % menos. La razón es sencilla: calienta un espacio de 4-6 litros en lugar de 60-70, casi no necesita precalentar y cocina más rápido.</p>
<h2>Comparativa con recetas típicas</h2>
{{tablaFreidoraHorno}}
<p class="muted">Cálculos con el precio medio PVPC de los últimos 30 días ({{media30con}} €/kWh con impuestos), freidora de 1.500 W y horno de 2.500 W con sus termostatos actuando.</p>
<h2>Cuándo compensa el horno</h2>
<ul>
<li>Cantidades grandes que no caben en la cesta (una bandeja de lasaña para 6, un pollo entero de 2 kg).</li>
<li>Repostería que necesita calor uniforme y espacio.</li>
<li>Cuando cocinas varias cosas a la vez aprovechando el mismo encendido.</li>
</ul>
<h2>Trucos para gastar menos con cada uno</h2>
<ul>
<li><strong>Freidora</strong>: no la llenes en exceso, no precalientes si no hace falta y encadena tandas.</li>
<li><strong>Horno</strong>: usa el ventilador y baja 20 °C, no abras la puerta y apágalo 5-10 minutos antes.</li>
</ul>
<p>Detalle de cada aparato: <a href="/cuanto-gasta/freidora-de-aire/">cuánto gasta una freidora de aire</a> · <a href="/cuanto-gasta/horno/">cuánto gasta un horno</a>.</p>`,
  },
  {
    slug: 'potencia-contratada',
    titulo: 'Qué potencia de luz contratar',
    seoTitulo: 'Qué potencia de luz contratar: cómo calcularla y cuánto ahorras',
    descripcion: 'Cómo saber si tienes demasiada potencia contratada, cuánta necesitas según tus electrodomésticos y cuánto se ahorra bajándola.',
    resumen: 'Cómo calcularla y cuánto ahorras bajándola.',
    html: `
<p>La potencia contratada (en kW) es el máximo de aparatos que puedes tener funcionando <strong>a la vez</strong> sin que salte el interruptor. Se paga por cada día del año, la uses o no, así que tener más de la necesaria es dinero perdido todos los meses.</p>
<h2>Potencias habituales</h2>
<table class="data"><thead><tr><th>Potencia</th><th>Para quién suele bastar</th></tr></thead><tbody>
<tr><td>3,45 kW</td><td>Pisos pequeños, cocina de gas o uso no simultáneo de aparatos potentes.</td></tr>
<tr><td>4,6 kW</td><td>La mayoría de viviendas con cocina eléctrica (inducción y horno).</td></tr>
<tr><td>5,75 kW</td><td>Viviendas grandes o con calefacción eléctrica por bomba de calor.</td></tr>
<tr><td>6,9 kW o más</td><td>Calefacción eléctrica por resistencias, carga de coche eléctrico, aerotermia.</td></tr>
</tbody></table>
<h2>Cómo calcular la que necesitas</h2>
<p>Suma la potencia de los aparatos que realmente usas <strong>al mismo tiempo</strong>, no la de todos los de la casa. Ejemplo típico de una cena: horno (2,5 kW) + dos fuegos de inducción (2,5 kW en uso real) + frigorífico, luces y tele (0,4 kW) = 5,4 kW. Si en ese momento evitas poner la lavadora, 5,75 kW es suficiente; si no cocinas así, 4,6 kW.</p>
<p>Truco: las placas de inducción modernas permiten <strong>limitar su potencia total</strong> y casi todos los electrodomésticos tienen inicio diferido. Organizarte puede ahorrarte 1 kW contratado.</p>
<h2>Mira tu potencia máxima real</h2>
<p>En la web o app de tu distribuidora eléctrica (no la comercializadora) puedes ver las <strong>potencias máximas demandadas</strong> cada mes. Si nunca pasas de 3 kW y tienes 5,75 contratados, estás pagando de más.</p>
<h2>¿Cuánto se ahorra?</h2>
<p>El término de potencia (peajes, cargos y margen de la comercializadora) suele costar entre 30 y 45 € por kW al año antes de impuestos, según la tarifa. Bajar de 5,75 a 4,6 kW (1,15 kW menos) ahorra aproximadamente 35-50 € al año, más los impuestos correspondientes.</p>
<h2>Cómo cambiarla</h2>
<p>Se solicita a tu comercializadora. Bajar potencia suele tener un coste regulado pequeño (derechos de enganche) que se recupera en pocos meses; subirla puede costar algo más. Además, puedes contratar potencias distintas en punta (P1) y valle (P2): útil si cargas el coche de noche.</p>`,
  },
  {
    slug: 'aire-acondicionado-o-ventilador',
    titulo: '¿Aire acondicionado o ventilador? Cuánto gasta cada uno',
    seoTitulo: '¿Aire acondicionado o ventilador? Cuánto gasta cada uno al mes',
    descripcion: 'Consumo real de aire acondicionado split, portátil, ventilador y climatizador evaporativo, y cómo combinarlos para pasar el verano gastando menos.',
    resumen: 'Consumo real del split, el portátil y el ventilador.',
    html: `
<p>Un <a href="/cuanto-gasta/ventilador/">ventilador</a> gasta entre 10 y 20 veces menos que un <a href="/cuanto-gasta/aire-acondicionado/">aire acondicionado</a>, pero no hace lo mismo: el ventilador no baja la temperatura de la habitación, solo mejora la sensación térmica moviendo el aire sobre tu piel.</p>
<h2>Consumo mensual estimado</h2>
{{tablaVerano}}
<p class="muted">8 horas al día durante 30 días, con el precio medio de los últimos 30 días ({{media30con}} €/kWh con impuestos).</p>
<h2>La combinación que más ahorra</h2>
<p>Usa el aire acondicionado a <strong>26-27 °C con el ventilador encendido</strong>: la sensación es parecida a tener el aire a 24 °C y el consumo del aire baja entre un 15 % y un 25 %.</p>
<h2>¿Y el climatizador evaporativo?</h2>
<p>Un <a href="/cuanto-gasta/climatizador-evaporativo/">climatizador evaporativo</a> consume como un ventilador y puede bajar 2-5 °C el aire en climas secos (Madrid, interior de Andalucía, Aragón). En la costa, con humedad alta, apenas enfría.</p>
<h2>Portátil frente a split</h2>
<p>Los <a href="/cuanto-gasta/aire-acondicionado-portatil/">aires portátiles</a> consumen como un split pero enfrían bastante menos, porque el aparato está dentro y el tubo de salida hace entrar aire caliente. Si puedes instalar un split, a medio plazo sale más barato.</p>`,
  },
];
