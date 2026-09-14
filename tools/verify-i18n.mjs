/**
 * DIWEBA — i18n and routing checks.
 *
 * These exist because of three bugs that actually shipped on a comparable
 * bilingual project:
 *
 *   1. A page declared the wrong <html lang> — the English homepage announced
 *      itself as German. Invisible to a human reviewer, visible to Google.
 *   2. Language-switch links on three service pages pointed at the section index
 *      instead of the sibling page. Users clicking "EN" on a pricing page landed
 *      on a generic overview.
 *   3. hreflang clusters that were not reciprocal, which Google ignores entirely.
 *
 * The route registry makes all three checkable. Every assertion here compares
 * emitted HTML against src/_data/routes.js.
 */

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";

const OUT = "_site";
let failures = 0;
let checks = 0;

const ok = (l) => { checks++; console.log(`  ok    ${l}`); };
const fail = (l, d) => { checks++; failures++; console.log(`  FAIL  ${l}`); if (d) console.log(`        ${d}`); };
const info = (l) => console.log(`  note  ${l}`);

const { default: routes } = await import(
  pathToFileURL(join(process.cwd(), "src/_data/routes.js")).href
);

function htmlFiles(dir = OUT, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) htmlFiles(full, acc);
    else if (entry.endsWith(".html")) acc.push(full);
  }
  return acc;
}

/** Map an output file back to its site URL path. */
function urlFor(file) {
  const rel = relative(OUT, file).split("\\").join("/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return "/" + rel.slice(0, -"index.html".length);
  return "/" + rel;
}

console.log("\n=== DIWEBA i18n / routing checks ===\n");

if (!existsSync(OUT)) {
  console.log("  FAIL  no _site/ directory — run `npm run build` first\n");
  process.exit(1);
}

// Content pages only. Excluded:
//   404.html  — noindex, bilingual by design, not part of a hreflang cluster
//   /admin/   — the CMS application shell, not a content page
const pages = htmlFiles().filter(
  (f) => !f.includes("404.html") && !f.split(/[\\/]/).includes("admin")
);
const byUrl = new Map(pages.map((f) => [urlFor(f), f]));

// ---------------------------------------------------------------------------
// 1. Registry coverage — which routes have pages yet
// ---------------------------------------------------------------------------
const missing = [];
for (const [key, entry] of Object.entries(routes)) {
  for (const lang of ["de", "en"]) {
    if (!byUrl.has(entry[lang])) missing.push(`${key}.${lang} → ${entry[lang]}`);
  }
}
if (missing.length === 0) {
  ok("every route in the registry has a page");
} else {
  // Phase 1 builds the foundation only; pages arrive in Phase 3. This is
  // reported, not failed, so the gap stays visible without blocking.
  info(`${missing.length} registry route(s) have no page yet (expected until Phase 3):`);
  for (const m of missing) console.log(`          ${m}`);
}

// ---------------------------------------------------------------------------
// 2. <html lang> matches the language the URL implies
// ---------------------------------------------------------------------------
const langErrors = [];
for (const [url, file] of byUrl) {
  const html = readFileSync(file, "utf8");
  const m = html.match(/<html[^>]*\slang="([^"]+)"/i);
  if (!m) { langErrors.push(`${url} — no lang attribute`); continue; }
  const expected = url === "/en/" || url.startsWith("/en/") ? "en" : "de";
  if (m[1] !== expected) langErrors.push(`${url} — lang="${m[1]}", expected "${expected}"`);
}
if (langErrors.length === 0) ok("<html lang> correct on every page");
else fail("wrong <html lang>", langErrors.join("\n        "));

// ---------------------------------------------------------------------------
// 3. Canonical present and self-referencing
// ---------------------------------------------------------------------------
const canonicalErrors = [];
for (const [url, file] of byUrl) {
  const html = readFileSync(file, "utf8");
  const m = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
  if (!m) { canonicalErrors.push(`${url} — missing canonical`); continue; }
  const path = new URL(m[1]).pathname;
  if (path !== url) canonicalErrors.push(`${url} — canonical points to ${path}`);
}
if (canonicalErrors.length === 0) ok("canonical present and self-referencing");
else fail("canonical problems", canonicalErrors.join("\n        "));

