/**
 * DIWEBA — Eleventy configuration
 *
 * Architecture notes (see docs/DIWEBA_PHASE_0_SPEC.md §7):
 *   - Output is fully static HTML. Nothing about the CMS may push rendering
 *     to the client.
 *   - Templates are Nunjucks. TypeScript is used for the Worker and tooling
 *     only — a typed component layer would buy nothing here.
 *   - All routing comes from src/_data/routes.js. Templates never hardcode a
 *     URL and never derive the other language's URL by string manipulation.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

// Load .env without a dependency. Node >=20.12 provides this natively.
// Missing .env is fine: every consumer treats absent config as "not configured".
try {
  process.loadEnvFile?.(".env");
} catch {
  /* no .env present — expected in CI, where values come from the environment */
}

export default function (eleventyConfig) {
  // ---------------------------------------------------------------------------
  // Passthrough
  // ---------------------------------------------------------------------------
  // Styles and scripts are authored as plain CSS/JS and copied verbatim. No
  // bundler: the CSS is small, HTTP/2 makes a second request cheap, and a build
  // step here would buy complexity rather than speed.
  eleventyConfig.addPassthroughCopy({ "src/styles": "assets/css" });
  eleventyConfig.addPassthroughCopy({ "src/scripts": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Sveltia CMS — served at /admin/. robots.txt disallows it and it is absent
  // from the sitemap; see src/robots.njk and src/sitemap.njk.
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

  // Cloudflare edge configuration, copied to the root of the asset directory.
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });

  eleventyConfig.addWatchTarget("src/styles/");
  eleventyConfig.addWatchTarget("src/scripts/");

  // ---------------------------------------------------------------------------
  // Filters — routing and i18n
  // ---------------------------------------------------------------------------

  /**
   * Resolve a route key to a path in a given language.
   *   {{ "pricing" | route(lang) }}  ->  /pakete-preise/
   * Throws at build time on an unknown key, so a typo fails the build instead of
   * silently emitting a dead link.
   */
  eleventyConfig.addFilter("route", function (key, lang) {
    const routes = this.ctx?.routes ?? this.context?.environments?.routes;
    const entry = routes?.[key];
    if (!entry) throw new Error(`route(): unknown route key "${key}"`);
    const path = entry[lang];
    if (!path) throw new Error(`route(): route "${key}" has no "${lang}" path`);
    return path;
  });

  /** Absolute URL from a site-root path. */
  eleventyConfig.addFilter("absolute", function (path, siteUrl) {
    const base = (siteUrl ?? "").replace(/\/+$/, "");
    return `${base}${path}`;
  });

  /**
   * Guard for facts that are deliberately unresolved (contact email, tax status,
   * Rechtsform). These are null in src/_data/company.js on purpose — see
   * CLAUDE.md. Rendering one must fail the build loudly rather than emit an
   * empty string or a plausible-looking placeholder into legal copy.
   */
  eleventyConfig.addFilter("required", (value, label) => {
    if (value === null || value === undefined || value === "") {
      throw new Error(
        `required(): "${label}" is not yet resolved and must not be published. ` +
          `See docs/DIWEBA_PHASE_0_SPEC.md §1.`
      );
    }
    return value;
  });

  /** Localised date, used later by the knowledge section. */
  eleventyConfig.addFilter("localDate", (value, lang) =>
    new Date(value).toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  /** Price formatting from numeric content fields. Never hardcode in prose. */
  eleventyConfig.addFilter("price", (amount, lang, currency = "EUR") =>
    new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-GB", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  );

  eleventyConfig.addFilter("jsonld", (value) =>
    JSON.stringify(value, null, 2).replace(/</g, "\\u003c")
  );

  // ---------------------------------------------------------------------------
  // Collections
  // ---------------------------------------------------------------------------

  eleventyConfig.addCollection("pagesDe", (c) =>
    c.getFilteredByGlob("src/content/de/**/*.njk")
  );
  eleventyConfig.addCollection("pagesEn", (c) =>
    c.getFilteredByGlob("src/content/en/**/*.njk")
  );

  /** Everything eligible for the sitemap: indexable, non-draft, real pages. */
  eleventyConfig.addCollection("indexable", (c) =>
    c
      .getAll()
      .filter((item) => item.data.eleventyExcludeFromCollections !== true)
      .filter((item) => item.data.noindex !== true)
      .filter((item) => item.data.sitemap !== false)
      .filter((item) => typeof item.page.url === "string" && item.page.url !== false)
  );

  // ---------------------------------------------------------------------------
  // Shortcodes
  // ---------------------------------------------------------------------------

  /** Current year, for the footer. Avoids a hardcoded year going stale. */
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  /**
   * Inline an asset from the built output (used for critical CSS later).
   * Kept minimal for now; the foundation does not yet inline anything.
   */
  eleventyConfig.addShortcode("inlineFile", (path) => {
    try {
      return readFileSync(join("src", path), "utf8");
    } catch {
      throw new Error(`inlineFile(): cannot read src/${path}`);
    }
  });

  // ---------------------------------------------------------------------------
  // Build settings
  // ---------------------------------------------------------------------------

  eleventyConfig.setQuietMode(true);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    // Trailing-slash URLs everywhere; the Worker enforces the canonical form.
    pathPrefix: "/",
  };
}
