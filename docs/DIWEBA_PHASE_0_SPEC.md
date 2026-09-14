# DIWEBA — Phase 0 Specification

**Status:** Approved and authoritative
**Revision:** 2 (supersedes the initial architecture plan)
**Date:** 2026-09-14

> This document is the authoritative specification for the DIWEBA website.
> Business decisions recorded here must not be silently changed. If implementation
> reveals a genuine conflict, stop and report it rather than adjusting the decision.
> Only the project owner may override this document.

---

## Reconciliation note — read first

The decision to run **GTM + GA4 + Usercentrics** removes the *"ohne Cookie-Banner"* claim,
which the legacy copy deck (`DIWEBA/diweba-copy.js`) carries as one of three hero
statistics, one of five "Warum DIWEBA" pillars, and a dedicated FAQ entry. All three
legacy design directions (A, B, C) render that statistic in the hero.

**Consequence:** the hero stat row, the "Warum" list and the FAQ must be rewritten before
those pages are built, and the privacy differentiator must be restated as *how* tracking is
handled rather than *whether* it exists. Section 8 defines the replacement framing.

---

## 1. Final business assumptions

Only the following company facts are established. Everything else is unknown and must not
be written into any page, schema block, or legal document.

| Fact | Value | Status |
|---|---|---|
| Legal operator | Baki Cirak | Confirmed |
| Address | Brunnenstraße 7B, 76297 Stutensee-Spöck, Germany | Confirmed |
| Brand name | DIWEBA | Confirmed |
| Market | German & European SMB | Confirmed |
| Rechtsform | Not stated | **Required** |
| Contact email | Not stated | **Blocks launch** |
| Telephone | Not stated | Required |
| USt-IdNr. / §19 UStG status | Not stated | **Blocks pricing copy** |
| Delivery time promise | Not restated for the 2-package model | Required |
| Betrieb minimum term | Not stated | Required |

### Hard blocker — Impressum

§5 DDG requires a means of rapid electronic contact, in practice an email address. Without
one, `/impressum/` cannot be completed and the site cannot legally launch. This is the
single highest-priority missing input.

### Pricing display depends on tax status

If DIWEBA operates under §19 UStG (Kleinunternehmer), no VAT is charged and prices must not
be labelled *"zzgl. USt"*. If DIWEBA is VAT-registered, prices shown to business buyers are
normally net and must say so. The two produce mutually exclusive price labels, so this must
be settled before `/pakete-preise/` is written.

### Prohibited content — site-wide, permanent

- No testimonials, reviews, client names, or logos
- No case studies or before/after metrics — specifically, the **Schreinerei Baumann**
  material found in `DIWEBA/diweba-copy.js` and the contract templates is demo data and
  must never appear
- No company history, years of experience, team size, or project counts
- No awards, certifications, partnerships, or memberships
- No ranking, lead-volume, traffic, or AI-citation guarantees
- No placeholder legal text that could be published by accident

---

## 2. Final package model

Exactly two core packages. The previously discovered START / PLUS / KOMPLETT model and its
€69 / €99 / €149 monthly tiers are **withdrawn** and must not appear anywhere.

| Package | One-time | Monthly Betrieb | Scope |
|---|---|---|---|
| **START** | €790 | €39 | Core website package. Fixed scope, fixed price, fast delivery. |
| **PLUS** | €1,490 | €39 | Everything in START, plus analytics / measurement and AI-search optimization capabilities. |

**Do not introduce a third package. Do not modify these prices without explicit instruction.**

### Scope definition still required

The monthly Betrieb is €39 for both packages, so the entire commercial difference sits in
the one-time fee. Before `/pakete-preise/` can be written, these must be defined: page count
per package, number of revision rounds, delivery time in working days, what €39 Betrieb
covers each month, minimum contract term, and the add-on list with prices.

### Add-ons

Modelled as a separate content collection, never as a third package. None confirmed yet;
the collection ships empty and the pricing page renders the add-on block only when entries exist.

### Betrieb vs. Betreuung — distinct services

