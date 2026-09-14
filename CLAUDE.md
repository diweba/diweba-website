# DIWEBA — Project Instructions

> **`docs/DIWEBA_PHASE_0_SPEC.md` is the authoritative specification for this project.**
> Read it before making architectural or content decisions. It overrides assumptions,
> habits, and anything in this file that drifts out of date. Only the project owner
> (Baki Cirak) may change the business decisions it records.

---

## What DIWEBA is

DIWEBA is a **fixed-price, fixed-scope web agency for German and European small and
medium businesses**, operated by Baki Cirak. It sells websites at a published price with a
published scope, delivered fast, with an ongoing monthly operating service.

The website being built in this repository is **DIWEBA's own site** — and simultaneously the
reference implementation of the product DIWEBA sells. Architectural choices should assume
this codebase becomes a reusable template for client sites (see §17 of the spec).

### Positioning

Fixed pricing · fixed scope · fast delivery · modern SEO foundations · visibility readiness
for AI/search experiences · legally conscious setup · transparent limitations · no fake
proof · no overselling · ongoing Betrieb · optional content Betreuung.

---

## Package model — LOCKED

Exactly **two** core packages:

| Package | One-time | Monthly Betrieb |
|---|---|---|
| **START** | €790 | €39 |
| **PLUS** | €1,490 | €39 |

PLUS adds analytics / measurement and AI-search optimization capabilities over START.

- **Do not introduce a third package.** A legacy START/PLUS/KOMPLETT model with €69/€99/€149
  monthly tiers exists in `DIWEBA/diweba-copy.js` — it is **withdrawn**. Never reintroduce it.
- **Do not change these prices** without an explicit instruction from the owner.
- Add-ons are a separate collection, never a package.
- Prices live in structured content fields as numbers, never hardcoded in templates or prose.

### Three distinct services — keep them distinct

1. **CMS self-editing** — the client edits their own content. Included capability.
2. **Betrieb** (€39/mo) — hosting, updates, technical operation. DIWEBA, automated.
3. **Content-Betreuung** — optional paid service where DIWEBA writes and maintains content.

The CMS must not be presented as replacing Betreuung. They solve different problems.

---

## Company identity — LOCKED

```
Baki Cirak
Brunnenstraße 7B
76297 Stutensee-Spöck
Germany
```

**Do not invent any other company facts.** The following are genuinely unknown and are
configured as `null` in `src/_data/company.js`:

- contact email address
- telephone number
- Rechtsform
- USt-IdNr. / tax status (§19 UStG vs VAT-registered)

These are **not placeholders to fill with something plausible.** They are `null`, and the
build fails loudly if a template tries to render one. Never substitute a realistic-looking
value to make the build pass.

---

## No-fabrication rule — absolute

Never create, and never publish:

- testimonials, reviews, ratings, star counts
- customer names, logos, or case studies
- performance metrics or before/after figures
- company history, years of experience, team size, project counts
- awards, certifications, partnerships, memberships
- ranking, traffic, lead-volume, or AI-citation guarantees

**Specifically prohibited:** the *Schreinerei Baumann* material in `DIWEBA/diweba-copy.js`
and the contract templates under `DIWEBA/` is **demo data**, not a real customer. It must
never appear on the website in any form.

The case-study architecture exists, but the collection is empty and the template renders
**nothing** — no heading, no skeleton, no "coming soon" — when there is no verified entry.
An entry renders only when `verified_by_client` **and** `consent_on_file` are both true.

If asked to add proof and none exists, say so. Do not generate an example.

---

## Legal caution

- Legal pages (`/impressum/`, `/datenschutz/`) must contain **lawyer-approved content only**.
  Never draft placeholder legal text — it could be published by accident.
- Never assert that a configuration is GDPR-compliant, DSGVO-konform, or legally safe.
  Describe technical behaviour; leave the legal conclusion to a qualified lawyer.
- The *"ohne Cookie-Banner"* claim in the legacy copy is **withdrawn** — the site uses
  Usercentrics + GTM + GA4, so a consent banner exists. Positioning is now about *how*
  tracking is handled, not whether it exists. See spec §8.
- The German versions of legal pages are authoritative; English versions are courtesy
  translations and must say so.

---

## Languages — DE + EN from day one

German is primary, English is a real secondary version. Never machine-translated filler.

**URL strategy:** German at root, English under `/en/`, with translated slugs.

```
/pakete-preise/          ↔  /en/pricing/
/website-erstellen-lassen/ ↔  /en/website-development/
```

All routes live in **`src/_data/routes.js`** — one registry that drives permalinks,
hreflang, canonical, the language switch and the sitemap. Never hardcode a URL in a
template, and never derive the other language's URL by string manipulation.

