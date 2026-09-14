/**
 * DIWEBA — homepage content.
 *
 * Ported from the approved design source: DIWEBA/diweba-site.js, the content
 * deck Baki Cirak wrote to accompany DIWEBA/DIWEBA Website.dc.html (the
 * interactive homepage mockup). This is not new copy — every string below
 * traces back to that file, in the language it was written in. See
 * docs/DIWEBA_PHASE_0_SPEC.md and CLAUDE.md for why this data model exists.
 *
 * THREE DELIBERATE DEPARTURES FROM THE SOURCE FILE, each documented at the
 * point it matters:
 *
 *   1. NO TESTIMONIAL CARDS. The source's `refs.voices` array holds two cards
 *      of bracket placeholder text ("[ZITAT]", "[KUNDENNAME]", "[VORHER] →
 *      [NACHHER]"...) styled with a dashed border as an intentional "this slot
 *      is empty" signal. That intent is good and is kept — but shipping raw
 *      bracket-template text to real visitors reads as an unfinished CMS
 *      field, not a design statement, and risks being read as a fabricated
 *      proof slot rather than an honest empty one. The section instead shows
 *      only the source's own honest explanatory copy (refs.honestH,
 *      refs.honestBody, refs.payLine) plus the real built-by-us references,
 *      which fully carries the intended message without the placeholder
     cards. This is the same "renders nothing until real" principle as
 *      partials/proof.njk, applied to this section's own content.
 *
 *   2. NO FOUNDER PHOTO. The mockup's image-slot placeholder for the founder
 *      portrait is literally labelled "Porträt Katrin Vogler, hochkant" —
 *      Katrin Vogler is the placeholder name from the withdrawn demo/contract
 *      templates (Angebot.dc.html etc.), not the real operator. No photo of
 *      Baki Cirak exists for this project, and the InsightWert photo assets
 *      are explicitly off-limits (unrelated project, per instruction). The
 *      founder section is text-only until a real portrait exists.
 *
 *   3. founderName / founderRole use the CONFIRMED legal identity
 *      (src/_data/company.js: "Baki Cirak") in place of the source's
 *      "[IHR NAME]" / "[YOUR NAME]" bracket placeholder.
 *
 * Everything else — hero, stats, problem/solution, AI-search band, the six
 * "why DIWEBA" reasons, the AI-honesty statement, process steps, and the FAQ
 * subset — is the approved wording, unchanged in meaning.
 */

