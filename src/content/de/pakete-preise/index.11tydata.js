/**
 * JSON-LD for /pakete-preise/. Service + Offer per package, built from
 * packages.js's own numeric fields (spec §12: "real prices in EUR from the
 * Packages collection") -- never a separately hand-typed price that could
 * drift from what the page actually displays.
 */

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
        description: item.summary.de,
        url: abs(routes.pricing.de),
      }));

      const service = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "DIWEBA Website-Erstellung",
        provider: { "@type": "Organization", name: company.brand, legalName: company.legalName },
        areaServed: { "@type": "Country", name: "Germany" },
        offers,
      };

      const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.de.home, item: abs(routes.home.de) },
          { "@type": "ListItem", position: 2, name: ui.de.nav.pricing, item: abs(routes.pricing.de) },
        ],
      };

      return [service, breadcrumb];
    },
  },
};