// ---------------------------------------------------------------------------
// 4. Language switch resolves to the correct sibling
//    This is bug #2 above, made impossible.
//
//    The header renders BOTH languages as .lang-switch links (the current one
//    marked aria-current="true", a clearer pattern than a single toggle) —
//    so there are now two elements with this class per page, not one. The
//    element that actually switches language is identified by its hreflang
//    attribute, which is set to the OTHER language specifically for this
//    purpose — unambiguous regardless of DOM order.
// ---------------------------------------------------------------------------
const switchErrors = [];
for (const [url, file] of byUrl) {
  const html = readFileSync(file, "utf8");
  const isEn = url.startsWith("/en/");
  const otherLang = isEn ? "de" : "en";

  const re = new RegExp(
    `<a[^>]*class="lang-switch"[^>]*hreflang="${otherLang}"[^>]*href="([^"]+)"` +
      `|<a[^>]*href="([^"]+)"[^>]*class="lang-switch"[^>]*hreflang="${otherLang}"` +
      `|<a[^>]*class="lang-switch"[^>]*href="([^"]+)"[^>]*hreflang="${otherLang}"`,
    "i"
  );
  const raw = html.match(re);
  const m = raw ? [raw[0], raw[1] || raw[2] || raw[3]] : null;
  if (!m) continue; // pages without a header (none yet) are not an error

  // Find the registry entry whose current-language path is this URL.
  const entry = Object.values(routes).find((r) => r[isEn ? "en" : "de"] === url);
  if (!entry) { switchErrors.push(`${url} — no registry entry`); continue; }

  if (m[1] !== entry[otherLang]) {
    switchErrors.push(`${url} — switch goes to ${m[1]}, expected ${entry[otherLang]}`);
  }
}
if (switchErrors.length === 0) ok("language switch resolves to the correct sibling");
else fail("language switch points at the wrong page", switchErrors.join("\n        "));

// ---------------------------------------------------------------------------
// 5. hreflang reciprocity
// ---------------------------------------------------------------------------
const hreflangErrors = [];
for (const [url, file] of byUrl) {
  const html = readFileSync(file, "utf8");
  const links = [...html.matchAll(/<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"/gi)];
  if (links.length === 0) continue; // noindex pages legitimately omit these

  const map = Object.fromEntries(links.map((l) => [l[1], new URL(l[2]).pathname]));
  for (const lang of ["de", "en", "x-default"]) {
    if (!map[lang]) hreflangErrors.push(`${url} — missing hreflang="${lang}"`);
  }
  if (map.de && map.en) {
    // The pair must name this page in its own language.
    const isEn = url.startsWith("/en/");
    const own = isEn ? map.en : map.de;
    if (own !== url) hreflangErrors.push(`${url} — own hreflang points to ${own}`);

    // And the sibling must point back.
    const siblingUrl = isEn ? map.de : map.en;
    const siblingFile = byUrl.get(siblingUrl);
    if (siblingFile) {
      const sibling = readFileSync(siblingFile, "utf8");
      if (!sibling.includes(`href="${new URL(links[0][2]).origin}${url}"`)) {
        hreflangErrors.push(`${url} — sibling ${siblingUrl} does not link back`);
      }
    }
  }
}
if (hreflangErrors.length === 0) ok("hreflang clusters reciprocal and complete");
else fail("hreflang problems", hreflangErrors.join("\n        "));

// ---------------------------------------------------------------------------
// 6. Unique title and meta description per page
// ---------------------------------------------------------------------------
const titles = new Map();
const descriptions = new Map();
const metaErrors = [];
for (const [url, file] of byUrl) {
  const html = readFileSync(file, "utf8");
  const t = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim();
  const d = html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1]?.trim();

  if (!t) metaErrors.push(`${url} — missing title`);
  else if (titles.has(t)) metaErrors.push(`${url} — title duplicates ${titles.get(t)}`);
  else titles.set(t, url);

  if (!d) metaErrors.push(`${url} — missing meta description`);
  else if (descriptions.has(d)) metaErrors.push(`${url} — description duplicates ${descriptions.get(d)}`);
  else descriptions.set(d, url);
}
if (metaErrors.length === 0) ok("unique title and meta description on every page");
else fail("title/description problems", metaErrors.join("\n        "));

// ---------------------------------------------------------------------------
// 7. Exactly one H1 per page
// ---------------------------------------------------------------------------
const h1Errors = [];
for (const [url, file] of byUrl) {
  const html = readFileSync(file, "utf8");
  const count = (html.match(/<h1[\s>]/gi) || []).length;
  if (count !== 1) h1Errors.push(`${url} — ${count} H1 element(s)`);
}
if (h1Errors.length === 0) ok("exactly one H1 per page");
else fail("H1 problems", h1Errors.join("\n        "));

// ---------------------------------------------------------------------------
console.log(
  `\n${failures === 0 ? "I18N OK" : `${failures} of ${checks} check(s) FAILED`}\n`
);
process.exit(failures === 0 ? 0 : 1);
