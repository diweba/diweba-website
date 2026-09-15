/**
 * JSON-LD for /en/small-business-web-design/. Mirrors
 * src/content/de/webdesign-kleine-unternehmen/index.11tydata.js -- see
 * that file's header comment for the reasoning.
 */

export default {
  eleventyComputed: {
    jsonld: (data) => {
      const { site, routes, ui, company } = data;
      const abs = (path) => `${site.url}${path}`;

      const service = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "DIWEBA Small Business Web Design",
        provider: { "@type": "Organization", name: company.brand, legalName: company.legalName },
        areaServed: { "@type": "Country", name: "Germany" },
        url: abs(routes.smallBusiness.en),
      };

      const faqPage = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.smallBusinessPage.en.faq.map((item) => ({
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
          { "@type": "ListItem", position: 2, name: ui.en.nav.smallBusiness, item: abs(routes.smallBusiness.en) },
        ],
      };

      return [service, faqPage, breadcrumb];
    },
  },
};
