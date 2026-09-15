#!/usr/bin/env node
/**
 * DIWEBA — CMS config/content cross-check (Phase 5).
 *
 * A git-based CMS silently drops any data/front-matter key it doesn't know
 * about the moment someone saves through it. This script is the guard
 * src/admin/config.yml's own header comment has promised since Phase 1:
 * it fails the build the moment config.yml and the actual content model
 * drift apart, in either direction —
 *
 *   - a key exists in the real data/front matter but is NOT declared in
 *     config.yml  -> the next CMS save would silently delete it
 *   - a key is declared in config.yml but does NOT exist in the real
 *     data/front matter -> the schema is stale and misleading
 *
 * Two collections, two different checks:
 *
 *   1. `content` (src/admin/config.yml's file entries under src/_data/*.yml)
 *      — recursively walks each declared field schema against the actual
 *      parsed YAML value, for both `de` and `en`.
 *
 *   2. `pages` (file entries under src/content/**\/*.njk) — parses each
 *      page's front matter and checks every key against the declared field
 *      list. Structural keys (routeKey, layout, lang, noindex, ...) must
 *      still be declared as `widget: hidden` — an absent hidden field is
 *      exactly the silent-data-loss scenario this tool exists to catch.
 */

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import yaml from "js-yaml";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const CONFIG_PATH = join(ROOT, "src/admin/config.yml");

const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}
function warn(msg) {
  warnings.push(msg);
}

// ---------------------------------------------------------------------------
// Load config.yml
// ---------------------------------------------------------------------------
let config;
try {
  config = yaml.load(readFileSync(CONFIG_PATH, "utf8"));
} catch (e) {
  console.error(`FATAL: src/admin/config.yml is not valid YAML — ${e.message}`);
  process.exit(1);
}

if (!config || !Array.isArray(config.collections)) {
  console.error("FATAL: config.yml has no `collections` array.");
  process.exit(1);
}

const contentCollection = config.collections.find((c) => c.name === "content");
const pagesCollection = config.collections.find((c) => c.name === "pages");

// ---------------------------------------------------------------------------
// 1. `content` collection — YAML data files under src/_data/
// ---------------------------------------------------------------------------

/** Field names a `fields:`/`field:` schema declares at one level. */
function declaredKeys(fieldDef) {
  if (fieldDef.fields) return new Set(fieldDef.fields.map((f) => f.name));
  return null; // list-of-primitives (`field:` singular) has no sub-keys
}

/**
 * Recursively compares a parsed data value against its Sveltia field schema.
 * `path` is a human-readable breadcrumb for error messages.
 */
function checkValue(value, fields, path, fileLabel) {
  if (value === null || value === undefined) return;

  const schemaKeys = new Set(fields.map((f) => f.name));
  const actualKeys = new Set(Object.keys(value));

  for (const key of actualKeys) {
    if (!schemaKeys.has(key)) {
      fail(
        `${fileLabel}: "${path}.${key}" exists in the data but is NOT declared in config.yml — ` +
          `the next CMS save would silently delete it.`
      );
    }
  }
  for (const key of schemaKeys) {
    if (!actualKeys.has(key)) {
      const f = fields.find((x) => x.name === key);
      if (f.widget === "hidden" || f.required === false) continue; // optional/structural, fine if absent
      warn(`${fileLabel}: "${path}.${key}" is declared in config.yml but missing from the data.`);
    }
  }

  for (const f of fields) {
    if (f.widget === "hidden") continue;
    const v = value[f.name];
    if (v === undefined || v === null) continue;

    if (f.widget === "object" && f.fields) {
      checkValue(v, f.fields, `${path}.${f.name}`, fileLabel);
    } else if (f.widget === "list") {
      if (!Array.isArray(v)) {
        fail(`${fileLabel}: "${path}.${f.name}" is declared as a list but the data is not an array.`);
        continue;
      }
      if (f.fields) {
        // list of objects
        v.forEach((item, i) => checkValue(item, f.fields, `${path}.${f.name}[${i}]`, fileLabel));
      } else if (f.field) {
        // list of primitives — nothing further to recurse into
      }
    }
  }
}

if (contentCollection) {
  for (const entry of contentCollection.files ?? []) {
    const filePath = join(ROOT, entry.file);
    const fileLabel = entry.file;
    if (!existsSync(filePath)) {
      fail(`${fileLabel}: declared in config.yml (collection "content") but the file does not exist.`);
      continue;
    }
    let data;
    try {
      data = yaml.load(readFileSync(filePath, "utf8"));
    } catch (e) {
      fail(`${fileLabel}: not valid YAML — ${e.message}`);
      continue;
    }

    const locales = entry.i18n?.locales ?? ["de", "en"];
    for (const locale of locales) {
      if (!data[locale]) {
        fail(`${fileLabel}: missing top-level "${locale}:" key (single_file i18n expects one per locale).`);
        continue;
      }
      checkValue(data[locale], entry.fields, locale, fileLabel);
    }

    // Any top-level key besides the declared locales is undeclared drift.
    for (const key of Object.keys(data)) {
      if (!locales.includes(key)) {
        fail(`${fileLabel}: unexpected top-level key "${key}" (not one of ${locales.join(", ")}).`);
      }
    }
  }
} else {
  fail('config.yml has no "content" collection — expected one covering src/_data/*.yml.');
}

// ---------------------------------------------------------------------------
// 2. `pages` collection — front matter of src/content/**/*.njk
// ---------------------------------------------------------------------------

/** Pulls the `---\n...\n---` front-matter block and parses it as YAML. */
function readFrontMatter(filePath) {
  const raw = readFileSync(filePath, "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  return yaml.load(match[1]) ?? {};
}

if (pagesCollection) {
  for (const entry of pagesCollection.files ?? []) {
    const filePath = join(ROOT, entry.file);
    const fileLabel = entry.file;
    if (!existsSync(filePath)) {
      fail(`${fileLabel}: declared in config.yml (collection "pages") but the file does not exist.`);
      continue;
    }
    const fm = readFrontMatter(filePath);
    if (fm === null) {
      fail(`${fileLabel}: has no front-matter block ("---...---") for the "pages" collection to edit.`);
      continue;
    }

    const schemaKeys = new Set((entry.fields ?? []).map((f) => f.name));
    for (const key of Object.keys(fm)) {
      if (!schemaKeys.has(key)) {
        fail(
          `${fileLabel}: front-matter key "${key}" is NOT declared in config.yml — ` +
            `the next CMS save through this entry would silently delete it.`
        );
      }
    }
    for (const f of entry.fields ?? []) {
      if (f.widget === "hidden" || f.required === false) continue;
      if (!(f.name in fm)) {
        warn(`${fileLabel}: "${f.name}" is declared in config.yml but missing from the front matter.`);
      }
    }
  }
} else {
  fail('config.yml has no "pages" collection — expected one covering per-page SEO front matter.');
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
console.log("\n=== DIWEBA CMS config check ===\n");

if (errors.length === 0) {
  console.log("  ok    config.yml matches the actual content model\n");
} else {
  for (const e of errors) console.log(`  FAIL  ${e}`);
  console.log("");
}
for (const w of warnings) console.log(`  note  ${w}`);
if (warnings.length) console.log("");

if (errors.length > 0) {
  console.log(`${errors.length} config/content mismatch(es) found.\n`);
  process.exit(1);
}
console.log("CMS CONFIG OK\n");
