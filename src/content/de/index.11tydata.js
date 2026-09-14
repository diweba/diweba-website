/**
 * JSON-LD for the German homepage. Scoped to this one template (matches
 * `index.njk` by basename) rather than the whole `de/` directory, since only
 * Home and (later) About carry Organization/WebSite schema — spec §12.
 *
 * Every property here corresponds to a fact rendered on THIS page. Nothing is
 * invented to fill out the schema: no ContactPoint (email/phone are null in
 * company.js), no address (publishAddressPublicly is false), no sameAs
 * (company.sameAs is empty), no aggregateRating, no review. Each of those
 * activates automatically, from the same source data, the day the underlying
 * fact becomes real — nothing here needs to change when it does.
 */

export default {
  eleventyComputed: {
    jsonld: (data) => {
      const { site, company } = data;
      const orgId = `${site.url}/#organization`;

      const organization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": orgId,
        name: company.brand,
        legalName: company.legalName,
        url: site.url,
        logo: `${site.url}/assets/img/favicon.svg`,
      };
      if (company.publishAddressPublicly) {
        organization.address = {
          "@type": "PostalAddress",
          streetAddress: company.address.street,
          postalCode: company.address.postalCode,
          addressLocality: company.address.city,
          addressCountry: company.address.countryCode,
        };
      }
      if (company.email || company.phone) {
        organization.contactPoint = {
          "@type": "ContactPoint",
          contactType: "customer service",
          ...(company.email ? { email: company.email } : {}),
          ...(company.phone ? { telephone: company.phone } : {}),
        };
      }
      if (company.sameAs.length) organization.sameAs = company.sameAs;

      const website = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: company.brand,
        inLanguage: site.languages,
        publisher: { "@id": orgId },
      };

      return [organization, website];
    },
  },
};
