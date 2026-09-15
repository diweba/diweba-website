/**
 * DIWEBA — /impressum/ and /en/imprint/ STRUCTURE ONLY (Phase 3F).
 *
 * This is deliberately not legal copy. It defines which sections a German
 * Impressum needs (§5 DDG-style categories) so the real page has the right
 * shape, headings and CMS fields the day reviewed legal text exists -- see
 * legal-body.njk's header comment for how a section with `body: null`
 * renders (a real <h2>, plus an honest "not written yet" status line, never
 * invented text and never a bracket placeholder).
 *
 * The operator/legal-form/address/email block is NOT duplicated here --
 * legal-body.njk reads it straight from src/_data/company.js (the one
 * place those facts already live, already gated through the `required`
 * filter so a still-unconfirmed fact fails the build instead of publishing
 * a guess).
 *
 * Deliberately NOT included as a section: a telephone line. company.js's
 * `phone` is null on purpose ("do not display or require a telephone
 * number" -- confirmed business rule, Phase 3A) -- there is no pending
 * placeholder for it because there will never be a value to fill in.
 *
 * Sections below are real German Impressum categories that legitimately
 * need lawyer-drafted text (liability disclaimers, copyright notice,
 * dispute-resolution/EU-ODR language, the §18 Abs. 2 MStV responsible-
 * content-person declaration, and the VAT/Kleinunternehmer statement in its
 * formal Impressum phrasing -- not the pricing page's own differently-
 * scoped VAT sentence, reused here as-is would be repurposing pricing copy
 * as a legal disclosure, which is exactly the kind of "don't invent, don't
 * misapply" line this phase draws).
 */

export default {
  de: {
    eyebrow: "Impressum",
    h: "Impressum",
    operatorHeading: "Angaben gemäß § 5 DDG",

    sections: [
      { id: "vat", heading: "Umsatzsteuer", body: null },
      { id: "responsible", heading: "Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV", body: null },
      { id: "liability-content", heading: "Haftung für Inhalte", body: null },
      { id: "liability-links", heading: "Haftung für Links", body: null },
      { id: "copyright", heading: "Urheberrecht", body: null },
      { id: "dispute", heading: "Streitschlichtung", body: null },
    ],
  },

  en: {
    eyebrow: "Imprint",
    h: "Imprint",
    operatorHeading: "Information pursuant to § 5 DDG",
    /** Required disclosure, not invented copy -- CLAUDE.md: "The German
     *  versions of legal pages are authoritative; English versions are
     *  courtesy translations and must say so." legal-body.njk renders this
     *  only on the EN page. */
    translationNote: "This is a courtesy translation. The German version is legally authoritative.",

    sections: [
      { id: "vat", heading: "VAT", body: null },
      { id: "responsible", heading: "Responsible for content pursuant to § 18 (2) MStV", body: null },
      { id: "liability-content", heading: "Liability for content", body: null },
      { id: "liability-links", heading: "Liability for links", body: null },
      { id: "copyright", heading: "Copyright", body: null },
      { id: "dispute", heading: "Dispute resolution", body: null },
    ],
  },
};
