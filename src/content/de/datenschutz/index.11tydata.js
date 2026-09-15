/**
 * JSON-LD for /datenschutz/. Generic WebPage + BreadcrumbList only -- see
 * src/content/de/impressum/index.11tydata.js's header comment for the same
 * reasoning (no Organization/Review/AggregateRating claims here).
 */

export default {
  eleventyComputed: {
    jsonld: (data) => {
      const { site, routes, ui } = data;
      const abs = (path) => `${site.url}${path}`;

      const webPage = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Datenschutzerklärung",
        url: abs(routes.privacy.de),
        inLanguage: "de",
      };

      const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.de.home, item: abs(routes.home.de) },
          { "@type": "ListItem", position: 2, name: ui.de.nav.privacy, item: abs(routes.privacy.de) },
        ],
      };

      return [webPage, breadcrumb];
    },
  },
};
