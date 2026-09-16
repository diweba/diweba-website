/**
 * DIWEBA — /datenschutz/ and /en/privacy/ content.
 *
 * DRAFT LEGAL TEXT — NOT ATTORNEY-CERTIFIED. Prepared from this repository's
 * actual, confirmed production configuration (company.js, site.js, worker/
 * source, the real Cloudflare/Brevo/Usercentrics/GTM/GA4 setup verified live
 * in prior phases) plus current primary sources: GDPR/DSGVO, TDDDG § 25,
 * and each provider's own current privacy/DPA documentation. This is a
 * carefully researched draft, held in the repository pending final
 * legal/attorney review before the owner treats it as the site's
 * authoritative privacy policy. See CLAUDE.md §"Legal caution".
 *
 * KEPT CODE-CONTROLLED, NOT CMS-EDITABLE, same reasoning as
 * impressumPage.js: legal text carries real risk if altered casually
 * through the CMS without review. Not a duplicate source of truth --
 * src/admin/config.yml already excludes both legal pages from the
 * `pages`/`content` collections.
 *
 * WHAT'S DESCRIBED HERE, AND WHY IT'S ACCURATE TO THIS SITE'S ACTUAL STATE:
 *   - Cloudflare (hosting, Workers, KV) -- always described, always true.
 *   - Contact form fields -- match contact-body.njk / worker/validate.ts
 *     exactly (name, company, email, message, package interest).
 *   - Cloudflare Turnstile -- described unconditionally (see below on why
 *     this differs from the `turnstile` configKey gate).
 *   - Brevo -- described unconditionally; it is a Worker secret with no
 *     client-visible "configured" flag, so (like Phase 3F's original
 *     reasoning) there's nothing to check at build time. Its description is
 *     accurate regardless of whether the Worker can currently send mail
 *     (see worker/index.ts's `not_configured` fail-safe).
 *   - Usercentrics / GTM / GA4 -- gated on `configKey: "analytics"`
 *     (site.analytics.configured), exactly as consent-head.njk gates the
 *     actual scripts -- this page can never describe an inactive tool as
 *     active. All three are real and live in production as of this phase.
 *
 * TURNSTILE SECTION KEPT UNGATED (a deliberate change from Phase 3F, which
 * gave it its own `configKey: "turnstile"`): Turnstile is now a real,
 * permanently-installed part of the contact form's architecture (it renders
 * whenever site.forms.turnstileSiteKey exists, which is true in every real
 * deployment), not a conditionally-added extra -- describing it
 * unconditionally, right after the contact-form section it protects, is
 * more honest to how the two are actually coupled in the code. If the site
 * key were ever unset, the "not_configured" fail-safe in worker/index.ts
 * would also stop the form from working at all, so there is no state where
 * this section could describe an inactive tool as active.
 *
 * RETENTION WORDING FOR CLOUDFLARE ACCESS LOGS AND GA4: two specific
 * settings (exact log retention window, exact GA4 data-retention setting)
 * live in Cloudflare's and Google's own dashboards, not in this repository
 * or in any primary documentation this draft could read from -- genuinely
 * unknown, not guessed. The server-logs, ga4, and retention sections
 * therefore describe retention with neutral, legally cautious wording
 * ("governed by statutory requirements and the provider's configuration")
 * rather than stating an unverified exact duration -- this was a deliberate
 * pre-publish edit (internal "[Zur finalen rechtlichen Prüfung: ...]" /
 * "[For final legal review: ...]" review markers existed in an earlier,
 * unpublished draft of this file and were replaced with this wording before
 * anything went live, not left as bracketed notes on the public page). If
 * the exact settings are ever confirmed, the wording can be tightened to
 * state them directly. Every other item in every section is either a
 * confirmed fact from this repository's real configuration, current
 * statutory text, or the relevant provider's own current documentation.
 */

const CURRENT_DRAFT_DATE_DE = "September 2026";
const CURRENT_DRAFT_DATE_EN = "September 2026";

