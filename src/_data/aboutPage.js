/**
 * DIWEBA — /ueber-uns/ and /en/about/ content. Ported from
 * DIWEBA/diweba-site.js's `about` object (eyebrow/h/story/insightLabel/
 * insight/contactLabel — approved wording, unchanged in meaning) via the
 * `isAbout` markup in DIWEBA/DIWEBA Website.dc.html (lines 687-727).
 *
 * name/role are NOT duplicated here -- the source's own bracket
 * placeholders ("[IHR NAME]", "[ORT]") are resolved by reading the already-
 * confirmed values straight from src/_data/company.js (legalName) and
 * src/_data/home.js (founder.role), the same two fields the homepage's own
 * founder section already renders. One source of truth for an identity
 * fact, not a second copy that could drift.
 *
 * THREE DELIBERATE DEPARTURES FROM THE SOURCE, all required by confirmed
 * Phase 0/3A/3B business rules, not stylistic choices:
 *
 *   1. NO LOCATION IN THE ROLE LINE. The source's role string is
 *      "Gründung · Systemarchitektur · [ORT]" -- explicit Phase 3C
 *      instruction: "Do NOT add a location to the founder role line."
 *      home.js's founder.role already omits it ("Gründung ·
 *      Systemarchitektur"), reused here rather than re-typed.
 *
 *   2. CONTACT LIST CUT FROM THREE ITEMS TO ONE. The source's `contact`
 *      array is ["[E-MAIL]", "[TELEFON]", "[ADRESSE]"]. DIWEBA's confirmed
 *      public contact surface has no phone number at all (company.js's
 *      phone: null, "do not display or require a telephone number" --
 *      already enforced the same way on the contact page, Phase 3B) and no
 *      public address (company.js's publishAddressPublicly: false). Only
 *      the confirmed email renders; the other two bracket placeholders are
 *      dropped, not filled with an invented value.
 *
 *   3. "Insight Wert" in the insight paragraph is a genuine <a href> to the
 *      real, live site (https://insightwert.de/) rather than plain text --
 *      matching the exact same treatment Phase 2 already gave the identical
 *      reference on the homepage (see home.js's refs.built[0] and this
 *      file's header comment there). The sentence itself is split into
 *      before/linkText/after purely so the template can hang the <a> on the
 *      existing words; no wording is added, removed or reordered.
 *
 * "oneThingLabel"/"oneThingBody" are NOT duplicated here either -- that
 * scope-boundary statement is identical, word for word, between the
 * source's home.oneThing and pricing.oneThing blocks, and already lives
 * once in src/_data/pricingPage.js. about-body.njk reads it from there.
 */

export default {
  de: {
    eyebrow: "Über DIWEBA",
    h: "Hinter DIWEBA steht eine Person, kein Callcenter.",
    photoAlt: "Porträt von Baki Cirak, Gründer und Systemarchitekt von DIWEBA",

    story: [
      "Ich komme aus der Marketing-Datenanalyse und habe immer wieder dasselbe gesehen: Unternehmen mit einer Website, aber ohne eine einzige verlässliche Zahl darüber, was sie bringt.",
      "Auf die Frage „Wie viele Anfragen kommen über Ihre Website?“ folgte fast immer dieselbe Antwort: „Ich glaube, ein paar.“ Die Website war da, aber niemand wusste, ob sie arbeitet.",
      "DIWEBA ist die Antwort darauf. Kein Gestaltungsbüro, sondern eine feste Bauleistung: eine Website, die in zehn Arbeitstagen steht, für Google und für KI-Suche lesbar ist, und danach betreut wird. Fester Umfang, fester Preis, und am Ende eine Zahl, an der man sieht, ob es funktioniert.",
    ],

    insightLabel: "Auch",
    insight: {
      before: "Auch ",
      linkText: "Insight Wert",
      href: "https://insightwert.de/de/",
      after: " — Datenanalyse und Auswertung für Marketing-Entscheidungen. Dasselbe Team, dieselbe Handschrift.",
    },

    contactLabel: "Direkt erreichbar",
  },

  en: {
    eyebrow: "About DIWEBA",
    h: "There is a person behind DIWEBA, not a call centre.",
    photoAlt: "Portrait of Baki Cirak, founder and systems architect of DIWEBA",

    story: [
      "I come from marketing data analysis and kept seeing the same thing: companies with a website, but without a single reliable number about what it brings in.",
      "The question “how many inquiries come through your website?” was almost always followed by the same answer: “A few, I think.” The website was there, but nobody knew whether it was working.",
      "DIWEBA is the answer to that. Not a design studio, but a defined build: a website that stands in ten working days, is readable for Google and for AI search, and is looked after afterward. Fixed scope, fixed price, and at the end a number that shows whether it works.",
    ],

    insightLabel: "Also",
    insight: {
      before: "Also ",
      linkText: "Insight Wert",
      href: "https://insightwert.de/en/",
      after: " — data analysis and reporting for marketing decisions. Same team, same hand.",
    },

    contactLabel: "Reachable directly",
  },
};
