/** JSON-LD for /en/process/ — see the German counterpart. */
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
            { "@type": "ListItem", position: 1, name: ui.en.home, item: abs(routes.home.en) },
            { "@type": "ListItem", position: 2, name: ui.en.nav.process, item: abs(routes.process.en) },
          ],
        },
      ];
    },
  },
};
