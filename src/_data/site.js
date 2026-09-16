/**
 * DIWEBA — site-level build configuration.
 *
 * Everything here is derived from environment variables so that no identifier,
 * key or environment-specific value is ever committed to the repository.
 * See .env.example for the full list and how each one is supplied.
 *
 * PER-CLIENT REUSE (spec §17): this file plus src/_data/company.js and the design
 * tokens are the only places a client-specific value should ever appear. A new
 * client site swaps these; components stay untouched.
 */

const env = process.env;

/** production | preview | development */
const siteEnv = env.SITE_ENV || "development";
const isProduction = siteEnv === "production";

/**
 * Analytics and consent are considered configured only when BOTH the CMP and the
 * tag manager are present. A half-configured state is worse than none: GTM
 * without Usercentrics would load Google tags with no way to collect consent.
 *
 * When this is false the consent partial renders NOTHING — no Consent Mode
 * defaults, no CMP, no GTM. Nothing is faked or stubbed.
 */
const usercentricsSettingsId = env.USERCENTRICS_SETTINGS_ID || null;
const gtmId = env.GTM_CONTAINER_ID || null;
const analyticsConfigured = Boolean(usercentricsSettingsId && gtmId);

export default {
  env: siteEnv,
  isProduction,

  /** Canonical origin, no trailing slash. */
  url: (env.SITE_URL || "https://diweba.de").replace(/\/+$/, ""),

  /**
   * Only production is indexable. Preview and local builds emit
   * `noindex, nofollow` site-wide — an indexable staging site is an SEO incident
   * and this makes it impossible by default rather than by remembering.
   */
  indexable: isProduction,

  defaultLang: "de",
  languages: ["de", "en"],

  analytics: {
    configured: analyticsConfigured,
    /**
     * Even when IDs exist, analytics stays off outside production so preview
     * traffic never reaches the real GA4 property.
     */
    enabled: analyticsConfigured && isProduction,
    usercentricsSettingsId,
    gtmId,
    /** Configured inside GTM; recorded here for the privacy policy and tooling. */
    ga4Id: env.GA4_MEASUREMENT_ID || null,
  },

  forms: {
    /** Public Turnstile site key. The secret key is a Worker secret, never here. */
    turnstileSiteKey: env.TURNSTILE_SITE_KEY || null,
    endpoint: "/api/contact",
  },

  /** Social card fallback. Generated per page in Phase 4. */
  defaultOgImage: "/assets/img/og-default.png",
};
