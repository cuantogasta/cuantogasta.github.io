// Guías de compra (qué mirar y qué tipo elegir) y cajas de "¿y si lo cambias?" con el ahorro anual.
// Sin marcas ni precios: son recomendaciones por tipo de producto, que no caducan.

export const COMPRAS = {
  'radiador-de-aceite': {
    criterios: ['Termostato regulable y, a ser posible, temporizador o programación.', 'Potencia según la estancia: unos 100 W por m² (1.500 W para 12-15 m²).', 'Varios niveles de potencia para no ir siempre al máximo.', 'Protección antivuelco y contra sobrecalentamiento.'],
    opciones: [
      { t: 'Compacto de 1.000-1.500 W', d: 'Dormitorios y despachos pequeños.', q: 'radiador de aceite 1500w termostato' },
      { t: '2.000 W con temporizador', d: 'Salones medianos: prográmalo en las horas baratas.', q: 'radiador de aceite 2000w temporizador' },
      { t: 'Con wifi y programación', d: 'Horarios automáticos y control desde el móvil.', q: 'radiador de aceite wifi programable' },
    ],
  },
  calefactor: {
    criterios: ['Cerámico mejor que de resistencia vista: reparte mejor el calor y es más silencioso.', 'Termostato y dos potencias (1.000/2.000 W).', 'Apagado automático por vuelco y temporizador.'],
    opciones: [
      { t: 'Cerámico de sobremesa', d: 'Baño o despacho: calor en segundos.', q: 'calefactor ceramico termostato' },
      { t: 'De baño (IP21/IP24)', d: 'Preparado para la humedad, con temporizador.', q: 'calefactor baño ip24' },
      { t: 'De torre oscilante', d: 'Reparte el calor en estancias algo mayores.', q: 'calefactor ceramico torre oscilante' },
    ],
  },
  'estufa-electrica': {
    criterios: ['Elige el número de tubos según el uso: con uno (400 W) basta para calentarte tú.', 'Infrarrojos de carbono: calor más agradable y rápido.', 'Interruptor de seguridad antivuelco.'],
    opciones: [
      { t: 'Estufa de cuarzo o halógena', d: 'Económica, para ratos cortos.', q: 'estufa halogena 3 tubos' },
      { t: 'Infrarrojos de carbono', d: 'Calor directo y rápido a 1-2 metros.', q: 'estufa infrarrojos carbono' },
    ],
  },
  'emisor-termico': {
    criterios: ['Termostato digital preciso (±0,5 °C) y programación semanal.', 'Detección de ventana abierta y modo ausencia.', 'Potencia: 80-100 W por m².', 'Desconfía de promesas de "consumo mínimo": el ahorro viene de la programación.'],
    opciones: [
      { t: 'Emisor de fluido programable', d: 'Mucha inercia, calor uniforme.', q: 'emisor termico fluido programable' },
      { t: 'Emisor seco con wifi', d: 'Control desde el móvil y horarios por estancia.', q: 'emisor termico wifi bajo consumo' },
    ],
  },
  'bomba-de-calor': {
    criterios: ['Mira el SCOP (calor) y el SEER (frío): cuanto más alto, menos gasta.', 'Inverter siempre: modula la potencia y gasta mucho menos que uno on/off.', 'Frigorías según la estancia: unas 100 por m².', 'Gas R32 y wifi para programarlo en horas baratas.'],
    opciones: [
      { t: 'Split 2.250-2.600 frigorías', d: 'Dormitorios de hasta 20-25 m².', q: 'aire acondicionado split inverter 2250 frigorias bomba de calor' },
      { t: 'Split 3.000-3.500 frigorías', d: 'Salones de 25-35 m².', q: 'aire acondicionado split inverter 3000 frigorias bomba de calor' },
      { t: 'Con wifi', d: 'Enciéndelo antes de llegar y aprovecha las horas baratas.', q: 'aire acondicionado split wifi bomba de calor' },
    ],
  },
  'brasero-electrico': {
    criterios: ['Varias potencias (400-900 W) y termostato.', 'Faldillas gruesas: son las que realmente ahorran.', 'Protección de rejilla y apagado de seguridad.'],
    opciones: [
      { t: 'Brasero para mesa camilla', d: 'El clásico, eficiente para el sofá.', q: 'brasero electrico mesa camilla' },
      { t: 'Faldillas térmicas', d: 'Retienen el calor bajo la mesa.', q: 'faldillas mesa camilla' },
    ],
  },
  'manta-electrica': {
    criterios: ['Apagado automático tras 1-3 horas.', 'Varios niveles de temperatura.', 'Lavable a máquina (mando extraíble).'],
    opciones: [
      { t: 'Manta para el sofá', d: 'Para bajar la calefacción 2-3 grados.', q: 'manta electrica sofa' },
      { t: 'Calientacamas', d: 'Precalienta la cama en 15 minutos.', q: 'calientacamas electrico' },
    ],
  },
  'toallero-electrico': {
    titulo: 'Cómo hacer que el toallero gaste menos',
    criterios: ['Temporizador o programación horaria: evita que esté encendido todo el día.', 'Potencia de 300-500 W, suficiente para secar toallas.', 'Protección IP adecuada para el baño.'],
    opciones: [
      { t: 'Toallero con temporizador', d: 'Se apaga solo tras 1-2 horas.', q: 'toallero electrico temporizador' },
      { t: 'Enchufe programable', d: 'Programa tu toallero actual en 1 minuto.', q: 'enchufe programable digital' },
    ],
  },
  'aire-acondicionado': {
    criterios: ['SEER alto (A++ o mejor): gasta casi la mitad que un equipo antiguo.', 'Inverter y gas R32.', '100 frigorías por m² aproximadamente.', 'Bomba de calor: te sirve también como calefacción barata.'],
    opciones: [
      { t: 'Split 2.250 frigorías', d: 'Dormitorios de hasta 20-25 m².', q: 'aire acondicionado split inverter 2250 frigorias' },
      { t: 'Split 3.000 frigorías', d: 'Salones de 25-35 m².', q: 'aire acondicionado split inverter 3000 frigorias' },
    ],
  },
  'aire-acondicionado-portatil': {
    criterios: ['Mejor de doble tubo: enfría más con el mismo consumo.', 'Kit de sellado de ventana incluido.', 'Si puedes instalar un split, a medio plazo sale más barato.'],
    opciones: [
      { t: 'Portátil de 9.000 BTU', d: 'Habitaciones de hasta 20 m².', q: 'aire acondicionado portatil 9000 btu' },
      { t: 'Kit de cierre para ventana', d: 'Mejora mucho el rendimiento de tu portátil.', q: 'kit cierre ventana aire acondicionado portatil' },
    ],
  },
  ventilador: {
    criterios: ['Motor DC: hasta un 60 % menos de consumo y más silencioso.', 'Mando y temporizador para la noche.', 'De techo para estancias grandes; de pie para uso flexible.'],
    opciones: [
      { t: 'De pie con motor DC', d: 'Silencioso y de bajo consumo.', q: 'ventilador de pie motor dc silencioso' },
      { t: 'De techo con luz', d: 'Salones y dormitorios: ilumina y refresca.', q: 'ventilador de techo motor dc luz led' },
    ],
  },
  'climatizador-evaporativo': {
    criterios: ['Solo funciona bien en climas secos (interior peninsular).', 'Depósito grande y acumuladores de hielo.', 'Para la costa, mejor un ventilador.'],
    opciones: [{ t: 'Climatizador evaporativo', d: 'Consumo de ventilador, algo de frescor extra.', q: 'climatizador evaporativo' }],
  },
  deshumidificador: {
    criterios: ['De compresor para casas habitadas (más eficiente por encima de 15 °C).', 'Higrostato para fijar el 50 % de humedad.', 'Capacidad en litros/día según la estancia (10-12 l para pisos medianos).', 'Modo secado de ropa.'],
    opciones: [
      { t: 'Compresor 10-12 l/día', d: 'Pisos medianos y secado de ropa.', q: 'deshumidificador 12 litros compresor' },
      { t: 'Desecante', d: 'Trasteros y casas frías sin calefacción.', q: 'deshumidificador desecante' },
    ],
  },
  'purificador-de-aire': {
    criterios: ['Filtro HEPA H13 de verdad.', 'CADR adecuado al tamaño de la habitación.', 'Modo automático y nocturno.', 'Precio de los filtros de recambio.'],
    opciones: [{ t: 'Purificador HEPA H13', d: 'Para alergias, polvo y mascotas.', q: 'purificador de aire hepa h13' }],
  },
  'freidora-de-aire': {
    criterios: ['Capacidad: 3-4 litros para 1-2 personas; 5-6 litros para familias.', 'Doble cesta si cocinas dos cosas a la vez.', 'Ventana para ver sin abrir (no se escapa el calor).', 'Cesta apta para lavavajillas.'],
    opciones: [
      { t: 'Compacta 3-4 litros', d: 'Para 1-2 personas, la que menos gasta.', q: 'freidora de aire 4 litros' },
      { t: 'Familiar 5-6 litros', d: 'Para 3-4 personas.', q: 'freidora de aire 6 litros' },
      { t: 'Doble cesta', d: 'Dos alimentos a la vez, menos tandas.', q: 'freidora de aire doble cesta' },
    ],
  },
  horno: {
    criterios: ['Clase energética A o superior.', 'Aire forzado (convección): cocina a 20 °C menos.', 'Buena puerta con triple cristal: pierde menos calor.'],
    opciones: [
      { t: 'Horno multifunción clase A+', d: 'Para empotrar, con aire forzado.', q: 'horno multifuncion clase a+' },
      { t: 'Mini horno de sobremesa', d: 'Para raciones pequeñas, gasta mucho menos.', q: 'mini horno electrico conveccion' },
    ],
  },
  microondas: {
    criterios: ['Con grill si lo vas a usar para gratinar.', 'Modo de bajo consumo en espera (sin reloj encendido).', '20-25 litros es suficiente para casi todos los hogares.'],
    opciones: [{ t: 'Microondas con grill', d: 'Recalienta y gratina sin encender el horno.', q: 'microondas con grill 20 litros' }],
  },
  'placa-de-induccion': {
    criterios: ['Limitador de potencia total para no subir la potencia contratada.', 'Zonas flexibles si usas ollas grandes.', 'Función booster solo para hervir rápido.'],
    opciones: [
      { t: 'Placa de inducción de 3 zonas', d: 'La opción más habitual para renovar la vitro.', q: 'placa induccion 3 zonas' },
      { t: 'Placa de inducción portátil', d: 'Una zona extra o para cocinas sin obra.', q: 'placa induccion portatil' },
    ],
  },
  'hervidor-de-agua': {
    criterios: ['Indicador de nivel para hervir solo lo necesario.', 'Control de temperatura (té, café, biberones).', 'Apagado automático.'],
    opciones: [{ t: 'Hervidor con temperatura regulable', d: 'No hierve más de lo necesario.', q: 'hervidor de agua temperatura regulable' }],
  },
  cafetera: {
    criterios: ['Apagado automático configurable.', 'Las de goteo, mejor con jarra térmica (sin placa calefactora).'],
    opciones: [{ t: 'Cafetera de goteo con jarra térmica', d: 'Mantiene el café caliente sin gastar luz.', q: 'cafetera goteo jarra termica' }],
  },
  frigorifico: {
    criterios: ['Mira el consumo en kWh/año de la etiqueta, no solo la letra.', 'Clase C o mejor con la etiqueta de 2021 (equivale a las antiguas A+++).', 'No Frost si no quieres descongelar.', 'Tamaño ajustado a tu hogar: uno vacío gasta igual.'],
    opciones: [
      { t: 'Combi clase C', d: 'El equilibrio entre precio y consumo.', q: 'frigorifico combi clase c no frost' },
      { t: 'Combi clase A o B', d: 'El que menos gasta, se amortiza en años.', q: 'frigorifico combi clase a' },
    ],
  },
  congelador: {
    criterios: ['Arcón si tienes espacio: pierde menos frío al abrirlo.', 'Consumo en kWh/año de la etiqueta.', 'Capacidad ajustada: lleno conserva mejor.'],
    opciones: [{ t: 'Arcón congelador clase E o mejor', d: 'Bajo consumo para grandes compras.', q: 'arcon congelador bajo consumo' }],
  },
  lavavajillas: {
    criterios: ['Clase B o C (etiqueta 2021) y consumo por ciclo ECO bajo (0,7-0,8 kWh).', 'Inicio diferido: para lavar en la hora más barata.', 'Capacidad de 13-14 servicios para familias.'],
    opciones: [
      { t: 'Lavavajillas 60 cm clase B/C', d: 'Para familias, con inicio diferido.', q: 'lavavajillas 60 cm clase b' },
      { t: 'Lavavajillas de 45 cm', d: 'Cocinas pequeñas y 1-3 personas.', q: 'lavavajillas 45 cm clase c' },
    ],
  },
  lavadora: {
    criterios: ['Clase A (etiqueta 2021): unos 0,5 kWh por lavado ECO.', 'Inicio diferido y programas de 20-30 °C.', 'Motor inverter: más silenciosa y duradera.', '8-9 kg para familias.'],
    opciones: [
      { t: 'Lavadora 8 kg clase A', d: 'La más habitual para 2-4 personas.', q: 'lavadora 8 kg clase a' },
      { t: 'Lavadora-secadora', d: 'Si no tienes sitio para secadora aparte.', q: 'lavadora secadora clase a' },
    ],
  },
  secadora: {
    criterios: ['Bomba de calor siempre: gasta 3 veces menos que una de condensación.', 'Clase A++ o A+++.', 'Sensor de humedad para no secar de más.'],
    opciones: [
      { t: 'Secadora con bomba de calor', d: 'La única que compensa por consumo.', q: 'secadora bomba de calor a+++' },
      { t: 'Deshumidificador para tender', d: 'Alternativa barata para secar en casa.', q: 'deshumidificador modo secado ropa' },
    ],
  },
  plancha: {
    criterios: ['Centro de planchado si planchas mucho: menos tiempo por prenda.', 'Apagado automático.', 'Suela cerámica que se desliza mejor.'],
    opciones: [
      { t: 'Centro de planchado', d: 'Plancha más rápido, gasta menos por prenda.', q: 'centro de planchado' },
      { t: 'Plancha de vapor con autoapagado', d: 'Para uso ocasional.', q: 'plancha vapor apagado automatico' },
    ],
  },
  'termo-electrico': {
    criterios: ['Termo con bomba de calor: gasta 2-3 veces menos que uno de resistencia.', 'Buen aislamiento (pérdidas bajas en la etiqueta).', 'Programación o modo ECO para calentar en horas baratas.', 'Capacidad: 50 l (1-2 personas), 80 l (3), 100 l (4).'],
    opciones: [
      { t: 'Termo con bomba de calor', d: 'El que menos gasta con diferencia.', q: 'termo bomba de calor 100 litros' },
      { t: 'Termo eléctrico 80 l programable', d: 'Si no tienes espacio para bomba de calor.', q: 'termo electrico 80 litros programable' },
      { t: 'Enchufe o temporizador para el termo', d: 'Programa tu termo actual en horas baratas.', q: 'temporizador termo electrico' },
    ],
  },
  television: {
    titulo: 'Cómo hacer que la tele gaste menos',
    criterios: ['Clase energética en modo SDR y en HDR.', 'Modo eco y sensor de luz ambiental.', 'El tamaño importa: un 65" gasta casi el doble que un 43".'],
    opciones: [{ t: 'Regleta con interruptor', d: 'Apaga tele, decodificador y consola de golpe.', q: 'regleta con interruptor' }],
  },
  consola: {
    titulo: 'Cómo hacer que la consola gaste menos',
    criterios: ['Desactiva el encendido instantáneo.', 'Una regleta con interruptor corta el standby de todo el rincón.'],
    opciones: [{ t: 'Regleta con interruptor', d: 'Corta el consumo en espera de consola y tele.', q: 'regleta con interruptor individual' }],
  },
  bombilla: {
    criterios: ['Compara por lúmenes: 806 lm equivale a la antigua de 60 W.', 'Temperatura de color: 2.700 K cálida para casa, 4.000 K para cocina o trabajo.', 'Casquillo correcto (E27, E14, GU10).'],
    opciones: [
      { t: 'Pack de bombillas LED E27', d: 'Cambia de golpe las que más usas.', q: 'bombillas led e27 pack 806 lumenes' },
      { t: 'LED GU10', d: 'Para focos empotrados halógenos.', q: 'bombillas led gu10 pack' },
    ],
  },
  aspiradora: {
    criterios: ['Sin cable: menos consumo y más cómoda para el día a día.', 'Autonomía real de 40+ minutos.', 'Filtro HEPA si hay alergias.'],
    opciones: [{ t: 'Aspiradora escoba sin cable', d: 'Gasta menos que una de trineo.', q: 'aspiradora escoba sin cable' }],
  },
  'robot-aspirador': {
    criterios: ['Mapeo láser (LiDAR): limpia en menos tiempo.', 'Base sin secado por aire caliente si quieres gastar menos.', 'Programación por app.'],
    opciones: [{ t: 'Robot aspirador con mapeo', d: 'Limpia en menos tiempo y con menos cargas.', q: 'robot aspirador lidar' }],
  },
  'coche-electrico': {
    titulo: 'Qué necesitas para cargar en casa más barato',
    criterios: ['Wallbox programable para cargar en las horas baratas.', 'Cargador portátil con regulación de intensidad si cargas en un enchufe.'],
    opciones: [
      { t: 'Wallbox programable 7,4 kW', d: 'Carga completa en pocas horas baratas.', q: 'wallbox 7.4 kw programable' },
      { t: 'Cargador portátil Schuko-Tipo 2', d: 'Para cargar en un enchufe normal.', q: 'cargador portatil coche electrico schuko tipo 2' },
    ],
  },
  'depuradora-de-piscina': {
    criterios: ['Bomba de velocidad variable: hasta un 70 % menos de consumo.', 'Temporizador para filtrar en las horas solares.'],
    opciones: [{ t: 'Bomba de velocidad variable', d: 'Se amortiza en 2-3 temporadas.', q: 'bomba piscina velocidad variable' }],
  },
};

