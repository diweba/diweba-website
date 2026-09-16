/**
 * DIWEBA — /impressum/ and /en/imprint/ content.
 *
 * DRAFT LEGAL TEXT — NOT ATTORNEY-CERTIFIED. Prepared from the confirmed
 * facts in src/_data/company.js and current German statutory sources (DDG,
 * MStV, VSBG) plus the EU Online Dispute Resolution platform's discontinuation
 * (20 July 2025, Regulation (EU) 2024/3228). This is a carefully researched
 * draft, held in the repository pending final legal/attorney review before
 * the owner treats it as the site's authoritative Impressum. See CLAUDE.md
 * §"Legal caution" for why that review gate exists at all.
 *
 * KEPT CODE-CONTROLLED, NOT CMS-EDITABLE (deliberate, matches the existing
 * Phase 5 CMS architecture's own exclusion list): legal text carries real
 * legal risk if altered casually through the CMS without review, so it stays
 * here, in git, reviewable via normal commit history and pull requests --
 * not a duplicate source of truth, the CMS's `pages`/`content` collections
 * were already scoped to exclude these pages from the start (see
 * src/admin/config.yml's header comment).
 *
 * The operator/legal-form/address/email block is NOT duplicated here --
 * legal-body.njk reads it straight from src/_data/company.js (the one
 * place those facts already live, already gated through the `required`
 * filter so a still-unconfirmed fact fails the build instead of publishing
 * a guess).
 *
 * Deliberately NOT included as a section: a telephone line. company.js's
 * `phone` is null on purpose ("do not display or require a telephone
 * number" -- confirmed business rule, Phase 3A).
 *
 * NO EU-ODR LINK: the European Commission discontinued the Online Dispute
 * Resolution platform on 20 July 2025 -- the "dispute" section below says so
 * instead of pointing at a dead link.
 *
 * NO §18(2) MStV EDITORIAL-RESPONSIBLE PERSON INVENTED: this site carries no
 * journalistic-editorial content (no blog, no news, no opinion pieces) --
 * the "responsible" section below says so plainly rather than fabricating a
 * role. To the extent the provision were ever found to apply, it names the
 * same already-confirmed person/address, never a new one.
 */

export default {
  de: {
    eyebrow: "Impressum",
    h: "Impressum",
    operatorHeading: "Angaben gemäß § 5 DDG",

    sections: [
      {
        id: "vat",
        heading: "Umsatzsteuer",
        body: "Gemäß § 19 Abs. 1 UStG (Kleinunternehmerregelung) wird auf den ausgewiesenen Preisen keine Umsatzsteuer erhoben und nicht gesondert ausgewiesen. Die oben genannte Umsatzsteuer-Identifikationsnummer wurde uns gemäß § 27a UStG zugeteilt; die Kleinunternehmerregelung nach § 19 UStG bleibt hiervon unberührt.",
      },
      {
        id: "responsible",
        heading: "Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV",
        body: "Diese Website enthält keine journalistisch-redaktionell gestalteten Angebote im Sinne des § 18 Abs. 2 MStV. Soweit die Vorschrift dennoch Anwendung finden sollte, ist verantwortliche Person die oben unter „Angaben gemäß § 5 DDG“ genannte Person mit der dort angegebenen Anschrift.",
      },
      {
        id: "liability-content",
        heading: "Haftung für Inhalte",
        body: [
          "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf dieser Website nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
          "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
        ],
      },
      {
        id: "liability-links",
        heading: "Haftung für Links",
        body: [
          "Unser Angebot enthält gegebenenfalls Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft; rechtswidrige Inhalte waren zu diesem Zeitpunkt nicht erkennbar.",
          "Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
        ],
      },
      {
        id: "copyright",
        heading: "Urheberrecht",
        body: [
          "Die durch die Betreiber dieser Website erstellten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
          "Soweit die Inhalte auf dieser Website nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet; Inhalte Dritter werden als solche kenntlich gemacht. Sollten Sie dennoch auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis per E-Mail. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.",
        ],
      },
      {
        id: "dispute",
        heading: "Streitschlichtung",
        body: [
          "Die Europäische Kommission hat die Online-Streitbeilegungsplattform zum 20. Juli 2025 eingestellt; ein entsprechender Link kann daher nicht mehr angegeben werden.",
          "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle im Sinne des Verbraucherstreitbeilegungsgesetzes (VSBG) teilzunehmen.",
        ],
      },
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
      {
        id: "vat",
        heading: "VAT",
        body: "Under § 19 (1) of the German VAT Act (Umsatzsteuergesetz, UStG) — the small-business exemption (Kleinunternehmerregelung) — no VAT is charged on the prices shown and no VAT is separately stated. The VAT identification number given above was issued to us pursuant to § 27a UStG; this does not affect the small-business exemption under § 19 UStG.",
      },
      {
        id: "responsible",
        heading: "Responsible for content pursuant to § 18 (2) MStV",
        body: "This website does not contain journalistic-editorial content within the meaning of § 18 (2) of the German Interstate Media Treaty (Medienstaatsvertrag, MStV). To the extent this provision should nonetheless apply, the person responsible is the person named above under “Information pursuant to § 5 DDG”, at the address given there.",
      },
      {
        id: "liability-content",
        heading: "Liability for content",
        body: [
          "As a service provider, we are responsible for our own content on this website under the general laws in accordance with § 7 (1) of the German Digital Services Act (Digitale-Dienste-Gesetz, DDG). However, under §§ 8 to 10 DDG we are not obliged, as a service provider, to monitor transmitted or stored third-party information or to investigate circumstances indicating unlawful activity.",
          "Obligations to remove or block the use of information under general law remain unaffected. However, liability in this regard is only possible from the point in time at which we become aware of a specific infringement. Upon becoming aware of any such infringement, we will remove the relevant content without delay.",
        ],
      },
      {
        id: "liability-links",
        heading: "Liability for links",
        body: [
          "Our offering may contain links to external third-party websites over whose content we have no influence. We therefore accept no liability for this external content. The respective provider or operator of the linked pages is always responsible for their content. The linked pages were checked for possible legal violations at the time of linking; no unlawful content was identifiable at that time.",
          "However, permanent monitoring of the content of linked pages is not reasonable without concrete evidence of an infringement. Upon becoming aware of any such infringement, we will remove the relevant links without delay.",
        ],
      },
      {
        id: "copyright",
        heading: "Copyright",
        body: [
          "The content and works created by the operator of this website are subject to German copyright law. Duplication, editing, distribution and any form of exploitation beyond the limits of copyright law require the written consent of the respective author or creator.",
          "Insofar as content on this website was not created by the operator, third-party copyrights are respected; third-party content is identified as such. Should you nonetheless become aware of a copyright infringement, please notify us by email. Upon becoming aware of any such infringement, we will remove the relevant content without delay.",
        ],
      },
      {
        id: "dispute",
        heading: "Dispute resolution",
        body: [
          "The European Commission discontinued the Online Dispute Resolution platform on 20 July 2025; a link to it can therefore no longer be provided.",
          "We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board within the meaning of the German Consumer Dispute Resolution Act (Verbraucherstreitbeilegungsgesetz, VSBG).",
        ],
      },
    ],
  },
};
