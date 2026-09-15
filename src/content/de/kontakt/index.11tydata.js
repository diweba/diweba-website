/**
 * JSON-LD for /kontakt/. ContactPoint + BreadcrumbList only — no
 * LocalBusiness, no aggregateRating, no review (spec §12: "structured data
 * reflects only what is visible"; nothing here that isn't also rendered on
 * the page itself). Address is omitted: company.publishAddressPublicly is
 * false, same gate the homepage's Organization schema already respects.
 */

export default {
  eleventyComputed: {
    jsonld: (data) => {
      const { site, routes, ui, company } = data;
      const abs = (path) => `${site.url}${path}`;

      const contactPoint = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Kontakt — DIWEBA",
        url: abs(routes.contact.de),
        about: {
          "@type": "Organization",
          name: company.brand,
          legalName: company.legalName,
          ...(company.email ? { email: company.email } : {}),
        },
      };

      const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.de.home, item: abs(routes.home.de) },
          { "@type": "ListItem", position: 2, name: ui.de.nav.contact, item: abs(routes.contact.de) },
        ],
      };

      return [contactPoint, breadcrumb];
    },
  },
};
