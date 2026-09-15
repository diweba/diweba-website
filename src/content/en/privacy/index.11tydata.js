/**
 * JSON-LD for /en/privacy/. Mirrors
 * src/content/de/datenschutz/index.11tydata.js -- see that file's header
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
        name: "Privacy Policy",
        url: abs(routes.privacy.en),
        inLanguage: "en",
      };

      const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.en.home, item: abs(routes.home.en) },
          { "@type": "ListItem", position: 2, name: ui.en.nav.privacy, item: abs(routes.privacy.en) },
        ],
      };

      return [webPage, breadcrumb];
    },
  },
};
