/** JSON-LD for /ablauf/ — BreadcrumbList only; no Service/Offer schema here
 *  (that belongs to the pricing page, where the actual Offer lives). */
export default {
  eleventyComputed: {
    jsonld: (data) => {
      const { site, routes, ui } = data;
      const abs = (path) => `${site.url}${path}`;
      return [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: ui.de.home, item: abs(routes.home.de) },
            { "@type": "ListItem", position: 2, name: ui.de.nav.process, item: abs(routes.process.de) },
          ],
        },
      ];
    },
  },
};
