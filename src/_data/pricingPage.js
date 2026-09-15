/**
 * DIWEBA — /pakete-preise/ content. Ported from DIWEBA/diweba-site.js's
 * `pricing` object (the approved design source's configurator page), plus
 * `oneThing` (the scope-boundary statement shown at the foot of that page in
 * the design). Package prices/features themselves live in packages.js —
 * this file holds everything else the pricing page needs: the monthly-fee
 * breakdown, the compare table, add-ons, and configurator interface strings.
 *
 * VAT WORDING (Phase 3A, confirmed): Kleinunternehmerregelung nach §19 UStG.
 * `note` below is the canonical wording, ported verbatim from the approved
 * source -- it already says exactly this, precisely and without inventing a
 * VAT ID. Every place a price is shown on this page (cards, compare table,
 * configurator) must trace back to this same string, never a paraphrase.
 */

export default {
  de: {
    eyebrow: "Pakete & Preise",
    h: "Fester Umfang, fester Preis.",
    sub: "Zwei Pakete, beide mit der technischen Grundlage für Google und KI-Suche. Add-ons können Sie einzeln dazunehmen.",

    monthly: {
      label: "Der monatliche Betrag",
      sub: "Zwei getrennte Posten. Der erste ist Pflicht, der zweite nicht.",
      items: [
        {
          n: "Betrieb",
          p: 39,
          /** Corrected wording (post-Phase-3C instruction): the source and
           *  this file both said "Pflicht" here. The authoritative business
           *  wording is "Keine Mindestlaufzeit" instead -- changed only on
           *  the DE side, since no approved EN equivalent of this exact
           *  phrase exists in DIWEBA/diweba-site.js (the EN row still reads
           *  "Mandatory", left untouched rather than inventing a
           *  translation). See this file's other DE/EN rows and faq.js's
           *  "Wie lange bin ich gebunden?" answer, which still states a
           *  12-month term for Betrieb -- intentionally NOT touched by this
           *  fix, which was scoped to this one label pair only. */
          req: "Keine Mindestlaufzeit",
          term: "12 Monate, danach monatlich kündbar",
          items: ["Hosting und SSL", "Backups und Sicherheitsupdates", "Rechtstexte aktuell", "Erreichbarkeitsprüfung", "Besucherzahlen"],
        },
        {
          n: "Betreuung",
          p: 30,
          signed: true,
          req: "Freiwillig",
          term: "jederzeit kündbar",
          items: ["Änderungen von uns umgesetzt", "monatlicher Blick auf die Zahlen", "bevorzugte Bearbeitung"],
        },
      ],
    },

    compareHead: "Enthalten",
    compareRows: [
      { k: "Seiten", v: ["5", "6"] },
      { k: "Blogbereich", v: ["+ 1 Artikel", "+ 2 Artikel"] },
      { k: "Formulare (Kontakt + Anfrage)", v: ["✓", "✓"] },
      { k: "Von Google und KI lesbar gebaut", sub: "Die Technik im Hintergrund, damit Ihre Seite überhaupt in Frage kommt.", v: ["✓", "✓"] },
      { k: "Inhalte, die KI zitieren kann", sub: "FAQ-Texte, einheitliche Angaben, konkrete Zahlen statt Werbesprache.", v: ["—", "✓"] },
      { k: "Google-Unternehmensprofil", v: ["✓", "✓"] },
      { k: "Search Console", v: ["✓", "✓"] },
      { k: "Cookie-Banner", v: ["kein", "mit Consent-Banner"] },
      { k: "Messung und Dashboard", v: ["—", "✓"] },
      { k: "Korrekturrunden", sub: "plus Textfreigabe, bevor wir bauen", v: ["2", "2"] },
      { k: "Livegang", v: ["10 Arbeitstage", "15 Arbeitstage"] },
    ],
    compareNote: "Lesbar ist die Voraussetzung. Zitierfähig ist das Ziel.",
    compareNote2: "Zwei Korrekturrunden sind in jedem Paket enthalten, dazu die Textfreigabe vor dem Bau. Was als Korrektur zählt und was eine neue Leistung ist, steht im Ablauf.",

    addonsLabel: "Add-ons",
    addonsSub: "Einzeln zu beiden Paketen dazunehmbar. Zusätzliche Seiten und Artikel passen ins bestehende Zeitfenster; nur was ein externes Konto oder eine Freigabe braucht, verlängert die Bauzeit.",
    addons: [
      { id: "messung", n: "Messung", d: "Sie sehen, wie viele Menschen kommen und was sie tun.", p: 290, days: 2, inPlus: true, detail: "GTM, GA4, Search Console, Looker-Dashboard, Consent-Banner" },
      { id: "ki", n: "KI-Sichtbarkeit", d: "Inhalte, die KI-Systeme zitieren können.", p: 490, days: 3, inPlus: true, detail: "FAQ-Inhalte, einheitliche Angaben, zitierfähige Struktur" },
      { id: "anfragen", n: "Anfragen+", d: "Jede Anfrage bekommt sofort eine Antwort — automatisch.", p: 490, days: 2, detail: "automatische Antwort, Erinnerung, Terminlink, Weiterleitung" },
      { id: "wissen", n: "Wissensbereich", d: "Ein Blogbereich mit drei fertig geschriebenen Artikeln.", p: 490, days: 3 },
      { id: "lokal", n: "Lokal gefunden", d: "Ihr Google-Profil zusätzlich gepflegt und ausgebaut.", p: 290, days: 2 },
      { id: "aktion", n: "Aktionsseite", d: "Eine eigene Seite für ein Angebot oder eine Kampagne.", p: 390, days: 1 },
      { id: "selbst", n: "Selbst bearbeiten", d: "Ein einfacher Zugang für Texte, Preise und Öffnungszeiten.", p: 290, mon: 10, days: 1 },
      { id: "sprache", n: "Zweite Sprache", d: "Ihre Website zusätzlich in einer zweiten Sprache.", p: 290, mon: 19, days: 3 },
      { id: "zusatz", n: "Zusatzseite", d: "Eine weitere Seite über die im Paket hinaus.", p: 150, days: 0 },
      { id: "artikel", n: "Weiterer Blogartikel", d: "Ein zusätzlicher Artikel für Ihren Wissensbereich.", p: 150, days: 0 },
    ],

    cfg: {
      label: "Konfigurator",
      h: "Stellen Sie Ihr Paket zusammen.",
      step1: "1 · Paket wählen",
      step2: "2 · Add-ons dazunehmen",
      step3: "3 · Ihr Ergebnis",
      onceLabel: "Einmalig",
      monLabel: "Monatlich",
      daysLabel: "Fertig in",
      daysUnit: "Arbeitstagen",
      inPlusNote: "in PLUS enthalten",
      noDelay: "keine Verzögerung",
      summaryLabel: "Ihre Auswahl",
      hint: "Mit PLUS bekommen Sie mehr für 80 € weniger.",
      cta: "Projekt anfragen",
      ctaNote: "Kein Kauf über die Website. Sie erhalten ein Angebot, und wir sprechen vorher kurz miteinander.",
    },

    note: "Alle Preise ohne Umsatzsteuer. Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.",

    oneThingLabel: "Wir machen eine Sache",
    oneThingBody: "Wir bauen eine Sache: Websites, die Anfragen bringen. Keine Onlineshops, keine Buchungsportale, keine Kundenkonten, keine individuelle Software. Das sind eigene Handwerke — wenn Sie so etwas brauchen, sagen wir es im ersten Gespräch und empfehlen jemanden, der es gut kann.",

    seeFaq: "Häufige Fragen zu Preisen und Ablauf",
  },

  en: {
    eyebrow: "Packages & Pricing",
    h: "Fixed scope, fixed price.",
    sub: "Two packages, both with the technical foundation for Google and AI search. Add-ons can be taken individually.",

    monthly: {
      label: "The monthly amount",
      sub: "Two separate items. The first is mandatory, the second is not.",
      items: [
        {
          n: "Operation",
          p: 39,
          req: "Mandatory",
          term: "12 months, then month to month",
          items: ["Hosting and SSL", "Backups and security updates", "Legal texts kept current", "Availability checks", "Visitor numbers"],
        },
        {
          n: "Care",
          p: 30,
          signed: true,
          req: "Voluntary",
          term: "cancel at any time",
          items: ["Changes made by us", "A monthly look at the numbers", "Priority handling"],
        },
      ],
    },

    compareHead: "Included",
    compareRows: [
      { k: "Pages", v: ["5", "6"] },
      { k: "Blog section", v: ["+ 1 article", "+ 2 articles"] },
      { k: "Forms (contact + inquiry)", v: ["✓", "✓"] },
      { k: "Built to be readable by Google and AI", sub: "The technical groundwork, so your page is in the running at all.", v: ["✓", "✓"] },
      { k: "Content that AI can quote", sub: "FAQ text, consistent details, concrete numbers instead of slogans.", v: ["—", "✓"] },
      { k: "Google Business Profile", v: ["✓", "✓"] },
      { k: "Search Console", v: ["✓", "✓"] },
      { k: "Cookie banner", v: ["none", "with consent banner"] },
      { k: "Measurement and dashboard", v: ["—", "✓"] },
      { k: "Revision rounds", sub: "plus text approval before we build", v: ["2", "2"] },
      { k: "Launch", v: ["10 working days", "15 working days"] },
    ],
    compareNote: "Readable is the precondition. Quotable is the goal.",
    compareNote2: "Two revision rounds are included in every package, plus text approval before the build. What counts as a revision and what counts as new scope is set out under Process.",

    addonsLabel: "Add-ons",
    addonsSub: "Can be added to either package. Extra pages and articles fit in the existing build window; only what needs an external account or an approval extends it.",
    addons: [
      { id: "messung", n: "Measurement", d: "You can see how many people come and what they do.", p: 290, days: 2, inPlus: true, detail: "GTM, GA4, Search Console, Looker dashboard, consent banner" },
      { id: "ki", n: "AI visibility", d: "Content that AI systems can quote.", p: 490, days: 3, inPlus: true, detail: "FAQ content, consistent details, quotable structure" },
      { id: "anfragen", n: "Inquiries+", d: "Every inquiry gets an immediate reply — automatically.", p: 490, days: 2, detail: "automatic reply, reminder, booking link, forwarding" },
      { id: "wissen", n: "Knowledge section", d: "A blog section with three finished articles.", p: 490, days: 3 },
      { id: "lokal", n: "Found locally", d: "Your Google profile additionally maintained and built out.", p: 290, days: 2 },
      { id: "aktion", n: "Campaign page", d: "A dedicated page for one offer or campaign.", p: 390, days: 1 },
      { id: "selbst", n: "Edit it yourself", d: "Simple access for text, prices and opening hours.", p: 290, mon: 10, days: 1 },
      { id: "sprache", n: "Second language", d: "Your website additionally in a second language.", p: 290, mon: 19, days: 3 },
      { id: "zusatz", n: "Extra page", d: "One more page beyond those in the package.", p: 150, days: 0 },
      { id: "artikel", n: "Another blog article", d: "One additional article for your knowledge section.", p: 150, days: 0 },
    ],

    cfg: {
      label: "Configurator",
      h: "Put your package together.",
      step1: "1 · Choose a package",
      step2: "2 · Add add-ons",
      step3: "3 · Your result",
      onceLabel: "One-time",
      monLabel: "Monthly",
      daysLabel: "Ready in",
      daysUnit: "working days",
      inPlusNote: "included in PLUS",
      noDelay: "no delay",
      summaryLabel: "Your selection",
      hint: "With PLUS you get more for €80 less.",
      cta: "Start a project",
      ctaNote: "No purchase through the website. You receive a proposal, and we speak briefly beforehand.",
    },

    note: "All prices excluding VAT. In accordance with § 19 UStG, no VAT is charged.",

    oneThingLabel: "We do one thing",
    oneThingBody: "We build one thing: websites that bring inquiries. No online shops, no booking portals, no customer accounts, no custom software. Those are trades of their own — if you need something like that, we say so in the first call and recommend someone who does it well.",

    seeFaq: "Frequent questions about pricing and process",
  },
};
