# DIWEBA — SEO & AI Search (GEO) Research Brief

## Executive recommendation

Do not build DIWEBA's website by simply telling Claude Code to “make it SEO/GEO optimized” or by feeding it a pile of influencer articles.

Use a source hierarchy:

1. **Primary platform documentation** — Google Search Central, Bing Webmaster, OpenAI publisher/crawler documentation. These define what the systems explicitly support today.
2. **Current specialist analysis** — Aleyda Solís is particularly useful for the AI-search measurement/workflow layer because her 2026 work focuses on AI citations, prompts, source ecosystems and business impact.
3. **Practitioner content** — Brian Dean / Backlinko and similar sources can be used for explanations, examples and conventional SEO tactics, but should not override current platform documentation.
4. **DIWEBA-specific implementation brief** — the website requirements, information architecture, templates, metadata, structured data, crawlability, content rules, measurement plan and launch checklist should be handed to Claude Code as the actual specification.

Google explicitly states that the SEO best practices for classic Search remain relevant to AI Overviews and AI Mode, with no extra technical requirements for inclusion. Pages still need to be indexable and eligible for normal Google Search. [Google Search Central — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)

Bing now provides an **AI Performance** report in Webmaster Tools, measuring which URLs are cited in AI-generated answers across Microsoft Copilot, Bing AI summaries and selected partner experiences. [Bing Webmaster Tools — AI Performance](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c)

