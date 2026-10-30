// Páginas de presentación del bot de Telegram «Splitto» (repartir gastos en grupo), en 7 idiomas.
// Son páginas independientes del resto de la web: no usan su cabecera ni su publicidad.
const BOT = 'SplittoAppBot';
const ABRIR = `https://t.me/${BOT}`;
const GRUPO = `https://t.me/${BOT}?startgroup=web`;

const L = {
  es: {
    ruta: '/splitto/', nombre: 'Español',
    title: 'Bot de Telegram para dividir gastos en grupo, gratis · Splitto',
    desc: 'Splitto reparte los gastos de tu grupo de Telegram: viajes, pisos compartidos y cenas. Quién debe a quién y cómo saldar cuentas. Gratis, sin app y sin registro.',
    h1: 'Divide los gastos de tu grupo sin salir de Telegram',
    intro: 'Splitto es un bot gratuito que lleva las cuentas de tu grupo de Telegram: el viaje con amigos, el piso compartido, la cena de empresa o el regalo de cumpleaños. Apuntas lo que pagas con un mensaje y el bot calcula quién debe a quién.',
    cta: 'Añadir Splitto a mi grupo', cta2: 'Abrir en Telegram',
    chat: ['/gasto 30 pizza', '🧾 pizza · 30,00 €', 'Pagó Ana · Reparto: Ana 10,00 € · Luis 10,00 € · Marta 10,00 €', '/saldar', '🤝 Para quedar en paz: Luis → Ana 10,00 € · Marta → Ana 10,00 €'],
    como_t: 'Cómo funciona',
    como: ['Añade @SplittoAppBot a tu grupo y pulsad «Me apunto».', 'Apunta cada gasto: <code>/gasto 25 pizza</code>. Con botones eliges quién participa y quién pagó.', 'Mira los saldos con <code>/saldos</code> y los pagos mínimos para quedar en paz con <code>/saldar</code>.'],
    ventajas_t: 'Por qué Splitto',
    ventajas: ['<b>Sin app ni registro:</b> funciona dentro del chat que ya usáis.', '<b>Sin límites diarios:</b> apunta todos los gastos que quieras, gratis.', '<b>Cualquier moneda y 7 idiomas:</b> español, inglés, portugués, francés, italiano, alemán y ruso.', '<b>Cuentas exactas:</b> reparte al céntimo y calcula el mínimo de transferencias.'],
    faq_t: 'Preguntas frecuentes',
    faq: [
      ['¿Es gratis?', 'Sí. Apuntar gastos, ver saldos y saldar cuentas es gratis y sin límites. Hay un Premium opcional por grupo (gastos fijos mensuales, repartos desiguales, otras monedas y exportar a Excel), y cada grupo nuevo lo prueba gratis 14 días.'],
      ['¿Es una alternativa a Splitwise o Tricount?', 'Sí: hace lo mismo que esas apps, pero dentro de Telegram, así que nadie tiene que instalar nada ni crear una cuenta.'],
      ['¿Qué datos guarda?', 'Solo lo necesario para las cuentas: el nombre de Telegram de cada persona, los grupos donde está el bot y los gastos apuntados. No lee los mensajes que no son para él y no hay anuncios. Con /borrardatos se borra todo.'],
      ['¿Se puede usar en un chat privado?', 'Splitto está pensado para grupos. En privado te explica cómo añadirlo a uno.'],
    ],
    pie: 'Splitto es un proyecto independiente y no está afiliado a Telegram.',
  },
  en: {
    ruta: '/splitto/en/', nombre: 'English',
    title: 'Free Telegram bot to split group expenses · Splitto',
    desc: 'Splitto splits the expenses of your Telegram group: trips, shared flats and dinners. Who owes whom and the fewest payments to settle up. Free, no app, no sign-up.',
    h1: 'Split group expenses without leaving Telegram',
    intro: 'Splitto is a free bot that keeps the accounts of your Telegram group: a trip with friends, a shared flat, a team dinner or a birthday gift. Log what you pay with one message and the bot works out who owes whom.',
    cta: 'Add Splitto to my group', cta2: 'Open in Telegram',
    chat: ['/add 30 pizza', '🧾 pizza · $30.00', 'Paid by Ana · Split: Ana $10.00 · Luis $10.00 · Marta $10.00', '/settle', '🤝 To get even: Luis → Ana $10.00 · Marta → Ana $10.00'],
    como_t: 'How it works',
    como: ['Add @SplittoAppBot to your group and tap “I’m in”.', 'Log every expense: <code>/add 25 pizza</code>. Buttons let you choose who takes part and who paid.', 'Check balances with <code>/balance</code> and the fewest payments to get even with <code>/settle</code>.'],
    ventajas_t: 'Why Splitto',
    ventajas: ['<b>No app, no sign-up:</b> it works inside the chat you already use.', '<b>No daily limits:</b> log as many expenses as you like, for free.', '<b>Any currency, 7 languages:</b> English, Spanish, Portuguese, French, Italian, German and Russian.', '<b>Exact accounts:</b> splits to the cent and minimizes transfers.'],
    faq_t: 'FAQ',
    faq: [
      ['Is it free?', 'Yes. Logging expenses, checking balances and settling up is free with no limits. There is an optional Premium per group (recurring monthly expenses, unequal splits, other currencies and Excel export), and every new group tries it free for 14 days.'],
      ['Is it a Splitwise or Tricount alternative?', 'Yes: it does the same job, but inside Telegram, so nobody has to install an app or create an account.'],
      ['What data does it keep?', 'Only what the accounts need: each person’s Telegram name, the groups the bot is in and the expenses you log. It does not read messages that are not meant for it, and there are no ads. /deletedata erases everything.'],
      ['Can I use it in a private chat?', 'Splitto is made for groups. In a private chat it explains how to add it to one.'],
    ],
    pie: 'Splitto is an independent project and is not affiliated with Telegram.',
  },
  pt: {
    ruta: '/splitto/pt/', nombre: 'Português',
    title: 'Bot do Telegram para dividir despesas em grupo, grátis · Splitto',
    desc: 'O Splitto divide as despesas do seu grupo do Telegram: viagens, casa compartilhada e jantares. Quem deve a quem e como acertar as contas. Grátis, sem app e sem cadastro.',
    h1: 'Divida as despesas do grupo sem sair do Telegram',
    intro: 'O Splitto é um bot gratuito que cuida das contas do seu grupo do Telegram: a viagem com os amigos, a casa compartilhada, o jantar da firma ou o presente de aniversário. Você anota o que pagou com uma mensagem e o bot calcula quem deve a quem.',
    cta: 'Adicionar o Splitto ao meu grupo', cta2: 'Abrir no Telegram',
    chat: ['/gasto 30 pizza', '🧾 pizza · R$ 30,00', 'Pago por Ana · Divisão: Ana R$ 10,00 · Luis R$ 10,00 · Marta R$ 10,00', '/acertar', '🤝 Para acertar tudo: Luis → Ana R$ 10,00 · Marta → Ana R$ 10,00'],
    como_t: 'Como funciona',
    como: ['Adicione o @SplittoAppBot ao seu grupo e toquem em «Estou dentro».', 'Anote cada despesa: <code>/gasto 25 pizza</code>. Com botões você escolhe quem participa e quem pagou.', 'Veja os saldos com <code>/saldos</code> e o mínimo de pagamentos para acertar tudo com <code>/acertar</code>.'],
    ventajas_t: 'Por que o Splitto',
    ventajas: ['<b>Sem app e sem cadastro:</b> funciona dentro do chat que vocês já usam.', '<b>Sem limites diários:</b> anote quantas despesas quiser, grátis.', '<b>Qualquer moeda e 7 idiomas:</b> português, espanhol, inglês, francês, italiano, alemão e russo.', '<b>Contas exatas:</b> divide até o centavo e calcula o mínimo de transferências.'],
    faq_t: 'Perguntas frequentes',
    faq: [
      ['É grátis?', 'Sim. Anotar despesas, ver saldos e acertar as contas é grátis e sem limites. Existe um Premium opcional por grupo (despesas fixas mensais, divisões desiguais, outras moedas e exportar para Excel), e cada grupo novo testa grátis por 14 dias.'],
      ['É uma alternativa ao Splitwise ou ao Tricount?', 'Sim: faz o mesmo que esses apps, mas dentro do Telegram, então ninguém precisa instalar nada nem criar conta.'],
      ['Que dados ele guarda?', 'Só o necessário para as contas: o nome de Telegram de cada pessoa, os grupos em que o bot está e as despesas anotadas. Ele não lê mensagens que não são para ele e não há anúncios. Com /apagardados tudo é apagado.'],
      ['Dá para usar num chat privado?', 'O Splitto foi feito para grupos. No privado ele explica como adicioná-lo a um.'],
    ],
    pie: 'O Splitto é um projeto independente e não é afiliado ao Telegram.',
  },
  fr: {
    ruta: '/splitto/fr/', nombre: 'Français',
    title: 'Bot Telegram gratuit pour partager les dépenses · Splitto',
    desc: 'Splitto partage les dépenses de votre groupe Telegram : voyages, colocations et dîners. Qui doit quoi à qui et comment être quittes. Gratuit, sans appli ni inscription.',
    h1: 'Partagez les dépenses du groupe sans quitter Telegram',
    intro: 'Splitto est un bot gratuit qui tient les comptes de votre groupe Telegram : le voyage entre amis, la colocation, le dîner d’équipe ou le cadeau d’anniversaire. Notez ce que vous payez en un message et le bot calcule qui doit quoi à qui.',
    cta: 'Ajouter Splitto à mon groupe', cta2: 'Ouvrir dans Telegram',
    chat: ['/depense 30 pizza', '🧾 pizza · 30,00 €', 'Payé par Ana · Partage : Ana 10,00 € · Luis 10,00 € · Marta 10,00 €', '/regler', '🤝 Pour être quittes : Luis → Ana 10,00 € · Marta → Ana 10,00 €'],
    como_t: 'Comment ça marche',
    como: ['Ajoutez @SplittoAppBot à votre groupe et appuyez sur « Je participe ».', 'Notez chaque dépense : <code>/depense 25 pizza</code>. Des boutons permettent de choisir qui participe et qui a payé.', 'Consultez les soldes avec <code>/soldes</code> et le minimum de virements pour être quittes avec <code>/regler</code>.'],
    ventajas_t: 'Pourquoi Splitto',
    ventajas: ['<b>Sans appli ni inscription :</b> tout se passe dans votre conversation.', '<b>Sans limite quotidienne :</b> notez autant de dépenses que vous voulez, gratuitement.', '<b>Toutes les devises, 7 langues :</b> français, anglais, espagnol, portugais, italien, allemand et russe.', '<b>Des comptes exacts :</b> partage au centime près et minimum de virements.'],
    faq_t: 'Questions fréquentes',
    faq: [
      ['C’est gratuit ?', 'Oui. Noter les dépenses, voir les soldes et régler les comptes est gratuit et sans limite. Un Premium optionnel par groupe existe (dépenses fixes, partages inégaux, autres devises, export Excel), et chaque nouveau groupe l’essaie gratuitement pendant 14 jours.'],
      ['Est-ce une alternative à Tricount ou Splitwise ?', 'Oui : il fait la même chose, mais dans Telegram, donc personne n’a besoin d’installer une appli ni de créer un compte.'],
      ['Quelles données sont gardées ?', 'Seulement le nécessaire : le nom Telegram de chacun, les groupes où se trouve le bot et les dépenses notées. Il ne lit pas les messages qui ne lui sont pas destinés et il n’y a pas de publicité. /effacerdonnees supprime tout.'],
      ['Peut-on l’utiliser en conversation privée ?', 'Splitto est fait pour les groupes. En privé, il explique comment l’ajouter à un groupe.'],
    ],
    pie: 'Splitto est un projet indépendant, non affilié à Telegram.',
  },
  it: {
    ruta: '/splitto/it/', nombre: 'Italiano',
    title: 'Bot Telegram gratis per dividere le spese di gruppo · Splitto',
    desc: 'Splitto divide le spese del tuo gruppo Telegram: viaggi, case condivise e cene. Chi deve a chi e come saldare i conti. Gratis, senza app e senza registrazione.',
    h1: 'Dividi le spese del gruppo senza uscire da Telegram',
    intro: 'Splitto è un bot gratuito che tiene i conti del tuo gruppo Telegram: il viaggio con gli amici, la casa condivisa, la cena di lavoro o il regalo di compleanno. Segni quello che paghi con un messaggio e il bot calcola chi deve a chi.',
    cta: 'Aggiungi Splitto al mio gruppo', cta2: 'Apri in Telegram',
    chat: ['/spesa 30 pizza', '🧾 pizza · 30,00 €', 'Ha pagato Ana · Divisione: Ana 10,00 € · Luis 10,00 € · Marta 10,00 €', '/saldare', '🤝 Per essere pari: Luis → Ana 10,00 € · Marta → Ana 10,00 €'],
    como_t: 'Come funziona',
    como: ['Aggiungi @SplittoAppBot al tuo gruppo e toccate «Ci sono».', 'Segna ogni spesa: <code>/spesa 25 pizza</code>. Con i pulsanti scegli chi partecipa e chi ha pagato.', 'Guarda i saldi con <code>/saldi</code> e il minimo di pagamenti per essere pari con <code>/saldare</code>.'],
    ventajas_t: 'Perché Splitto',
    ventajas: ['<b>Senza app né registrazione:</b> funziona nella chat che usate già.', '<b>Senza limiti giornalieri:</b> segna tutte le spese che vuoi, gratis.', '<b>Qualsiasi valuta e 7 lingue:</b> italiano, inglese, spagnolo, portoghese, francese, tedesco e russo.', '<b>Conti esatti:</b> divide al centesimo e calcola il minimo di trasferimenti.'],
    faq_t: 'Domande frequenti',
    faq: [
      ['È gratis?', 'Sì. Segnare le spese, vedere i saldi e saldare i conti è gratis e senza limiti. C’è un Premium facoltativo per gruppo (spese fisse mensili, divisioni non uguali, altre valute ed esportazione in Excel), e ogni nuovo gruppo lo prova gratis per 14 giorni.'],
      ['È un’alternativa a Splitwise o Tricount?', 'Sì: fa la stessa cosa, ma dentro Telegram, quindi nessuno deve installare app o creare un account.'],
      ['Quali dati conserva?', 'Solo il necessario per i conti: il nome Telegram di ognuno, i gruppi in cui si trova il bot e le spese segnate. Non legge i messaggi che non sono per lui e non ci sono pubblicità. Con /cancelladati si cancella tutto.'],
      ['Si può usare in chat privata?', 'Splitto è pensato per i gruppi. In privato spiega come aggiungerlo a uno.'],
    ],
    pie: 'Splitto è un progetto indipendente, non affiliato a Telegram.',
  },
  de: {
    ruta: '/splitto/de/', nombre: 'Deutsch',
    title: 'Kostenloser Telegram-Bot zum Ausgaben teilen · Splitto',
    desc: 'Splitto teilt die Ausgaben deiner Telegram-Gruppe: Reisen, WG und Abendessen. Wer wem was schuldet und wie ihr quitt werdet. Kostenlos, ohne App und ohne Anmeldung.',
    h1: 'Gruppenausgaben teilen, ohne Telegram zu verlassen',
    intro: 'Splitto ist ein kostenloser Bot, der die Kasse deiner Telegram-Gruppe führt: die Reise mit Freunden, die WG, das Teamessen oder das Geburtstagsgeschenk. Du trägst mit einer Nachricht ein, was du bezahlt hast, und der Bot rechnet aus, wer wem was schuldet.',
    cta: 'Splitto zu meiner Gruppe hinzufügen', cta2: 'In Telegram öffnen',
    chat: ['/ausgabe 30 Pizza', '🧾 Pizza · 30,00 €', 'Bezahlt von Ana · Aufteilung: Ana 10,00 € · Luis 10,00 € · Marta 10,00 €', '/abrechnen', '🤝 Um quitt zu sein: Luis → Ana 10,00 € · Marta → Ana 10,00 €'],
    como_t: 'So funktioniert es',
    como: ['Füge @SplittoAppBot zu deiner Gruppe hinzu und tippt auf „Ich bin dabei“.', 'Trag jede Ausgabe ein: <code>/ausgabe 25 Pizza</code>. Mit Tasten wählst du, wer mitmacht und wer bezahlt hat.', 'Sieh dir die Salden mit <code>/salden</code> an und die wenigsten Zahlungen zum Ausgleich mit <code>/abrechnen</code>.'],
    ventajas_t: 'Warum Splitto',
    ventajas: ['<b>Ohne App und Anmeldung:</b> alles läuft im Chat, den ihr schon nutzt.', '<b>Ohne Tageslimit:</b> trag so viele Ausgaben ein, wie du willst, kostenlos.', '<b>Jede Währung, 7 Sprachen:</b> Deutsch, Englisch, Spanisch, Portugiesisch, Französisch, Italienisch und Russisch.', '<b>Exakte Abrechnung:</b> auf den Cent genau und mit den wenigsten Überweisungen.'],
    faq_t: 'Häufige Fragen',
    faq: [
      ['Ist es kostenlos?', 'Ja. Ausgaben eintragen, Salden ansehen und abrechnen ist kostenlos und ohne Limit. Es gibt ein optionales Premium pro Gruppe (monatliche Fixkosten, ungleiche Aufteilung, andere Währungen und Excel-Export), und jede neue Gruppe testet es 14 Tage gratis.'],
      ['Ist es eine Alternative zu Splitwise oder Tricount?', 'Ja: Es macht dasselbe, aber direkt in Telegram, also muss niemand eine App installieren oder ein Konto anlegen.'],
      ['Welche Daten werden gespeichert?', 'Nur, was die Abrechnung braucht: der Telegram-Name jeder Person, die Gruppen, in denen der Bot ist, und die eingetragenen Ausgaben. Er liest keine Nachrichten, die nicht für ihn sind, und es gibt keine Werbung. /datenloeschen löscht alles.'],
      ['Kann ich ihn im privaten Chat nutzen?', 'Splitto ist für Gruppen gemacht. Im privaten Chat erklärt er, wie man ihn zu einer Gruppe hinzufügt.'],
    ],
    pie: 'Splitto ist ein unabhängiges Projekt und nicht mit Telegram verbunden.',
  },
  ru: {
    ruta: '/splitto/ru/', nombre: 'Русский',
    title: 'Бесплатный бот Telegram для разделения расходов · Splitto',
    desc: 'Splitto делит расходы вашей группы в Telegram: поездки, съёмная квартира, ужины. Кто кому должен и как рассчитаться. Бесплатно, без приложений и регистрации.',
    h1: 'Делите расходы группы, не выходя из Telegram',
    intro: 'Splitto — бесплатный бот, который ведёт общую кассу вашей группы в Telegram: поездка с друзьями, съёмная квартира, корпоративный ужин или подарок на день рождения. Записываете расход одним сообщением, а бот считает, кто кому должен.',
    cta: 'Добавить Splitto в группу', cta2: 'Открыть в Telegram',
    chat: ['/add 30 пицца', '🧾 пицца · 30,00 ₽', 'Платила Ана · Делёжка: Ана 10,00 ₽ · Луис 10,00 ₽ · Марта 10,00 ₽', '/settle', '🤝 Чтобы рассчитаться: Луис → Ана 10,00 ₽ · Марта → Ана 10,00 ₽'],
    como_t: 'Как это работает',
    como: ['Добавьте @SplittoAppBot в группу и нажмите «Я участвую».', 'Записывайте каждый расход: <code>/add 25 пицца</code>. Кнопками выбираете, кто участвует и кто платил.', 'Смотрите балансы командой <code>/balance</code>, а минимум переводов — командой <code>/settle</code>.'],
    ventajas_t: 'Почему Splitto',
    ventajas: ['<b>Без приложений и регистрации:</b> всё прямо в вашем чате.', '<b>Без дневных лимитов:</b> записывайте сколько угодно расходов бесплатно.', '<b>Любая валюта и 7 языков:</b> русский, английский, испанский, португальский, французский, итальянский и немецкий.', '<b>Точные расчёты:</b> до копейки и с минимумом переводов.'],
    faq_t: 'Частые вопросы',
    faq: [
      ['Это бесплатно?', 'Да. Записывать расходы, смотреть балансы и рассчитываться можно бесплатно и без ограничений. Есть необязательный Premium для группы (ежемесячные платежи, неравная делёжка, другие валюты и экспорт в Excel), и каждая новая группа пробует его 14 дней бесплатно.'],
      ['Это замена Splitwise?', 'Да: он делает то же самое, но прямо в Telegram, поэтому никому не нужно устанавливать приложение или создавать аккаунт.'],
      ['Какие данные хранятся?', 'Только нужное для расчётов: имя в Telegram, группы, где есть бот, и записанные расходы. Бот не читает сообщения, адресованные не ему, рекламы нет. Команда /deletedata удаляет всё.'],
      ['Можно ли пользоваться в личном чате?', 'Splitto создан для групп. В личном чате он объясняет, как добавить его в группу.'],
    ],
    pie: 'Splitto — независимый проект, не связанный с Telegram.',
  },
};

