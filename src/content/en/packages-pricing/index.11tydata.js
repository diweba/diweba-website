/** JSON-LD for /en/packages-pricing/ — see the German counterpart. */
export default {
  eleventyComputed: {
    jsonld: (data) => {
      const { site, routes, ui, packages, company } = data;
      const abs = (path) => `${site.url}${path}`;

      const offers = packages.items.map((item) => ({
        "@type": "Offer",
        name: item.name,
        price: String(item.priceOnce),
        priceCurrency: packages.currency,
        description: item.summary.en,
        url: abs(routes.pricing.en),
      }));

      const service = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "DIWEBA Website Development",
        provider: { "@type": "Organization", name: company.brand, legalName: company.legalName },
        areaServed: { "@type": "Country", name: "Germany" },
        offers,
      };

      const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.en.home, item: abs(routes.home.en) },
          { "@type": "ListItem", position: 2, name: ui.en.nav.pricing, item: abs(routes.pricing.en) },
        ],
      };

      return [service, breadcrumb];
    },
  },
};
