/**
 * JSON-LD for /en/website-development/. Mirrors
 * src/content/de/website-erstellen-lassen/index.11tydata.js -- see that
 * file's header comment for the reasoning.
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
        description: item.summary.en,
        url: abs(routes.service.en),
      }));

      const service = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "DIWEBA Website Development",
        provider: { "@type": "Organization", name: company.brand, legalName: company.legalName },
        areaServed: { "@type": "Country", name: "Germany" },
        url: abs(routes.service.en),
        offers,
      };

      const faqPage = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.servicePage.en.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      };

      const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.en.home, item: abs(routes.home.en) },
          { "@type": "ListItem", position: 2, name: ui.en.nav.service, item: abs(routes.service.en) },
        ],
      };

      return [service, faqPage, breadcrumb];
    },
  },
};
