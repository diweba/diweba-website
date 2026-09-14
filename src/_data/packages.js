/**
 * DIWEBA — package model. LOCKED.
 *
 * Exactly TWO core packages. See docs/DIWEBA_PHASE_0_SPEC.md §2 and CLAUDE.md.
 *
 *   - Do NOT add a third package. A legacy START/PLUS/KOMPLETT model with
 *     €69/€99/€149 monthly tiers exists in DIWEBA/diweba-copy.js. It is
 *     WITHDRAWN. Never reintroduce it.
 *   - Do NOT change these prices without an explicit instruction from the owner.
 *   - Add-ons are a separate collection (src/_data/pricingPage.js), never a package.
 *
 * Prices are NUMBERS, not formatted strings. One source feeds the pricing table,
 * the package cards, the configurator and the Offer structured data, so they
 * cannot drift apart. Format at render time with the `price` filter.
 *
 * SCOPE, RESOLVED (Phase 3A). Phase 1/2 left `features`/`deliveryDays` empty
 * because no approved scope existed yet — see the git history on this file for
 * that placeholder state. It now does: every string below is a direct port of
 * DIWEBA/diweba-site.js's `pricing.packages[]`, not invented for this file.
 */

export default {
  currency: "EUR",

  /** Both packages carry the same monthly Betrieb (mandatory operation fee). */
  monthlyBetrieb: 39,

  items: [
    {
      id: "start",
      order: 1,
      name: "START",
      priceOnce: 790,
      priceMonthly: 39,
      deliveryDays: 10,
      recommended: false,
      badge: null,
      summary: {
        de: "Die vollständige digitale Basis für einen Betrieb, der gefunden werden will.",
        en: "The complete digital foundation for a business that wants to be found.",
      },
      features: {
        de: [
          "5 Seiten",
          "Blogbereich + 1 Artikel",
          "2 Formulare über Brevo (Kontakt + Anfrage)",
          "Von Google und KI lesbar gebaut",
          "Search Console eingerichtet",
          "Google-Unternehmensprofil eingerichtet",
          "Besucherzahlen ohne Cookie-Banner",
          "Impressum + Datenschutzerklärung aus lizenziertem Abo",
          "2 Korrekturrunden, davor Textfreigabe",
          "10 Arbeitstage",
        ],
        en: [
          "5 pages",
          "Blog section + 1 article",
          "2 forms via Brevo (contact + inquiry)",
          "Built to be readable by Google and AI",
          "Search Console set up",
          "Google Business Profile set up",
          "Visitor numbers without a cookie banner",
          "Imprint + privacy notice from a licensed subscription",
          "2 revision rounds, with text approval before",
          "10 working days",
        ],
      },
      /** No package-level saving line for START — only PLUS has one. */
      saving: null,
    },
    {
      id: "plus",
      order: 2,
      name: "PLUS",
      priceOnce: 1490,
      priceMonthly: 39,
      deliveryDays: 15,
      recommended: true,
      badge: { de: "Am häufigsten gewählt", en: "Most popular" },
      summary: {
        de: "Alles aus START, zusätzlich Messung und Optimierung für KI-Suche.",
        en: "Everything in START, plus measurement and AI-search optimization.",
      },
      features: {
        de: [
          "Alles aus START, aber 6 Seiten und Blogbereich + 2 Artikel",
          "Messung: GTM, GA4, Search Console, Looker-Dashboard, Consent-Banner",
          "KI-Sichtbarkeit: FAQ-Inhalte, einheitliche Angaben, zitierfähige Struktur",
          "15 Arbeitstage",
        ],
        en: [
          "Everything in START, but 6 pages and blog section + 2 articles",
          "Measurement: GTM, GA4, Search Console, Looker dashboard, consent banner",
          "AI visibility: FAQ content, consistent details, quotable structure",
          "15 working days",
        ],
      },
      /**
       * "Einzeln 1.870 €" = summed price of PLUS's own two add-on
       * equivalents (Messung 290 + KI-Sichtbarkeit 490 = 780) on top of
       * START's 790 base once-price -- i.e. what building the same scope as
       * separate add-ons on START would cost (790 + 290 + 490 = 1570)... the
       * design's own figure is 1.870, which is PLUS's 1490 + the 380
       * saving, so it is presented as "what you'd pay for equivalent value
       * bought piecemeal" per the source, not re-derived here. Kept as the
       * exact approved figure rather than recomputed, since the source
       * doesn't show its arithmetic and re-deriving it risks silently
       * contradicting the approved number.
       */
      saving: {
        de: "Einzeln 1.870 € — im Paket 380 € günstiger.",
        en: "€1,870 separately — €380 less as a package.",
      },
    },
  ],
};
