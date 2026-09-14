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
    breadcrumbAria: "Brotkrumen-Navigation",
    home: "Startseite",

    nav: {
      pricing: "Pakete & Preise",
      process: "Ablauf",
      aiSearch: "KI-Suche",
      about: "Über DIWEBA",
      contact: "Kontakt",
    },

    legal: {
      imprint: "Impressum",
      privacy: "Datenschutz",
    },

    pricePrefix: "ab",
    priceOnce: "einmalig",
    priceMonthly: "pro Monat",
    priceBetrieb: "Betrieb",
    recommended: "Empfohlen",

    form: {
      name: "Name",
      company: "Unternehmen",
      email: "E-Mail",
      phone: "Telefon",
      phoneOptional: "Telefon (optional)",
      packageInterest: "Interesse an",
      message: "Ihre Nachricht",
      submit: "Anfrage senden",
      sending: "Wird gesendet …",
      required: "Pflichtfeld",
      errorGeneric:
        "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
      errorRequired: "Bitte füllen Sie dieses Feld aus.",
      errorEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      errorTurnstile:
        "Die Sicherheitsprüfung konnte nicht abgeschlossen werden. Bitte laden Sie die Seite neu.",
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
    breadcrumbAria: "Breadcrumb",
    home: "Home",

    nav: {
      pricing: "Packages & Pricing",
      process: "Process",
      aiSearch: "AI Search",
      about: "About DIWEBA",
      contact: "Contact",
    },

    legal: {
      imprint: "Imprint",
      privacy: "Privacy",
    },

    pricePrefix: "from",
    priceOnce: "one-time",
    priceMonthly: "per month",
    priceBetrieb: "operation",
    recommended: "Recommended",

    form: {
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      phoneOptional: "Phone (optional)",
      packageInterest: "Interested in",
      message: "Your message",
      submit: "Send inquiry",
      sending: "Sending …",
      required: "Required",
      errorGeneric: "Your inquiry could not be sent. Please try again.",
      errorRequired: "Please complete this field.",
      errorEmail: "Please enter a valid email address.",
      errorTurnstile:
        "The security check could not be completed. Please reload the page.",
    },

    error404: {
      title: "Page not found",
      body: "This page does not exist or has moved.",
      back: "Back to home",
    },
  },
};
