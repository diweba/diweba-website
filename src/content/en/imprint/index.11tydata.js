/**
 * JSON-LD for /en/imprint/. Mirrors
 * src/content/de/impressum/index.11tydata.js -- see that file's header
 * comment for the reasoning.
 */

export default {
  eleventyComputed: {
    jsonld: (data) => {
      const { site, routes, ui } = data;
      const abs = (path) => `${site.url}${path}`;

      const webPage = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Imprint",
        url: abs(routes.imprint.en),
        inLanguage: "en",
      };

      const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.en.home, item: abs(routes.home.en) },
          { "@type": "ListItem", position: 2, name: ui.en.nav.imprint, item: abs(routes.imprint.en) },
        ],
      };

      return [webPage, breadcrumb];
    },
  },
};
