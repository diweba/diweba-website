/**
 * JSON-LD for /ueber-uns/. AboutPage + a Person entity for the founder +
 * BreadcrumbList only -- no aggregateRating, no review, no sameAs (spec
 * §12: "structured data reflects only what is visible"; company.js's
 * sameAs is empty on purpose, so it is left out rather than invented).
 * jobTitle uses the same confirmed role string rendered on the page itself
 * (home.js's founder.role, with no location -- Phase 3C instruction).
 */

export default {
  eleventyComputed: {
    jsonld: (data) => {
      const { site, routes, ui, company, home } = data;
      const abs = (path) => `${site.url}${path}`;

      const founder = {
        "@type": "Person",
        name: company.legalName,
        jobTitle: home.de.founder.role,
        ...(company.email ? { email: company.email } : {}),
      };

      const aboutPage = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "Über DIWEBA",
        url: abs(routes.about.de),
        about: {
          "@type": "Organization",
          name: company.brand,
          legalName: company.legalName,
          founder,
        },
        mainEntity: founder,
      };

      const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: ui.de.home, item: abs(routes.home.de) },
          { "@type": "ListItem", position: 2, name: ui.de.nav.about, item: abs(routes.about.de) },
        ],
      };

      return [aboutPage, breadcrumb];
    },
  },
};