export default {
  de: {
    tag: "Digitale Basis für Sichtbarkeit und Anfragen",
    hero: {
      h: "Damit Kunden aus Ihrer Region Sie finden — und anrufen.",
      sub: "Eine neue Website in 10 Arbeitstagen. Fester Preis, rechtlich sauber aufgesetzt, und Sie müssen keine Zeile Text schreiben.",
      stats: [
        { n: "10", u: "Arbeitstage", d: "von Zusage bis Livegang" },
        { n: "790 €", u: "Festpreis", d: "Einstieg, einmalig" },
        { n: "5", u: "Seiten + Blog", d: "im Basispaket" },
      ],
    },
    refs: {
      builtLabel: "Von uns gebaut",
      built: [
        {
          n: "Insight Wert",
          url: "insightwert.de",
          href: "https://insightwert.de/de/",
          tag: "Unser eigenes Projekt",
          d: "Datenanalyse und Auswertung für Marketing-Entscheidungen. Von derselben Person aufgebaut, die auch DIWEBA führt.",
        },
        {
          n: "diweba.de",
          url: "diese Website",
          href: null,
          tag: "Eigenbau",
          d: "Diese Website. In zehn Arbeitstagen entstanden, mit derselben Technik, die Sie bekommen.",
        },
      ],
      voicesLabel: "Kundenstimmen",
      voicesNote:
        "Diese Plätze sind frei — hier stehen die ersten echten Bewertungen, sobald es sie gibt.",
      honestH: "Wir sind neu — und zeigen lieber echte Beispiele als erfundene.",
      honestBody:
        "DIWEBA startet gerade. Wir könnten hier zehn erfundene Kundenstimmen hinschreiben. Stattdessen sehen Sie genau die Projekte, die es wirklich gibt — und Sie zahlen die zweite Hälfte erst, wenn die Seite steht und Sie sie freigegeben haben.",
      payLine: "50 % bei Auftrag, 50 % nach Ihrer Freigabe.",
    },
    problemLabel: "Wie es sonst läuft",
    problem:
      "Die meisten Website-Projekte dauern Wochen, manche Monate. Sie warten auf Rückmeldungen, auf Entwürfe, auf einen Termin — und merken erst am Ende, was wirklich drin war.",
    solutionLabel: "Wie wir arbeiten",
    solution:
      "Wir arbeiten anders: fester Umfang, fester Preis, zehn Arbeitstage. Danach betreuen wir, was wir gebaut haben.",
    aiBand: {
      label: "KI-Suche",
      h: "Ihre Kunden fragen nicht mehr nur Google.",
      body: "Früher tippte jemand „Schreiner Potsdam“ bei Google ein und bekam eine Liste. Heute fragen immer mehr Menschen ihre KI: „Wer baut mir in Potsdam einen Einbauschrank nach Maß?“ — und bekommen keine Liste, sondern zwei oder drei Namen. Wer nicht dabei ist, kommt im Gespräch nicht vor. Wir bauen Ihre Website so, dass Sie überhaupt in Frage kommen.",
      link: "Wie das funktioniert",
    },
    whyLabel: "Warum DIWEBA",
    why: [
      { t: "Ein Festpreis von Anfang an.", d: "Sie wissen sofort, was es kostet, keine Überraschungsrechnung am Ende." },
      { t: "Fertig in 10 Arbeitstagen.", d: "statt wochenlang auf einen Termin zu warten." },
      {
        t: "Sie müssen keine Zeile schreiben.",
        d: "Viele Betriebe schieben ihre Website jahrelang vor sich her, weil niemand Lust hat, Texte zu schreiben. Bei uns beantworten Sie einen Fragebogen — wir schreiben daraus die Texte, Sie korrigieren, was nicht stimmt.",
      },
      {
        t: "Ihr Google-Profil richten wir mit ein.",
        d: "damit Kunden aus Ihrer Nähe Sie überhaupt finden, nicht nur die, die Ihren Namen schon kennen.",
      },
      {
        t: "Kein nerviger Cookie-Banner.",
        d: "im Basispaket bauen wir nichts ein, das Ihre Besucher verfolgt. Wenn Sie später Zahlen sehen möchten, kommt ein Banner dazu — das sagen wir Ihnen vorher.",
      },
      {
        t: "Sie sind nicht an uns gebunden.",
        d: "Domain und Inhalte laufen auf Ihren Namen. Die Betreuung können Sie jederzeit kündigen, und wer lieber selbst Texte ändert, bekommt einen einfachen Zugang dafür.",
      },
    ],
    aiPos: {
      h: "KI ist ein Werkzeug. Verantwortlich sind wir.",
      body: "KI ist ein gutes Werkzeug — wir nutzen es jeden Tag und geben den Vorteil im Preis weiter. Aber daraus eine Website zu machen, die bei Google und in der KI-Suche gefunden wird, rechtlich sauber bleibt und tatsächlich Kunden bringt, braucht eine Strategie dahinter. Sie kümmern sich um Ihr Geschäft. Wir kümmern uns um das technische System.",
    },
    founder: {
      label: "Wer dahintersteht",
      h: "Hinter DIWEBA steht eine Person, kein Callcenter.",
      body: "Ich komme aus der Marketing-Datenanalyse und habe immer wieder dasselbe gesehen: Unternehmen mit einer Website, aber ohne eine einzige verlässliche Zahl darüber, was sie bringt. DIWEBA ist die Antwort darauf.",
      note: "Auch Gründer von Insight Wert.",
      role: "Gründung · Systemarchitektur",
    },
    process: {
      label: "Ablauf",
      steps: [
        { t: "Kurzes Gespräch", dur: "30 Minuten", d: "Wir klären, was Ihr Betrieb braucht und ob wir passen." },
        {
          t: "Festpreis-Angebot",
          dur: "1–2 Werktage",
          d: "Fester Umfang, fester Preis, feste Termine. Was nicht darin steht, ist nicht beauftragt.",
        },
        { t: "Aufbau", dur: "10 bzw. 15 Arbeitstage", d: "Struktur, Texte, Umsetzung." },
        {
          t: "Start und Betrieb",
          dur: "ab Livegang",
          d: "Livegang, Einweisung, danach läuft der Betrieb. Betreuung nur, wenn Sie sie möchten.",
        },
      ],
    },
    // faqLabel/faq removed (Phase 3A): now read from the shared src/_data/faq.js
    // so the homepage's 6-item teaser and the full /faq/ page's 9 items cannot
    // drift apart. See partials/home-body.njk for the slice(0, 6).
    finalH: "Fragen Sie Ihr Projekt in fünf Minuten an.",
    finalSub: "Kurzes Formular, Antwort am nächsten Werktag.",
  },

  en: {
    tag: "Digital foundation for visibility and inquiries",
    hero: {
      h: "So customers in your area find you — and call.",
      sub: "A new website in 10 working days. Fixed price, legally sound, and you don't have to write a word.",
      stats: [
        { n: "10", u: "working days", d: "from go-ahead to launch" },
        { n: "€790", u: "fixed price", d: "entry package, one-time" },
        { n: "5", u: "pages + blog", d: "in the base package" },
      ],
    },
    refs: {
      builtLabel: "Built by us",
      built: [
        {
          n: "Insight Wert",
          url: "insightwert.de",
          href: "https://insightwert.de/en/",
          tag: "Our own project",
          d: "Data analysis and reporting for marketing decisions. Built by the same person who runs DIWEBA.",
        },
        {
          n: "diweba.de",
          url: "this website",
          href: null,
          tag: "Own build",
          d: "This website. Built in ten working days, with the same technique you get.",
        },
      ],
      voicesLabel: "Client voices",
      voicesNote: "These slots are open — the first real reviews go here as soon as they exist.",
      honestH: "We are new — and we would rather show real examples than invented ones.",
      honestBody:
        "DIWEBA is just starting. We could write ten invented client quotes here. Instead you see exactly the projects that really exist — and you pay the second half only once the site stands and you have approved it.",
      payLine: "50% on order, 50% after your approval.",
    },
    problemLabel: "How it usually goes",
    problem:
      "Most website projects take weeks, some take months. You wait for replies, for drafts, for an appointment — and only find out at the end what was actually included.",
    solutionLabel: "How we work",
    solution:
      "We work differently: fixed scope, fixed price, ten working days. Afterward, we look after what we built.",
    aiBand: {
      label: "AI search",
      h: "Your customers no longer ask Google alone.",
      body: "It used to be that someone typed “joiner Potsdam” into Google and got a list. Today more and more people ask their AI: “Who can build me a fitted wardrobe in Potsdam?” — and get two or three names instead of a list. Whoever isn't among them doesn't come up in the conversation. We build your site so that you are in the running at all.",
      link: "How this works",
    },
    whyLabel: "Why DIWEBA",
    why: [
      { t: "One fixed price, from day one.", d: "you know the cost immediately, no surprise invoice at the end." },
      { t: "Done in 10 working days.", d: "instead of waiting weeks for an appointment." },
      {
        t: "You don't have to write a line.",
        d: "Plenty of businesses put their website off for years because nobody wants to write the copy. With us you answer a questionnaire — we write the text from your answers, you correct whatever isn't right.",
      },
      {
        t: "We set up your Google profile too.",
        d: "so customers near you can find you at all, not only the ones who already know your name.",
      },
      {
        t: "No annoying cookie banner.",
        d: "in the base package we build in nothing that tracks your visitors. If you later want to see numbers, a banner comes with it — we tell you that beforehand.",
      },
      {
        t: "You are not tied to us.",
        d: "The domain and content are in your name. You can cancel the care plan at any time, and anyone who would rather edit text themselves gets simple access for it.",
      },
    ],
    aiPos: {
      h: "AI is a tool. We are the ones accountable.",
      body: "AI is a good tool — we use it every day and pass the advantage on in the price. But turning that into a website that gets found by Google and in AI search, stays legally clean and actually brings customers takes a strategy behind it. You look after your business. We look after the technical system.",
    },
    founder: {
      label: "Who is behind this",
      h: "There is a person behind DIWEBA, not a call centre.",
      body: "I come from marketing data analysis and kept seeing the same thing: companies with a website, but without a single reliable number about what it brings in. DIWEBA is the answer to that.",
      note: "Also founder of Insight Wert.",
      role: "Founder · Systems architecture",
    },
    process: {
      label: "Process",
      steps: [
        { t: "Short call", dur: "30 minutes", d: "We work out what your business needs and whether we fit." },
        {
          t: "Fixed-price proposal",
          dur: "1–2 working days",
          d: "Fixed scope, fixed price, fixed dates. What isn't in it isn't commissioned.",
        },
        { t: "Build", dur: "10 or 15 working days", d: "Structure, copy, build." },
        {
          t: "Launch and operation",
          dur: "from go-live",
          d: "Go-live, walkthrough, then operation runs. Care plan only if you want it.",
        },
      ],
    },
    // faqLabel/faq removed (Phase 3A): see the German block's identical note.
    // (This EN array previously diverged slightly in wording from the
    // authoritative diweba-site.js translation -- reading from the shared
    // faq.js, which is a direct port of that source, resolves that drift too.)
    finalH: "Ask about your project in five minutes.",
    finalSub: "Short form, reply on the next working day.",
  },
};