| Service | What it is | Who acts |
|---|---|---|
| CMS self-editing | Included capability — owner edits their own content | The client |
| **Betrieb** (€39/mo) | Hosting, updates, technical operation, availability | DIWEBA, automated + monitored |
| **Content-Betreuung** | Optional paid service — DIWEBA writes and maintains content | DIWEBA, billable |

The CMS does not cannibalise Betreuung: self-editing covers routine text changes, while
Betreuung sells the work of deciding *what* to publish.

---

## 3. Final information architecture — DE + EN

Eleven indexable pages per language, plus a non-indexed thank-you route and a 404.
No doorway pages, no city pages, no near-duplicates.

| German (primary) | English | Purpose | Index |
|---|---|---|---|
| `/` | `/en/` | Value proposition, packages, process summary | Yes |
| `/website-erstellen-lassen/` | `/en/website-development/` | Primary commercial intent | Yes |
| `/pakete-preise/` | `/en/pricing/` | Full pricing, scope, exclusions | Yes |
| `/ablauf/` | `/en/process/` | Delivery process, client responsibilities | Yes |
| `/webdesign-kleine-unternehmen/` | `/en/small-business-web-design/` | Audience page | Yes |
| `/ki-suche-optimierung/` | `/en/ai-search-optimization/` | What DIWEBA does and cannot guarantee | Yes |
| `/ueber-uns/` | `/en/about/` | Real company facts only | Yes |
| `/faq/` | `/en/faq/` | Real buyer objections | Yes |
| `/kontakt/` | `/en/contact/` | Form + direct contact | Yes |
| `/impressum/` | `/en/imprint/` | Legal — German version authoritative | Yes |
| `/datenschutz/` | `/en/privacy/` | Legal — German version authoritative | Yes |
| `/kontakt/danke/` | `/en/contact/thank-you/` | Conversion confirmation | **noindex** |
| `/404` | (bilingual) | Correct 404 status | noindex |
| `/admin/` | — | CMS — noindex, robots-disallowed, absent from sitemap | noindex |

### Deliberately deferred

`/wissen/` (knowledge/blog) is defined in the content model but not enabled at launch — an
abandoned blog is a negative quality signal. `/rechtssicher/` from the original brief is
dropped entirely: it is the highest-legal-risk page on the site, and its substance is better
distributed across `/ki-suche-optimierung/`, `/faq/` and `/datenschutz/` where each claim
sits next to its own qualification.

### Navigation

Header: Pakete & Preise · Ablauf · KI-Suche · Über DIWEBA · Kontakt (CTA). Footer carries
the full set plus legal links and the language switch. Every item is a real crawlable
`<a href>` — never a JavaScript handler.

**Language switching is page-level, not site-level.** The switch on `/pakete-preise/` must
land on `/en/pricing/`, never on `/en/`. This is resolved from the route registry, not by
string manipulation.

---

## 4. Final URL strategy

**German at root, English under `/en/`, with genuinely translated slugs.**

### Why this over a symmetric `/de/` + `/en/` split

- German is the primary market — it gets the shortest URLs and no redirect hop on entry
- Translated English slugs (`/en/pricing/`, not `/en/pakete-preise/`) read naturally in
  English SERPs and carry the right terms
- Trade-off accepted: asymmetry, and adding a third language later means deciding whether
  it is prefixed. Acceptable, since no third language is planned

### Rules

- Lowercase, hyphen-separated, no umlauts in slugs (`ueber-uns`, not `über-uns`)
- **Trailing slash on every route**, enforced by a single redirect rule
- Self-referencing canonical on every page, absolute, always `https://diweba.de`
- No query parameters in canonicals; no date segments; no IDs
- URLs are permanent from launch

### hreflang

Every indexable page emits a reciprocal set — `de`, `en`, and `x-default` pointing at the
German version, since German is the primary market and there is no language-selector page.
Reciprocity is non-negotiable and is verified by an automated build check.

---

## 5. Final CMS recommendation

**Sveltia CMS** — git-based, editing at `/admin/`, writing commits to the repository, which
triggers a rebuild and deploy.

