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

  /** Required by §5 DDG for the Impressum. BLOCKS LAUNCH. */
  email: null,

  /** Optional for the site; affects ContactPoint schema and Google Business Profile. */
  phone: null,

  /** e.g. Einzelunternehmen. Feeds the Impressum and Organization schema. */
  legalForm: null,

  /**
   * Tax status determines the price label and the two options are mutually
   * exclusive, so the pricing page cannot be written until this is set:
   *   "kleinunternehmer" -> §19 UStG, no VAT charged, prices must NOT say "zzgl. USt"
   *   "vat"              -> VAT-registered, prices shown net, must say so
   */
  taxStatus: null,

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
