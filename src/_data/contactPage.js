/**
 * DIWEBA — /kontakt/ and /en/contact/ content. Ported from
 * DIWEBA/diweba-site.js's `contact` object (eyebrow/h/sub/submit/
 * promiseLabel/promise/directLabel/note — approved wording, unchanged).
 *
 * TWO DELIBERATE DEPARTURES FROM THE SOURCE, both required by explicit
 * Phase 3B business rules, not stylistic choices:
 *
 *   1. NO TELEPHONE FIELD. The source's `fields` array includes a "Telefon"
 *      input. DIWEBA's confirmed public contact surface has no phone number
 *      at all (company.js's `phone: null`, explicitly "do not display or
 *      require a telephone number"). Dropped from the form entirely, not
 *      just hidden — see worker/types.ts and validate.ts, which no longer
 *      have a phone field either.
 *
 *   2. Bracket placeholders ("[Vor- und Nachname]", "[E-MAIL]") are the
 *      design mockup's own convention for "this is a fill-in field", not
 *      literal text meant for a real HTML placeholder attribute — same
 *      adaptation already made for the pricing configurator in Phase 3A.
 *      Replaced with natural placeholder text below.
 *
 * package interest options are pulled from packages.js at render time
 * (single source of truth), not duplicated here.
 */

export default {
  de: {
    eyebrow: "Kontakt",
    h: "Fünf Minuten, und wir wissen beide, ob es passt.",
    sub: "Schreiben Sie kurz, worum es geht. Sie erhalten eine Antwort am nächsten Werktag — von der Person, die auch die Website baut.",

    fieldPlaceholders: {
      name: "Vor- und Nachname",
      company: "Firmenname",
      email: "name@beispiel.de",
      message: "Zum Beispiel: Wir haben eine alte Website und bekommen kaum Anfragen. Fünf Seiten würden reichen.",
    },

    submit: "Anfrage senden",
    promiseLabel: "Antwort",
    promise: "Antwort am nächsten Werktag",
    directLabel: "Direkt",
    note: "Kein Kauf über die Website. Auf die Anfrage folgt ein kurzes Gespräch und danach ein Angebot mit festem Preis.",

    thanks: {
      title: "Anfrage gesendet — DIWEBA",
      heading: "Anfrage ist raus.",
      body: "Wir haben Ihre Nachricht erhalten und melden uns am nächsten Werktag.",
      back: "Zurück zur Startseite",
    },
  },

  en: {
    eyebrow: "Contact",
    h: "Five minutes, and we both know whether it fits.",
    sub: "Write briefly what it is about. You get a reply on the next working day — from the person who also builds the website.",

    fieldPlaceholders: {
      name: "First and last name",
      company: "Company name",
      email: "name@example.com",
      message: "For example: we have an old website and get almost no inquiries. Five pages would be enough.",
    },

    submit: "Send inquiry",
    promiseLabel: "Reply",
    promise: "Reply on the next working day",
    directLabel: "Direct",
    note: "No purchase through the website. Your inquiry is followed by a short call and then a proposal with a fixed price.",

    thanks: {
      title: "Inquiry sent — DIWEBA",
      heading: "Your request is on its way.",
      body: "We've received your message and will get back to you on the next working day.",
      back: "Back to home",
    },
  },
};
