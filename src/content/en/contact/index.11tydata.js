/**
 * JSON-LD for /en/contact/. Mirrors src/content/de/kontakt/index.11tydata.js
 * — see that file's header comment for the reasoning.
 */

export default {
  eleventyComputed: {
    jsonld: (data) => {
      const { site, routes, ui, company } = data;
      const abs = (path) => `${site.url}${path}`;

      const contactPoint = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact — DIWEBA",
        url: abs(routes.contact.en),
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
          { "@type": "ListItem", position: 1, name: ui.en.home, item: abs(routes.home.en) },
          { "@type": "ListItem", position: 2, name: ui.en.nav.contact, item: abs(routes.contact.en) },
        ],
      };

      return [contactPoint, breadcrumb];
    },
  },
};
