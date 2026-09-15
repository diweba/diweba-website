/**
 * DIWEBA — interface strings only.
 *
 * SCOPE: navigation labels, button text, form labels, skip links, aria labels.
 * NOT page copy. Page headlines and body content live in src/content/ and move
 * to the CMS in Phase 2; putting them here would place them outside the owner's
 * editing reach, which is the whole point of having a CMS.
 *
 * Every string exists in both languages. English is a real translation, never
 * machine-translated filler (spec §5).
 */

export default {
  de: {
    htmlLang: "de",
    langName: "Deutsch",
    switchTo: "English",
    switchToCode: "EN",
    switchAria: "Switch to English",

    skipToContent: "Zum Inhalt springen",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schließen",
    mainNavAria: "Hauptnavigation",
    footerNavAria: "Fußzeilen-Navigation",
    /** Distinguishes the footer's second <nav> (legal links) from the first
     *  (page links) — both used t.footerNavAria until Phase 2.5's audit,
     *  which left two landmarks on the page with an identical accessible
     *  name and nothing to tell them apart in a screen reader's landmark
     *  list. */
    footerLegalNavAria: "Rechtliches",
    breadcrumbAria: "Brotkrumen-Navigation",
    home: "Startseite",

    /** Language-switch links render bare "DE"/"EN" text (see header.njk,
     *  footer.njk) — visually unambiguous next to each other, but "DE" alone
     *  conveys nothing to a screen reader out of that visual context. These
     *  back an aria-label on every such link, current and other alike. */
    currentLanguage: "Aktuelle Sprache: Deutsch",

    nav: {
      home: "Startseite",
      pricing: "Pakete & Preise",
      aiSearch: "KI-Sichtbarkeit",
      process: "Ablauf",
      about: "Über DIWEBA",
      contact: "Kontakt",
      /** Not a nav:true route (routes.js) -- this label is used only by the
       *  breadcrumb trail and JSON-LD BreadcrumbList on /faq/, never
       *  rendered as a top-level menu item. Matches faq.js's own `label`. */
      faq: "Häufige Fragen",
      /** Same pattern as `faq` above -- /kontakt/danke/ is noindex (routes.js)
       *  and not a nav:true route, but breadcrumbs.njk still renders on every
       *  non-home page, so it needs a label to show. Matches contactPage.js's
       *  own thanks.heading in spirit without being that literal sentence. */
      thanks: "Anfrage gesendet",
      /** Same pattern again (Phase 3F): imprint/privacy are legal:true
       *  routes, not nav:true, but breadcrumbs.njk renders on every
       *  non-home page and needs a label. Matches legal.imprint/legal.privacy
       *  below -- duplicated per-key rather than having breadcrumbs.njk fall
       *  back to t.legal[routeKey], since that would special-case one
       *  partial around a naming coincidence that won't always hold. */
      imprint: "Impressum",
      privacy: "Datenschutz",
    },

    legal: {
      imprint: "Impressum",
      privacy: "Datenschutz",
    },

    /** Phase 3F: labels for the confirmed-facts block shared by the
     *  Impressum and Datenschutz structural skeletons (legal-body.njk).
     *  Kept separate from ui.form's name/email (contact-form field labels)
     *  so the two contexts can diverge later without coupling. */
    legalFields: {
      name: "Name",
      form: "Rechtsform",
      address: "Anschrift",
      email: "E-Mail",
    },
    /** Status note for a legal-page section that has real structure (a
     *  heading) but no reviewed legal text yet -- see legal-body.njk. This
     *  is a statement about the page's own completeness, not legal wording
     *  about DIWEBA's data processing or liability. */
    legalPending: "Dieser Abschnitt wird ergänzt, sobald der rechtlich geprüfte Text vorliegt.",

    /** Reused across header, mobile nav, hero and closing CTA — same target
     *  (the contact route) with a more action-oriented label than the plain
     *  "Kontakt" nav link. Matches the design's own dual treatment. */
    ctaPrimary: "Projekt anfragen",
    ctaSecondary: "Preise ansehen",
    /** Wayfinding microcopy (Phase 3A) -- not page content, just a "view
     *  all" link label, same category as ctaPrimary/ctaSecondary above. */
    seeAllFaq: "Alle Fragen ansehen",

    pricePrefix: "ab",
    priceOnce: "einmalig",
    priceMonthly: "pro Monat",
    priceBetrieb: "Betrieb",
    recommended: "Empfohlen",

    form: {
      name: "Name",
      company: "Unternehmen",
      companyOptional: "Unternehmen (optional)",
      email: "E-Mail",
      packageInterest: "Interesse an",
      packageInterestOptional: "Interesse an (optional)",
      packageUnsure: "Noch unklar",
      message: "Ihre Nachricht",
      submit: "Anfrage senden",
      sending: "Wird gesendet …",
      required: "Pflichtfeld",
      privacyNote: "Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben gemäß unserer",
      privacyLink: "Datenschutzerklärung",
      /** Leading space deliberate -- rendered directly after the </a> in
       *  contact-body.njk with no whitespace of its own, unlike the EN
       *  string below which needs none ("policy." not "policy ."). */
      privacyNoteEnd: " zu.",
      errorGeneric:
        "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
      errorRequired: "Bitte füllen Sie dieses Feld aus.",
      errorEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      errorTurnstile:
        "Die Sicherheitsprüfung konnte nicht abgeschlossen werden. Bitte laden Sie die Seite neu.",
      errorNotConfigured:
        "Dieses Formular ist noch nicht aktiv. Bitte schreiben Sie uns stattdessen direkt an",
      errorRateLimit:
        "Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es später erneut.",
      errorSendFailed:
        "Die Nachricht konnte nicht zugestellt werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an",
      successHeading: "Anfrage gesendet.",
    },

    error404: {
      title: "Seite nicht gefunden",
      body: "Diese Seite existiert nicht oder wurde verschoben.",
      back: "Zur Startseite",
    },
  },

  en: {
    htmlLang: "en",
    langName: "English",
    switchTo: "Deutsch",
    switchToCode: "DE",
    switchAria: "Auf Deutsch wechseln",

    skipToContent: "Skip to content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    mainNavAria: "Main navigation",
    footerNavAria: "Footer navigation",
    footerLegalNavAria: "Legal",
    breadcrumbAria: "Breadcrumb",
    home: "Home",

    currentLanguage: "Current language: English",

    nav: {
      home: "Home",
      pricing: "Packages & Pricing",
      aiSearch: "AI visibility",
      process: "Process",
      about: "About DIWEBA",
      contact: "Contact",
      faq: "FAQ",
      thanks: "Inquiry sent",
      imprint: "Imprint",
      privacy: "Privacy",
    },

    legal: {
      imprint: "Imprint",
      privacy: "Privacy",
    },

    legalFields: {
      name: "Name",
      form: "Legal form",
      address: "Address",
      email: "Email",
    },
    legalPending: "This section will be completed once the legally reviewed text is available.",

    ctaPrimary: "Start a project",
    ctaSecondary: "See pricing",
    seeAllFaq: "See all questions",

    pricePrefix: "from",
    priceOnce: "one-time",
    priceMonthly: "per month",
    priceBetrieb: "operation",
    recommended: "Recommended",

    form: {
      name: "Name",
      company: "Company",
      companyOptional: "Company (optional)",
      email: "Email",
      packageInterest: "Interested in",
      packageInterestOptional: "Interested in (optional)",
      packageUnsure: "Not sure yet",
      message: "Your message",
      submit: "Send inquiry",
      sending: "Sending …",
      required: "Required",
      privacyNote: "By submitting, you agree to the processing of your details under our",
      privacyLink: "privacy policy",
      privacyNoteEnd: ".",
      errorGeneric: "Your inquiry could not be sent. Please try again.",
      errorRequired: "Please complete this field.",
      errorEmail: "Please enter a valid email address.",
      errorTurnstile:
        "The security check could not be completed. Please reload the page.",
      errorNotConfigured:
        "This form is not active yet. Please write to us directly at",
      errorRateLimit: "Too many requests in a short time. Please try again later.",
      errorSendFailed:
        "The message could not be delivered. Please try again or write to us directly at",
      successHeading: "Inquiry sent.",
    },

    error404: {
      title: "Page not found",
      body: "This page does not exist or has moved.",
      back: "Back to home",
    },
  },
};
