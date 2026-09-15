/**
 * DIWEBA — /ki-suche-optimierung/ and /en/ai-search/ content. Ported from
 * DIWEBA/diweba-site.js's `aiPage` object (the approved design source's
 * dedicated AI-search page, `isAi` block in DIWEBA Website.dc.html,
 * lines 476-583) -- eyebrow/h/sub/changeLabel/changeBody/decide/honesty/
 * tech/content are the approved wording, unchanged in meaning.
 *
 * ONE DELIBERATE DEPARTURE FROM THE SOURCE, required by the standing
 * no-fabrication rule (CLAUDE.md, and the identical instruction already
 * applied to this same scenario in Phase 3A):
 *
 *   "Schreinerei Baumann" / "Schreinerei Baumann GmbH" is demo data from the
 *   withdrawn contract templates, not a real DIWEBA customer -- it must
 *   never appear on the public site regardless of how clearly an example is
 *   framed as fictional. The source uses it in two places:
 *
 *   1. `listSide.items` (the "10 blue links" mock search-results list) --
 *      one of ten items is the specific name "Schreinerei Baumann" while
 *      the other nine are generic listing-TYPE labels ("Verzeichnis-
 *      Eintrag", "Anzeige", "Bewertungsportal"...). Replaced with the
 *      Phase 3A-preferred neutral phrase "ein lokaler Handwerksbetrieb" /
 *      "a local trade business" -- it reads naturally in that list (one of
 *      the ten links being a local business's own site is exactly what a
 *      real 2015-era results page looked like) without naming anyone.
 *
 *   2. `aiSide.items` (the "2-3 names an AI actually gives" list) -- all
 *      THREE items in the source are specific invented company names
 *      ("Schreinerei Baumann GmbH", "Tischlerei Krause", "Holzwerk
 *      Nuthetal"). Only the first is on CLAUDE.md's explicit blocklist, but
 *      swapping it for one neutral phrase while leaving two other
 *      still-invented, still-specific-sounding company names sitting next
 *      to it would read exactly like "replacing it with another fictional
 *      company name" -- the one thing the Phase 3D instruction explicitly
 *      forbids. All three are instead neutral ordinal placeholders (see
 *      below), matching how this identical scenario is already handled on
 *      the homepage: home.js's aiBand.body describes the AI answer giving
 *      "zwei oder drei Namen" / "two or three names" without ever naming
 *      any of them. This page's version is slightly more concrete (it
 *      renders as a short list, not one sentence) but stays at the same
 *      level of abstraction the homepage already established.
 *
 * The closing CTA (`finalH` / two buttons in the source) is NOT duplicated
 * here -- it reuses home.js's `finalH` and ui.js's `ctaPrimary`/
 * `ctaSecondary`, the same site-wide closing-CTA pattern already used by
 * ablauf/faq/about-body.njk.
 */