// "¿Y si lo cambias?": consumo anual actual frente a la alternativa (kWh/año).
export const MEJORAS = {
  'radiador-de-aceite': { de: 'tu radiador de 2.000 W (5 h/día en invierno)', a: 'una bomba de calor (split con SCOP 4)', kwhDe: 900, kwhA: 225, q: 'aire acondicionado split inverter bomba de calor', boton: 'Ver splits con bomba de calor' },
  calefactor: { de: 'un calefactor de 2.000 W (3 h/día en invierno)', a: 'una bomba de calor (split con SCOP 4)', kwhDe: 588, kwhA: 147, q: 'aire acondicionado split inverter bomba de calor', boton: 'Ver splits con bomba de calor' },
  'emisor-termico': { de: 'un emisor de 1.500 W (6 h/día en invierno)', a: 'una bomba de calor (split con SCOP 4)', kwhDe: 675, kwhA: 169, q: 'aire acondicionado split inverter bomba de calor', boton: 'Ver splits con bomba de calor' },
  'toallero-electrico': { de: 'el toallero encendido todo el día', a: 'programarlo 2 horas al día', kwhDe: 1512, kwhA: 126, q: 'enchufe programable digital', boton: 'Ver enchufes programables' },
  frigorifico: { de: 'un frigorífico de más de 10 años (380 kWh/año)', a: 'un combi nuevo de clase C (165 kWh/año)', kwhDe: 380, kwhA: 165, q: 'frigorifico combi clase c no frost', boton: 'Ver frigoríficos clase C' },
  congelador: { de: 'un congelador antiguo (400 kWh/año)', a: 'un arcón eficiente (200 kWh/año)', kwhDe: 400, kwhA: 200, q: 'arcon congelador bajo consumo', boton: 'Ver arcones eficientes' },
  secadora: { de: 'una secadora de condensación (3 secados/semana)', a: 'una con bomba de calor', kwhDe: 702, kwhA: 234, q: 'secadora bomba de calor a+++', boton: 'Ver secadoras con bomba de calor' },
  lavadora: { de: 'una lavadora de más de 10 años (1 kWh por lavado)', a: 'una clase A (0,5 kWh por lavado)', kwhDe: 208, kwhA: 104, q: 'lavadora 8 kg clase a', boton: 'Ver lavadoras clase A' },
  'termo-electrico': { de: 'un termo de resistencia (2 personas)', a: 'un termo con bomba de calor', kwhDe: 1314, kwhA: 487, q: 'termo bomba de calor 100 litros', boton: 'Ver termos con bomba de calor' },
  bombilla: { de: '6 halógenas de 42 W (5 h/día)', a: '6 bombillas LED de 9 W', kwhDe: 460, kwhA: 99, q: 'bombillas led e27 pack 806 lumenes', boton: 'Ver packs de bombillas LED' },
  'aire-acondicionado-portatil': { de: 'un aire portátil (5 h/día en verano)', a: 'un split inverter', kwhDe: 300, kwhA: 150, q: 'aire acondicionado split inverter 2250 frigorias', boton: 'Ver splits inverter' },
  consola: { de: 'la consola en modo de encendido instantáneo', a: 'el modo de ahorro de energía', kwhDe: 96, kwhA: 4, q: 'regleta con interruptor individual', boton: 'Ver regletas con interruptor', ajuste: true },
  'depuradora-de-piscina': { de: 'una bomba de 1 CV (6 h/día en verano)', a: 'una bomba de velocidad variable', kwhDe: 675, kwhA: 270, q: 'bomba piscina velocidad variable', boton: 'Ver bombas de velocidad variable' },
};

