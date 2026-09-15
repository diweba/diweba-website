/**
 * JSON-LD for /ki-suche-optimierung/. Service + Offer for the "KI-
 * Sichtbarkeit" add-on, built from pricingPage.js's own addons array (id
 * "ki") rather than a second hand-typed price -- same reasoning as
 * pricingPage.js's own Service/Offer schema (Phase 3A). No Review, no
 * AggregateRating, no sameAs, no claim of guaranteed AI citation or
 * ranking -- structured data reflects only what the page itself says, and
 * the page itself makes no such guarantee (spec §12; Phase 3D §13).
 */

export default {
  eleventyComputed: {
    jsonld: (data) => {
      const { site, routes, ui, company, pricingPage, packages } = data;
      const abs = (path) => `${site.url}${path}`;
      const addon = pricingPage.de.addons.find((a) => a.id === "ki");

      const service = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "DIWEBA KI-Sichtbarkeit",
        description: addon.d,
        provider: { "@type": "Organization", name: company.brand, legalName: company.legalName },
        areaServed: { "@type": "Country", name: "Germany" },
        url: abs(routes.aiSearch.de),
        offers: {
          "@type": "Offer",
          name: addon.n,
          price: String(addon.p),
          priceCurrency: packages.currency,
          url: abs(routes.pricing.de),
        },
      };

      const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.de.home, item: abs(routes.home.de) },
          { "@type": "ListItem", position: 2, name: ui.de.nav.aiSearch, item: abs(routes.aiSearch.de) },
        ],
      };

      return [service, breadcrumb];
    },
  },
};
