/**
 * JSON-LD for /en/ai-search/. Mirrors
 * src/content/de/ki-suche-optimierung/index.11tydata.js -- see that file's
 * header comment for the reasoning.
 */

export default {
  eleventyComputed: {
    jsonld: (data) => {
      const { site, routes, ui, company, pricingPage, packages } = data;
      const abs = (path) => `${site.url}${path}`;
      const addon = pricingPage.en.addons.find((a) => a.id === "ki");

      const service = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "DIWEBA AI Visibility",
        description: addon.d,
        provider: { "@type": "Organization", name: company.brand, legalName: company.legalName },
        areaServed: { "@type": "Country", name: "Germany" },
        url: abs(routes.aiSearch.en),
        offers: {
          "@type": "Offer",
          name: addon.n,
          price: String(addon.p),
          priceCurrency: packages.currency,
          url: abs(routes.pricing.en),
        },
      };

      const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.en.home, item: abs(routes.home.en) },
          { "@type": "ListItem", position: 2, name: ui.en.nav.aiSearch, item: abs(routes.aiSearch.en) },
        ],
      };

      return [service, breadcrumb];
    },
  },
};