| Option | Verdict | Reasoning |
|---|---|---|
| **Sveltia CMS** | **Chosen** | Native i18n; content versioned in git; no database; no recurring licence cost; proven in this organisation with existing verification tooling |
| Decap CMS | Rejected | Unpatched XSS reported Sept 2025, unresponsive maintainers. Sveltia reads the same config format, so this is a drop-in swap either direction |
| Contentful / Sanity / Storyblok | Rejected | Monthly cost against a €39/mo Betrieb margin; adds another external processor to document under GDPR; over-engineered for eleven pages |
| TinaCMS | Rejected | Better editing UX, but heavier and its cloud tier reintroduces recurring cost |

Content stays in GitHub rather than adding a US SaaS processor — defensible for a business
positioning on privacy, and one fewer entry in the Verzeichnis von Verarbeitungstätigkeiten.

### Non-negotiable CMS rule

A git-based CMS **silently drops front-matter keys that are not declared in its config on
save**. If `canonical`, `routeKey`, the JSON-LD block or the language-switch target are
undeclared, the first content edit destroys them with no error. Every key must be
declared — editable fields as typed widgets, structural fields as `hidden`. An automated
config-vs-content cross-check runs in CI and fails the build on any undeclared key.

### Known limitation

Sveltia authenticates via GitHub, so each editor needs a GitHub account. Fine for a single
owner-operator. It becomes real friction when reselling to non-technical clients — see §17.

---

## 6. Final content model

Content is modelled as typed fields, never a single rich-text blob — so pricing, FAQs and
packages can be rendered into both pages and structured data from one source.

| Collection | Fields | i18n | Launch |
|---|---|---|---|
| **Site settings** | Brand name, nav labels, footer, legal-entity block, contact details, social profiles | DE/EN | Active |
| **Pages** | H1, intro, body sections (repeatable heading + rich text), SEO title, meta description, OG image, routeKey *(hidden)*, noindex flag | DE/EN | Active |
| **Packages** | Name, one-time price, monthly price, currency, summary, feature list, order | DE/EN | Active — 2 entries |
| **Add-ons** | Name, price, description | DE/EN | Active — empty |
| **FAQs** | Question, answer, category, order, show-on-page | DE/EN | Active |
| **Process steps** | Step title, description, client responsibility, order | DE/EN | Active |
| **Case studies** | Client, summary, verified_by_client, metrics, consent_on_file | DE/EN | **Empty** |
| **Knowledge / blog** | Title, slug, date, body, SEO fields | DE/EN | Defined, disabled |

### Proof slot — fails safe

The case-studies collection ships empty. The template renders **nothing at all** when it is
empty — no heading, no skeleton, no "coming soon", and no placeholder in the DOM for a
crawler or AI system to misread. An entry only renders when `verified_by_client` is true
**and** `consent_on_file` is true, so publishing unverified proof requires two deliberate acts.

Prices live in the Packages collection as separate numeric fields, never as formatted strings
inside prose. One source feeds the pricing table, the package cards, and the `Offer` schema.

---

## 7. Final technical architecture

| Layer | Choice | Role |
|---|---|---|
| Build | Eleventy 3.x (ESM) | Static generation to crawlable HTML |
| Templates | Nunjucks | Layouts, partials, i18n rendering |
| Typed code | TypeScript | Worker source and build/verification tooling — not templates |
| Hosting | Cloudflare Workers + Static Assets | Edge delivery, security headers, redirects |
| Server logic | Cloudflare Worker | Form endpoint, rate limiting, redirect rules |
| Rate-limit store | Cloudflare KV | Per-IP submission throttle |
| Bot defence | Cloudflare Turnstile | Server-verified token on form submit |
| Email | Brevo | Transactional notification + confirmation |
| Consent | Usercentrics | CMP, loaded before GTM |
| Analytics | GTM + GA4 | Consent-gated |
| CMS | Sveltia | Git-based editing at `/admin/` |

### TypeScript scope

TypeScript is used where types prevent real bugs: the Worker (request/response handling,
Brevo and Turnstile payloads, environment bindings) and build-verification scripts. Templates
stay Nunjucks — adding a typed component layer would buy nothing here and would push
rendering toward the client, which the brief forbids.

