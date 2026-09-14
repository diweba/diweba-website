/**
 * DIWEBA — route registry (SINGLE SOURCE OF TRUTH FOR URLs)
 *
 * Every URL in the site is defined here exactly once. This registry drives:
 *   - each page's permalink
 *   - the canonical URL
 *   - the hreflang cluster (de / en / x-default)
 *   - the language-switch target in the header
 *   - the sitemap
 *   - breadcrumb trails
 *
 * WHY A REGISTRY RATHER THAN PER-PAGE FIELDS
 * On a previous project the language switch was stored as a per-page string and
 * three service pages silently pointed at the section index instead of their
 * actual sibling — visible to users and to Google, and not caught until someone
 * clicked it in production. Deriving the sibling by string manipulation has the
 * same failure mode as soon as slugs are translated (/pakete-preise/ shares no
 * substring with /en/pricing/). A registry makes the pairing explicit and
 * machine-checkable: tools/verify-i18n.mjs asserts every emitted page matches it.
 *
 * URL STRATEGY (spec §4): German at root, English under /en/, translated slugs.
 *
 * RULES
 *   - Lowercase, hyphen-separated, no umlauts (ueber-uns, not über-uns)
 *   - Trailing slash on every route
 *   - URLs are permanent from launch; changing one later needs a 301
 *   - Never hardcode any of these strings in a template — use the `route` filter
 */

export default {
  home: {
    de: "/",
    en: "/en/",
    nav: false, // the logo links home; it is not a nav item
  },

  service: {
    de: "/website-erstellen-lassen/",
    en: "/en/website-development/",
  },

  pricing: {
    de: "/pakete-preise/",
    en: "/en/pricing/",
    nav: true,
  },

  process: {
    de: "/ablauf/",
    en: "/en/process/",
    nav: true,
  },

  smallBusiness: {
    de: "/webdesign-kleine-unternehmen/",
    en: "/en/small-business-web-design/",
  },

  aiSearch: {
    de: "/ki-suche-optimierung/",
    en: "/en/ai-search-optimization/",
    nav: true,
  },

  about: {
    de: "/ueber-uns/",
    en: "/en/about/",
    nav: true,
  },

  faq: {
    de: "/faq/",
    en: "/en/faq/",
  },

  contact: {
    de: "/kontakt/",
    en: "/en/contact/",
    nav: true,
    cta: true,
  },

  // Conversion confirmation. Returns HTTP 200 so the GA4 event registers, but is
  // noindex and excluded from the sitemap.
  thanks: {
    de: "/kontakt/danke/",
    en: "/en/contact/thank-you/",
    noindex: true,
  },

  // Legal. The German versions are authoritative; the English ones are courtesy
  // translations and must say so on the page.
  imprint: {
    de: "/impressum/",
    en: "/en/imprint/",
    legal: true,
  },

  privacy: {
    de: "/datenschutz/",
    en: "/en/privacy/",
    legal: true,
  },
};
