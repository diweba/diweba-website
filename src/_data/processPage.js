/**
 * DIWEBA — /ablauf/ content. Ported from DIWEBA/diweba-site.js's `process`
 * object. Phase 2's home.js carries a 4-step TEASER of this same content for
 * the homepage; this file is the complete version — steps with their "what
 * we need from you" field, the revision policy, and the six pre-call
 * questions.
 *
 * NOT ON THIS PAGE (deliberately): the design source also embeds all 9 FAQ
 * items at the foot of the Process page (isProcess block, DIWEBA Website.dc.html
 * lines 668-678). Phase 3A instead builds a dedicated /faq/ page from the same
 * approved 9 items (src/_data/faq.js) and does not duplicate the full list
 * here -- the Phase 3A instruction's own description of what belongs on this
 * page ("four process steps, timing/durations, revision policy, preparation
 * questions and CTA") does not mention FAQ, which reads as confirmation of
 * this split rather than an oversight. A single link to /faq/ replaces the
 * duplicated block.
 */

export default {
  de: {
    label: "Ablauf",
    h: "Vier Schritte, feste Termine.",
    sub: "Was passiert, was wir von Ihnen brauchen und wie lange es dauert.",

    steps: [
      { t: "Kurzes Gespräch", dur: "30 Minuten", d: "Wir klären, was Ihr Betrieb braucht und ob wir passen.", need: "30 Minuten und sechs kurze Antworten vorab." },
      { t: "Festpreis-Angebot", dur: "1–2 Werktage", d: "Fester Umfang, fester Preis, feste Termine. Was nicht darin steht, ist nicht beauftragt.", need: "Zusage und Firmendaten." },
      { t: "Aufbau", dur: "10 bzw. 15 Arbeitstage", d: "Struktur, Texte, Umsetzung.", need: "Bilder, Angaben und Freigaben innerhalb von je 5 Werktagen. Später gelieferte Inhalte verschieben den Livegang." },
      { t: "Start und Betrieb", dur: "ab Livegang", d: "Livegang, Einweisung, danach läuft der Betrieb. Betreuung nur, wenn Sie sie möchten.", need: "Eine Nachricht, wenn sich etwas ändert." },
    ],
    needLabel: "Von Ihnen",

    qLabel: "Sechs Fragen vorab",
    qIntro: "Vor dem Gespräch schicken wir Ihnen sechs kurze Fragen — damit wir beide vorbereitet sind.",
    questions: [
      "Was macht Ihr Betrieb, und wer sind Ihre typischen Kunden?",
      "Haben Sie schon eine Website? Wenn ja, welche Adresse?",
      "Was soll die neue Website vor allem erreichen?",
      "Brauchen Sie einen Shop, einen Login-Bereich oder ein Buchungssystem?",
      "Gibt es Bilder von Ihrer Arbeit, die wir verwenden können?",
      "Bis wann möchten Sie online sein?",
    ],

    rev: {
      h: "Korrekturen — was inklusive ist",
      lead: "Sie sehen Ihre Website dreimal, bevor sie online geht.",
      stages: [
        { t: "Die Texte, bevor wir bauen", d: "Sie bekommen alle Texte als einfaches Dokument. Erst wenn Sie einverstanden sind, fangen wir mit dem Bauen an." },
        { t: "Die fertige Seite, Korrekturrunde 1", d: "Sie sehen die Website unter einem Vorschau-Link und tragen Ihre Änderungswünsche in ein nummeriertes Formular ein." },
        { t: "Die letzte Runde, Korrekturrunde 2", d: "Wir setzen um, Sie prüfen ein letztes Mal. Dann geht die Seite live." },
      ],
      inLabel: "Das ist eine Korrektur",
      inItems: ["Texte ändern", "Bilder tauschen", "Farben oder Schriftgrößen anpassen", "Abschnitte umsortieren", "Kontaktdaten oder Preise korrigieren"],
      outLabel: "Das ist eine neue Leistung — und wird vorher angeboten",
      outItems: ["eine zusätzliche Seite", "ein anderes Gestaltungskonzept nach der Freigabe", "neue Funktionen, die nicht im Angebot standen", "Inhalte in einer weiteren Sprache"],
      close1: "Für jede Runde haben Sie 5 Werktage Zeit.",
      close2: "Nach dem Livegang hört es nicht auf: mit der Betreuung übernehmen wir kleine Änderungen weiterhin, und wer lieber selbst ändert, bekommt einen Zugang dafür.",
    },

    // Closing CTA reuses home[lang].finalH/finalSub -- same shared sentence
    // the design uses site-wide, sourced once rather than duplicated per page.
    seeFaq: "Weitere Fragen beantwortet unsere FAQ-Seite",
  },

  en: {
    label: "Process",
    h: "Four steps, fixed dates.",
    sub: "What happens, what we need from you, and how long each part takes.",

    steps: [
      { t: "Short call", dur: "30 minutes", d: "We work out what your business needs and whether we fit.", need: "30 minutes and six short answers in advance." },
      { t: "Fixed-price proposal", dur: "1–2 working days", d: "Fixed scope, fixed price, fixed dates. What isn't in it isn't commissioned.", need: "The go-ahead and your company details." },
      { t: "Build", dur: "10 or 15 working days", d: "Structure, copy, build.", need: "Images, details and approvals within 5 working days each. Content delivered later moves the launch date." },
      { t: "Launch and operation", dur: "from go-live", d: "Go-live, walkthrough, then operation runs. Care plan only if you want it.", need: "A message when something changes." },
    ],
    needLabel: "From you",

    qLabel: "Six questions in advance",
    qIntro: "Before the call we send you six short questions — so we are both prepared.",
    questions: [
      "What does your business do, and who are your typical customers?",
      "Do you already have a website? If so, at which address?",
      "What should the new website mainly achieve?",
      "Do you need a shop, a login area or a booking system?",
      "Are there photos of your work we can use?",
      "By when would you like to be online?",
    ],

    rev: {
      h: "Revisions — what's included",
      lead: "You see your website three times before it goes live.",
      stages: [
        { t: "The copy, before we build", d: "You get all the text as a simple document. Only once you agree do we start building." },
        { t: "The finished site, revision round 1", d: "You see the website at a preview link and enter your change requests in a numbered form." },
        { t: "The last round, revision round 2", d: "We make the changes, you check one final time. Then the site goes live." },
      ],
      inLabel: "This is a revision",
      inItems: ["Changing text", "Swapping images", "Adjusting colours or type sizes", "Reordering sections", "Correcting contact details or prices"],
      outLabel: "This is new scope — and gets quoted beforehand",
      outItems: ["an additional page", "a different design concept after approval", "new features that were not in the proposal", "content in a further language"],
      close1: "You have 5 working days for each round.",
      close2: "It does not stop at launch: with the care plan we keep making small changes, and anyone who would rather edit themselves gets access for it.",
    },

    seeFaq: "More questions are answered on our FAQ page",
  },
};