### Alternative considered — Astro

Astro is genuinely competitive and would be the pick for a greenfield team. It is not chosen
because this project needs no interactivity, and the existing Eleventy verification tooling
transfers directly and has already caught real regressions in production. **Next.js is
rejected outright:** heavier, needs deliberate configuration to avoid client-rendered
content, and there is no SSR requirement.

---

## 8. Final consent & analytics architecture

Google Ads in the EEA requires Consent Mode v2, so this is a prerequisite for the acquisition
plan, not an optional compliance layer.

### Load order — exact, and not to be altered

| # | What | Why this position |
|---|---|---|
| 1 | `<meta charset="utf-8">` | Must fall inside the first 1024 bytes or the browser guesses the encoding and may re-parse |
| 2 | Consent Mode v2 defaults | All categories `denied` except `security_storage`, plus `ads_data_redaction` and `wait_for_update`. Must be recorded before any Google tag reads the dataLayer |
| 3 | Usercentrics loader | Must initialise before GTM so a returning visitor's stored decision is applied rather than raced |
| 4 | GTM container | Last. GTM is itself a Google tag — it begins evaluating triggers the moment it loads |

### Consent Mode gates Google tags only

Consent Mode v2 governs Google tags. It does **not** gate non-Google scripts — Meta Pixel,
LinkedIn Insight, Microsoft Clarity and similar will fire regardless of consent state unless
each is given an explicit consent-based trigger in GTM or is blocked by Usercentrics directly.
Any non-Google tag added later must be gated explicitly and re-verified on a fresh visit.

### Verification — measured, not assumed

- On a **fresh** visit with no stored decision: no GA4 network request, no cookies beyond
  strictly necessary, no writes to `localStorage` by measurement scripts
- After accepting: GA4 fires; consent state shows `update`, not only `default`
- After rejecting: GA4 remains suppressed; the decision survives reload
- Verified in a real browser on the production domain, not inferred from configuration

### Replacement positioning for the withdrawn "no cookie banner" claim

- Only analytics that serve a stated purpose — no advertising or social trackers by default
- Nothing non-essential loads before a decision is made, and that is verifiable
- The consent banner is answerable in one click, in German, without dark patterns
- Every tool in use is named in the privacy policy

### Legal review required

All privacy and consent copy must be reviewed by a qualified lawyer before launch. This
specification describes technical behaviour only and makes no assertion that any
configuration is legally compliant.

### Performance reality

Usercentrics will be the single heaviest thing on the site — on a comparable property it
accounted for roughly 144 KB and a measurable forced reflow, with a multi-request
initialisation chain. A "Good" Core Web Vitals result is achievable alongside it, but it
takes deliberate work and the CMP must never become the LCP element.

---

## 9. Final form & lead-generation architecture

One inquiry form, posting to a Cloudflare Worker. Client-side validation is a convenience
only; the Worker re-validates everything and is the sole authority.

### Flow

1. Visitor submits — name, company, email, phone (optional), package interest, message, hidden honeypot
2. Turnstile widget produces a token client-side
3. Worker verifies the token server-side against the Turnstile API using the secret key
4. Worker re-validates every field: required, types, lengths, email shape
5. Worker checks the KV rate limit per IP and rejects abuse
6. Brevo sends a notification to DIWEBA and a confirmation to the sender
7. Redirect to `/kontakt/danke/` (or `/en/contact/thank-you/`), which fires the GA4 conversion event

### Rules

- The Brevo API key and Turnstile secret exist **only** as Worker secrets — never in client
  code, never in the repository, never in the CMS
- The form works without JavaScript for submission; only Turnstile requires JS, and its
  failure state is explained rather than silent
- Errors are announced to assistive technology and name the field and the fix
- Thank-you pages are `noindex` and excluded from the sitemap, but return HTTP 200
- Submitted data is personal data: the privacy policy must state what is collected, why,
  the legal basis, and the retention period

### Email deliverability