OpenAI currently says public websites can appear in ChatGPT Search and recommends not blocking **OAI-SearchBot** if a site wants its content to be discoverable and cited. [OpenAI Publisher FAQ](https://help.openai.com/en/articles/12627856)

## What this means for DIWEBA

DIWEBA's strongest positioning should not be “we know a secret GEO trick.” The defensible promise is:

> **Technically discoverable, clearly structured, useful, trustworthy content that can be understood and cited by modern search systems — including Google Search, AI Overviews/AI Mode, Bing/Copilot and ChatGPT Search — without pretending that any agency can guarantee AI citations or rankings.**

That positioning matches the current evidence and DIWEBA's stated preference for honest claims.

## Priority 1 — Technical search foundation

Claude Code should implement and validate:

- server-rendered or statically accessible HTML for important content; do not hide core business information behind client-only interactions;
- unique, descriptive `<title>` for every indexable page;
- useful meta descriptions for every important page;
- one clear primary H1 and logically ordered headings;
- semantic HTML and crawlable internal links;
- stable, human-readable URLs;
- canonical URLs;
- XML sitemap containing canonical URLs that should appear in Search;
- correctly configured `robots.txt` that does not block Googlebot, Bingbot or OAI-SearchBot from important pages;
- HTTPS;
- mobile-first responsive rendering;
- strong Core Web Vitals / page experience;
- valid status codes, redirects and 404/410 handling;
- no accidental `noindex`, `nosnippet`, X-Robots-Tag or authentication barriers on public marketing pages;
- image dimensions, compression, useful alt text and sensible lazy-loading;
- favicon and site identity signals;
- Open Graph / social metadata;
- language and locale declarations; German is the primary market, with proper hreflang only when real alternate-language pages exist.

Google's crawling documentation covers robots.txt, canonicalization, mobile, JavaScript rendering, metadata, crawlable links and related fundamentals. [Google Search Central — Crawling and Indexing](https://developers.google.com/search/docs/crawling-indexing)

Google also recommends concise, descriptive title elements and makes clear that Google may generate title links from multiple on-page and off-page signals. [Google Search Central — Title links](https://developers.google.com/search/docs/appearance/title-link)

Google primarily generates snippets from page content and may use the meta description when it better describes the page, so DIWEBA should not treat the meta description as a magic ranking field. [Google Search Central — Snippets](https://developers.google.com/search/docs/appearance/snippet)

Google's page-experience guidance includes Core Web Vitals, HTTPS and mobile usability, while stressing that no single page-experience factor guarantees high rankings. [Google Search Central — Page Experience](https://developers.google.com/search/docs/appearance/page-experience)

## Priority 2 — Entity clarity and structured data

DIWEBA should publish a coherent machine-readable business identity rather than scattered facts.

Recommended baseline:

- `Organization` structured data on the main corporate identity surface;
- `WebSite` structured data where appropriate for site identity;
- `WebPage` / relevant page-type markup where useful;
- `Service` markup only when the data is accurate and useful;
- `LocalBusiness` only if DIWEBA meets the conditions for a genuine local business representation and the address/service-area data is real;
- consistent NAP/contact data across the site and external profiles;
- `sameAs` links for real official profiles only;
- logo, legal company name, URL, phone/email, address where applicable;
- organization/service relationships that match visible page content.

Google recommends providing organization information such as name, online presence and applicable address/telephone details, and recommends more specific `LocalBusiness` subtypes for applicable local businesses. [Google Search Central — Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)

Google explains that structured data can help it understand page meaning and may enable search enhancements; it recommends JSON-LD in most cases and emphasizes complete, accurate data over stuffing every possible property. [Google Search Central — Structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

Important: structured data is not a “GEO switch.” It is an explicit semantic signal and should describe facts that are actually visible on the page.

## Priority 3 — Information architecture for DIWEBA

Do not make the homepage carry every search intent.

A strong launch architecture is likely:

- `/` — core value proposition and commercial overview
- `/leistungen/` or `/service/` — service overview
- `/website-erstellen-lassen/` — high-intent website service page
- `/webdesign-fuer-kleine-unternehmen/` — audience/use-case page
- `/seo-website/` or equivalent — search-friendly website construction proposition
- `/ai-search-optimization/` or `/ki-suche-optimierung/` — explain what DIWEBA actually does and what it cannot guarantee
- `/preise/` — START / PLUS and add-ons, with crawlable text, not price only inside graphics
- `/ablauf/` — 10–15 working days, process and client responsibilities
- `/rechtssicher/` — legal/compliance positioning, carefully worded and legally reviewed
- `/ueber-uns/` — real company information; no invented history/testimonials
- `/faq/` — question-and-answer content based on actual buyer concerns
- `/kontakt/`
- `/ressourcen/` or `/wissen/` later, only when DIWEBA can consistently create genuinely useful content
- `/impressum/`
- `/datenschutz/`

Use German search language naturally in copy. Avoid generating dozens of near-duplicate city pages or keyword-swapped pages without a real local/customer value proposition.

## Priority 4 — AI-search / GEO content model

Aleyda Solís's current work is especially relevant here. Her 2026 framework focuses on identifying important AI-search journeys, understanding which owned and third-party sources shape answers, measuring where a brand is cited/recommended/missing, and validating business impact instead of treating AI visibility as a vague concept.

Key sources:

- Aleyda Solís — [AI Search Optimization Checklist, updated May 2026](https://www.aleydasolis.com/en/ai-search/ai-search-optimization-checklist/)
- Aleyda Solís — [3-layer framework for AI-search presence, readiness and business impact, August 2026](https://www.aleydasolis.com/en/ai-search/a-3-layer-framework-to-measure-ai-presence-readiness-and-business-impact-redefining-metrics-for-the-ai-search-era/)
- Aleyda Solís — [AI-search prompt library, June 2026](https://www.aleydasolis.com/en/ai-search/ai-search-prompt-library/)
- Aleyda Solís — [Content prioritization in the AI-search era, August 2026](https://www.aleydasolis.com/en/ai-search/content-prioritization-ai-search/)
- Aleyda Solís — [Global AI-search strategy and market patterns, April 2026](https://www.aleydasolis.com/en/ai-search/global-ai-search-strategy/)

For DIWEBA, the useful GEO characteristics are:

- answer the actual buyer question directly;
- make important facts explicit in prose, not only in decorative UI;
- provide specific prices, scope, exclusions and process details that AI systems can quote accurately;
- explain comparisons in a structured, factual way;
- define industry terminology when it helps the customer;
- include concise Q&A sections tied to real objections;
- show evidence and sources for factual/legal claims;
- maintain consistent company identity across first-party and reputable third-party sources;
- create pages that are useful even if the reader never clicks another result;
- earn external mentions through real business activity, partnerships, directories and citations rather than artificial link schemes.

Do NOT fill pages with awkward “AI-readable” prose, hidden text, keyword lists, prompt-shaped text, or fake FAQ spam.

## Priority 5 — AI crawler access

At minimum, verify that the production site's robots policy allows the relevant AI/search crawlers for the intended business goal.

OpenAI currently says:

- public websites can appear in ChatGPT Search;
- OAI-SearchBot should not be blocked if you want content available for ChatGPT summaries/snippets/citations;
- crawler access can be controlled through robots.txt.

Source: [OpenAI — Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856)

Also verify Google and Bing crawler access after deployment. Do not block all bots in an attempt to “protect SEO.”

## Priority 6 — Measurement from day one

The PLUS package's “AI-search optimization” should be operational, not a marketing label.

Build a repeatable measurement system around:

### Search
- Google Search Console property;
- indexing coverage / URL inspection;
- impressions, clicks, CTR and average position by page/query;
- branded vs non-branded demand;
- conversion events from organic traffic.

### AI search
- a fixed representative prompt set in German, e.g. discovery, comparison, local/service, price, problem/solution and brand prompts;
- record whether DIWEBA is mentioned, cited, recommended, misrepresented or absent;
- record which third-party domains appear in answers;
- repeat prompts periodically rather than judging a single answer;
- track Bing Webmaster Tools AI Performance where available;
- measure actual referral traffic from AI sources separately from citation presence.

Bing's AI Performance report explicitly exposes cited pages and grounding queries, making it unusually useful for the PLUS package. [Bing Webmaster Tools — AI Performance](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c)

Aleyda Solís's measurement framework is useful for separating **presence/readiness/business impact** rather than collapsing everything into one “GEO score.”

## Priority 7 — Launch/indexation checklist

Before launch:

- production domain on HTTPS;
- canonical URLs correct;
- sitemap generated and reachable;
- robots.txt reviewed manually;
- Googlebot/Bingbot/OAI-SearchBot access tested;
- no accidental noindex;
- titles/descriptions present on all indexable pages;
- one clear H1 on each important page;
- internal links form a coherent crawl path;
- structured data passes validation;
- company identity facts are consistent;
- German spelling/grammar reviewed by a native-level editor;
- contact and legal pages linked appropriately;
- analytics only enabled in a legally appropriate way;
- cookie/storage behavior tested, not merely assumed;
- mobile and performance checks completed;
- Open Graph / favicon present;
- Search Console and Bing Webmaster Tools configured;
- sitemap submitted;
- key URLs inspected and indexing requested where appropriate.

Google says newly published sites can take time to be discovered, and Search Console's URL Inspection tool can test indexability and request indexing; for multiple pages, Google recommends the sitemap route. [Google — Get your website on Google](https://developers.google.com/search/docs/fundamentals/get-on-google) [Search Console — URL Inspection](https://support.google.com/webmasters/answer/9012289)

## Legal positioning note for the “no cookie banner” claim

This should be treated as a compliance implementation claim, not a blanket statement that German websites “do not need cookie banners.” Whether a consent mechanism is required depends on the technologies, storage/access operations, processing purposes and legal basis in the concrete implementation.

Therefore the website copy should say something narrower, such as that DIWEBA uses a privacy-conscious technical setup and does not add non-essential tracking by default, rather than promising “GDPR compliant” without a legal review.

Analytics should be implemented only after the specific tool configuration and legal basis have been checked for the intended German/EU deployment.

## What Claude Code should NOT be told

Avoid instructions such as:

- “Add GEO hacks.”
- “Put every keyword in every page.”
- “Create 100 city pages.”
- “Add FAQ schema everywhere.”
- “Make the copy sound AI-readable.”
- “Guarantee ChatGPT rankings.”
- “Guarantee Google #1.”
- “Use schema for everything possible.”

These are either unsupported, risky, or likely to produce low-value output.

## Recommended Claude Code workflow

Give Claude Code four inputs, in this order:

### A. Platform rules
Use the official Google, Bing and OpenAI sources above as the non-negotiable baseline.

### B. Expert interpretation
Give it Aleyda Solís's 2026 AI-search material as current practitioner guidance. Use Brian Dean/Backlinko selectively for conventional SEO explanations, not as the final authority on platform behavior.

### C. DIWEBA business specification
Give it exact packages, prices, delivery time, add-ons, exclusions, legal positioning, target audience and claims it is allowed to make.

### D. Implementation contract
Tell it to produce and verify the actual technical site: HTML semantics, metadata, routes, sitemap, robots, canonicalization, structured data, internal links, performance, accessibility and analytics/search-console hooks.

## Suggested master instruction for Claude Code

Build DIWEBA's production website as a German-first, Europe-focused B2B website for small and medium businesses. Treat Google Search Central, Bing Webmaster documentation and OpenAI's publisher/crawler documentation as the authoritative technical baseline. Treat current Aleyda Solís AI-search research as strategic guidance, not as a replacement for platform documentation.

The site must be technically crawlable and indexable, semantically clear, fast, mobile-first, accessible and honest. Every indexable page needs a unique descriptive title, useful meta description, clear H1, meaningful body copy, canonical URL and strong internal-link context. Important business facts must exist as normal text, not only as graphics or client-rendered widgets.

Implement a coherent structured-data model using only accurate properties supported by the visible content. Include organization/site identity signals and relevant page/service markup. Do not invent reviews, awards, credentials, years of experience, clients or performance claims.

Generate a clean XML sitemap containing canonical indexable URLs. Generate a reviewed robots.txt that allows normal search crawling and does not accidentally block important content or OAI-SearchBot. Verify canonicalization, status codes and indexability on every important route.

Design the information architecture around real search intent: website service, small-business web design, pricing, process, AI-search visibility, trust/legal positioning, about and contact. Do not create thin keyword/city doorway pages.

For AI-search visibility, optimize for clarity, specificity, factual consistency, useful answers, strong entity identity and reputable external corroboration. Do not claim or imply guaranteed inclusion, citation, ranking or traffic from Google, ChatGPT, Copilot or other AI systems.

Create a launch QA checklist that verifies: rendered HTML, titles, descriptions, H1s, canonical tags, robots directives, sitemap, structured data, Open Graph, favicon, internal links, mobile usability, Core Web Vitals, accessibility, 404/redirect behavior, crawl access and legal/privacy-sensitive tracking behavior.

After implementation, report exactly what was changed and identify anything that could not be verified automatically.

## Source hierarchy for future maintenance

**Tier 1 — authority:**
Google Search Central; Google Search Console Help; Bing Webmaster Tools; OpenAI publisher/crawler documentation; official German/EU legal and regulator sources for compliance.

**Tier 2 — expert interpretation:**
Aleyda Solís, especially her 2026 AI-search work.

**Tier 3 — practitioner education:**
Brian Dean / Backlinko and other established SEO practitioners.

**Rule:** when a Tier 2/3 article conflicts with a current platform rule, follow Tier 1 and document the conflict.

## Bottom line

For DIWEBA, the winning setup is **not** “Claude reads 20 SEO/GEO articles.” It is a small, curated evidence pack + a precise implementation specification + a measurable QA/monitoring loop.

Aleyda Solís is the better expert source to anchor the current AI-search/GEO part of the strategy, while Google/Bing/OpenAI documentation should remain the authority. Brian Dean is useful as a secondary practitioner source, especially for conventional SEO education, but I would not make his content the technical source of truth.

The most important strategic correction is also conceptual: DIWEBA should sell **search-ready and AI-search-ready website construction**, not a promise of “AI ranking.” That is both more credible and more defensible.
