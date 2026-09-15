/**
 * DIWEBA — FAQ. Single source of truth for BOTH the homepage's 6-item teaser
 * and the full 9-item /faq/ page (Phase 3A). Previously the homepage carried
 * its own embedded 6-item copy in src/_data/home.js; that duplication is
 * removed here so the two surfaces cannot silently drift apart — the
 * homepage now reads `faq[lang].items.slice(0, 6)` directly.
 *
 * All 9 items are a direct port of DIWEBA/diweba-site.js's `faq.items` —
 * nothing invented, nothing paraphrased. Do not add a 10th "for SEO"; the
 * approved set is exactly these nine, in both languages.
 */

export default {
  de: {
    label: "Häufige Fragen",
    items: [
      {
        q: "Warum kommt meine Website ohne Cookie-Banner aus?",
        a: "Weil wir im Basispaket nichts einbauen, das Ihre Besucher verfolgt. Ohne Verfolgung ist kein Banner nötig. Wenn Sie später Besucherzahlen mit Google Analytics sehen möchten, kommt ein Banner dazu — das sagen wir Ihnen vorher.",
      },
      {
        q: "Kann ich die Website später selbst ändern?",
        a: "Ja, wenn Sie möchten. Standardmäßig übernehmen wir Änderungen für Sie. Wenn Sie lieber selbst ran wollen, richten wir Ihnen einen einfachen Zugang ein (290 € einmalig + 10 €/Monat), mit dem Sie Texte, Preise und Öffnungszeiten selbst ändern können.",
      },
      {
        q: "Wie lange bin ich gebunden?",
        /** Corrected (confirmed 2026): Betrieb has no minimum term -- see
         *  pricingPage.js's matching cross-reference comment on its
         *  `monthly` object. An earlier version of this answer said "läuft
         *  12 Monate, danach monatlich kündbar", which was never the actual
         *  business model. */
        a: "Der Betrieb (Hosting, Sicherheit, Backups) hat keine Mindestlaufzeit und ist monatlich kündbar. Die Betreuung ist optional und jederzeit kündbar.",
      },
      {
        q: "Gehört die Website mir?",
        a: "Ja. Domain und Inhalte laufen auf Ihren Namen, Sie können jederzeit umziehen.",
      },
      {
        q: "Ich habe schon eine Website — was passiert damit?",
        a: "Wir bauen neu und ziehen Ihre Domain um. Ihre alte Seite geht am Tag des Livegangs offline, die Adresse bleibt dieselbe. Ihre E-Mail-Adressen bleiben unberührt — das prüfen wir vor dem Umzug.",
      },
      {
        q: "Warum nicht einfach selbst mit KI bauen?",
        a: "Können Sie. Eine Seite zu erzeugen ist heute einfach. Die Fragen danach sind die schwierigen: Welches Angebot gehört nach vorne? Wird die Seite überhaupt gefunden? Stimmen Impressum und Datenschutz? Kommt die Anfrage wirklich in Ihrem Postfach an? Und wer schaut in drei Monaten nach, ob es funktioniert?",
      },
      {
        q: "Was kostet das wirklich?",
        a: "Der Festpreis Ihres Pakets plus 39 € Betrieb im Monat. Add-ons stehen mit Preis im Angebot.",
      },
      {
        q: "Kommen noch Kosten dazu — Domain, Hosting?",
        a: "Nein. Domain, Hosting, Sicherheitsupdates und Backups sind im Betrieb enthalten.",
      },
      {
        q: "Hilft mir das auch bei ChatGPT und Co.?",
        a: "Niemand kann ehrlich garantieren, in einer bestimmten KI-Antwort genannt zu werden. Aber wir bauen Ihre Website technisch lesbar und klar strukturiert — genau das, was Google und KI-Systeme brauchen, um Sie überhaupt in Betracht zu ziehen.",
      },
    ],
  },

  en: {
    label: "Frequent questions",
    items: [
      {
        q: "Why does my website need no cookie banner?",
        a: "Because in the base package we build in nothing that tracks your visitors. With no tracking, no banner is needed. If you later want to see visitor numbers with Google Analytics, a banner comes with it — we tell you beforehand.",
      },
      {
        q: "Can I edit the site myself later?",
        a: "Yes, if you want to. By default we make changes for you. If you would rather do it yourself, we set up simple access (€290 one-time + €10/month) that lets you change text, prices and opening hours yourself.",
      },
      {
        q: "How long am I tied in?",
        a: "Operation (hosting, security, backups) has no minimum term and can be cancelled monthly. The care plan is optional and can be cancelled at any time.",
      },
      {
        q: "Do I own the website?",
        a: "Yes. The domain and content are in your name, you can move at any time.",
      },
      {
        q: "I already have a website — what happens to it?",
        a: "We build a new one and move your domain across. Your old site goes offline on launch day, the address stays the same. Your email addresses are untouched — we check that before the move.",
      },
      {
        q: "Why not just build it myself with AI?",
        a: "You can. Producing a page is easy today. The questions afterward are the hard ones: which offer belongs at the top? Will the page be found at all? Are the imprint and privacy notice correct? Does the inquiry actually arrive in your inbox? And who checks in three months whether it works?",
      },
      {
        q: "What does this really cost?",
        a: "The fixed price of your package plus €39 operation per month. Add-ons appear with their price in the proposal.",
      },
      {
        q: "Are there extra costs — domain, hosting?",
        a: "No. Domain, hosting, security updates and backups are included in operation.",
      },
      {
        q: "Will this help me show up in ChatGPT too?",
        a: "No one can honestly guarantee a mention in a specific AI answer. But we build your site to be technically readable and clearly structured — exactly what both Google and AI systems need to consider you in the first place.",
      },
    ],
  },
};