Brevo requires sender-domain authentication on `diweba.de`: SPF, DKIM and a DMARC record.
DNS propagation and Brevo verification take time — start at the beginning of Phase 1.

---

## 10. Final SEO architecture

| Element | Rule |
|---|---|
| Title | Unique per page per language, ≤60 characters, primary term first, brand last |
| Meta description | Unique, written as SERP sales copy, ~150–160 characters |
| H1 | Exactly one per page, matching search intent, never the brand name alone |
| Headings | Logical order, no level skipped, used for structure not styling |
| Canonical | Self-referencing, absolute, on every indexable page |
| hreflang | Reciprocal de / en / x-default, build-verified |
| Sitemap | Canonical indexable URLs only — excludes `/admin/`, thank-you pages, 404 |
| robots.txt | Allows Googlebot, Bingbot, OAI-SearchBot. Disallows `/admin/`. Links the sitemap |
| HTTPS | Enforced from day one, HTTP→HTTPS redirect verified live before launch |
| Internal links | Descriptive anchors; every page links to pricing and contact from body copy |
| Images | Explicit width/height matching intrinsic dimensions, real alt text, modern formats |
| 404 | Returns a genuine 404 status, not 200 with an error page |

### Learned failure modes — checked automatically

Three bugs from a comparable build are covered by build-time checks: a page shipping the
wrong `<html lang>`; a language switcher pointing at a section index instead of the sibling
page; and charset appearing beyond the 1024-byte window.

---

## 11. Final GEO / AI-search architecture

There is no separate AI-SEO mechanism. Google states that standard SEO practice applies to
AI Overviews and AI Mode with no additional technical requirements. The work is to be
*quotable*: unambiguous facts in crawlable prose.

### What earns citation

- **Prices as text** — €790 and €1,490 in the HTML, never only inside an image or widget
- **Explicit exclusions** — a published "not included" list is rare and highly quotable
- **Direct answers first** — the sentence under each heading answers the heading
- **Stated limits** — saying plainly what cannot be guaranteed is quoted accurately
- **Consistent entity facts** across the site, structured data and any external profile
- **Self-contained pages** that answer without requiring another click

### Claims permitted and forbidden

| Permitted | Forbidden |
|---|---|
| "Built so search engines and AI systems can read and understand your content." | "Guaranteed visibility in ChatGPT / AI Overviews." |
| "We implement the technical foundations that make a site eligible to be found." | "We get you to page one." |
| "No one can guarantee inclusion in a specific AI answer." | Any promised lead count or traffic figure. |

### Measurement loop

Google Search Console and Bing Webmaster Tools (including AI Performance) from launch. A
fixed German prompt set — discovery, comparison, local, price, problem, brand — run monthly,
recording whether DIWEBA is *mentioned, cited, recommended, misrepresented or absent*, and
which third-party domains appear instead. Presence, readiness and business impact tracked
separately rather than collapsed into a single score.

### llms.txt (added Phase 2.5) — optional, explicitly not an SEO requirement

`/llms.txt` (`src/llms.njk`) is a curated, machine-readable summary of DIWEBA: identity,
founder, packages and current pricing, scope boundaries, and links to every public page in
both languages. It is generated from the same registries as everything else — `routes.js`
for URLs, `packages.js` for pricing, `company.js` for identity — so it cannot drift from the
sitemap or the nav the way a hand-maintained duplicate would.

**Status, stated precisely because it is easy to overclaim:**

- Google Search does not require llms.txt.
- Google has said it has no positive or negative effect on Google Search visibility or
  rankings — it is not part of the ranking system in any documented way.
- It is maintained regardless, because other AI/agent tooling may consume it, and because a
  registry-generated file costs nothing to keep in sync.

No public page, and no future documentation, should describe llms.txt as required for SEO,
required for AI Overviews or AI Mode, a ranking factor, or a guarantee of inclusion in any
AI system's output. The core SEO foundation this document defines elsewhere — crawlability,
semantic HTML, real internal linking, accurate structured data (§10-§12) — is what does the
actual work; llms.txt is a convenience layer next to it, not a substitute for it.

---

## 12. Final structured-data strategy

