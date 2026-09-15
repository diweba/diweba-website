/**
 * JSON-LD for /website-erstellen-lassen/. Service + Offer (this page
 * explicitly states both package prices in its visible FAQ, so Offers are
 * justified here -- unlike smallBusinessPage's JSON-LD, which omits them)
 * + FAQPage (built directly from servicePage.yml's own faq array, so it is
 * structurally impossible for the schema to claim a question that isn't
 * actually rendered) + BreadcrumbList. No Review/AggregateRating, no
 * invented claims.
 */

export default {
  eleventyComputed: {
    jsonld: (data) => {
      const { site, routes, ui, company, packages } = data;
      const abs = (path) => `${site.url}${path}`;

      const offers = packages.items.map((item) => ({
        "@type": "Offer",
        name: item.name,
        price: String(item.priceOnce),
        priceCurrency: packages.currency,
        description: item.summary.de,
        url: abs(routes.service.de),
      }));

      const service = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "DIWEBA Website erstellen lassen",
        provider: { "@type": "Organization", name: company.brand, legalName: company.legalName },
        areaServed: { "@type": "Country", name: "Germany" },
        url: abs(routes.service.de),
        offers,
      };

      const faqPage = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.servicePage.de.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      };

      const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.de.home, item: abs(routes.home.de) },
          { "@type": "ListItem", position: 2, name: ui.de.nav.service, item: abs(routes.service.de) },
        ],
      };

      return [service, faqPage, breadcrumb];
    },
  },
};
