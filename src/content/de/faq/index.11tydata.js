/**
 * JSON-LD for /faq/. FAQPage built directly from src/_data/faq.js's own
 * array, so it is structurally impossible for the schema to claim a question
 * that isn't actually rendered on the page (spec §12: "structured data
 * reflects only what is visible"; task instruction: "FAQ structured data may
 * be used only if it exactly matches visible content").
 */

export default {
  eleventyComputed: {
    jsonld: (data) => {
      const { site, faq, routes, ui } = data;
      const items = faq.de.items;
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
          { "@type": "ListItem", position: 1, name: ui.de.home, item: abs(routes.home.de) },
          { "@type": "ListItem", position: 2, name: ui.de.nav.faq, item: abs(routes.faq.de) },
        ],
      };

      return [faqPage, breadcrumb];
    },
  },
};