JSON-LD only. Every property must correspond to a fact visible on the same page. Emitted per
language, with matching `inLanguage`.

| Type | Where | Notes |
|---|---|---|
| `Organization` | Home, About | Name, address, logo, URL. `ContactPoint` and `sameAs` added only once real details exist |
| `WebSite` | Home | Site identity |
| `WebPage` | All pages | With `inLanguage` |
| `Service` + `Offer` | Pricing, service pages | Real prices in EUR from the Packages collection. The recurring €39 modelled as a priced component with its billing period |
| `BreadcrumbList` | All non-home | Matching visible breadcrumbs |
| `FAQPage` | `/faq/` only | Real questions only |
| `ContactPoint` | Contact | **Blocked** until contact details exist |
| `LocalBusiness` | — | **Excluded** pending a decision on publishing the private address |
| `Review` / `AggregateRating` | — | **Permanently excluded** — no real reviews exist |

### Honest expectation on FAQ markup

Since Google's August 2023 change, FAQ rich results display only for authoritative government
and health sites. `FAQPage` markup is included for semantic clarity and machine readability,
**not** because it will produce rich snippets. It must not be sold to clients as one.

### Address publication decision

Brunnenstraße 7B is a private residential address. It must appear in the Impressum by law,
but whether it also appears in `Organization` schema, the footer and Google Business Profile
is a separate choice with real privacy consequences.

---

## 13. Final performance & accessibility requirements

| Metric | Target | Hard fail |
|---|---|---|
| LCP (mobile) | < 2.0 s | > 2.5 s |
| CLS | < 0.05 | > 0.1 |
| INP | < 200 ms | > 500 ms |
| Lighthouse Performance (mobile) | ≥ 90 | < 80 |
| Lighthouse Accessibility | 100 | < 95 |

### Performance rules

- Self-hosted fonts, subset, preloaded — no Google Fonts (a request to Google's font servers
  transmits visitor IPs, which is both a latency and a German privacy issue)
- No render-blocking third-party resources; the CMP is the only heavy dependency
- Explicit dimensions on every image; modern formats with correct fallback ordering
- Long-cache immutable static assets
- Performance budget enforced in CI

### Accessibility — functional requirement, WCAG 2.2 AA

- Semantic landmarks, correct heading order, skip-to-content link
- Fully keyboard operable, including the consent banner and language switch
- Visible focus indicators — never `outline: none` without a replacement
- Contrast ≥ 4.5:1 body text, 3:1 large text and UI boundaries
- Touch targets ≥ 44×44 px; body text ≥ 16 px on mobile
- Form errors programmatically associated and announced
- `prefers-reduced-motion` respected
- Correct `lang` on `<html>` and on inline foreign-language passages

---

## 14. Security, secrets & environment variables

| Value | Where it lives | Secret |
|---|---|---|
| `BREVO_API_KEY` | Worker secret | Yes |
| `TURNSTILE_SECRET_KEY` | Worker secret | Yes |
| `CLOUDFLARE_API_TOKEN` | GitHub Actions secret | Yes |
| `TURNSTILE_SITE_KEY` | Build-time config | No — public by design |
| `GTM_CONTAINER_ID` | Build-time config | No — public by design |
| `GA4_MEASUREMENT_ID` | Build-time config | No — public by design |
| `USERCENTRICS_SETTINGS_ID` | Build-time config | No — public by design |

