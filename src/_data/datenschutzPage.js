/**
 * DIWEBA — /datenschutz/ and /en/privacy/ STRUCTURE ONLY (Phase 3F).
 *
 * No policy text. This defines which sections a real privacy policy will
 * eventually need, in the shape src/_data/company.js's confirmed facts and
 * src/_data/site.js's actual configuration state can already drive.
 *
 * TWO KINDS OF SECTION BELOW:
 *
 *   1. Sections with no `configKey` always render (heading + "not written
 *      yet" status, via legal-body.njk) -- these describe something that is
 *      architecturally true regardless of which optional tools are turned
 *      on: hosting/server logs, the contact form, Cloudflare as
 *      infrastructure, cookies/local storage, retention, and data-subject
 *      rights all apply the moment the site is live.
 *
 *   2. Sections WITH a `configKey` only render when that tool is actually
 *      configured -- legal-body.njk checks it against the same flags the
 *      rest of the site already uses (site.js's `forms.turnstileSiteKey`
 *      and `analytics.configured`), the identical "render nothing when
 *      unconfigured, never describe an inactive tool as active" rule
 *      consent-head.njk and the contact form already follow. Right now
 *      NEITHER is configured, so neither section renders -- confirmed in
 *      the build. Usercentrics/GTM/GA4 are one combined section because
 *      site.js's own `analyticsConfigured` gates all three together (a
 *      half-configured state -- GTM without a CMP -- is treated as
 *      "not configured" everywhere else in this project; this page follows
 *      the same rule rather than inventing a finer-grained one).
 *
 * Brevo is deliberately NOT its own conditional section: it is a Worker
 * secret with no client-visible "configured" flag (unlike Turnstile's
 * public site key), so there is nothing here to check at build time. It is
 * covered by the always-present "Kontaktformular" section instead, which
 * is honest either way -- the form exists and is reachable regardless of
 * whether the Worker can currently send mail (see worker/index.ts's
 * `not_configured` fail-safe, Phase 3B).
 */

export default {
  de: {
    eyebrow: "Datenschutz",
    h: "Datenschutzerklärung",
    operatorHeading: "Verantwortlicher",

    sections: [
      { id: "hosting", heading: "Hosting und Server-Log-Dateien", body: null },
      { id: "contact-form", heading: "Kontaktformular", body: null },
      { id: "cloudflare", heading: "Cloudflare (Hosting- und Sicherheitsinfrastruktur)", body: null },
      { id: "turnstile", heading: "Cloudflare Turnstile", body: null, configKey: "turnstile" },
      { id: "analytics", heading: "Consent-Verwaltung und Analyse (Usercentrics, Google Tag Manager, Google Analytics 4)", body: null, configKey: "analytics" },
      { id: "cookies", heading: "Cookies und lokaler Speicher", body: null },
      { id: "retention", heading: "Speicherdauer und Löschung", body: null },
      { id: "rights", heading: "Ihre Rechte als betroffene Person", body: null },
    ],
  },

  en: {
    eyebrow: "Privacy",
    h: "Privacy Policy",
    operatorHeading: "Controller",
    translationNote: "This is a courtesy translation. The German version is legally authoritative.",

    sections: [
      { id: "hosting", heading: "Hosting and server log files", body: null },
      { id: "contact-form", heading: "Contact form", body: null },
      { id: "cloudflare", heading: "Cloudflare (hosting and security infrastructure)", body: null },
      { id: "turnstile", heading: "Cloudflare Turnstile", body: null, configKey: "turnstile" },
      { id: "analytics", heading: "Consent management and analytics (Usercentrics, Google Tag Manager, Google Analytics 4)", body: null, configKey: "analytics" },
      { id: "cookies", heading: "Cookies and local storage", body: null },
      { id: "retention", heading: "Retention and deletion", body: null },
      { id: "rights", heading: "Your rights as a data subject", body: null },
    ],
  },
};
