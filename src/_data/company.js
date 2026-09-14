/**
 * DIWEBA — legal entity facts.
 *
 * ONLY CONFIRMED FACTS BELONG HERE. See docs/DIWEBA_PHASE_0_SPEC.md §1.
 *
 * Unresolved values are `null` ON PURPOSE. They are not placeholders waiting for
 * something plausible — they are facts nobody has supplied yet, and inventing one
 * would put false information into legal copy.
 *
 * Templates must render these through the `required` filter:
 *
 *     {{ company.email | required("contact email") }}
 *
 * which throws at BUILD TIME if the value is still null. That is deliberate: a
 * failed build is recoverable, a published Impressum containing a made-up email
 * address is not.
 *
 * Do not "temporarily" fill these in to make the build pass.
 */

export default {
  // --- Confirmed ------------------------------------------------------------
  brand: "DIWEBA",

  legalName: "Baki Cirak",

  address: {
    street: "Brunnenstraße 7B",
    postalCode: "76297",
    city: "Stutensee-Spöck",
    country: "Germany",
    countryCode: "DE",
  },

  // --- Unresolved — must not be published ----------------------------------

  /**
   * Confirmed 2026 (Phase 2.5 instruction). This was the single most-cited
   * blocker through Phase 0-2: it gates the Impressum (§5 DDG) and the
   * Organization JSON-LD contactPoint. Both now resolve automatically from
   * this one value — nothing else needed to change.
   */
  email: "hello@diweba.de",

  /**
   * Confirmed 2026 (Phase 3A instruction): DELIBERATELY absent, not merely
   * unresolved. The instruction was explicit — "Do not display or require a
   * telephone number on the public site" — so unlike email this is not a
   * fact waiting to be supplied; it is a fact that a phone number is not
   * part of DIWEBA's public contact surface. ContactPoint schema and any
   * future contact-form "phone" field must stay optional/absent to match,
   * not silently reinterpret this as still-unresolved.
   */
  phone: null,

  /** Confirmed 2026 (Phase 3A instruction). Feeds the Impressum and Organization schema. */
  legalForm: "Einzelunternehmen",

  /**
   * Confirmed 2026 (Phase 3A instruction): Kleinunternehmerregelung nach
   * §19 UStG. No VAT is charged on any price. Canonical wording (matches the
   * approved design source exactly, both languages) lives in
   * src/_data/pricingPage.js's `note` field — every place a price appears
   * must use that wording verbatim, never an invented shorthand like "VAT
   * free" and never a VAT ID, since none exists under this regime.
   */
  taxStatus: "kleinunternehmer",

  /** Only if VAT-registered. */
  vatId: null,

  /**
   * Whether the registered address may be shown outside the Impressum — in
   * Organization schema, the footer, or Google Business Profile. It is a private
   * residential address, so this is a deliberate decision, not a default.
   * Until it is made, the address appears in the Impressum only.
   */
  publishAddressPublicly: false,

  /**
   * Real, official profiles only — for `sameAs` in Organization schema.
   * Empty until such profiles actually exist. Never invent one.
   */
  sameAs: [],
};