const ORDEN = ['es', 'en', 'pt', 'fr', 'it', 'de', 'ru'];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const CSS = `:root{--bg:#f6f8f6;--card:#fff;--fg:#1c2420;--mut:#5f6b64;--line:#dfe6e1;--acc:#2f7d49;--acc2:#d93a30;--bub:#e7f6e9;--bot:#fff;--btxt:#fff}
@media (prefers-color-scheme:dark){:root{--bg:#121714;--card:#1b221e;--fg:#e8efe9;--mut:#a3b0a8;--line:#2c3630;--acc:#5cc47d;--acc2:#f06b5f;--bub:#1f3a29;--bot:#232c27;--btxt:#0b1f12}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:17px/1.55 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
main{max-width:860px;margin:0 auto;padding:28px 16px 48px}a{color:var(--acc)}h1{font-size:clamp(28px,5vw,42px);line-height:1.15;margin:8px 0 12px}
h2{font-size:22px;margin:34px 0 10px}.marca{font-weight:700;font-size:20px;color:var(--acc);text-decoration:none}.intro{font-size:19px;color:var(--mut)}
.botones{display:flex;flex-wrap:wrap;gap:12px;margin:22px 0}.b{display:inline-block;padding:13px 20px;border-radius:12px;font-weight:700;text-decoration:none}
.b1{background:var(--acc);color:var(--btxt)}.b2{border:2px solid var(--acc);color:var(--acc)}
.chat{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px;display:grid;gap:8px;margin:18px 0}
.m{max-width:85%;padding:9px 13px;border-radius:14px;font-size:15px}.u{justify-self:end;background:var(--bub)}.r{justify-self:start;background:var(--bot);border:1px solid var(--line)}
ol,ul{padding-left:22px}li{margin:6px 0}code{background:var(--card);border:1px solid var(--line);border-radius:6px;padding:1px 6px;font-size:15px}
details{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin:10px 0}summary{font-weight:700;cursor:pointer}
.idiomas{display:flex;flex-wrap:wrap;gap:10px;font-size:15px;margin-top:6px}footer{margin-top:40px;color:var(--mut);font-size:14px;border-top:1px solid var(--line);padding-top:14px}`;

