/**
 * Directory data for all English pages.
 * See the German counterpart (de.11tydata.js) for why permalinks are derived
 * from the route registry rather than declared per page.
 */

export default {
  lang: "en",
  layout: "layouts/base.njk",
  permalink: (data) => {
    const entry = data.routes[data.routeKey];
    if (!entry) {
      throw new Error(
        `Page "${data.page.inputPath}" has routeKey "${data.routeKey}", which is ` +
          `not in src/_data/routes.js.`
      );
    }
    return entry.en;
  },
};
