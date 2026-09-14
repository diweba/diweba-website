/**
 * Directory data for all German pages.
 *
 * The permalink is DERIVED from the route registry rather than written in each
 * page's front matter. A page declares only its `routeKey`; the URL comes from
 * src/_data/routes.js. That makes it impossible for a page's real URL to drift
 * from the URL used in hreflang, the canonical, the sitemap and the language
 * switch — they all read the same entry.
 */

export default {
  lang: "de",
  layout: "layouts/base.njk",
  permalink: (data) => {
    const entry = data.routes[data.routeKey];
    if (!entry) {
      throw new Error(
        `Page "${data.page.inputPath}" has routeKey "${data.routeKey}", which is ` +
          `not in src/_data/routes.js.`
      );
    }
    return entry.de;
  },
};