export default {
  de: {
    eyebrow: "Datenschutz",
    h: "Datenschutzerklärung",
    operatorHeading: "Verantwortlicher",

    sections: [
      {
        id: "general",
        heading: "Allgemeine Hinweise",
        body: [
          "Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Diese Datenschutzerklärung informiert Sie darüber, welche Daten bei der Nutzung dieser Website verarbeitet werden, zu welchen Zwecken dies geschieht und welche Rechte Ihnen als betroffener Person zustehen.",
          "Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist die oben unter „Verantwortlicher“ genannte Person mit der dort angegebenen Anschrift und E-Mail-Adresse.",
          "Personenbezogene Daten sind alle Daten, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen, zum Beispiel Name, E-Mail-Adresse oder IP-Adresse.",
        ],
      },
      {
        id: "hosting",
        heading: "Hosting und Bereitstellung",
        body: [
          "Diese Website wird über Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA) sowie deren europäische Konzerngesellschaften technisch bereitgestellt und ausgeliefert (Cloudflare Workers, statische Inhalte, DNS und Content Delivery Network). Cloudflare verarbeitet dabei technische Daten, insbesondere die IP-Adresse abrufender Geräte, um die Website an Sie ausliefern zu können.",
          "Der Einsatz von Cloudflare erfolgt auf Grundlage unseres berechtigten Interesses an einer stabilen, schnellen und sicheren Bereitstellung unseres Onlineangebots (Art. 6 Abs. 1 lit. f DSGVO). Mit Cloudflare besteht ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO. Nähere Informationen entnehmen Sie der aktuellen Datenschutzerklärung von Cloudflare.",
        ],
      },
      {
        id: "server-logs",
        heading: "Server-Log-Dateien und Sicherheit",
        body: [
          "Beim Aufruf dieser Website erhebt die Hosting-Infrastruktur (Cloudflare, siehe vorstehender Abschnitt) automatisch technische Informationen, die Ihr Browser übermittelt. Dazu gehören insbesondere: die IP-Adresse des zugreifenden Geräts, Datum und Uhrzeit der Anfrage, die aufgerufene Seite bzw. Ressource, der HTTP-Statuscode, die übertragene Datenmenge, Browsertyp und -version, das verwendete Betriebssystem sowie die zuvor besuchte Seite (Referrer).",
          "Diese Daten dienen der technischen Auslieferung der Website, der Systemsicherheit (unter anderem der Erkennung und Abwehr von Angriffen) und einem störungsfreien Betrieb. Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren und stabilen Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO). Diese Protokolldaten werden nicht mit anderen Datenquellen zusammengeführt.",
          "Die Speicherdauer dieser Protokolldaten richtet sich nach den gesetzlichen Vorgaben sowie der technischen und vertraglichen Konfiguration unserer Hosting-Infrastruktur bei Cloudflare und ist auf das für die genannten Zwecke erforderliche Maß begrenzt.",
        ],
      },
      {
        id: "contact-form",
        heading: "Kontaktformular",
        body: [
          "Wenn Sie uns über das Kontaktformular eine Anfrage zukommen lassen, werden die von Ihnen im Formular angegebenen Daten zum Zweck der Bearbeitung Ihrer Anfrage und für den Fall von Anschlussfragen bei uns gespeichert und verarbeitet. Folgende Angaben werden dabei verarbeitet:",
          ["Name", "Unternehmen (optional)", "E-Mail-Adresse", "Ihre Nachricht", "Angabe zu einem interessierenden Paket (optional)"],
          "Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Bearbeitung einer Anfrage im Rahmen vor- oder nachvertraglicher Maßnahmen) bzw., soweit keine vertragliche Anbahnung vorliegt, auf Grundlage unseres berechtigten Interesses an der Beantwortung von Anfragen (Art. 6 Abs. 1 lit. f DSGVO).",
          "Zum Schutz des Formulars vor automatisierten Zugriffen setzen wir Cloudflare Turnstile ein (siehe nächster Abschnitt). Die Benachrichtigung über eine eingegangene Anfrage wird über den E-Mail-Dienstleister Brevo an unsere Adresse hello@diweba.de zugestellt (siehe übernächster Abschnitt).",
          "Zusätzlich wird zur Missbrauchsvermeidung die anfragende IP-Adresse für die Dauer von einer Stunde in einem Cloudflare-KV-Zwischenspeicher erfasst, um die Anzahl der Anfragen je IP-Adresse zu begrenzen (Rate Limiting). Diese Information wird nach Ablauf der Stunde automatisch gelöscht und nicht mit dem Inhalt Ihrer Nachricht verknüpft gespeichert.",
          "Die über das Kontaktformular übermittelten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Aufbewahrungsfristen bleiben unberührt.",
        ],
      },
      {
        id: "turnstile",
        heading: "Cloudflare Turnstile",
        body: [
          "Zum Schutz unseres Kontaktformulars vor missbräuchlicher, automatisierter Nutzung (Spam, Bot-Zugriffe) setzen wir den Dienst „Cloudflare Turnstile“ der Cloudflare, Inc. ein. Turnstile prüft im Hintergrund anhand verschiedener technischer Signale — unter anderem Verhaltens- und Browsermerkmale, IP-Adresse sowie gegebenenfalls ein temporäres Freigabe-Token („Clearance“) —, ob eine Anfrage von einem Menschen oder von automatisierter Software stammt, in der Regel ohne ein für Sie sichtbares Captcha lösen zu müssen.",
          "Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einem vor Missbrauch geschützten Kontaktformular (Art. 6 Abs. 1 lit. f DSGVO). Nähere Informationen zu den durch Turnstile verarbeiteten Signalen und der Rolle von Cloudflare entnehmen Sie der aktuellen Turnstile-Dokumentation und Datenschutzerklärung von Cloudflare.",
        ],
      },
      {
        id: "brevo",
        heading: "Brevo (E-Mail-Versand)",
        body: [
          "Zur Zustellung der Benachrichtigung über eine über das Kontaktformular eingegangene Anfrage nutzen wir den E-Mail-Versanddienst Brevo der Brevo SAS, 8 rue Rougemont, 75009 Paris, Frankreich. Der Versand erfolgt ausschließlich serverseitig durch unsere technische Infrastruktur; die Formulardaten (siehe Abschnitt „Kontaktformular“) werden Brevo zum Zweck der Zustellung an unsere Adresse hello@diweba.de übermittelt.",
          "Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einer zuverlässigen Zustellung eingehender Anfragen (Art. 6 Abs. 1 lit. f DSGVO) bzw. im Zusammenhang mit der Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO). Mit Brevo besteht ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO. Nähere Informationen entnehmen Sie der aktuellen Datenschutz- und AVV-Dokumentation von Brevo.",
        ],
      },
      {
        id: "usercentrics",
        heading: "Usercentrics (Consent-Management-Plattform)",
        configKey: "analytics",
        body: [
          "Diese Website setzt die Consent-Management-Plattform „Usercentrics Web CMP“ der Usercentrics GmbH ein, um die nachfolgend beschriebenen, einwilligungsbedürftigen Dienste (Google Tag Manager, Google Analytics 4) erst nach Ihrer Einwilligung zu aktivieren und Ihre Einwilligungsentscheidung zu dokumentieren.",
          "Hierzu wird beim Aufruf der Website eine Verbindung zu den Servern von Usercentrics hergestellt und Ihre Einwilligungsentscheidung (bzw. deren Fehlen) technisch verwaltet und gespeichert. Rechtsgrundlage ist unsere gesetzliche Pflicht zur Einholung und zum Nachweis Ihrer Einwilligung (Art. 6 Abs. 1 lit. c DSGVO i. V. m. § 25 TDDDG) sowie unser berechtigtes Interesse an einer rechtskonformen Einwilligungsverwaltung (Art. 6 Abs. 1 lit. f DSGVO).",
          "Die Nutzung von Usercentrics stellt für sich genommen keine Zusicherung dar, dass die Verarbeitung durch die nachfolgend beschriebenen Dienste in jedem Einzelfall rechtskonform erfolgt; Usercentrics ist ein technisches Werkzeug zur Einwilligungsverwaltung, keine rechtliche Instanz. Nähere Informationen entnehmen Sie der aktuellen Dokumentation von Usercentrics.",
        ],
      },
      {
        id: "gtm",
        heading: "Google Tag Manager",
        configKey: "analytics",
        body: [
          "Diese Website nutzt den Google Tag Manager der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland (Konzernunternehmen der Google LLC, USA). Der Google Tag Manager ist ein technisches Werkzeug zur Verwaltung sogenannter Website-Tags (hier: Google Analytics 4). Der Tag Manager selbst legt keine Cookies und erhebt selbst keine personenbezogenen Daten; er sorgt lediglich dafür, dass andere Tags — erst nach entsprechender Einwilligung über Usercentrics — geladen werden.",
          "Rechtsgrundlage für den Einsatz des Google Tag Managers ist unser berechtigtes Interesse an einer strukturierten, konsentabhängigen Verwaltung eingebundener Dienste (Art. 6 Abs. 1 lit. f DSGVO).",
        ],
      },
      {
        id: "ga4",
        heading: "Google Analytics 4",
        configKey: "analytics",
        body: [
          "Nach entsprechender Einwilligung über Usercentrics setzen wir Google Analytics 4 ein, einen Dienst der Google Ireland Limited (Konzernunternehmen der Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA) zur Analyse der Websitenutzung. Google Analytics 4 verarbeitet unter anderem Angaben zu Ihrem Nutzungsverhalten auf dieser Website (z. B. besuchte Seiten, Verweildauer, Interaktionen) sowie technische Gerätedaten, üblicherweise unter Einsatz von Cookies bzw. vergleichbaren Speichertechnologien.",
          "Die Verarbeitung erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie über den Consent-Banner erteilen, jederzeit widerrufen oder von vornherein ablehnen können. Der tatsächliche Ladevorgang wurde technisch geprüft: Ohne erteilte Einwilligung bleibt Google Analytics 4 inaktiv, nach erteilter Einwilligung wird es aktiv, und bei einer Ablehnung bleibt es inaktiv.",
          "Da Google Analytics 4 von der Google LLC mit Sitz in den USA betrieben wird, ist eine Datenübermittlung in ein Drittland (USA) nicht ausgeschlossen; nähere Angaben hierzu finden Sie im Abschnitt „Drittlandübermittlung“.",
          "Die Aufbewahrungsdauer der hierbei verarbeiteten Nutzerdaten richtet sich nach der jeweils in der GA4-Property konfigurierten Einstellung sowie den gesetzlichen Vorgaben.",
        ],
      },
      {
        id: "cookies-consent",
        heading: "Cookies, lokaler Speicher und Consent-Verwaltung",
        body: [
          "Diese Website selbst setzt keine technisch nicht notwendigen Cookies ein. Soweit die vorstehend beschriebenen, einwilligungsbedürftigen Dienste (Usercentrics, Google Tag Manager, Google Analytics 4) nach Ihrer Einwilligung aktiv werden, können diese Cookies bzw. vergleichbare Speichertechnologien (z. B. lokalen Speicher) in Ihrem Browser verwenden, um Informationen wiederzuerkennen oder Ihre Einwilligungsentscheidung zu speichern.",
          "Ihre Einwilligung können Sie jederzeit über den beim ersten Besuch angezeigten Consent-Banner erteilen, anpassen oder mit Wirkung für die Zukunft widerrufen. Rechtsgrundlage für den Einsatz technisch nicht notwendiger Speichertechnologien ist § 25 Abs. 1 TDDDG (Einwilligung) in Verbindung mit Art. 6 Abs. 1 lit. a DSGVO.",
        ],
      },
      {
        id: "legal-bases",
        heading: "Rechtsgrundlagen der Verarbeitung",
        body: [
          "Soweit wir für Verarbeitungsvorgänge personenbezogener Daten eine Einwilligung der betroffenen Person einholen, dient Art. 6 Abs. 1 lit. a DSGVO als Rechtsgrundlage.",
          "Bei der Verarbeitung personenbezogener Daten, die zur Erfüllung eines Vertrags oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist (z. B. bei der Bearbeitung Ihrer Anfrage über das Kontaktformular), dient Art. 6 Abs. 1 lit. b DSGVO als Rechtsgrundlage.",
          "Ist die Verarbeitung zur Erfüllung einer rechtlichen Verpflichtung erforderlich, der wir unterliegen (z. B. Nachweis erteilter Einwilligungen nach § 25 TDDDG), dient Art. 6 Abs. 1 lit. c DSGVO als Rechtsgrundlage.",
          "Ist die Verarbeitung zur Wahrung unserer berechtigten Interessen oder der eines Dritten erforderlich und überwiegen Ihre Interessen, Grundrechte und Grundfreiheiten nicht, dient Art. 6 Abs. 1 lit. f DSGVO als Rechtsgrundlage (z. B. sichere und stabile Bereitstellung der Website).",
          "Die jeweils einschlägige Rechtsgrundlage ist bei den einzelnen Verarbeitungstätigkeiten oben angegeben.",
        ],
      },
      {
        id: "recipients",
        heading: "Empfänger und Auftragsverarbeiter",
        body: [
          "Im Rahmen der vorstehend beschriebenen Verarbeitungstätigkeiten erhalten folgende Empfänger Zugriff auf personenbezogene Daten, soweit dies für die jeweilige Verarbeitung erforderlich ist: Cloudflare, Inc. (Hosting-, Sicherheits- und Bereitstellungsinfrastruktur, einschließlich Turnstile und des Rate-Limiting-Zwischenspeichers), Brevo SAS (Zustellung von Benachrichtigungs-E-Mails aus dem Kontaktformular), Usercentrics GmbH (Consent-Management-Plattform) sowie Google Ireland Limited / Google LLC (Google Tag Manager, Google Analytics 4 — nur nach erteilter Einwilligung).",
          "Mit allen vorgenannten Auftragsverarbeitern bestehen, soweit erforderlich, Verträge zur Auftragsverarbeitung nach Art. 28 DSGVO. Eine Übermittlung an sonstige Dritte findet nicht statt, es sei denn, wir sind hierzu gesetzlich verpflichtet.",
        ],
      },
      {
        id: "third-country",
        heading: "Drittlandübermittlung",
        body: [
          "Bei der Nutzung von Diensten US-amerikanischer Anbieter (insbesondere Cloudflare, Inc. für die Hosting-Infrastruktur sowie — nach erteilter Einwilligung — Google LLC für Google Tag Manager und Google Analytics 4) ist eine Übermittlung personenbezogener Daten in die USA als Drittland im Sinne der DSGVO nicht ausgeschlossen.",
          "Die genannten Anbieter stellen nach eigenen Angaben geeignete Garantien für ein angemessenes Datenschutzniveau bereit, insbesondere durch eine Zertifizierung im Rahmen des EU-U.S. Data Privacy Framework und/oder den Abschluss von EU-Standardvertragsklauseln der Europäischen Kommission. Nähere Angaben zu den im Einzelfall herangezogenen Garantien entnehmen Sie der jeweiligen Datenschutzdokumentation der genannten Anbieter.",
        ],
      },
      {
        id: "retention",
        heading: "Speicherdauer und Löschung",
        body: [
          "Wir speichern personenbezogene Daten grundsätzlich nur so lange, wie dies für die jeweiligen, vorstehend beschriebenen Zwecke erforderlich ist, oder wie es gesetzliche Aufbewahrungspflichten vorsehen. Im Einzelnen:",
          [
            "IP-Adressen zur Missbrauchsvermeidung (Rate Limiting) beim Kontaktformular: automatische Löschung nach einer Stunde.",
            "Über das Kontaktformular übermittelte Anfragedaten: bis zur vollständigen Bearbeitung Ihrer Anfrage bzw. bis zu einer Löschungsaufforderung, soweit keine gesetzlichen Aufbewahrungsfristen entgegenstehen.",
            "Server-Log-Dateien der Hosting-Infrastruktur: kurzfristig, im Rahmen der technischen Standardeinstellungen von Cloudflare.",
            "Einwilligungsentscheidungen (Usercentrics) und Analysedaten (Google Analytics 4): gemäß den jeweils konfigurierten Aufbewahrungsfristen der eingesetzten Dienste.",
          ],
          "Im Übrigen richtet sich die Speicherdauer nach der jeweiligen Konfiguration der eingesetzten Dienste (insbesondere Cloudflare und Google Analytics 4) und den gesetzlichen Vorgaben.",
        ],
      },
      {
        id: "rights",
        heading: "Ihre Rechte als betroffene Person",
        body: [
          "Ihnen stehen als betroffener Person nach der DSGVO folgende Rechte zu, sofern die jeweiligen gesetzlichen Voraussetzungen vorliegen:",
          [
            "Recht auf Auskunft über die von uns verarbeiteten personenbezogenen Daten (Art. 15 DSGVO)",
            "Recht auf Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
            "Recht auf Löschung (Art. 17 DSGVO)",
            "Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)",
            "Recht auf Datenübertragbarkeit (Art. 20 DSGVO)",
          ],
          "Zur Ausübung dieser Rechte können Sie sich jederzeit formlos an die oben unter „Verantwortlicher“ genannte E-Mail-Adresse wenden.",
        ],
      },
      {
        id: "withdraw-consent",
        heading: "Widerruf Ihrer Einwilligung",
        body: "Soweit die Verarbeitung auf Ihrer Einwilligung beruht (z. B. bei Google Analytics 4), können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen, ohne dass die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung berührt wird (Art. 7 Abs. 3 DSGVO). Den Widerruf können Sie über den jederzeit erreichbaren Consent-Banner erklären.",
      },
      {
        id: "object",
        heading: "Widerspruchsrecht",
        body: "Werden personenbezogene Daten auf Grundlage berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO) verarbeitet, haben Sie das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Widerspruch einzulegen (Art. 21 DSGVO). Wir verarbeiten Ihre Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen.",
      },
      {
        id: "complain",
        heading: "Beschwerderecht bei einer Aufsichtsbehörde",
        body: "Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren (Art. 77 DSGVO), insbesondere bei der Aufsichtsbehörde Ihres gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes. Für unseren Unternehmenssitz in Baden-Württemberg ist dies der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg (LfDI); aktuelle Kontaktdaten sind auf dessen offizieller Website veröffentlicht.",
      },
      {
        id: "automated-decisions",
        heading: "Automatisierte Entscheidungsfindung",
        body: "Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne des Art. 22 DSGVO, die Ihnen gegenüber rechtliche Wirkung entfaltet oder Sie in ähnlicher Weise erheblich beeinträchtigt, findet auf dieser Website nicht statt.",
      },
      {
        id: "security",
        heading: "Sicherheit der Datenverarbeitung",
        body: "Diese Website wird ausschließlich über eine verschlüsselte Verbindung (TLS/HTTPS) ausgeliefert. Wir treffen im Übrigen angemessene technische und organisatorische Maßnahmen, um Ihre Daten gegen zufällige oder vorsätzliche Manipulationen, Verlust, Zerstörung oder den Zugriff unberechtigter Personen zu schützen; diese Maßnahmen werden entsprechend der technologischen Entwicklung fortlaufend verbessert.",
      },
      {
        id: "changes",
        heading: "Änderungen dieser Datenschutzerklärung",
        body: `Wir passen diese Datenschutzerklärung an, sobald sich die Rechtslage, die eingesetzten Dienste oder die Art der Datenverarbeitung ändern. Es gilt jeweils die zum Zeitpunkt Ihres Besuchs auf dieser Website aktuelle Fassung. Stand dieser Datenschutzerklärung: ${CURRENT_DRAFT_DATE_DE}.`,
      },
    ],
  },

  en: {
    eyebrow: "Privacy",
    h: "Privacy Policy",
    operatorHeading: "Controller",
    translationNote: "This is a courtesy translation. The German version is legally authoritative.",

    sections: [
      {
        id: "general",
        heading: "General information",
        body: [
          "Protecting your personal data is important to us. This privacy policy explains which data is processed when you use this website, for what purposes, and what rights you have as a data subject.",
          "The controller within the meaning of the General Data Protection Regulation (GDPR) is the person named above under “Controller”, at the address and email address given there.",
          "Personal data is any information relating to an identified or identifiable natural person, for example a name, an email address, or an IP address.",
        ],
      },
      {
        id: "hosting",
        heading: "Hosting and delivery",
        body: [
          "This website is technically provided and delivered via Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA) and its European group companies (Cloudflare Workers, static content, DNS, and content delivery network). In doing so, Cloudflare processes technical data, in particular the IP address of the accessing device, in order to deliver the website to you.",
          "The use of Cloudflare is based on our legitimate interest in a stable, fast, and secure provision of our online offering (Art. 6 (1)(f) GDPR). A data processing agreement pursuant to Art. 28 GDPR is in place with Cloudflare. For further information, please refer to Cloudflare's current privacy policy.",
        ],
      },
      {
        id: "server-logs",
        heading: "Server log files and security",
        body: [
          "When you access this website, the hosting infrastructure (Cloudflare, see the previous section) automatically collects technical information transmitted by your browser. This includes, in particular: the IP address of the accessing device, the date and time of the request, the page or resource accessed, the HTTP status code, the amount of data transferred, the browser type and version, the operating system used, and the previously visited page (referrer).",
          "This data is used for the technical delivery of the website, for system security (including the detection and prevention of attacks), and to ensure trouble-free operation. The legal basis is our legitimate interest in a secure and stable provision of the website (Art. 6 (1)(f) GDPR). This log data is not merged with other data sources.",
          "The retention period for this log data is governed by statutory requirements as well as the technical and contractual configuration of our hosting infrastructure at Cloudflare, and is limited to what is necessary for the stated purposes.",
        ],
      },
      {
        id: "contact-form",
        heading: "Contact form",
        body: [
          "When you send us a request via the contact form, the information you provide in the form is stored and processed by us for the purpose of handling your request and in case of follow-up questions. The following information is processed:",
          ["Name", "Company (optional)", "Email address", "Your message", "Indication of a package you are interested in (optional)"],
          "This processing takes place on the basis of Art. 6 (1)(b) GDPR (handling a request in the context of pre-contractual or contractual measures) or, where no contractual context exists, on the basis of our legitimate interest in responding to enquiries (Art. 6 (1)(f) GDPR).",
          "To protect the form against automated access, we use Cloudflare Turnstile (see the next section). Notification of an incoming request is delivered to our address hello@diweba.de via the email service provider Brevo (see the section after next).",
          "In addition, to prevent abuse, the requesting IP address is recorded for one hour in a Cloudflare KV store (cache) to limit the number of requests per IP address (rate limiting). This information is automatically deleted after the hour has elapsed and is not stored linked to the content of your message.",
          "Data submitted via the contact form remains with us until you ask us to delete it, withdraw your consent to its storage, or the purpose for storing the data no longer applies (e.g. once your request has been fully processed). Mandatory statutory retention periods remain unaffected.",
        ],
      },
      {
        id: "turnstile",
        heading: "Cloudflare Turnstile",
        body: [
          "To protect our contact form against abusive, automated use (spam, bot access), we use the “Cloudflare Turnstile” service provided by Cloudflare, Inc. In the background, Turnstile evaluates various technical signals — including behavioural and browser characteristics, IP address, and, where applicable, a temporary clearance token — to determine whether a request originates from a human or from automated software, typically without requiring you to solve a visible captcha.",
          "This processing is based on our legitimate interest in a contact form protected against abuse (Art. 6 (1)(f) GDPR). For further information on the signals processed by Turnstile and Cloudflare's role, please refer to Cloudflare's current Turnstile documentation and privacy policy.",
        ],
      },
      {
        id: "brevo",
        heading: "Brevo (email delivery)",
        body: [
          "To deliver the notification of a request received via the contact form, we use the email delivery service Brevo, provided by Brevo SAS, 8 rue Rougemont, 75009 Paris, France. Sending takes place exclusively server-side through our technical infrastructure; the form data (see the “Contact form” section) is transmitted to Brevo for the purpose of delivery to our address hello@diweba.de.",
          "This processing is based on our legitimate interest in the reliable delivery of incoming requests (Art. 6 (1)(f) GDPR) or in connection with handling your request (Art. 6 (1)(b) GDPR). A data processing agreement pursuant to Art. 28 GDPR is in place with Brevo. For further information, please refer to Brevo's current privacy and DPA documentation.",
        ],
      },
      {
        id: "usercentrics",
        heading: "Usercentrics (consent management platform)",
        configKey: "analytics",
        body: [
          "This website uses the “Usercentrics Web CMP” consent management platform provided by Usercentrics GmbH to activate the consent-dependent services described below (Google Tag Manager, Google Analytics 4) only after you have given consent, and to document your consent decision.",
          "For this purpose, a connection to Usercentrics' servers is established when the website is accessed, and your consent decision (or the absence thereof) is technically managed and stored. The legal basis is our statutory obligation to obtain and demonstrate your consent (Art. 6 (1)(c) GDPR in conjunction with § 25 TDDDG) as well as our legitimate interest in lawful consent management (Art. 6 (1)(f) GDPR).",
          "The use of Usercentrics does not, in itself, constitute an assurance that processing by the services described below is lawful in every individual case; Usercentrics is a technical tool for consent management, not a legal authority. For further information, please refer to Usercentrics' current documentation.",
        ],
      },
      {
        id: "gtm",
        heading: "Google Tag Manager",
        configKey: "analytics",
        body: [
          "This website uses Google Tag Manager, provided by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland (part of the Google LLC group, USA). Google Tag Manager is a technical tool for managing so-called website tags (here: Google Analytics 4). The Tag Manager itself does not set cookies and does not itself collect personal data; it merely ensures that other tags — only after corresponding consent via Usercentrics — are loaded.",
          "The legal basis for the use of Google Tag Manager is our legitimate interest in a structured, consent-dependent management of embedded services (Art. 6 (1)(f) GDPR).",
        ],
      },
      {
        id: "ga4",
        heading: "Google Analytics 4",
        configKey: "analytics",
        body: [
          "Following corresponding consent via Usercentrics, we use Google Analytics 4, a website-usage analysis service provided by Google Ireland Limited (part of the Google LLC group, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA). Google Analytics 4 processes information about your usage behaviour on this website (e.g. pages visited, time spent, interactions) as well as technical device data, typically using cookies or comparable storage technologies.",
          "Processing takes place exclusively on the basis of your consent (Art. 6 (1)(a) GDPR), which you can give via the consent banner, withdraw at any time, or decline from the outset. The actual loading behaviour has been technically verified: without consent, Google Analytics 4 remains inactive; once consent is given, it becomes active; and if consent is declined, it remains inactive.",
          "Because Google Analytics 4 is operated by Google LLC, headquartered in the USA, a transfer of data to a third country (the USA) cannot be excluded; see the “Third-country transfers” section for further detail.",
          "The retention period for the user data processed here is governed by the setting configured within the GA4 property as well as statutory requirements.",
        ],
      },
      {
        id: "cookies-consent",
        heading: "Cookies, local storage, and consent management",
        body: [
          "This website itself does not use any cookies that are not technically necessary. Insofar as the consent-dependent services described above (Usercentrics, Google Tag Manager, Google Analytics 4) become active following your consent, they may use cookies or comparable storage technologies (e.g. local storage) in your browser, to recognise information or to store your consent decision.",
          "You can give, adjust, or withdraw your consent at any time, with effect for the future, via the consent banner displayed on your first visit. The legal basis for the use of storage technologies that are not technically necessary is § 25 (1) TDDDG (consent) in conjunction with Art. 6 (1)(a) GDPR.",
        ],
      },
      {
        id: "legal-bases",
        heading: "Legal bases for processing",
        body: [
          "Where we obtain the consent of the data subject for processing operations involving personal data, Art. 6 (1)(a) GDPR serves as the legal basis.",
          "For the processing of personal data required to perform a contract or to carry out pre-contractual measures (e.g. handling your request via the contact form), Art. 6 (1)(b) GDPR serves as the legal basis.",
          "Where processing is necessary to comply with a legal obligation to which we are subject (e.g. demonstrating consent given, pursuant to § 25 TDDDG), Art. 6 (1)(c) GDPR serves as the legal basis.",
          "Where processing is necessary to safeguard our legitimate interests or those of a third party, and your interests, fundamental rights, and fundamental freedoms do not override those interests, Art. 6 (1)(f) GDPR serves as the legal basis (e.g. the secure and stable provision of the website).",
          "The specific legal basis applicable to each processing activity is stated above in the relevant section.",
        ],
      },
      {
        id: "recipients",
        heading: "Recipients and processors",
        body: [
          "In connection with the processing activities described above, the following recipients receive access to personal data, insofar as this is necessary for the respective processing: Cloudflare, Inc. (hosting, security, and delivery infrastructure, including Turnstile and the rate-limiting cache), Brevo SAS (delivery of contact-form notification emails), Usercentrics GmbH (consent management platform), and Google Ireland Limited / Google LLC (Google Tag Manager, Google Analytics 4 — only following consent).",
          "Data processing agreements pursuant to Art. 28 GDPR are in place with all of the above processors, where required. Data is not transferred to any other third parties unless we are legally obliged to do so.",
        ],
      },
      {
        id: "third-country",
        heading: "Third-country transfers",
        body: [
          "When using services provided by US-based providers (in particular Cloudflare, Inc. for the hosting infrastructure and, following consent, Google LLC for Google Tag Manager and Google Analytics 4), a transfer of personal data to the USA as a third country within the meaning of the GDPR cannot be excluded.",
          "The providers named state that they provide appropriate safeguards for an adequate level of data protection, in particular through certification under the EU-U.S. Data Privacy Framework and/or the conclusion of the European Commission's Standard Contractual Clauses. For further information on the specific safeguards relied upon in each case, please refer to the respective provider's current privacy documentation.",
        ],
      },
      {
        id: "retention",
        heading: "Retention and deletion",
        body: [
          "We generally store personal data only for as long as necessary for the respective purposes described above, or as required by statutory retention obligations. Specifically:",
          [
            "IP addresses used for abuse prevention (rate limiting) on the contact form: automatically deleted after one hour.",
            "Request data submitted via the contact form: retained until your request has been fully processed or until a deletion request is made, provided no statutory retention periods apply.",
            "Server log files from the hosting infrastructure: retained short-term, within Cloudflare's standard technical settings.",
            "Consent decisions (Usercentrics) and analytics data (Google Analytics 4): retained according to the respective configured retention periods of the services used.",
          ],
          "Otherwise, the retention period is governed by the respective configuration of the services used (in particular Cloudflare and Google Analytics 4) and statutory requirements.",
        ],
      },
      {
        id: "rights",
        heading: "Your rights as a data subject",
        body: [
          "As a data subject, you have the following rights under the GDPR, provided the respective statutory requirements are met:",
          [
            "The right of access to the personal data we process about you (Art. 15 GDPR)",
            "The right to rectification of inaccurate data (Art. 16 GDPR)",
            "The right to erasure (Art. 17 GDPR)",
            "The right to restriction of processing (Art. 18 GDPR)",
            "The right to data portability (Art. 20 GDPR)",
          ],
          "To exercise these rights, you may contact us at any time, without any particular formal requirements, at the email address given above under “Controller”.",
        ],
      },
      {
        id: "withdraw-consent",
        heading: "Withdrawing your consent",
        body: "Where processing is based on your consent (e.g. for Google Analytics 4), you may withdraw it at any time with effect for the future, without affecting the lawfulness of processing carried out on the basis of consent before its withdrawal (Art. 7 (3) GDPR). You can withdraw your consent via the consent banner, which remains accessible at any time.",
      },
      {
        id: "object",
        heading: "Right to object",
        body: "Where personal data is processed on the basis of legitimate interests (Art. 6 (1)(f) GDPR), you have the right to object at any time to such processing for reasons arising from your particular situation (Art. 21 GDPR). We will then no longer process your data unless we can demonstrate compelling legitimate grounds for the processing that override your interests, rights, and freedoms.",
      },
      {
        id: "complain",
        heading: "Right to lodge a complaint with a supervisory authority",
        body: "You have the right to lodge a complaint with a data protection supervisory authority regarding our processing of your personal data (Art. 77 GDPR), in particular with the authority of your habitual residence, place of work, or the place of the alleged infringement. For our business location in Baden-Württemberg, this is the State Commissioner for Data Protection and Freedom of Information Baden-Württemberg (LfDI); current contact details are published on its official website.",
      },
      {
        id: "automated-decisions",
        heading: "Automated decision-making",
        body: "No automated decision-making, including profiling, within the meaning of Art. 22 GDPR that produces legal effects concerning you or similarly significantly affects you takes place on this website.",
      },
      {
        id: "security",
        heading: "Security of processing",
        body: "This website is delivered exclusively via an encrypted connection (TLS/HTTPS). We otherwise take appropriate technical and organisational measures to protect your data against accidental or intentional manipulation, loss, destruction, or access by unauthorised persons; these measures are continuously improved in line with technological developments.",
      },
      {
        id: "changes",
        heading: "Changes to this privacy policy",
        body: `We update this privacy policy whenever the legal situation, the services we use, or the nature of our data processing changes. The version current at the time of your visit to this website applies. Last updated: ${CURRENT_DRAFT_DATE_EN}.`,
      },
    ],
  },
};