function pagina(SITE, k) {
  const t = L[k];
  const alt = ORDEN.map((x) => `<link rel="alternate" hreflang="${x}" href="${SITE}${L[x].ruta}">`).join('') +
    `<link rel="alternate" hreflang="x-default" href="${SITE}${L.en.ruta}">`;
  const ld = [{
    '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Splitto', applicationCategory: 'FinanceApplication',
    operatingSystem: 'Telegram', url: ABRIR, description: t.desc, inLanguage: k, offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  }, {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: t.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  }];
  const [c1, c2, c3, c4, c5] = t.chat;
  return `<!doctype html><html lang="${k}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(t.title)}</title><meta name="description" content="${esc(t.desc)}"><link rel="canonical" href="${SITE}${t.ruta}">${alt}
<meta property="og:title" content="${esc(t.title)}"><meta property="og:description" content="${esc(t.desc)}"><meta property="og:url" content="${SITE}${t.ruta}"><meta property="og:type" content="website">
<style>${CSS}</style><script type="application/ld+json">${JSON.stringify(ld)}</script></head><body><main>
<a class="marca" href="${t.ruta}">🧾 Splitto</a>
<h1>${esc(t.h1)}</h1>
<p class="intro">${esc(t.intro)}</p>
<div class="botones"><a class="b b1" href="${GRUPO}">${esc(t.cta)}</a><a class="b b2" href="${ABRIR}">${esc(t.cta2)}</a></div>
<div class="chat" aria-hidden="true"><div class="m u">${esc(c1)}</div><div class="m r"><b>${esc(c2)}</b><br>${esc(c3)}</div><div class="m u">${esc(c4)}</div><div class="m r">${esc(c5)}</div></div>
<h2>${esc(t.como_t)}</h2><ol>${t.como.map((x) => `<li>${x}</li>`).join('')}</ol>
<h2>${esc(t.ventajas_t)}</h2><ul>${t.ventajas.map((x) => `<li>${x}</li>`).join('')}</ul>
<div class="botones"><a class="b b1" href="${GRUPO}">${esc(t.cta)}</a></div>
<h2>${esc(t.faq_t)}</h2>${t.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}
<footer><div class="idiomas">${ORDEN.map((x) => (x === k ? `<b>${L[x].nombre}</b>` : `<a href="${L[x].ruta}" hreflang="${x}">${L[x].nombre}</a>`)).join(' · ')}</div>
<p>${esc(t.pie)}</p></footer></main></body></html>`;
}

export function paginasSplitto(SITE) {
  return ORDEN.map((k) => ({ ruta: L[k].ruta, html: pagina(SITE, k) }));
}
