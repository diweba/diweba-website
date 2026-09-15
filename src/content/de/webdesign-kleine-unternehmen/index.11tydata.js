/**
 * JSON-LD for /webdesign-kleine-unternehmen/. Service (no Offers array --
 * unlike the servicePage JSON-LD, this page does not state package prices
 * inline, so listing priced Offers here would not match visible content)
 * + FAQPage (built directly from smallBusinessPage.yml's own faq array)
 * + BreadcrumbList. No Review/AggregateRating, no invented claims.
 */

export default {
  eleventyComputed: {
    jsonld: (data) => {
      const { site, routes, ui, company } = data;
      const abs = (path) => `${site.url}${path}`;

      const service = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "DIWEBA Webdesign für kleine Unternehmen",
        provider: { "@type": "Organization", name: company.brand, legalName: company.legalName },
        areaServed: { "@type": "Country", name: "Germany" },
        url: abs(routes.smallBusiness.de),
      };

      const faqPage = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.smallBusinessPage.de.faq.map((item) => ({
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
          { "@type": "ListItem", position: 2, name: ui.de.nav.smallBusiness, item: abs(routes.smallBusiness.de) },
        ],
      };

      return [service, faqPage, breadcrumb];
    },
  },
};