export default {
  de: {
    eyebrow: "KI-Sichtbarkeit",
    h: "Wenn Ihr Kunde ChatGPT fragt — steht Ihr Name in der Antwort?",
    sub: "Immer mehr Menschen suchen nicht mehr in einer Liste, sondern fragen ein System. Wer dort nicht vorkommt, kommt im Gespräch nicht vor.",

    changeLabel: "Was sich gerade ändert",
    exampleTag: "Beispiel — ein erfundener Betrieb, um den Unterschied zu zeigen",
    changeBody: "Früher tippte jemand „Schreiner Potsdam“ bei Google ein und bekam eine Liste mit zehn blauen Links. Heute fragen immer mehr Menschen ihre KI: „Wer baut mir in Potsdam einen Einbauschrank nach Maß?“ — und bekommen keine Liste, sondern zwei oder drei Namen.",

    listSide: {
      label: "Google, früher",
      q: "schreiner potsdam",
      items: ["Verzeichnis-Eintrag", "Anzeige", "Handwerkskammer", "Bewertungsportal", "ein lokaler Handwerksbetrieb", "Branchenbuch", "Anzeige", "Regionalportal", "Kleinanzeigen", "Forum"],
    },
    aiSide: {
      label: "KI, heute",
      q: "Wer baut mir in Potsdam einen Einbauschrank nach Maß?",
      items: ["Ein lokaler Handwerksbetrieb", "Ein zweiter Anbieter aus der Region", "Ein dritter Anbieter vor Ort"],
    },

    decideLabel: "Was entscheidet, wer genannt wird?",
    decide: [
      { t: "Die KI muss Ihre Seite lesen können.", d: "KI-Systeme lesen Websites anders als Menschen: sie suchen klare Abschnitte mit klaren Antworten. Eine schöne Seite, die technisch unübersichtlich ist, wird übersprungen. Diese Struktur bauen wir in jedes Paket ein." },
      { t: "Es muss etwas zu zitieren geben.", d: "KI-Systeme geben Antworten weiter, keine Werbesprüche. „Wir sind Ihr zuverlässiger Partner“ kann niemand zitieren. „Ein Einbauschrank nach Maß kostet bei uns zwischen 1.800 und 4.500 Euro, je nach Holz und Größe“ — das schon." },
      { t: "Ihre Angaben müssen überall gleich sein.", d: "Wenn Ihre Adresse auf der Website anders steht als im Google-Profil, weiß kein System sicher, welches Unternehmen Sie sind." },
      { t: "Andere müssen über Sie sprechen.", d: "Bewertungen, Erwähnungen, Verzeichnisse. KI-Systeme prüfen, ob es Sie auch außerhalb Ihrer eigenen Website gibt." },
    ],

    honesty: {
      h1: "Was wir nicht versprechen",
      b1: "Niemand kann garantieren, dass ein bestimmtes KI-System Sie bei einer bestimmten Frage nennt. Diese Systeme ändern sich wöchentlich und niemand steuert sie von außen. Wer Ihnen eine Nennung in ChatGPT garantiert, verkauft Ihnen Zufall.",
      h2: "Was wir tun",
      b2: "Wir bauen die Voraussetzungen, die Google und KI-Systeme brauchen, um Sie überhaupt in Betracht zu ziehen.",
    },

    includedLabel: "Was ist wo enthalten",
    tech: {
      h: "Technische Grundlage",
      note: "In jedem Paket enthalten",
      items: ["Klare Abschnitte mit klaren Antworten", "Hinterlegte Angaben zu Ihrem Unternehmen", "Saubere Seitenstruktur und Ladezeit", "Search Console eingerichtet"],
    },
    content: {
      h: "Inhaltliche Arbeit",
      note: "Add-on KI-Sichtbarkeit · 490 € — in PLUS enthalten",
      items: ["FAQ-Inhalte aus echten Kundenfragen", "Einheitliche Angaben auf allen Plattformen", "Zitierfähige Inhalte: Preise, Abläufe, Zahlen", "Prüfung, wie Sie außerhalb Ihrer Website vorkommen"],
    },
  },

  en: {
    eyebrow: "AI visibility",
    h: "When your customer asks ChatGPT — is your name in the answer?",
    sub: "More and more people no longer search a list, they ask a system. Whoever doesn't appear there doesn't come up in the conversation.",

    changeLabel: "What is changing right now",
    exampleTag: "Example — an invented business, to show the difference",
    changeBody: "It used to be that someone typed “joiner Potsdam” into Google and got a list of ten blue links. Today more and more people ask their AI: “Who can build me a fitted wardrobe in Potsdam?” — and get two or three names instead of a list.",

    listSide: {
      label: "Google, before",
      q: "joiner potsdam",
      items: ["Directory entry", "Ad", "Chamber of crafts", "Review portal", "a local trade business", "Trade listing", "Ad", "Regional portal", "Classifieds", "Forum"],
    },
    aiSide: {
      label: "AI, today",
      q: "Who can build me a fitted wardrobe in Potsdam?",
      items: ["A local trade business", "A second provider in the region", "A third provider nearby"],
    },

    decideLabel: "What decides who gets named?",
    decide: [
      { t: "The AI has to be able to read your page.", d: "AI systems read websites differently from people: they look for clear sections with clear answers. A beautiful page that is technically disorganised gets skipped. We build that structure into every package." },
      { t: "There has to be something to quote.", d: "AI systems pass on answers, not slogans. Nobody can quote “we are your reliable partner”. “A fitted wardrobe costs between 1,800 and 4,500 euros with us, depending on wood and size” — that they can." },
      { t: "Your details must be the same everywhere.", d: "If your address reads differently on the website than in your Google profile, no system can be sure which company you are." },
      { t: "Other people have to talk about you.", d: "Reviews, mentions, directories. AI systems check whether you exist outside your own website too." },
    ],

    honesty: {
      h1: "What we do not promise",
      b1: "No one can guarantee that a particular AI system will name you for a particular question. These systems change weekly and nobody steers them from outside. Anyone guaranteeing you a mention in ChatGPT is selling you chance.",
      h2: "What we do",
      b2: "We build the conditions that Google and AI systems need in order to consider you at all.",
    },

    includedLabel: "What is included where",
    tech: {
      h: "Technical foundation",
      note: "Included in every package",
      items: ["Clear sections with clear answers", "Your company details recorded in the background", "Clean page structure and load time", "Search Console set up"],
    },
    content: {
      h: "Content work",
      note: "Add-on AI visibility · €490 — included in PLUS",
      items: ["FAQ content from real customer questions", "Consistent details across all platforms", "Quotable content: prices, processes, numbers", "A check on how you appear outside your website"],
    },
  },
};