- Secrets set via `wrangler secret put` — never committed, never in `wrangler.jsonc`, never in the CMS
- `.env` gitignored before the first commit, not after
- A build-time scan fails the deploy if anything resembling a key appears in output
- Consent configuration is never CMS-editable
- Security headers at the edge: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`;
  CSP evaluated against GTM/Usercentrics requirements before being enforced
- The Cloudflare API token includes zone-settings write so HTTPS enforcement can be configured

---

## 15. Environments

| Environment | Runs on | Indexable | Analytics |
|---|---|---|---|
| Local | `eleventy --serve` + `wrangler dev` | n/a | Disabled |
| Preview | Cloudflare preview deployment / staging subdomain | **No** — noindex + robots disallow + Cloudflare Access | Disabled or separate property |
| Production | `diweba.de` | Yes | Live |

### Two environment traps

**Usercentrics will not initialise on localhost** — the CMP validates the requesting domain
against an allow-list and throws `CMP_NOT_ALLOWED` otherwise. Consent behaviour cannot be
verified locally and must be tested on an allow-listed preview domain.

**An indexable staging site is an SEO incident.** Preview must be blocked by all three of
noindex, robots disallow, and access control — any one alone has failed before.

### Local tooling note

Stopping a preview server does not reliably terminate `eleventy --serve` or `wrangler dev` on
Windows. Orphaned watchers keep regenerating output in dev mode and lock the output folder.

---

## 16. Git & deployment strategy

- Private GitHub repository, owned by an account that survives any change of developer
- `main` is production; short-lived branches for feature work
- **GitHub Actions deploys automatically on push to `main`**
- Pipeline: install → build → full verification suite → deploy. A failing check blocks the deploy

### Why automated deployment is mandatory

The CMS commits directly to `main`. With manual deployment, the owner would save a change in
Sveltia and nothing would appear until a developer ran a command — which defeats the purpose
of having a CMS. Automated deploy on push is a hard requirement of the CMS decision.

### Verification suite — runs in CI, blocks merge

- Every page produced; no structurally empty pages
- Every CMS field declared in config (prevents silent key loss on save)
- hreflang reciprocity and correct `<html lang>` per page
- Language-switch target resolves to the correct sibling page
- Canonical present and self-referencing; charset within 1024 bytes
- No secrets in build output; no draft pages
- Redirect rules fire correctly and no real page path matches a redirect
- Performance budget and accessibility checks

---

## 17. Future extensibility — reusable client websites

DIWEBA sells this exact build. Treating diweba.de as the reference implementation of the
product is what makes a fixed price and a short delivery window realistic.

### Built for reuse from day one

- All visual decisions as CSS custom properties in one token file — a re-skin changes tokens, not components
- Content model field names are generic (`packages`, `faqs`), never DIWEBA-specific
- Per-client configuration isolated to one file: brand, legal entity, GTM ID, GA4 ID,
  Usercentrics ID, Turnstile key, domain
- Components make no assumption about how many packages or pages exist
- Legal pages are structurally templated but their *content* always comes from the client's
  own lawyer — never copied between clients

### Per-client provisioning

Repository from template → swap tokens and content → new Cloudflare Worker and domain →
client's own GTM, GA4, Usercentrics and Turnstile credentials → client's Brevo sender domain → deploy.

### Two unresolved resale questions

**Editor accounts:** Sveltia requires a GitHub account per editor. Acceptable for DIWEBA's own
site; likely unacceptable for a Schreinerei. Either DIWEBA edits on the client's behalf as
Betreuung, or an alternative CMS is evaluated for resale specifically.

**Per-site running cost:** Usercentrics, Brevo and any paid Cloudflare features must be priced
per client site and checked against the €39/mo Betrieb.

---

## 18. Risks & unresolved items

| Risk | Impact | Mitigation |
|---|---|---|
| No contact email | **Blocks launch** | Cannot complete Impressum. Required before Phase 2 |
| Tax status unknown | **Blocks pricing** | Determines the price label |
| Package scope undefined | **Blocks pricing** | "Fixed scope" cannot be claimed without a published scope |
| Copy built on withdrawn claim | **Blocks build** | Hero stats, "Warum" list and FAQ need rewriting |
| Legal review pending | **Blocks launch** | Privacy, consent and Impressum copy all require a lawyer |
| CMP performance cost | Medium | Budget for it; keep the CMP off the LCP path |
| Usercentrics cost per site | Medium | Confirm tier and per-domain pricing against €39 Betrieb |
| No proof content | Medium | Compensate with specificity: exact prices, scope, exclusions, process |
| DE/EN doubles content work | Medium | English is a real translation, never machine filler |
| Private address publication | Medium | Required in Impressum; decide separately on schema, footer, GBP |
| Design direction unchosen | Low | A, B and C share one content model; all three need their case-study section removed |
| Domain at IONOS | Low | Registrar access needed to move DNS to Cloudflare |

---

## 19. Implementation phases

| Phase | Scope |
|---|---|
| **P0** | Unblock — client-side inputs. Contact email, tax status, package scope, design direction, account access, legal review engaged |
| **P1** | Foundation — repo, Eleventy scaffold, Worker project, design tokens, i18n routing, CI, verification suite, Brevo domain auth started, DNS to Cloudflare with HTTPS |
| **P2** | CMS & content model — Sveltia at `/admin/`, collections, i18n, every key declared, config check in CI |
| **P3** | Pages — all eleven page types in both languages, driven by CMS content, rewritten copy |
| **P4** | SEO & structured data |
| **P5** | Forms & email — Worker endpoint, Turnstile, KV rate limiting, Brevo, thank-you pages |
| **P6** | Consent & analytics — Consent Mode v2, Usercentrics, GTM, GA4, verified on preview domain |
| **P7** | QA & launch |
| **P8** | Post-launch measurement |

---

## 20. Definition of Done — first production release

Verified on the production domain, in a real browser, before the release is complete.

- [ ] Every page returns 200; 404 returns a genuine 404; HTTP redirects to HTTPS
- [ ] Unique title, meta description and single H1 on all 22 indexable pages (11 × 2 languages)
- [ ] Canonical self-referencing everywhere; charset within the first 1024 bytes
- [ ] hreflang reciprocal across every DE/EN pair; `x-default` resolves; `<html lang>` correct per page
- [ ] Language switch lands on the matching sibling page from every page, both directions
- [ ] Sitemap lists only canonical indexable URLs; `/admin/`, thank-you pages and 404 excluded
- [ ] robots.txt verified allowing Googlebot, Bingbot and OAI-SearchBot; disallowing `/admin/`
- [ ] No page carries an unintended `noindex`; preview environment is not indexable
- [ ] Structured data validates; no `Review`, `AggregateRating`, or unverified `LocalBusiness`
- [ ] Case-study section renders nothing — confirmed absent from the DOM, not merely hidden
- [ ] No fabricated proof, history, credentials or guarantees anywhere in either language
- [ ] Impressum and Datenschutz contain lawyer-approved content — no placeholder text
- [ ] Fresh visit: no GA4 request, no non-essential cookies, no measurement writes to storage
- [ ] After accept: GA4 fires. After reject: it stays suppressed, and the decision survives reload
- [ ] Form submits end-to-end to a real inbox; Turnstile verified server-side; rate limit enforced
- [ ] Invalid submissions rejected server-side with accessible, specific errors
- [ ] Conversion event fires on both thank-you pages and is visible in GA4
- [ ] No secrets in build output, repository, or client-side code
- [ ] Core Web Vitals "Good" on mobile; Lighthouse Performance ≥ 90, Accessibility 100
- [ ] Keyboard-only pass across every page including consent banner and language switch
- [ ] German reviewed by a native-level editor; English reads as written, not translated
- [ ] Owner has edited one page through the CMS, saved, and seen it deploy automatically
- [ ] Search Console and Bing Webmaster verified; sitemap submitted
- [ ] CI pipeline green, with every verification check enabled and blocking

---

## Decisions still required (as of Rev. 2)

1. **Contact email address** — blocks the Impressum and therefore launch
2. **Tax status** (§19 UStG or VAT-registered) — determines the price label
3. **Package scope** — pages, revisions, delivery time, Betrieb inclusions, minimum term
4. **Replacement positioning** for the withdrawn no-cookie-banner claim
5. **Rechtsform** — feeds Impressum and `Organization` schema
6. **Address publication** beyond the Impressum — schema, footer, Google Business Profile
7. **Design direction** — A, B or C
8. **Telephone number** — affects `ContactPoint` and Google Business Profile
9. **Add-on list and prices** — or confirmation that launch ships without add-ons
10. **Account access** — IONOS registrar, Usercentrics, GA4/GTM, Brevo, Cloudflare
11. **Lawyer engaged** for Impressum, Datenschutz and all consent copy