Language switching is **page-level**: the switch on `/pakete-preise/` lands on `/en/pricing/`,
never on `/en/`. The registry guarantees this.

---

## SEO / GEO principles

Standard SEO practice *is* the AI-search strategy. Google states that AI Overviews and AI
Mode impose no additional technical requirements. There is no separate trick.

- Core information in crawlable, server-rendered HTML — never client-rendered only
- Prices as plain text, never image-only
- Scope and **exclusions** explicit — a published "not included" list is rare and quotable
- FAQs answer the question in the first sentence
- Entity facts identical across site, structured data, and external profiles
- Structured data reflects only what is visible on the page
- `OAI-SearchBot`, `Googlebot` and `Bingbot` must never be accidentally blocked

**Forbidden claims:** guaranteed rankings, guaranteed ChatGPT or AI Overview inclusion, a
specific number of leads, guaranteed AI-search visibility. State plainly what can be
improved and what cannot be guaranteed.

**Never do:** keyword stuffing, doorway/city pages, near-duplicate pages, FAQ schema
everywhere, hidden text, or copy written to sound "AI-readable".

### llms.txt — optional, not an SEO requirement

`/llms.txt` exists (`src/llms.njk`, added Phase 2.5). Get the framing right whenever this
comes up, because it is easy to overstate:

- **Google Search does not require it.** Google has stated it has no positive or negative
  effect on Google Search visibility or rankings.
- It is maintained anyway because other AI/agent systems may read it, and because — once
  it's generated from the route registry, packages, and company data instead of hand-typed —
  it costs nothing to keep accurate.
- **Never** describe it on a public page, in a commit, or in a conversation as required for
  SEO, required for AI Overviews/AI Mode, a ranking factor, or any guarantee of AI or
  ChatGPT visibility. It is a curated summary, not a mechanism that produces citations.

The site's actual SEO foundation does not change because this file exists: crawlable HTML,
semantic structure, real internal links, and accurate structured data (the principles above)
remain the whole story. llms.txt sits alongside `robots.txt` and `sitemap.xml` as one more
generated, registry-sourced file — see `src/llms.njk`'s header comment for the exact
provenance of every line it outputs.

---

## Technical architecture

| Layer | Choice |
|---|---|
| Build | Eleventy 3.x (ESM) |
| Templates | Nunjucks |
| Typed code | TypeScript — Worker and tooling only, not templates |
| Hosting | Cloudflare Workers + Static Assets |
| Server logic | Cloudflare Worker (`worker/`) |
| Bot defence | Cloudflare Turnstile (server-verified) |
| Email | Brevo (Worker-side only) |
| Consent | Usercentrics |
| Analytics | GTM + GA4, consent-gated |
| CMS | Sveltia CMS (git-based) at `/admin/` |

**Do not switch frameworks.** Not to Next.js, not to Astro, not because something is more
fashionable. If a genuine architectural blocker appears, **stop and report it** rather than
silently changing the stack.

### The public site stays static

CMS → git → Eleventy build → static HTML → Cloudflare. The CMS must never turn the public
site into a client-side rendered application.

### Consent load order — never reorder

1. `<meta charset>` — must be within the first 1024 bytes
2. Consent Mode v2 defaults (everything `denied` except `security_storage`)
3. Usercentrics loader
4. GTM container

Consent Mode gates **Google tags only**. Any non-Google tag (Meta, LinkedIn, Clarity) added
later needs an explicit consent-based trigger or it will fire without consent.

---

## Development workflow

```bash
npm run dev        # Eleventy watch + local server
npm run build      # Production build to _site/
npm run verify     # Full verification suite (runs in CI, blocks deploy)
npm run check      # build + verify
```

- `main` is production. Pushing to `main` triggers an automated build and deploy.
- Feature work happens on short-lived branches merged into `main`.
- Commits are meaningful and explain *why*. No "wip", "fix", "update".
- **Never commit secrets.** `.env` is gitignored. A build check fails the deploy if anything
  resembling a key appears in output.
- Run `npm run verify` before committing. It encodes real bugs from previous projects:
  wrong `<html lang>`, language switch pointing at the wrong page, charset past 1024 bytes,
  undeclared CMS keys silently dropping structural front matter.

### Never do

- Hardcode GTM/GA4/Usercentrics IDs into source — they come from environment config
- Put API keys in client-side code
- Make consent configuration CMS-editable
- Edit files in `_site/` — it is build output and is regenerated on every build
- Commit `_site/`, `node_modules/`, or `.env`

---

## Rule of last resort

If an instruction conflicts with `docs/DIWEBA_PHASE_0_SPEC.md`, **stop and ask.** Do not
silently change a business decision, a price, a package count, a URL, or a legal claim to
make something work. Flag the conflict and let the owner decide.
