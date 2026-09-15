/**
 * JSON-LD for /en/about/. Mirrors src/content/de/ueber-uns/index.11tydata.js
 * — see that file's header comment for the reasoning.
 */

export default {
  eleventyComputed: {
    jsonld: (data) => {
      const { site, routes, ui, company, home } = data;
      const abs = (path) => `${site.url}${path}`;

      const founder = {
        "@type": "Person",
        name: company.legalName,
        jobTitle: home.en.founder.role,
        ...(company.email ? { email: company.email } : {}),
      };

      const aboutPage = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About DIWEBA",
        url: abs(routes.about.en),
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
          { "@type": "ListItem", position: 1, name: ui.en.home, item: abs(routes.home.en) },
          { "@type": "ListItem", position: 2, name: ui.en.nav.about, item: abs(routes.about.en) },
        ],
      };

      return [aboutPage, breadcrumb];
    },
  },
};