// Hubs de categoría (páginas propias con comparativa).
export const CATEGORIAS_INFO = {
  calefaccion: { slug: 'calefaccion', icono: 'flame', titulo: '¿Cuánto gasta la calefacción eléctrica?', desc: 'Comparativa del consumo de radiadores, calefactores, emisores, estufas, braseros y bomba de calor, con el precio de la luz actual.', intro: 'La calefacción es, con diferencia, lo que más dispara la factura en invierno. Todos los aparatos de resistencia (radiadores, emisores, calefactores, estufas) convierten 1 kWh en 1 kWh de calor; la bomba de calor da 3-4 veces más calor por cada kWh. Aquí tienes el coste real de cada uno.' },
  climatizacion: { slug: 'aire-acondicionado-y-ventilacion', icono: 'snow', titulo: '¿Cuánto gasta el aire acondicionado y la ventilación?', desc: 'Consumo de aire acondicionado split y portátil, ventiladores, climatizadores, deshumidificadores y purificadores en euros.', intro: 'Del ventilador al split inverter hay una diferencia de consumo de 10 a 20 veces. Compara cuánto cuesta cada opción para pasar el verano (o quitar la humedad en invierno) sin sustos en la factura.' },
  cocina: { slug: 'cocina', icono: 'horno', titulo: '¿Cuánto gastan los electrodomésticos de cocina?', desc: 'Consumo del horno, freidora de aire, vitrocerámica, inducción, microondas, frigorífico y más, en euros por uso y al mes.', intro: 'El frigorífico funciona día y noche; el horno y la vitro tienen mucha potencia pero se usan poco rato. Compara el coste real de cada aparato de la cocina y descubre dónde está el ahorro.' },
  lavado: { slug: 'lavadora-secadora-y-plancha', icono: 'lavadora', titulo: '¿Cuánto gastan la lavadora, la secadora y la plancha?', desc: 'Coste por lavado de la lavadora, la secadora, la plancha y el secador de pelo, y a qué hora conviene usarlos.', intro: 'Calentar agua y aire es lo que más gasta en la colada. La temperatura del programa y la hora a la que pones la lavadora o la secadora pueden cambiar el coste más de lo que imaginas.' },
  agua: { slug: 'agua-caliente', icono: 'gota', titulo: '¿Cuánto gasta calentar el agua?', desc: 'Consumo del termo eléctrico según las personas de la casa y cómo reducirlo.', intro: 'El termo eléctrico es uno de los mayores consumos de una casa totalmente eléctrica: calienta el agua y la mantiene caliente todo el día.' },
  electronica: { slug: 'electronica', icono: 'tv', titulo: '¿Cuánto gastan la tele, el ordenador y la consola?', desc: 'Consumo en euros de televisión, PC, portátil, consola, router y móvil, incluido el standby.', intro: 'Por separado gastan poco, pero muchos están encendidos (o en espera) muchas horas al día. Aquí tienes lo que cuesta cada uno.' },
  movilidad: { slug: 'movilidad-electrica', icono: 'coche', titulo: '¿Cuánto cuesta cargar un coche, patinete o bici eléctrica?', desc: 'Coste de cargar en casa un coche eléctrico, un patinete o una bicicleta eléctrica, y cuándo es más barato.', intro: 'Cargar en casa es la forma más barata de moverse, sobre todo si eliges bien la hora. Compara cuánto cuesta cada vehículo.' },
  hogar: { slug: 'hogar', icono: 'home', titulo: '¿Cuánto gastan las bombillas y otros aparatos de casa?', desc: 'Consumo de bombillas LED, aspiradoras, robots aspiradores y depuradoras de piscina.', intro: 'Pequeños consumos que suman: la iluminación, la limpieza y, si tienes, la piscina.' },
};
