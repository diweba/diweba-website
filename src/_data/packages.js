/**
 * DIWEBA — package model. LOCKED.
 *
 * Exactly TWO core packages. See docs/DIWEBA_PHASE_0_SPEC.md §2 and CLAUDE.md.
 *
 *   - Do NOT add a third package. A legacy START/PLUS/KOMPLETT model with
 *     €69/€99/€149 monthly tiers exists in DIWEBA/diweba-copy.js. It is
 *     WITHDRAWN. Never reintroduce it.
 *   - Do NOT change these prices without an explicit instruction from the owner.
 *   - Add-ons are a separate collection (src/_data/addons.js), never a package.
 *
 * Prices are NUMBERS, not formatted strings. One source feeds the pricing table,
 * the package cards and the Offer structured data, so they cannot drift apart.
 * Format at render time with the `price` filter.
 *
 * PHASE 2: this file becomes a Sveltia CMS collection. The shape below is the
 * shape the CMS will write, so the migration is a move, not a rewrite.
 *
 * SCOPE IS DELIBERATELY ABSENT. Page count, revision rounds, delivery time,
 * what €39 Betrieb covers and the minimum term are all unresolved (spec §2).
 * `features` stays empty until the owner defines them — an invented feature list
 * would contradict the "fixed scope" positioning it is meant to support.
 */

export default {
  currency: "EUR",

  /** Both packages carry the same monthly Betrieb. */
  monthlyBetrieb: 39,

  items: [
    {
      id: "start",
      order: 1,
      name: "START",
      priceOnce: 790,
      priceMonthly: 39,
      recommended: false,
      summary: {
        de: "Das Kernpaket: eine moderne Website zum Festpreis.",
        en: "The core package: a modern website at a fixed price.",
      },
      /** Unresolved — see file header. Rendered only when non-empty. */
      features: { de: [], en: [] },
    },
    {
      id: "plus",
      order: 2,
      name: "PLUS",
      priceOnce: 1490,
      priceMonthly: 39,
      recommended: true,
      summary: {
        de: "Alles aus START, zusätzlich Messung und Optimierung für KI-Suche.",
        en: "Everything in START, plus measurement and AI-search optimization.",
      },
      features: { de: [], en: [] },
    },
  ],
};
