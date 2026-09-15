/**
 * JSON-LD for /impressum/. Generic WebPage + BreadcrumbList only (spec
 * §12: legal pages get no Organization/Service claims of their own here --
 * Organization schema already lives on Home/About). No Review, no
 * AggregateRating, no invented properties.
 */

export default {
  eleventyComputed: {
    jsonld: (data) => {
      const { site, routes, ui } = data;
      const abs = (path) => `${site.url}${path}`;

      const webPage = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Impressum",
        url: abs(routes.imprint.de),
        inLanguage: "de",
      };

      const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.de.home, item: abs(routes.home.de) },
          { "@type": "ListItem", position: 2, name: ui.de.nav.imprint, item: abs(routes.imprint.de) },
        ],
      };

      return [webPage, breadcrumb];
    },
  },
};
