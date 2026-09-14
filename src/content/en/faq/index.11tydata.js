/**
 * JSON-LD for /en/faq/. See the German counterpart for the full rationale;
 * this one reads the "en" branch of every data source instead.
 */

export default {
  eleventyComputed: {
    jsonld: (data) => {
      const { site, faq, routes, ui } = data;
      const items = faq.en.items;
      const abs = (path) => `${site.url}${path}`;

      const faqPage = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
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
          { "@type": "ListItem", position: 2, name: ui.en.nav.faq, item: abs(routes.faq.en) },
        ],
      };

      return [faqPage, breadcrumb];
    },
  },
};
