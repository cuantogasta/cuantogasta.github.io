// Catálogo de aparatos. Cifras orientativas basadas en potencias habituales del mercado español
// y etiquetas energéticas UE. Modos de cálculo:
//  - potencia: W × fracción de uso real (termostato) × horas/día × días/mes
//  - ciclo:    kWh por uso × usos por semana
//  - anual:    kWh/año de la etiqueta energética

export const CATEGORIAS = {
  calefaccion: 'Calefacción',
  climatizacion: 'Aire acondicionado y ventilación',
  cocina: 'Cocina',
  lavado: 'Lavado y cuidado personal',
  agua: 'Agua caliente',
  electronica: 'Electrónica y ocio',
  movilidad: 'Movilidad eléctrica',
  hogar: 'Hogar e iluminación',
};

export const APARATOS = [
  // ---------------- CALEFACCIÓN ----------------
  {
    slug: 'radiador-de-aceite', nombre: 'radiador de aceite', plural: 'radiadores de aceite', art: 'un', cat: 'calefaccion',
    modo: 'potencia', potencias: [1000, 1500, 2000, 2500], potencia: 2000, ciclo: 0.6, horas: 5, dias: 30, diasAnio: 150,
    amazon: 'radiador de aceite bajo consumo termostato', temporada: 'invierno',
    intro: `<p>Un radiador de aceite calienta una resistencia eléctrica que transmite el calor a un aceite térmico sellado dentro de sus aletas. Tarda unos minutos en coger temperatura, pero sigue desprendiendo calor un buen rato después de apagarse, por eso es cómodo para mantener una habitación templada durante horas.</p>
<p>Su consumo real casi nunca coincide con la potencia de la etiqueta: cuando la habitación llega a la temperatura marcada, el termostato desconecta la resistencia y vuelve a conectarla cuando baja. En una estancia normal y bien cerrada suele estar a plena potencia entre el 50 % y el 70 % del tiempo.</p>`,
    depende: [
      'La potencia del modelo y la posición del selector (muchos tienen 2 o 3 niveles: por ejemplo 800, 1.200 y 2.000 W).',
      'La temperatura del termostato: cada grado de más supone aproximadamente un 7 % más de consumo.',
      'El aislamiento de la habitación y la diferencia de temperatura con el exterior.',
      'Las horas a las que lo usas si tienes tarifa PVPC: la misma hora puede costar el doble a las 21:00 que a las 15:00.',
    ],
    consejos: [
      'Pon el termostato entre 19 y 21 °C; por encima el gasto se dispara y el confort apenas mejora.',
      'Aprovecha su inercia: apágalo 30-45 minutos antes de salir de la habitación, seguirá calentando.',
      'No lo tapes ni pongas ropa encima: reduce el rendimiento y es peligroso.',
      'Si lo usas muchas horas al día, una bomba de calor (aire acondicionado con modo calor) gasta entre 3 y 4 veces menos para el mismo calor.',
    ],
    faq: [
      ['¿Gasta menos un radiador de aceite que un calefactor?', 'Por cada kWh consumido ambos producen la misma cantidad de calor, porque los dos funcionan con resistencia. El radiador de aceite reparte el calor de forma más suave y mantiene la temperatura con menos picos, mientras que el calefactor calienta antes. Para uso prolongado el radiador resulta más cómodo; para calentar un baño 15 minutos, el calefactor.'],
      ['¿Cuántos metros cuadrados calienta un radiador de aceite de 2.000 W?', 'Como regla general se calculan unos 100 W por metro cuadrado en una vivienda con aislamiento medio, así que un radiador de 2.000 W sirve para unos 15-20 m². En casas antiguas o muy frías conviene contar con 120-130 W/m².'],
    ],
    rel: ['calefactor', 'emisor-termico', 'bomba-de-calor', 'estufa-electrica'],
  },
  {
    slug: 'calefactor', nombre: 'calefactor', plural: 'calefactores', art: 'un', cat: 'calefaccion',
    modo: 'potencia', potencias: [1000, 1500, 2000, 2200], potencia: 2000, ciclo: 0.7, horas: 3, dias: 30, diasAnio: 140,
    amazon: 'calefactor ceramico bajo consumo', temporada: 'invierno',
    intro: `<p>Los calefactores (de ventilador o cerámicos) hacen pasar aire por una resistencia caliente y lo impulsan a la habitación. Calientan en segundos, por eso son ideales para baños, despachos pequeños o un rato antes de dormir.</p>
<p>Los cerámicos con termostato regulan mejor la potencia y suelen consumir algo menos en la práctica, aunque por cada kWh dan exactamente el mismo calor que cualquier otro aparato de resistencia.</p>`,
    depende: [
      'La potencia elegida: casi todos tienen un modo de media potencia (1.000 W) y uno máximo (2.000 W).',
      'Si tiene termostato: sin él funciona siempre a tope; con él se desconecta a ratos.',
      'El tamaño de la estancia: en espacios grandes nunca llega a la temperatura y no para.',
    ],
    consejos: [
      'Úsalo para calentar rápido espacios pequeños y apágalo después; como calefacción principal es de lo más caro.',
      'Elige un modelo con termostato y temporizador para que no funcione más de lo necesario.',
      'Cierra puertas: un calefactor de 2.000 W calienta bien 10-15 m², no un salón abierto.',
    ],
    faq: [
      ['¿Es caro un calefactor cerámico?', 'Un calefactor cerámico de 2.000 W a plena potencia consume 2 kWh cada hora. El precio por hora depende de tu tarifa, pero es de los aparatos de mayor potencia de la casa, así que usarlo muchas horas al día sale caro. Para uso corto y puntual es económico.'],
      ['¿Qué es mejor, calefactor o radiador de aceite?', 'El calefactor calienta mucho más rápido; el radiador de aceite mantiene mejor el calor y es más silencioso. En consumo por kWh son iguales.'],
    ],
    rel: ['radiador-de-aceite', 'estufa-electrica', 'emisor-termico', 'toallero-electrico'],
  },
  {
    slug: 'estufa-electrica', nombre: 'estufa eléctrica', plural: 'estufas eléctricas', art: 'una', cat: 'calefaccion',
    modo: 'potencia', potencias: [400, 800, 1200, 1600], potencia: 1200, ciclo: 1, horas: 3, dias: 30, diasAnio: 140,
    amazon: 'estufa electrica halogena bajo consumo', temporada: 'invierno',
    intro: `<p>Las estufas eléctricas de cuarzo, halógenas o de infrarrojos calientan por radiación: no calientan el aire de la habitación, sino directamente a las personas y objetos que tienen delante, como el sol. Por eso dan sensación de calor inmediata aunque la habitación siga fría.</p>
<p>Suelen tener 2 o 3 tubos que se encienden por separado (400 W cada uno) y la mayoría no tiene termostato, así que consumen su potencia nominal todo el tiempo que están encendidas.</p>`,
    depende: [
      'Cuántos tubos o niveles enciendes: con un tubo de 400 W el gasto es un tercio que con tres.',
      'El tiempo de uso, porque no se desconectan solas.',
      'La distancia: funcionan bien a 1-2 metros, más lejos el calor se pierde.',
    ],
    consejos: [
      'Úsala para calentarte tú, no la habitación: colócala cerca y enfocada hacia donde estás sentado.',
      'Empieza con todos los tubos y baja a uno en cuanto entres en calor.',
      'Para el teletrabajo puede salir más barata que calentar toda la casa: 400-800 W frente a varios kW.',
    ],
    faq: [
      ['¿Cuánto gasta una estufa halógena de 1.200 W?', 'Con los tres tubos encendidos consume 1,2 kWh por hora. Con un solo tubo (400 W), 0,4 kWh por hora. Multiplica esos kWh por el precio de la luz para saber el coste.'],
      ['¿Las estufas de infrarrojos gastan menos?', 'Consumen lo mismo por kWh, pero como calientan directamente a la persona puedes sentir calor con menos potencia y menos tiempo, lo que en la práctica reduce el gasto si solo necesitas calentarte tú.'],
    ],
    rel: ['brasero-electrico', 'calefactor', 'radiador-de-aceite', 'manta-electrica'],
  },
  {
    slug: 'emisor-termico', nombre: 'emisor térmico', plural: 'emisores térmicos', art: 'un', cat: 'calefaccion',
    modo: 'potencia', potencias: [500, 1000, 1500, 2000], potencia: 1500, ciclo: 0.5, horas: 6, dias: 30, diasAnio: 150,
    amazon: 'emisor termico bajo consumo programable wifi', temporada: 'invierno',
    intro: `<p>Los emisores térmicos (de fluido o secos, cerámicos o de aluminio) son radiadores eléctricos fijos a la pared, con termostato digital y casi siempre programación horaria. Se venden muchas veces como “de bajo consumo”, pero ningún aparato de resistencia produce más calor por kWh que otro: 1 kWh de electricidad son 1 kWh de calor.</p>
<p>Su ventaja real es el control: el termostato preciso y la programación evitan que estén encendidos cuando no hace falta, y su inercia hace que trabajen a plena potencia solo una parte del tiempo, normalmente entre el 40 % y el 60 %.</p>`,
    depende: [
      'La potencia instalada por habitación (lo habitual es 80-100 W por m²).',
      'La temperatura de consigna y si usas el modo económico o antihielo cuando no estás.',
      'El horario de uso, especialmente con tarifa PVPC.',
    ],
    consejos: [
      'Programa 20-21 °C cuando estés y 16-17 °C por la noche o fuera de casa.',
      'Con PVPC, programa un precalentamiento en horas baratas y deja que la inercia haga el resto.',
      'Desconfía de promesas de “ahorro del 50 %” respecto a otros radiadores: el ahorro viene de la programación, no del aparato.',
    ],
    faq: [
      ['¿De verdad un emisor térmico consume menos?', 'No por kWh. Un emisor de 1.500 W produce el mismo calor que cualquier otro aparato de 1.500 W. Puede consumir menos en la práctica si su termostato y programación evitan horas innecesarias.'],
      ['¿Qué potencia de emisor necesito?', 'Calcula unos 80-100 W por metro cuadrado con buen aislamiento y 120 W/m² en casas frías. Para una habitación de 12 m², un emisor de 1.000-1.200 W.'],
    ],
    rel: ['radiador-de-aceite', 'bomba-de-calor', 'calefactor', 'toallero-electrico'],
  },
  {
    slug: 'bomba-de-calor', nombre: 'bomba de calor', titulo: '¿Cuánto gasta una bomba de calor?', corto: 'bomba de calor (aire acondicionado)', plural: 'bombas de calor', art: 'una', cat: 'calefaccion',
    modo: 'potencia', potencias: [500, 750, 1000, 1300], potencia: 750, ciclo: 1, horas: 6, dias: 30, diasAnio: 150,
    etiquetaPotencia: 'Consumo eléctrico medio',
    amazon: 'aire acondicionado split inverter bomba de calor 3000 frigorias', temporada: 'invierno',
    intro: `<p>Un aire acondicionado con bomba de calor no fabrica calor con una resistencia: lo “bombea” desde el aire exterior. Por cada kWh de electricidad entrega entre 3 y 4 kWh de calor (es lo que mide el SCOP), así que es con diferencia la forma más barata de calentar con electricidad.</p>
<p>Un split de 3.000 frigorías (unos 3,5 kW térmicos) puede tener picos de 1.000-1.200 W al arrancar, pero los equipos inverter, una vez alcanzada la temperatura, trabajan modulando y su consumo medio suele quedarse entre 500 y 900 W.</p>`,
    depende: [
      'La eficiencia del equipo (SCOP): un SCOP 4 gasta un 25 % menos que un SCOP 3 para el mismo calor.',
      'La temperatura exterior: con heladas el rendimiento baja.',
      'La temperatura que pidas y el tamaño de la estancia.',
    ],
    consejos: [
      'No lo apagues y enciendas constantemente: un inverter es más eficiente manteniendo la temperatura.',
      'Pon 20-21 °C; cada grado extra son 7-8 % más de consumo.',
      'Limpia los filtros cada pocas semanas en temporada: filtros sucios = más consumo.',
      'Si tienes radiadores de resistencia y usas la calefacción muchas horas, cambiar a bomba de calor se amortiza en pocos inviernos.',
    ],
    faq: [
      ['¿Gasta menos la bomba de calor que un radiador eléctrico?', 'Sí, entre 3 y 4 veces menos para producir el mismo calor. Un radiador de 2.000 W da 2 kW de calor consumiendo 2 kWh; una bomba de calor da esos 2 kW de calor consumiendo unos 0,5-0,7 kWh.'],
      ['¿Cuánto gasta un aire acondicionado en calefacción al mes?', 'Con un consumo medio de 750 W y 6 horas diarias, unos 135 kWh al mes. El coste exacto lo tienes en la calculadora de esta página con el precio de la luz actual.'],
    ],
    rel: ['aire-acondicionado', 'radiador-de-aceite', 'emisor-termico', 'deshumidificador'],
  },
  {
    slug: 'brasero-electrico', nombre: 'brasero eléctrico', plural: 'braseros eléctricos', art: 'un', cat: 'calefaccion',
    modo: 'potencia', potencias: [400, 600, 900], potencia: 600, ciclo: 0.7, horas: 4, dias: 30, diasAnio: 130,
    amazon: 'brasero electrico mesa camilla', temporada: 'invierno',
    intro: `<p>El brasero eléctrico de mesa camilla sigue siendo una de las formas más eficientes de pasar el invierno en el sofá: con las faldillas puestas, calienta un espacio muy pequeño (tus piernas) con apenas 400-900 W, en lugar de calentar toda la habitación.</p>
<p>Los modelos modernos tienen 2 o 3 potencias y algunos termostato, así que su consumo real suele ser algo menor que el nominal.</p>`,
    depende: [
      'La potencia seleccionada (muchos van de 400 a 900 W).',
      'Que uses faldillas gruesas que retengan el calor.',
      'Si tiene termostato o funciona siempre al máximo.',
    ],
    consejos: [
      'Combínalo con la calefacción general más baja (17-18 °C): ahorras mucho más que calentando toda la casa a 21 °C.',
      'Usa la potencia mínima en cuanto la mesa coja temperatura.',
      'No lo dejes encendido sin nadie y revisa el cable: es un aparato que se usa muchas horas.',
    ],
    faq: [
      ['¿Gasta mucho un brasero eléctrico?', 'No comparado con otros aparatos de calefacción. Uno de 600 W consume 0,6 kWh por hora como máximo, menos de un tercio que un radiador de 2.000 W.'],
      ['¿Qué brasero gasta menos, de resistencia o halógeno?', 'Por kWh producen el mismo calor. Los halógenos o de infrarrojos dan sensación de calor antes, lo que permite usar menos potencia.'],
    ],
    rel: ['manta-electrica', 'estufa-electrica', 'radiador-de-aceite'],
  },
  {
    slug: 'manta-electrica', nombre: 'manta eléctrica', plural: 'mantas eléctricas', art: 'una', cat: 'calefaccion',
    modo: 'potencia', potencias: [60, 100, 150], potencia: 100, ciclo: 0.6, horas: 2, dias: 30, diasAnio: 120,
    amazon: 'manta electrica', temporada: 'invierno',
    intro: `<p>Las mantas eléctricas y los calientacamas son de los aparatos de calefacción más baratos de usar: entre 60 y 150 W, frente a los 1.000-2.000 W de un radiador. Calientan directamente tu cuerpo o la cama, sin malgastar energía en el aire de la habitación.</p>`,
    depende: [
      'El tamaño (una manta de sofá individual gasta menos que un calientacamas de matrimonio).',
      'El nivel de temperatura: la mayoría tiene 3 a 9 posiciones.',
      'El tiempo de uso; muchas se apagan solas tras 1-3 horas.',
    ],
    consejos: [
      'Precalienta la cama 15-20 minutos al nivel alto y luego bájalo o apágalo.',
      'En el sofá, una manta eléctrica permite bajar la calefacción 2-3 grados: ese es el verdadero ahorro.',
      'Elige modelos con apagado automático y lavables.',
    ],
    faq: [
      ['¿Cuánto cuesta dejar la manta eléctrica toda la noche?', 'Una manta de 100 W al nivel medio consume unos 0,05-0,06 kWh por hora; 8 horas son menos de 0,5 kWh. Aun así, por seguridad se recomienda usar el apagado automático.'],
      ['¿Es más barata una manta eléctrica que la calefacción?', 'Mucho más: consume 10-20 veces menos que un radiador. No calienta la habitación, pero si estás quieto en el sofá o en la cama, te mantiene caliente por céntimos.'],
    ],
    rel: ['brasero-electrico', 'estufa-electrica', 'radiador-de-aceite'],
  },
  {
    slug: 'toallero-electrico', nombre: 'toallero eléctrico', plural: 'toalleros eléctricos', art: 'un', cat: 'calefaccion',
    modo: 'potencia', potencias: [300, 500, 750], potencia: 500, ciclo: 0.7, horas: 3, dias: 30, diasAnio: 180,
    amazon: 'toallero electrico bajo consumo programable', temporada: 'invierno',
    intro: `<p>Un radiador toallero eléctrico seca las toallas y templa el baño. Su potencia es moderada (300-750 W) pero el riesgo es dejarlo encendido todo el día: así se convierte en uno de los consumos ocultos de la factura.</p>`,
    depende: ['La potencia del modelo.', 'Si tiene termostato y programación.', 'Las horas que está encendido.'],
    consejos: [
      'Prográmalo solo para la hora antes y después de la ducha.',
      'Un modelo con temporizador de 1-2 horas evita olvidos.',
      'Para secar toallas basta con potencias bajas; no necesitas el máximo.',
    ],
    faq: [
      ['¿Cuánto gasta un toallero eléctrico encendido todo el día?', 'Uno de 500 W con termostato puede consumir 6-8 kWh al día si está encendido 24 horas. Programarlo para 2-3 horas reduce el gasto más de un 80 %.'],
    ],
    rel: ['calefactor', 'emisor-termico', 'termo-electrico'],
  },

  // ---------------- CLIMATIZACIÓN ----------------
  {
    slug: 'aire-acondicionado', nombre: 'aire acondicionado', plural: 'aires acondicionados', art: 'un', cat: 'climatizacion',
    modo: 'potencia', potencias: [500, 800, 1100, 1500], potencia: 800, ciclo: 1, horas: 6, dias: 30, diasAnio: 90,
    etiquetaPotencia: 'Consumo eléctrico medio',
    amazon: 'aire acondicionado split inverter 3000 frigorias', temporada: 'verano',
    intro: `<p>Un aire acondicionado split inverter de 3.000 frigorías (unos 3,5 kW de frío) tiene una potencia eléctrica máxima de 1.000-1.200 W, pero solo llega a ella al arrancar o con mucho calor. Una vez la habitación está fresca, modula y su consumo medio suele estar entre 500 y 900 W.</p>
<p>La clave está en el SEER (eficiencia estacional): un equipo A+++ con SEER 8 gasta casi la mitad que uno antiguo con SEER 4 para enfriar lo mismo.</p>`,
    depende: [
      'La eficiencia (SEER) y la potencia frigorífica del equipo.',
      'La temperatura de consigna: cada grado menos supone un 7-8 % más de consumo.',
      'El sol que entra en la habitación y el aislamiento.',
      'La hora: por la tarde coincide con las horas punta más caras.',
    ],
    consejos: [
      'Ponlo a 25-26 °C: la diferencia de confort con 22 °C es pequeña y el ahorro es grande.',
      'Baja persianas y toldos en las horas de sol; el aparato trabajará mucho menos.',
      'Con PVPC, enfría la casa en las horas centrales (más baratas por la solar) y mantén por la tarde.',
      'Usa el modo deshumidificación (dry) en días húmedos pero no muy calurosos.',
    ],
    faq: [
      ['¿Cuánto gasta el aire acondicionado toda la noche?', 'Un split inverter a 26 °C en modo noche puede consumir 300-500 W de media, es decir, 2,5-4 kWh en 8 horas.'],
      ['¿Gasta más encenderlo y apagarlo o dejarlo puesto?', 'En equipos inverter suele ser mejor mantenerlo encendido a una temperatura razonable mientras estás en casa que apagarlo y forzarlo cada vez. Si sales varias horas, apágalo.'],
    ],
    rel: ['aire-acondicionado-portatil', 'ventilador', 'climatizador-evaporativo', 'bomba-de-calor'],
  },
  {
    slug: 'aire-acondicionado-portatil', nombre: 'aire acondicionado portátil', plural: 'aires acondicionados portátiles', art: 'un', cat: 'climatizacion',
    modo: 'potencia', potencias: [800, 1000, 1300], potencia: 1000, ciclo: 0.8, horas: 5, dias: 30, diasAnio: 75,
    amazon: 'aire acondicionado portatil bajo consumo', temporada: 'verano',
    intro: `<p>Los aires acondicionados portátiles son prácticos porque no requieren obra, pero son bastante menos eficientes que un split: el compresor está dentro de la habitación y, al expulsar el aire caliente por un solo tubo, crean una depresión que hace entrar aire caliente del exterior.</p>
<p>Un portátil de 9.000 BTU suele consumir 900-1.100 W para dar unos 2,6 kW de frío. Un split que da ese mismo frío puede consumir menos de la mitad.</p>`,
    depende: ['Su potencia y eficiencia (EER).', 'Que el tubo salga por una ventana bien sellada.', 'El tamaño de la habitación (rinden bien hasta 15-20 m²).'],
    consejos: [
      'Sella la ventana alrededor del tubo con un kit de cierre: es el truco que más mejora su rendimiento.',
      'Úsalo en una habitación cerrada, no para enfriar toda la casa.',
      'Si lo vas a usar todos los veranos, un split se amortiza en pocos años.',
    ],
    faq: [
      ['¿Gasta mucho un aire acondicionado portátil?', 'Sí, para el frío que da. Consume como un split a plena potencia pero enfría menos, así que trabaja más horas.'],
      ['¿Qué es mejor, portátil o split?', 'El split: es más eficiente, más silencioso y enfría más. El portátil compensa solo si no puedes instalar un split (alquiler, comunidad).'],
    ],
    rel: ['aire-acondicionado', 'ventilador', 'climatizador-evaporativo'],
  },
  {
    slug: 'ventilador', nombre: 'ventilador', plural: 'ventiladores', art: 'un', cat: 'climatizacion',
    modo: 'potencia', potencias: [30, 45, 60, 100], potencia: 50, ciclo: 1, horas: 8, dias: 30, diasAnio: 100,
    amazon: 'ventilador de pie silencioso bajo consumo motor dc', temporada: 'verano',
    intro: `<p>Un ventilador no enfría el aire, mueve aire sobre tu piel para que sientas 2-4 grados menos. A cambio consume muy poco: entre 30 y 70 W un ventilador de pie o de techo, y menos aún los de motor DC (15-35 W).</p>`,
    depende: ['La velocidad elegida.', 'El tipo de motor: los DC gastan hasta un 60 % menos.', 'Las horas de uso, que en verano pueden ser muchas.'],
    consejos: [
      'Combínalo con el aire acondicionado a 26-27 °C: sentirás lo mismo que a 24 °C gastando bastante menos.',
      'En ventiladores de techo, en verano deben girar en sentido antihorario.',
      'Si lo compras nuevo, busca motor DC: menos ruido y menos consumo.',
    ],
    faq: [
      ['¿Cuánto gasta un ventilador toda la noche?', 'Uno de 50 W durante 8 horas consume 0,4 kWh, unos pocos céntimos.'],
      ['¿Gasta más un ventilador o el aire acondicionado?', 'El aire acondicionado gasta 10-20 veces más que un ventilador. El ventilador no baja la temperatura de la habitación, pero mejora mucho la sensación térmica.'],
    ],
    rel: ['aire-acondicionado', 'climatizador-evaporativo', 'aire-acondicionado-portatil'],
  },
  {
    slug: 'climatizador-evaporativo', nombre: 'climatizador evaporativo', plural: 'climatizadores evaporativos', art: 'un', cat: 'climatizacion',
    modo: 'potencia', potencias: [60, 80, 120], potencia: 80, ciclo: 1, horas: 6, dias: 30, diasAnio: 90,
    amazon: 'climatizador evaporativo', temporada: 'verano',
    intro: `<p>Los climatizadores evaporativos (enfriadores de aire) hacen pasar el aire por un filtro húmedo: al evaporarse el agua, el aire sale unos grados más fresco. Consumen casi lo mismo que un ventilador (60-120 W), pero solo funcionan bien en climas secos: en zonas húmedas como la costa apenas enfrían y aumentan la humedad.</p>`,
    depende: ['La velocidad del ventilador.', 'La humedad del ambiente (determina si enfría o no).', 'Que la habitación esté ventilada.'],
    consejos: [
      'Úsalo en el interior peninsular, donde el aire es seco; en la costa es preferible un ventilador.',
      'Añade hielo o agua fría al depósito para un efecto extra.',
      'Mantén una ventana entreabierta para que la humedad no se acumule.',
    ],
    faq: [
      ['¿Un climatizador evaporativo es un aire acondicionado?', 'No. Consume 10 veces menos, pero enfría bastante menos: entre 2 y 5 grados en climas secos, y casi nada si el ambiente es húmedo.'],
    ],
    rel: ['ventilador', 'aire-acondicionado', 'aire-acondicionado-portatil'],
  },
  {
    slug: 'deshumidificador', nombre: 'deshumidificador', plural: 'deshumidificadores', art: 'un', cat: 'climatizacion',
    modo: 'potencia', potencias: [200, 300, 450, 650], potencia: 300, ciclo: 0.7, horas: 8, dias: 30, diasAnio: 180,
    amazon: 'deshumidificador bajo consumo', temporada: null,
    intro: `<p>Los deshumidificadores de compresor consumen entre 200 y 450 W y son los más eficientes por encima de 15 °C. Los de desecante (unos 600-650 W) funcionan mejor en lugares fríos, como trasteros o casas sin calefacción en invierno.</p>
<p>Casi todos tienen higrostato: al llegar a la humedad elegida (lo ideal es 45-55 %) dejan de deshumidificar, por eso el consumo real es menor que el nominal.</p>`,
    depende: ['El tipo (compresor o desecante) y su capacidad en litros/día.', 'La humedad de partida y la que fijes.', 'La temperatura de la habitación.'],
    consejos: [
      'Fija el 50 % de humedad: bajar del 45 % no mejora el confort y dispara el consumo.',
      'Tender la ropa con el deshumidificador en una habitación cerrada seca rápido y gasta mucho menos que una secadora de resistencia.',
      'En invierno, quitar humedad hace que la casa se sienta más cálida con menos calefacción.',
    ],
    faq: [
      ['¿Cuánto gasta un deshumidificador al día?', 'Uno de compresor de 300 W funcionando 8 horas con el higrostato actuando consume alrededor de 1,7 kWh.'],
      ['¿Es más barato secar la ropa con deshumidificador que con secadora?', 'Sí frente a secadoras de condensación o evacuación (3-5 kWh por carga). Frente a una secadora con bomba de calor la diferencia es pequeña.'],
    ],
    rel: ['secadora', 'purificador-de-aire', 'bomba-de-calor'],
  },
  {
    slug: 'purificador-de-aire', nombre: 'purificador de aire', plural: 'purificadores de aire', art: 'un', cat: 'climatizacion',
    modo: 'potencia', potencias: [15, 30, 50, 70], potencia: 35, ciclo: 1, horas: 12, dias: 30, diasAnio: 365,
    amazon: 'purificador de aire hepa bajo consumo', temporada: null,
    intro: `<p>Un purificador de aire con filtro HEPA consume entre 10 W en velocidad mínima y 50-70 W al máximo. Como suele estar encendido muchas horas (o todo el día en época de alergias), merece la pena conocer su gasto, aunque es pequeño. El coste que más se nota a la larga son los filtros de recambio.</p>`,
    depende: ['La velocidad de funcionamiento.', 'Las horas al día que está encendido.', 'El modo automático, que baja la velocidad cuando el aire está limpio.'],
    consejos: [
      'Usa el modo automático o nocturno: la mayor parte del tiempo no necesita ir al máximo.',
      'Mira el CADR (caudal de aire limpio) adecuado al tamaño de tu habitación en lugar de comprar el más potente.',
    ],
    faq: [
      ['¿Cuánto gasta un purificador de aire encendido 24 horas?', 'A 35 W de media, unos 0,84 kWh al día y unos 25 kWh al mes.'],
    ],
    rel: ['deshumidificador', 'ventilador', 'router-wifi'],
  },

  // ---------------- COCINA ----------------
  {
    slug: 'freidora-de-aire', nombre: 'freidora de aire', plural: 'freidoras de aire', art: 'una', cat: 'cocina',
    modo: 'potencia', potencias: [1000, 1500, 1800, 2000], potencia: 1500, ciclo: 0.7, horas: 0.5, dias: 30, diasAnio: 365,
    amazon: 'freidora de aire', temporada: null,
    intro: `<p>Las freidoras de aire (air fryer) son pequeños hornos de convección: una resistencia y un ventilador potente hacen circular aire muy caliente alrededor de la comida. Su potencia va de 1.000 W en los modelos pequeños a 2.000 W o más en los de doble cesta.</p>
<p>Gastan menos que el horno porque calientan un volumen mucho más pequeño, apenas necesitan precalentar y cocinan más rápido. El termostato corta la resistencia a ratos, así que el consumo real suele ser un 60-80 % de la potencia nominal.</p>`,
    depende: ['La potencia y capacidad del modelo.', 'La temperatura y el tiempo de cocinado.', 'Si la llenas: dos tandas pequeñas gastan más que una completa (sin amontonar).'],
    consejos: [
      'Úsala en lugar del horno para raciones pequeñas: puedes ahorrar más de la mitad de la energía.',
      'No precalientes si la receta no lo necesita, o hazlo solo 2-3 minutos.',
      'Cocina varias cosas seguidas para aprovechar que ya está caliente.',
    ],
    faq: [
      ['¿Gasta menos una freidora de aire que el horno?', 'Sí, normalmente entre un 40 % y un 70 % menos para la misma comida, porque calienta menos espacio y cocina en menos tiempo. Para grandes cantidades (un pollo entero para 6) el horno puede compensar.'],
      ['¿Cuánto cuesta usar la freidora de aire 20 minutos?', 'Una de 1.500 W consume unos 0,35 kWh en 20 minutos con el termostato actuando. Con el precio de la luz de hoy lo tienes calculado arriba.'],
    ],
    rel: ['horno', 'microondas', 'placa-de-induccion', 'robot-de-cocina'],
  },
  {
    slug: 'horno', nombre: 'horno eléctrico', plural: 'hornos eléctricos', art: 'un', cat: 'cocina',
    modo: 'potencia', potencias: [2000, 2500, 3000, 3500], potencia: 2500, ciclo: 0.45, horas: 1, dias: 12, diasAnio: 365,
    amazon: 'horno electrico multifuncion clase a', temporada: null,
    intro: `<p>El horno es uno de los aparatos más potentes de la cocina (2.000-3.500 W), pero solo funciona a plena potencia durante el precalentamiento. Después, el termostato va conectando y desconectando las resistencias para mantener la temperatura, por lo que una hora de horno a 180-200 °C suele consumir entre 1 y 1,3 kWh.</p>
<p>La etiqueta energética europea indica el consumo por ciclo estándar: los hornos de clase A gastan unos 0,8 kWh en convección forzada.</p>`,
    depende: ['La temperatura y el tiempo de cocinado.', 'El modo: el aire forzado cocina a 20 °C menos que el convencional.', 'Las veces que abres la puerta (cada apertura pierde hasta 20 °C).'],
    consejos: [
      'Usa el modo ventilador/convección y baja 20 °C la temperatura de la receta.',
      'Apágalo 5-10 minutos antes del final: el calor residual termina la cocción.',
      'Aprovecha cada encendido para cocinar varias cosas a la vez.',
      'Para raciones pequeñas, la freidora de aire o el microondas gastan mucho menos.',
    ],
    faq: [
      ['¿Cuánto gasta el horno en una hora?', 'A 180-200 °C, entre 1 y 1,3 kWh en una hora incluyendo el precalentamiento. Gratinar o usar la máxima temperatura puede acercarse a los 2 kWh.'],
      ['¿A qué hora es más barato usar el horno?', 'Con tarifa PVPC, normalmente en las horas centrales del día (por la producción solar) y de madrugada. En la página del precio de la luz de hoy tienes las horas exactas.'],
    ],
    rel: ['freidora-de-aire', 'microondas', 'vitroceramica', 'placa-de-induccion'],
  },
  {
    slug: 'microondas', nombre: 'microondas', plural: 'microondas', art: 'un', cat: 'cocina',
    modo: 'potencia', potencias: [800, 1000, 1200, 1500], potencia: 1200, ciclo: 1, horas: 0.25, dias: 30, diasAnio: 365,
    etiquetaPotencia: 'Consumo eléctrico',
    amazon: 'microondas', temporada: null,
    intro: `<p>Ojo con la potencia del microondas: la que se anuncia (800 o 900 W) es la potencia de microondas que llega a la comida. El consumo eléctrico real es mayor, normalmente 1.200-1.300 W, porque el magnetrón tiene pérdidas.</p>
<p>Aun así es de los aparatos más eficientes para calentar raciones pequeñas porque calienta directamente el agua de la comida y funciona pocos minutos.</p>`,
    depende: ['El nivel de potencia elegido.', 'El tiempo de uso.', 'El modo grill, que gasta más.'],
    consejos: [
      'Para calentar una ración o un vaso de leche gasta menos que cualquier otro método.',
      'Desenchúfalo si su reloj no te hace falta: el standby suma 2-4 kWh al año.',
      'Tapa los recipientes: calientan antes y de forma más uniforme.',
    ],
    faq: [
      ['¿Cuánto gasta un microondas en 5 minutos?', 'Uno con un consumo de 1.200 W gasta 0,1 kWh en 5 minutos: apenas un par de céntimos.'],
      ['¿Gasta más el microondas o el horno?', 'El horno gasta mucho más: para recalentar comida el microondas puede usar 10 veces menos energía.'],
    ],
    rel: ['horno', 'freidora-de-aire', 'hervidor-de-agua'],
  },
  {
    slug: 'vitroceramica', nombre: 'vitrocerámica', plural: 'vitrocerámicas', art: 'una', cat: 'cocina',
    modo: 'potencia', potencias: [1200, 1800, 2300], potencia: 1800, ciclo: 0.6, horas: 1, dias: 30, diasAnio: 365,
    etiquetaPotencia: 'Potencia del fuego',
    amazon: 'placa de induccion', temporada: null,
    intro: `<p>Las vitrocerámicas radiantes calientan una resistencia bajo el cristal, que a su vez calienta la sartén. Cada fuego tiene entre 1.200 y 2.300 W (la placa completa suele sumar 5.500-6.500 W). Pierden bastante calor por el camino, por eso son menos eficientes que la inducción: aprovechan en torno al 70 % de la energía.</p>
<p>El regulador no reduce la potencia, sino que enciende y apaga la resistencia por intervalos; a fuego medio el consumo real ronda el 50-60 % del nominal.</p>`,
    depende: ['El tamaño del fuego y el nivel de potencia.', 'Que el recipiente cubra todo el fuego y tenga fondo plano.', 'El tiempo de cocción.'],
    consejos: [
      'Apágala unos minutos antes de terminar: el cristal guarda mucho calor residual.',
      'Usa tapa: cocinar destapado gasta hasta tres veces más.',
      'Usa ollas del mismo diámetro que el fuego.',
      'Si vas a renovar la cocina, la inducción gasta en torno a un 20-30 % menos y es mucho más rápida.',
    ],
    faq: [
      ['¿Cuánto gasta una vitrocerámica en una hora?', 'Un fuego de 1.800 W a potencia media consume aproximadamente 1 kWh por hora. Con dos fuegos a la vez, el doble.'],
      ['¿Qué gasta más, vitrocerámica o inducción?', 'La vitrocerámica: la inducción calienta directamente el recipiente, pierde menos calor y cocina más rápido.'],
    ],
    rel: ['placa-de-induccion', 'horno', 'microondas', 'hervidor-de-agua'],
  },
  {
    slug: 'placa-de-induccion', nombre: 'placa de inducción', plural: 'placas de inducción', art: 'una', cat: 'cocina',
    modo: 'potencia', potencias: [1400, 2000, 3000, 3700], potencia: 2000, ciclo: 0.55, horas: 0.75, dias: 30, diasAnio: 365,
    etiquetaPotencia: 'Potencia del fuego',
    amazon: 'placa de induccion', temporada: null,
    intro: `<p>La inducción genera un campo magnético que calienta directamente el fondo del recipiente. Aprovecha alrededor del 85-90 % de la energía y es muy rápida: hierve agua en la mitad de tiempo que una vitrocerámica.</p>
<p>Las zonas tienen entre 1.400 y 3.700 W (con función “booster”), pero la mayor parte del tiempo se cocina a potencias medias. Muchas placas permiten limitar la potencia total para no superar la potencia contratada.</p>`,
    depende: ['El nivel de potencia y el tiempo de uso.', 'Que el recipiente sea ferromagnético y del tamaño de la zona.', 'El uso de la función booster.'],
    consejos: [
      'Usa la potencia máxima solo para llevar a ebullición y baja enseguida.',
      'Con tapa, el agua hierve antes y se gasta menos.',
      'Si saltan los plomos, activa la limitación de potencia de la placa en vez de subir la potencia contratada.',
    ],
    faq: [
      ['¿Cuánto gasta una placa de inducción al mes?', 'En una casa que cocina a diario unos 45 minutos con potencias medias, entre 25 y 40 kWh al mes.'],
      ['¿Necesito más potencia contratada para la inducción?', 'No necesariamente. Con 3,45-4,6 kW es suficiente si no coinciden el horno, la placa al máximo y otros aparatos potentes. Muchas placas permiten limitar su potencia total.'],
    ],
    rel: ['vitroceramica', 'horno', 'hervidor-de-agua', 'freidora-de-aire'],
  },
  {
    slug: 'hervidor-de-agua', nombre: 'hervidor de agua', plural: 'hervidores de agua', art: 'un', cat: 'cocina',
    modo: 'ciclo', unidad: 'hervido', unidadPlural: 'hervidos', kwhCiclo: 0.11, usosSemana: 14,
    presets: [['Una taza (250 ml)', 0.03], ['Medio litro', 0.06], ['Un litro', 0.11], ['Lleno (1,7 l)', 0.19]],
    amazon: 'hervidor de agua electrico', temporada: null,
    intro: `<p>Un hervidor eléctrico tiene mucha potencia (2.000-2.200 W), pero funciona muy poco tiempo: calentar un litro de agua desde el grifo hasta hervir requiere unos 0,1 kWh y tarda 2-3 minutos. Es una de las formas más eficientes de hervir agua, más que la vitrocerámica.</p>`,
    depende: ['La cantidad de agua: hervir 1,7 litros para una taza triplica el gasto.', 'La temperatura inicial del agua.', 'La cal acumulada en la resistencia.'],
    consejos: [
      'Hierve solo el agua que vayas a usar: es el truco con más efecto.',
      'Descalcifica con vinagre o ácido cítrico cada pocas semanas si tu agua es dura.',
      'Para pasta, calentar el agua en el hervidor y pasarla a la olla es más rápido que hacerlo todo en el fuego.',
    ],
    faq: [
      ['¿Gasta mucho un hervidor de agua?', 'No. Aunque su potencia es alta, funciona solo 2-3 minutos. Hervir un litro cuesta alrededor de un par de céntimos.'],
      ['¿Es más barato hervir agua en el hervidor o en el microondas?', 'El hervidor suele ser más eficiente para cantidades de más de una taza; para una sola taza la diferencia es mínima.'],
    ],
    rel: ['cafetera', 'microondas', 'placa-de-induccion'],
  },
  {
    slug: 'cafetera', nombre: 'cafetera eléctrica', plural: 'cafeteras eléctricas', art: 'una', cat: 'cocina',
    modo: 'ciclo', unidad: 'café', unidadPlural: 'cafés', kwhCiclo: 0.02, usosSemana: 14,
    presets: [['Café de cápsulas', 0.02], ['Superautomática (por café)', 0.025], ['Goteo, jarra completa', 0.12], ['Espresso manual (por café)', 0.03]],
    amazon: 'cafetera bajo consumo apagado automatico', temporada: null,
    intro: `<p>Las cafeteras tienen potencias altas (1.000-1.500 W), pero solo las usan unos segundos por café. El gasto de preparar un café de cápsula es de unos 0,02 kWh. Lo que dispara el consumo es dejarlas encendidas: mantener caliente la caldera o la placa de una cafetera de goteo puede gastar más que los propios cafés.</p>`,
    depende: ['El tipo de cafetera.', 'El tiempo que pasa encendida en espera.', 'Si mantiene la jarra caliente sobre una placa.'],
    consejos: [
      'Activa el apagado automático a los 5-10 minutos.',
      'En las de goteo, pasa el café a un termo en vez de dejar la placa encendida.',
      'Descalcifica periódicamente: la cal obliga a calentar más tiempo.',
    ],
    faq: [
      ['¿Cuánto gasta una cafetera de cápsulas?', 'Unos 0,02 kWh por café. Dos cafés al día suponen menos de 1,5 kWh al mes.'],
      ['¿Gasta luz una cafetera enchufada sin usar?', 'Si está apagada, casi nada (menos de 1 W). Si queda encendida en modo de mantenimiento de temperatura, mucho más: hasta 20-50 W de media.'],
    ],
    rel: ['hervidor-de-agua', 'microondas', 'tostadora'],
  },
  {
    slug: 'tostadora', nombre: 'tostadora', plural: 'tostadoras', art: 'una', cat: 'cocina',
    modo: 'potencia', potencias: [700, 850, 1000], potencia: 850, ciclo: 1, horas: 0.05, dias: 30, diasAnio: 365,
    amazon: 'tostadora', temporada: null,
    intro: `<p>Una tostadora de 2 ranuras consume entre 700 y 1.000 W, pero solo durante los 2-4 minutos que tarda en tostar. Es un gasto mínimo: tostar pan a diario durante un mes no llega a 2 kWh.</p>`,
    depende: ['La potencia y el nivel de tostado.', 'El número de tandas.'],
    consejos: ['Tuesta varias rebanadas a la vez en lugar de tandas sueltas.', 'Limpia las migas: además de ser más seguro, el calor se reparte mejor.'],
    faq: [['¿Gasta más tostar en la tostadora o en el horno?', 'Mucho más el horno: calentar todo el horno para un par de tostadas puede gastar 5-10 veces más.']],
    rel: ['cafetera', 'microondas', 'freidora-de-aire'],
  },
  {
    slug: 'robot-de-cocina', nombre: 'robot de cocina', plural: 'robots de cocina', art: 'un', cat: 'cocina',
    modo: 'potencia', potencias: [500, 1000, 1500], potencia: 1000, ciclo: 0.5, horas: 0.75, dias: 20, diasAnio: 365,
    amazon: 'robot de cocina', temporada: null,
    intro: `<p>Los robots de cocina con función de calentar (tipo Thermomix, Mambo o similares) tienen una potencia máxima de 1.000-1.700 W sumando motor y resistencia. Solo llegan a ella al calentar a máxima temperatura; durante la mayor parte de una receta el consumo medio ronda los 400-600 W.</p>`,
    depende: ['La temperatura de la receta (calentar a 100-120 °C es lo que más gasta).', 'El tiempo total.', 'El uso de velocidades altas del motor.'],
    consejos: ['Cocina con el vaso tapado y el cubilete puesto siempre que la receta lo permita.', 'Aprovecha el calor del vaso encadenando preparaciones.'],
    faq: [['¿Gasta mucho una Thermomix?', 'No especialmente: una receta de 30-45 minutos suele consumir entre 0,3 y 0,5 kWh, menos que usar el horno.']],
    rel: ['freidora-de-aire', 'placa-de-induccion', 'horno'],
  },
  {
    slug: 'frigorifico', nombre: 'frigorífico', plural: 'frigoríficos', art: 'un', cat: 'cocina',
    modo: 'anual', kwhAnio: 240,
    presets: [['Combi clase A (nuevo)', 110], ['Combi clase C', 165], ['Combi clase E', 240], ['Combi de más de 10 años', 380], ['Americano (side by side)', 420]],
    amazon: 'frigorifico combi clase c no frost', temporada: null,
    intro: `<p>El frigorífico es de los pocos aparatos que funcionan las 24 horas del día los 365 días del año, por eso suele ser el mayor consumo individual de una casa sin calefacción eléctrica. Su potencia es baja (100-200 W cuando el compresor está en marcha), pero lo importante es el consumo anual que aparece en la etiqueta energética.</p>
<p>Con la etiqueta de 2021, un combi de clase E consume unos 230-260 kWh al año, uno de clase C unos 160-180 y uno de clase A apenas 100-120. Un frigorífico de hace más de 10 años puede superar fácilmente los 350-400 kWh.</p>`,
    depende: ['La clase energética y el tamaño.', 'La temperatura configurada (4-5 °C en el frigorífico y -18 °C en el congelador es suficiente).', 'Dónde está: junto al horno o al sol trabaja mucho más.', 'El estado de las gomas de la puerta y la escarcha.'],
    consejos: [
      'Pon el frigorífico a 4-5 °C y el congelador a -18 °C; cada grado menos supone un 5 % más de consumo.',
      'Deja 10-15 cm entre la parte trasera y la pared para que disipe el calor.',
      'No metas comida caliente y descongela en el frigorífico (aprovechas el frío).',
      'Si tu frigorífico tiene más de 12-15 años, cambiarlo por uno eficiente puede ahorrar más de 200 kWh al año.',
    ],
    faq: [
      ['¿Cuánto gasta un frigorífico al día?', 'Un combi de clase E consume unos 0,65 kWh al día de media (240 kWh al año). Uno antiguo puede superar 1 kWh diario.'],
      ['¿Compensa cambiar un frigorífico antiguo?', 'Si tiene más de 12-15 años, a menudo sí: la diferencia puede ser de 200-300 kWh al año. Mira la calculadora para ver cuánto supone con el precio actual de la luz.'],
    ],
    rel: ['congelador', 'lavavajillas', 'horno'],
  },
  {
    slug: 'congelador', nombre: 'congelador', plural: 'congeladores', art: 'un', cat: 'cocina',
    modo: 'anual', kwhAnio: 200,
    presets: [['Arcón 200 l clase E', 200], ['Arcón 300 l clase F', 290], ['Vertical 200 l clase E', 235], ['Vertical clase C', 160], ['Congelador antiguo', 400]],
    amazon: 'arcon congelador bajo consumo', temporada: null,
    intro: `<p>Un congelador independiente funciona día y noche, así que lo que importa es su consumo anual en kWh, que aparece en la etiqueta. Los arcones horizontales pierden menos frío al abrirlos que los verticales y suelen gastar algo menos para la misma capacidad.</p>`,
    depende: ['Clase energética, tamaño y tipo (arcón o vertical).', 'Lo lleno que esté: un congelador lleno mantiene mejor el frío.', 'La temperatura del lugar (garajes muy calurosos aumentan el consumo).'],
    consejos: ['Descongélalo cuando la capa de hielo supere 3-5 mm.', 'Mantenlo a -18 °C; más frío no conserva mejor y gasta más.', 'Mantenlo lleno, aunque sea con botellas de agua.'],
    faq: [['¿Cuánto gasta un arcón congelador al mes?', 'Uno de 200 litros y clase E, unos 16-17 kWh al mes (200 kWh al año).']],
    rel: ['frigorifico', 'lavavajillas'],
  },
  {
    slug: 'lavavajillas', nombre: 'lavavajillas', plural: 'lavavajillas', art: 'un', cat: 'cocina',
    modo: 'ciclo', unidad: 'lavado', unidadPlural: 'lavados', kwhCiclo: 0.8, usosSemana: 4,
    presets: [['Programa ECO', 0.8], ['Rápido 45 °C', 0.9], ['Normal 55-65 °C', 1.2], ['Intensivo 70 °C', 1.6]],
    amazon: 'lavavajillas clase b 60 cm', temporada: null,
    intro: `<p>Casi toda la energía de un lavavajillas se va en calentar el agua. Por eso el programa ECO, aunque dure 3 o 4 horas, es el que menos gasta: usa menos temperatura y compensa con más tiempo de remojo. Un lavavajillas moderno consume unos 0,7-0,9 kWh por lavado en ECO y hasta 1,5-1,8 kWh en intensivo.</p>
<p>Usar el lavavajillas lleno gasta menos agua y energía que fregar a mano con agua caliente.</p>`,
    depende: ['El programa y la temperatura.', 'La clase energética.', 'La hora: con PVPC puedes programarlo para que funcione en las horas baratas.'],
    consejos: [
      'Usa el programa ECO siempre que puedas: es el más largo, pero el más barato.',
      'Ponlo solo lleno y no aclares los platos con agua caliente antes.',
      'Usa el inicio diferido para que lave en la hora más barata del día.',
    ],
    faq: [
      ['¿Cuánto cuesta poner el lavavajillas?', 'Un lavado ECO consume unos 0,8 kWh. Su coste varía según la hora: consulta la mejor hora de hoy para ponerlo.'],
      ['¿Por qué el programa ECO dura tanto si gasta menos?', 'Porque lava a menor temperatura y compensa con más tiempo. Calentar agua es lo que más energía gasta, no el tiempo.'],
    ],
    rel: ['lavadora', 'secadora', 'frigorifico'],
    mejorHora: 'lavavajillas',
  },
  // ---------------- LAVADO ----------------
  {
    slug: 'lavadora', nombre: 'lavadora', plural: 'lavadoras', art: 'una', cat: 'lavado',
    modo: 'ciclo', unidad: 'lavado', unidadPlural: 'lavados', kwhCiclo: 0.7, usosSemana: 4,
    presets: [['En frío / 20 °C', 0.25], ['30 °C', 0.45], ['ECO 40-60', 0.7], ['60 °C algodón', 1.2], ['90 °C', 2.0]],
    amazon: 'lavadora clase a 8 kg', temporada: null,
    intro: `<p>Alrededor del 80-90 % de la energía de una lavadora se usa en calentar el agua. Un lavado en frío o a 20 °C consume solo 0,2-0,3 kWh, mientras que uno a 60 °C puede superar 1 kWh y uno a 90 °C llegar a 2 kWh.</p>
<p>El programa ECO 40-60 de las lavadoras modernas es el que sirve de referencia para la etiqueta: limpia ropa normal de algodón con un consumo de 0,5-0,8 kWh por carga, aunque dure más de 3 horas.</p>`,
    depende: ['La temperatura del programa (el factor principal).', 'La carga: media carga gasta casi lo mismo que una completa.', 'El centrifugado: más revoluciones gastan algo más en la lavadora pero ahorran mucho en la secadora.', 'La hora del lavado si tienes tarifa PVPC.'],
    consejos: [
      'Lava a 30 °C o en frío: con los detergentes actuales la ropa sale igual de limpia.',
      'Llénala siempre (sin apretar la ropa).',
      'Programa el inicio diferido para la hora más barata del día.',
      'Si después usas secadora, centrifuga a 1.200-1.400 rpm.',
    ],
    faq: [
      ['¿Cuánto cuesta poner una lavadora?', 'Un lavado ECO 40-60 consume unos 0,7 kWh; en frío, unos 0,25 kWh. El coste depende de la hora: consulta la mejor hora para poner la lavadora hoy.'],
      ['¿A qué hora es más barato poner la lavadora?', 'Con tarifa PVPC cambia cada día. Normalmente las horas más baratas son las centrales (por la energía solar) y la madrugada; los fines de semana todo el día es más barato.'],
    ],
    rel: ['secadora', 'lavavajillas', 'plancha', 'termo-electrico'],
    mejorHora: 'lavadora',
  },
  {
    slug: 'secadora', nombre: 'secadora', plural: 'secadoras', art: 'una', cat: 'lavado',
    modo: 'ciclo', unidad: 'secado', unidadPlural: 'secados', kwhCiclo: 1.5, usosSemana: 3,
    presets: [['Bomba de calor (8 kg)', 1.5], ['Bomba de calor, media carga', 0.9], ['Condensación', 4.5], ['Evacuación', 4.8]],
    amazon: 'secadora bomba de calor', temporada: null,
    intro: `<p>La secadora es uno de los electrodomésticos que más gasta por uso, pero la diferencia entre tipos es enorme. Una secadora de condensación o de evacuación (con resistencia) consume 4-5 kWh por carga completa, mientras que una de bomba de calor necesita unos 1,5 kWh para la misma ropa: tres veces menos.</p>`,
    depende: ['El tipo de secadora.', 'Lo escurrida que salga la ropa de la lavadora.', 'El nivel de secado elegido (listo para planchar gasta menos que extra seco).'],
    consejos: [
      'Centrifuga a 1.200 rpm o más antes de secar.',
      'Limpia el filtro de pelusas en cada uso y el condensador cada pocas semanas.',
      'Usa “listo para planchar” si vas a planchar después.',
      'Si cambias de secadora, elige bomba de calor: ahorrarás 2-3 kWh por carga.',
    ],
    faq: [
      ['¿Cuánto gasta una secadora de bomba de calor?', 'Alrededor de 1,5 kWh por carga completa de 8 kg, frente a 4-5 kWh de una de condensación.'],
      ['¿Compensa una secadora de bomba de calor?', 'Si la usas 3 veces por semana, ahorra unos 450 kWh al año respecto a una de condensación.'],
    ],
    rel: ['lavadora', 'deshumidificador', 'plancha'],
    mejorHora: 'secadora',
  },
  {
    slug: 'plancha', nombre: 'plancha', plural: 'planchas', art: 'una', cat: 'lavado',
    modo: 'potencia', potencias: [1800, 2200, 2600, 3000], potencia: 2400, ciclo: 0.5, horas: 1, dias: 8, diasAnio: 365,
    amazon: 'plancha vapor', temporada: null,
    intro: `<p>Las planchas de vapor tienen 1.800-2.800 W y los centros de planchado con caldera hasta 3.000 W o más. El termostato desconecta la suela cuando llega a temperatura, así que el consumo real ronda la mitad: aproximadamente 1-1,3 kWh por hora de planchado.</p>`,
    depende: ['La potencia y la temperatura (algodón o lino gastan más que sintéticos).', 'El tiempo que la dejas encendida sin planchar.', 'Si tiene caldera de vapor.'],
    consejos: [
      'Plancha toda la ropa de una vez en lugar de prenda a prenda cada día.',
      'Empieza por la ropa delicada (temperatura baja) y termina con algodón.',
      'Desenchúfala un par de minutos antes de terminar y aprovecha el calor residual.',
    ],
    faq: [['¿Cuánto gasta planchar una hora?', 'Con una plancha de 2.400 W, aproximadamente 1,2 kWh por hora de uso.']],
    rel: ['lavadora', 'secadora', 'secador-de-pelo'],
    mejorHora: 'plancha',
  },
  {
    slug: 'secador-de-pelo', nombre: 'secador de pelo', plural: 'secadores de pelo', art: 'un', cat: 'lavado',
    modo: 'potencia', potencias: [1200, 1800, 2000, 2400], potencia: 2000, ciclo: 1, horas: 0.17, dias: 30, diasAnio: 365,
    amazon: 'secador de pelo', temporada: null,
    intro: `<p>Un secador de pelo de 2.000 W es de los aparatos más potentes de la casa, aunque lo uses solo unos minutos. Diez minutos al máximo suponen unos 0,33 kWh. Usarlo a diario en una casa con varias personas suma una cantidad apreciable al mes.</p>`,
    depende: ['La potencia y la posición de calor (el aire frío apenas gasta).', 'El tiempo de uso.', 'Lo húmedo que esté el pelo al empezar.'],
    consejos: ['Sécate bien con toalla antes: reduce el tiempo de secador.', 'Usa una temperatura media; la máxima casi no acorta el tiempo.', 'Termina con aire frío.'],
    faq: [['¿Cuánto gasta un secador de pelo de 2.000 W?', '2 kWh por hora a máxima potencia; 10 minutos al día son unos 10 kWh al mes.']],
    rel: ['plancha', 'termo-electrico', 'calefactor'],
  },

  // ---------------- AGUA CALIENTE ----------------
  {
    slug: 'termo-electrico', nombre: 'termo eléctrico', plural: 'termos eléctricos', art: 'un', cat: 'agua',
    modo: 'ciclo', unidad: 'día', unidadPlural: 'días', kwhCiclo: 3.6, usosSemana: 7,
    presets: [['1 persona', 2.2], ['2 personas', 3.6], ['3-4 personas', 5.5], ['Solo pérdidas en reposo (80 l)', 1.2]],
    amazon: 'termo electrico 80 litros clase energetica', temporada: null,
    intro: `<p>El termo eléctrico suele ser, después de la calefacción, el mayor consumo de una casa totalmente eléctrica. Su resistencia (1.200-2.500 W) calienta el agua del depósito y la mantiene caliente todo el día. Ese mantenimiento tiene un coste: un termo de 80 litros pierde entre 1 y 1,5 kWh diarios aunque nadie use agua caliente.</p>
<p>Para una pareja, lo normal es un consumo de 3-4 kWh diarios entre calentar el agua de las duchas y las pérdidas.</p>`,
    depende: ['El número de personas y la duración de las duchas.', 'La temperatura del termostato (55-60 °C es suficiente).', 'El aislamiento y la edad del termo.', 'Las horas en las que calienta.'],
    consejos: [
      'Pon un temporizador o enchufe programable para que caliente en las horas valle o en las más baratas del PVPC.',
      'Baja el termostato a 55-60 °C: por encima pierdes más calor y se acumula más cal.',
      'Duchas de 5 minutos con alcachofa de bajo caudal: ahorras agua y electricidad.',
      'Si tu termo tiene más de 10-12 años, uno nuevo con buen aislamiento o un termo con bomba de calor reduce mucho el gasto.',
    ],
    faq: [
      ['¿Es mejor apagar el termo por la noche?', 'Normalmente sí. Lo más eficiente es que caliente en las horas más baratas y esté apagado el resto, siempre que tengas suficiente agua caliente cuando la necesites.'],
      ['¿Cuánto gasta un termo de 80 litros al mes?', 'Para dos personas, en torno a 100-110 kWh al mes. Una familia de 4 puede superar los 160 kWh.'],
    ],
    rel: ['lavadora', 'secador-de-pelo', 'toallero-electrico'],
  },

  // ---------------- ELECTRÓNICA ----------------
  {
    slug: 'television', nombre: 'televisión', plural: 'televisiones', art: 'una', cat: 'electronica',
    modo: 'potencia', potencias: [50, 80, 120, 200], potencia: 100, ciclo: 1, horas: 4, dias: 30, diasAnio: 365,
    amazon: 'smart tv 55 pulgadas clase energetica', temporada: null,
    intro: `<p>Una televisión LED de 43 pulgadas consume unos 50-70 W; una de 55 pulgadas, 80-120 W; y una de 65 pulgadas o más con HDR puede superar los 150-200 W. Las OLED gastan algo más con imágenes muy claras y menos con escenas oscuras.</p>
<p>El brillo es el factor que más influye: el modo “vívido” o “tienda” puede duplicar el consumo respecto al modo eco.</p>`,
    depende: ['El tamaño y la tecnología del panel.', 'El brillo y el modo de imagen.', 'Las horas que está encendida.', 'El consumo en standby (0,3-1 W en teles modernas).'],
    consejos: ['Usa el modo de imagen “cine” o “eco” y activa el sensor de luz ambiental.', 'Apágala del todo con una regleta si también tienes barra de sonido, consola y decodificador.', 'No la dejes encendida “de fondo”.'],
    faq: [
      ['¿Cuánto gasta una televisión encendida todo el día?', 'Una tele de 55" a 100 W durante 12 horas consume 1,2 kWh al día.'],
      ['¿Gasta mucho la tele en standby?', 'Las modernas consumen menos de 1 W en reposo, unos 5-8 kWh al año. Lo que suma más es el resto de aparatos conectados (decodificador, barra de sonido, consola).'],
    ],
    rel: ['consola', 'router-wifi', 'ordenador'],
  },
  {
    slug: 'ordenador', nombre: 'ordenador de sobremesa', titulo: '¿Cuánto gasta un ordenador?', corto: 'ordenador (PC)', plural: 'ordenadores', art: 'un', cat: 'electronica',
    modo: 'potencia', potencias: [80, 150, 350, 550], potencia: 300, ciclo: 1, horas: 4, dias: 30, diasAnio: 365,
    etiquetaPotencia: 'Consumo medio',
    amazon: 'fuente de alimentacion 80 plus gold', temporada: null,
    intro: `<p>El consumo de un ordenador depende muchísimo de lo que hagas con él. Un PC de oficina gasta 50-100 W; uno multimedia, 100-150 W; y un PC gaming con una tarjeta gráfica potente puede consumir 300-550 W mientras juegas (y más de 700 W en equipos de gama muy alta). En reposo o navegando, ese mismo PC gaming baja a 80-120 W.</p>
<p>No confundas la potencia de la fuente (750, 850 W…) con el consumo: la fuente indica el máximo que puede entregar, no lo que gasta.</p>`,
    depende: ['La tarjeta gráfica y el procesador.', 'El uso: juegos y renderizado frente a ofimática.', 'El monitor (20-60 W adicionales).', 'La eficiencia de la fuente (80 Plus).'],
    consejos: ['Activa la suspensión tras 15-30 minutos de inactividad.', 'Limita los FPS en juegos: no necesitas 300 FPS en un monitor de 144 Hz.', 'Apaga la regleta de periféricos al terminar.'],
    faq: [
      ['¿Cuánto gasta un PC gaming al mes?', 'Jugando 4 horas al día con un consumo de 350 W, unos 42 kWh al mes, más el monitor.'],
      ['¿Gasta más un PC o una consola?', 'Un PC gaming suele gastar 1,5-3 veces más que una PS5 o Xbox Series X jugando.'],
    ],
    rel: ['portatil', 'consola', 'television', 'router-wifi'],
  },
  {
    slug: 'portatil', nombre: 'portátil', plural: 'portátiles', art: 'un', cat: 'electronica',
    modo: 'potencia', potencias: [30, 45, 65, 100], potencia: 45, ciclo: 1, horas: 6, dias: 22, diasAnio: 260,
    amazon: 'portatil bajo consumo', temporada: null,
    intro: `<p>Un portátil consume entre 15 y 65 W en uso normal (más los portátiles gaming, que pueden pasar de 150 W). Es una de las formas más eficientes de trabajar desde casa: 8 horas de teletrabajo con un portátil gastan menos que media hora de horno.</p>`,
    depende: ['El tipo de portátil y el uso.', 'El brillo de pantalla.', 'Si está cargando la batería.'],
    consejos: ['Para teletrabajar, el portátil gasta 3-5 veces menos que un PC de sobremesa con monitor.', 'Activa el modo de ahorro de batería también enchufado.'],
    faq: [['¿Cuánto cuesta cargar un portátil?', 'Una carga completa de una batería de 50-60 Wh consume unos 0,07 kWh: menos de dos céntimos en casi cualquier hora.']],
    rel: ['ordenador', 'movil', 'router-wifi'],
  },
  {
    slug: 'consola', nombre: 'consola', plural: 'consolas', art: 'una', cat: 'electronica',
    modo: 'potencia', potencias: [15, 80, 160, 200], potencia: 200, ciclo: 1, horas: 2, dias: 30, diasAnio: 365,
    amazon: 'regleta con interruptor', temporada: null,
    intro: `<p>Jugando, una PS5 consume unos 200 W, una Xbox Series X entre 160 y 200 W, una Xbox Series S unos 80 W y una Nintendo Switch apenas 7-15 W. En menús o viendo streaming el consumo baja, y el modo de reposo con encendido rápido puede añadir 10-15 W las 24 horas.</p>`,
    depende: ['El modelo de consola y el juego.', 'El modo de reposo configurado.', 'La televisión, que suele gastar tanto como la propia consola.'],
    consejos: ['Desactiva el modo de “inicio rápido/instantáneo”: puede sumar 80-100 kWh al año.', 'Descarga las actualizaciones durante el uso, no en reposo.'],
    faq: [
      ['¿Cuánto gasta una PS5 al mes?', 'Jugando 2 horas al día, unos 12 kWh al mes, más la televisión.'],
      ['¿Gasta mucho la consola en reposo?', 'En modo de reposo con descargas puede consumir 1-3 W en las configuraciones más eficientes, pero hasta 10-15 W en modo de encendido instantáneo.'],
    ],
    rel: ['television', 'ordenador', 'router-wifi'],
  },
  {
    slug: 'router-wifi', nombre: 'router wifi', plural: 'routers wifi', art: 'un', cat: 'electronica',
    modo: 'potencia', potencias: [6, 10, 15], potencia: 10, ciclo: 1, horas: 24, dias: 30, diasAnio: 365,
    amazon: 'enchufe inteligente programable', temporada: null,
    intro: `<p>El router consume poco (6-15 W), pero lo hace las 24 horas del día todo el año. Un router de 10 W suma unos 88 kWh anuales; si además tienes un decodificador de TV o un repetidor, el consumo de estos aparatos “siempre encendidos” se multiplica.</p>`,
    depende: ['El modelo de router (fibra con wifi 6 suele estar en 10-15 W).', 'Los aparatos adicionales: repetidores, ONT separada, decodificadores.'],
    consejos: ['Apágalo de noche o en vacaciones con un enchufe programable si nadie lo necesita.', 'Desactiva la red wifi de invitados si no la usas.'],
    faq: [['¿Cuánto gasta el router al año?', 'Uno de 10 W, unos 88 kWh al año, el equivalente a un mes de frigorífico.']],
    rel: ['television', 'ordenador', 'consola'],
  },
  {
    slug: 'movil', nombre: 'cargador del móvil', corto: 'cargar el móvil', plural: 'móviles', art: 'un', cat: 'electronica',
    modo: 'ciclo', unidad: 'carga completa', unidadPlural: 'cargas', kwhCiclo: 0.02, usosSemana: 7,
    presets: [['Móvil (batería de ~5.000 mAh)', 0.022], ['Móvil pequeño', 0.015], ['Tablet', 0.045], ['Reloj inteligente', 0.002]],
    amazon: 'cargador usb c gan', temporada: null,
    titulo: '¿Cuánto cuesta cargar el móvil?',
    intro: `<p>Cargar el móvil es uno de los gastos más pequeños de la casa: una batería de 5.000 mAh almacena unos 19 Wh, y con las pérdidas del cargador una carga completa consume unos 0,02 kWh. Cargarlo cada día durante un año supone unos 7-8 kWh.</p>`,
    depende: ['La capacidad de la batería.', 'La eficiencia del cargador (los GaN son los más eficientes).', 'El tiempo que el cargador queda enchufado sin móvil (0,1-0,3 W).'],
    consejos: ['No es necesario desenchufar el cargador por ahorro: los modernos gastan menos de 0,1 W sin móvil.', 'Cargarlo de noche o de día cuesta prácticamente lo mismo; el importe es mínimo.'],
    faq: [['¿Cuánto cuesta cargar el móvil al año?', 'Unos 7-8 kWh al año, menos de lo que gasta un horno en una semana.']],
    rel: ['portatil', 'router-wifi', 'patinete-electrico'],
  },

  // ---------------- MOVILIDAD ----------------
  {
    slug: 'coche-electrico', nombre: 'coche eléctrico', corto: 'cargar un coche eléctrico', plural: 'coches eléctricos', art: 'un', cat: 'movilidad',
    modo: 'ciclo', unidad: '100 km', unidadPlural: 'tramos de 100 km', kwhCiclo: 18, usosSemana: 2.5,
    presets: [['Utilitario eficiente', 15], ['Compacto medio', 18], ['SUV / berlina grande', 21], ['Autovía a 120 km/h', 23]],
    amazon: 'cargador coche electrico portatil schuko tipo 2', temporada: null,
    titulo: '¿Cuánto cuesta cargar un coche eléctrico?',
    intro: `<p>Un coche eléctrico consume de media entre 14 y 20 kWh por cada 100 km. Si sumamos las pérdidas de la carga en casa (un 8-12 %), lo que realmente pagas en la factura son unos 16-22 kWh cada 100 km.</p>
<p>Con tarifa PVPC la hora de carga lo es todo: cargar de madrugada o en las horas solares puede costar menos de la mitad que hacerlo por la tarde. Un cargador con programación o el propio coche permiten elegir la franja.</p>`,
    depende: ['La eficiencia del coche y el tipo de conducción.', 'Las pérdidas del cargador (más altas en enchufe schuko a 2,3 kW).', 'La hora de carga y tu tarifa.', 'La temperatura: en invierno el consumo sube un 15-30 %.'],
    consejos: [
      'Programa la carga en las horas más baratas: es lo que más ahorra.',
      'Si cargas en casa a diario, valora una tarifa con periodo valle barato o específica para vehículo eléctrico.',
      'Precalienta el coche enchufado: la energía sale de la red y no de la batería.',
    ],
    faq: [
      ['¿Cuánto cuesta cargar un coche eléctrico en casa?', 'Para recorrer 100 km necesitas unos 18 kWh. Multiplica por el precio de la hora en la que cargas: es ahí donde está el ahorro.'],
      ['¿Cuánto tarda en cargarse?', 'En un enchufe normal (2,3 kW), unos 8 horas para 100 km. Con un wallbox de 7,4 kW, unas 2,5 horas.'],
    ],
    rel: ['patinete-electrico', 'bicicleta-electrica', 'termo-electrico'],
    mejorHora: 'coche-electrico',
  },
  {
    slug: 'patinete-electrico', nombre: 'patinete eléctrico', titulo: '¿Cuánto cuesta cargar un patinete eléctrico?', corto: 'cargar un patinete eléctrico', plural: 'patinetes eléctricos', art: 'un', cat: 'movilidad',
    modo: 'ciclo', unidad: 'carga completa', unidadPlural: 'cargas', kwhCiclo: 0.5, usosSemana: 3,
    presets: [['Batería pequeña (~280 Wh)', 0.32], ['Batería media (~450 Wh)', 0.5], ['Batería grande (~600 Wh)', 0.68]],
    amazon: 'patinete electrico', temporada: null,
    intro: `<p>Un patinete eléctrico urbano tiene una batería de 250-600 Wh. Cargarla por completo consume entre 0,3 y 0,7 kWh con las pérdidas del cargador, lo que permite recorrer 20-50 km por unos pocos céntimos. Es de las formas más baratas de moverse que existen.</p>`,
    depende: ['La capacidad de la batería.', 'Tu peso, las cuestas y la velocidad.'],
    consejos: ['No esperes a vaciarla del todo: las baterías de litio duran más entre el 20 % y el 80 %.', 'Cárgalo a temperatura ambiente, nunca justo después de un trayecto con la batería caliente.'],
    faq: [['¿Cuánto cuesta cargar un patinete eléctrico?', 'Una carga completa consume unos 0,5 kWh: céntimos para 25-40 km.']],
    rel: ['bicicleta-electrica', 'coche-electrico', 'movil'],
  },
  {
    slug: 'bicicleta-electrica', nombre: 'bicicleta eléctrica', titulo: '¿Cuánto cuesta cargar una bicicleta eléctrica?', corto: 'cargar una bicicleta eléctrica', plural: 'bicicletas eléctricas', art: 'una', cat: 'movilidad',
    modo: 'ciclo', unidad: 'carga completa', unidadPlural: 'cargas', kwhCiclo: 0.6, usosSemana: 2,
    presets: [['Batería 400 Wh', 0.45], ['Batería 500 Wh', 0.57], ['Batería 625 Wh', 0.7], ['Batería 750 Wh', 0.85]],
    amazon: 'bicicleta electrica', temporada: null,
    intro: `<p>Las baterías de bicicleta eléctrica van de 400 a 750 Wh. Una carga completa consume entre 0,45 y 0,85 kWh contando las pérdidas, y da para 40-120 km según el nivel de asistencia y el terreno.</p>`,
    depende: ['La capacidad de la batería y el nivel de asistencia.', 'El terreno, el peso y el viento.'],
    consejos: ['Usa asistencias bajas en llano: la autonomía puede duplicarse.', 'Guarda la batería a media carga si no vas a usar la bici en semanas.'],
    faq: [['¿Cuánto cuesta cargar una bici eléctrica?', 'Unos 0,6 kWh por carga completa, unos céntimos para más de 50 km.']],
    rel: ['patinete-electrico', 'coche-electrico'],
  },

  // ---------------- HOGAR ----------------
  {
    slug: 'bombilla', nombre: 'bombilla', plural: 'bombillas', art: 'una', cat: 'hogar',
    modo: 'potencia', potencias: [5, 9, 12, 42, 60], potencia: 9, ciclo: 1, horas: 5, dias: 30, diasAnio: 365,
    amazon: 'bombillas led e27', temporada: null,
    intro: `<p>Una bombilla LED de 9 W da la misma luz que una incandescente de 60 W o una halógena de 42 W: gasta entre 4 y 7 veces menos. Por eso, si aún quedan bombillas antiguas en casa, cambiarlas es de las mejoras más rentables: se amortizan en pocos meses.</p>
<p>La luz que da una bombilla se mide en lúmenes, no en vatios: 800 lúmenes equivalen a la antigua de 60 W.</p>`,
    depende: ['La tecnología (LED, halógena, incandescente).', 'Las horas de uso.', 'El número de puntos de luz encendidos.'],
    consejos: ['Sustituye primero las bombillas que más horas están encendidas (salón, cocina).', 'Compara por lúmenes: 800 lm ≈ 60 W antigua; 1.500 lm ≈ 100 W.', 'Usa sensores de presencia en pasillos y trasteros.'],
    faq: [
      ['¿Cuánto gasta una bombilla LED encendida todo el día?', 'Una de 9 W durante 24 horas consume 0,22 kWh, apenas unos céntimos.'],
      ['¿Compensa cambiar las halógenas por LED?', 'Sí: una halógena de 42 W encendida 5 horas al día gasta unos 77 kWh al año; la LED equivalente, unos 16 kWh.'],
    ],
    rel: ['television', 'router-wifi', 'aspiradora'],
  },
  {
    slug: 'aspiradora', nombre: 'aspiradora', plural: 'aspiradoras', art: 'una', cat: 'hogar',
    modo: 'potencia', potencias: [300, 600, 900], potencia: 700, ciclo: 1, horas: 0.5, dias: 12, diasAnio: 365,
    amazon: 'aspiradora sin cable', temporada: null,
    intro: `<p>Desde 2017 la Unión Europea limita las aspiradoras de trineo a 900 W, y las de escoba sin cable recargan baterías de 50-150 Wh. Aspirar media hora con una aspiradora de 700 W consume 0,35 kWh; una carga de una escoba sin cable, menos de 0,2 kWh.</p>`,
    depende: ['La potencia y el tipo (con cable o sin cable).', 'El tiempo de uso.', 'El estado del filtro y la bolsa.'],
    consejos: ['Vacía el depósito y limpia filtros a menudo: aspiran mejor y en menos tiempo.', 'Usa la potencia máxima solo en alfombras.'],
    faq: [['¿Gasta más una aspiradora con cable o sin cable?', 'Las sin cable gastan bastante menos por uso porque tienen menos potencia; a cambio, la batería limita la autonomía.']],
    rel: ['robot-aspirador', 'plancha', 'bombilla'],
  },
  {
    slug: 'robot-aspirador', nombre: 'robot aspirador', plural: 'robots aspiradores', art: 'un', cat: 'hogar',
    modo: 'ciclo', unidad: 'limpieza', unidadPlural: 'limpiezas', kwhCiclo: 0.07, usosSemana: 5,
    presets: [['Robot básico', 0.05], ['Robot medio', 0.07], ['Robot friegasuelos con base autovaciado', 0.12]],
    amazon: 'robot aspirador', temporada: null,
    intro: `<p>Un robot aspirador tiene baterías de 40-80 Wh: recargarlo tras una limpieza consume unos 0,05-0,08 kWh. A eso hay que sumar el consumo de la base de carga en espera (2-4 W las 24 horas) y, en las bases de autovaciado y lavado de mopas, los picos de varios cientos de vatios durante el vaciado o el secado de la mopa.</p>`,
    depende: ['La batería y la potencia de succión elegida.', 'Si la base seca las mopas con aire caliente.', 'El consumo en espera de la base.'],
    consejos: ['Programa las limpiezas cuando no haya nadie y en modo estándar.', 'Desactiva el secado de mopas con calor si no es necesario.'],
    faq: [['¿Gasta mucha luz un robot aspirador?', 'No: entre cargas y base en espera, unos 3-5 kWh al mes en un uso normal.']],
    rel: ['aspiradora', 'router-wifi', 'lavadora'],
  },
  {
    slug: 'depuradora-de-piscina', nombre: 'depuradora de piscina', plural: 'depuradoras de piscina', art: 'una', cat: 'hogar',
    modo: 'potencia', potencias: [370, 550, 750, 1100], potencia: 750, ciclo: 1, horas: 6, dias: 30, diasAnio: 150,
    amazon: 'bomba depuradora piscina velocidad variable', temporada: 'verano',
    intro: `<p>La bomba de la depuradora es el gran consumo de las casas con piscina en verano: una bomba de 1 CV (unos 750 W) funcionando 6-8 horas diarias consume 4,5-6 kWh al día. Las bombas de velocidad variable pueden reducir ese consumo a la mitad o menos, porque filtrar despacio durante más horas es mucho más eficiente.</p>`,
    depende: ['La potencia de la bomba (0,5, 0,75, 1 o 1,5 CV).', 'Las horas de filtrado necesarias según el volumen y la temperatura del agua.', 'El estado del filtro.'],
    consejos: ['Programa el filtrado en las horas solares más baratas del PVPC.', 'Ajusta las horas: la regla aproximada es filtrar el volumen completo 1-2 veces al día; en temperaturas suaves basta con menos.', 'Si cambias la bomba, una de velocidad variable se amortiza en 2-3 temporadas.'],
    faq: [['¿Cuántas horas debe funcionar la depuradora?', 'Como referencia, la temperatura del agua dividida entre 2: con el agua a 26 °C, unas 13 horas a baja velocidad o la mitad a velocidad alta. Depende del volumen de la piscina y del caudal de la bomba.']],
    rel: ['aire-acondicionado', 'ventilador', 'termo-electrico'],
  },
];

// Productos que encajan en cualquier página (afiliación genérica).
export const PRODUCTOS_AHORRO = [
  { q: 'enchufe medidor consumo electrico', t: 'Enchufe medidor de consumo', d: 'Mide los kWh reales de cualquier aparato. Cuesta 10-20 € y te dice exactamente qué gasta más.' },
  { q: 'enchufe inteligente wifi medidor consumo programable', t: 'Enchufe inteligente programable', d: 'Programa termos, toalleros o cargas para que funcionen solo en las horas baratas.' },
  { q: 'regleta con interruptor individual', t: 'Regleta con interruptores', d: 'Corta el standby de la tele, la consola y el ordenador de un solo clic.' },
];
