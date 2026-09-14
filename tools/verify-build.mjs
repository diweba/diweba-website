/**
 * DIWEBA — pre-deploy build checks.
 *
 * Runs against _site/ after a build. Exits non-zero on failure, so CI blocks the
 * deploy rather than shipping the problem.
 *
 * Each check exists because the failure it catches is cheap to make and
 * expensive to discover in production.
 */

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "_site";
let failures = 0;
let checks = 0;

function ok(label) {
  checks++;
  console.log(`  ok    ${label}`);
}

function fail(label, detail) {
  checks++;
  failures++;
  console.log(`  FAIL  ${label}`);
  if (detail) console.log(`        ${detail}`);
}

function htmlFiles(dir = OUT, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) htmlFiles(full, acc);
    else if (entry.endsWith(".html")) acc.push(full);
  }
  return acc;
}

console.log("\n=== DIWEBA build checks ===\n");

if (!existsSync(OUT)) {
  console.log("  FAIL  no _site/ directory — run `npm run build` first\n");
  process.exit(1);
}

const pages = htmlFiles();

// ---------------------------------------------------------------------------
// 1. Output exists
// ---------------------------------------------------------------------------
if (pages.length > 0) ok(`${pages.length} HTML page(s) produced`);
else fail("no HTML pages produced");

// ---------------------------------------------------------------------------
// 2. No secrets in output
//    A live API key was once found hardcoded in legacy files on a comparable
//    project. This makes shipping one impossible rather than unlikely.
// ---------------------------------------------------------------------------
const SECRET_PATTERNS = [
  { name: "Brevo API key", re: /xkeysib-[A-Za-z0-9]{16,}/ },
  { name: "Turnstile secret key", re: /0x[A-Za-z0-9]{30,}/ },
  { name: "Google API key", re: /AIza[0-9A-Za-z_-]{30,}/ },
  { name: "generic bearer token", re: /\b(secret|api[_-]?key)\s*[:=]\s*["'][A-Za-z0-9_-]{24,}["']/i },
];

const leaked = [];
for (const file of htmlFiles(OUT)) {
  const text = readFileSync(file, "utf8");
  for (const { name, re } of SECRET_PATTERNS) {
    if (re.test(text)) leaked.push(`${relative(OUT, file)} — ${name}`);
  }
}
if (leaked.length === 0) ok("no secrets in build output");
else fail("possible secret in build output", leaked.join("\n        "));

// ---------------------------------------------------------------------------
// 3. Unresolved company facts must not be published
//    company.js keeps these null on purpose; the `required` filter throws at
//    build time. This catches any that reached the output another way.
// ---------------------------------------------------------------------------
const PLACEHOLDER_PATTERNS = [
  /\bTODO\b/,
  /\bFIXME\b/,
  /\bPLACEHOLDER\b/i,
  /\bLorem ipsum\b/i,
  /\[Rechtstext folgt/i,
  /Platzhalter/i,
];
const placeholders = [];
for (const file of pages) {
  const text = readFileSync(file, "utf8");
  for (const re of PLACEHOLDER_PATTERNS) {
    if (re.test(text)) placeholders.push(`${relative(OUT, file)} — ${re}`);
  }
}
if (placeholders.length === 0) ok("no placeholder text in output");
else fail("placeholder text reached the output", placeholders.join("\n        "));

// ---------------------------------------------------------------------------
// 4. Prohibited demo data must never be published
//    The Schreinerei Baumann material is a proposal template, not a customer.
// ---------------------------------------------------------------------------
const PROHIBITED = [/Schreinerei\s+Baumann/i, /Michael\s+Baumann/i, /Katrin\s+Vogler/i];
const prohibited = [];
for (const file of pages) {
  const text = readFileSync(file, "utf8");
  for (const re of PROHIBITED) {
    if (re.test(text)) prohibited.push(`${relative(OUT, file)} — ${re}`);
  }
}
if (prohibited.length === 0) ok("no prohibited demo data in output");
else fail("PROHIBITED demo data in output", prohibited.join("\n        "));

// ---------------------------------------------------------------------------
// 5. Withdrawn package model must not reappear
// ---------------------------------------------------------------------------
const withdrawn = [];
for (const file of pages) {
  const text = readFileSync(file, "utf8");
  if (/\bKOMPLETT\b/.test(text)) withdrawn.push(relative(OUT, file));
}
if (withdrawn.length === 0) ok("withdrawn KOMPLETT package absent from output");
else fail("withdrawn KOMPLETT package appears in output", withdrawn.join(", "));

// ---------------------------------------------------------------------------
// 6. Required files present
// ---------------------------------------------------------------------------
for (const required of ["404.html", "robots.txt", "_headers"]) {
  if (existsSync(join(OUT, required))) ok(`${required} present`);
  else fail(`${required} missing`);
}

// ---------------------------------------------------------------------------
// 7. No structurally empty pages
//    A page that builds but renders nothing passes a naive "did it build" check.
//    /admin/ is excluded: it is the CMS application shell, which legitimately
//    has no server-rendered content — the CMS mounts into it client-side. It is
//    noindex and is not a page in the content sense.
// ---------------------------------------------------------------------------
const empty = [];
for (const file of pages) {
  if (file.split(sep).includes("admin")) continue;
  const text = readFileSync(file, "utf8");
  const main = text.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const body = main ? main[1] : "";
  const visible = body.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  if (visible.length < 20) empty.push(relative(OUT, file));
}
if (empty.length === 0) ok("no structurally empty pages");
else fail("structurally empty page(s)", empty.join(", "));

// ---------------------------------------------------------------------------
// 8. Charset within the first 1024 bytes
//    Past that the browser guesses the encoding and may re-parse. This shipped
//    on a comparable project and was only caught by an audit.
// ---------------------------------------------------------------------------
const lateCharset = [];
for (const file of pages) {
  const text = readFileSync(file, "utf8");
  const idx = text.toLowerCase().indexOf("charset");
  if (idx < 0) lateCharset.push(`${relative(OUT, file)} — no charset`);
  else {
    const bytes = Buffer.byteLength(text.slice(0, idx), "utf8");
    if (bytes > 1024) lateCharset.push(`${relative(OUT, file)} — byte ${bytes}`);
  }
}
if (lateCharset.length === 0) ok("charset within first 1024 bytes on every page");
else fail("charset declared too late", lateCharset.join("\n        "));

// ---------------------------------------------------------------------------
// 9. CMS interface excluded from indexing
// ---------------------------------------------------------------------------
const robotsPath = join(OUT, "robots.txt");
if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, "utf8");
  const disallowsAll = /Disallow:\s*\/\s*$/m.test(robots);
  if (disallowsAll) {
    ok("robots.txt disallows everything (non-production build)");
  } else if (/Disallow:\s*\/admin\//.test(robots)) {
    ok("robots.txt disallows /admin/");
  } else {
    fail("robots.txt does not disallow /admin/");
  }
}

// ---------------------------------------------------------------------------
console.log(
  `\n${failures === 0 ? "BUILD OK — safe to deploy" : `${failures} of ${checks} check(s) FAILED`}\n`
);
process.exit(failures === 0 ? 0 : 1);
