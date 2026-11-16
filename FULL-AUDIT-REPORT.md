# Bulex website SEO audit

16 November 2026. Scope: full current Dutch/English website at https://bulex-loodgieter.com, all sitemap URLs, shared rendering source, robots and structured data. The older report in seo-evidence concerns the previous Vaillant site and is historical.

## Audit summary

Technical baseline is sound; confirmed crawlability, content trust and discovery issues required fixes. Overall score: insufficient data for a defensible full-site score, because Core Web Vitals and search-index data are unavailable.

Production before changes: 178 unique sitemap URLs, all fetched successfully without redirects, each with one H1, unique title and description, canonical agreement (normalizing the homepage trailing slash), and no missing image alt attributes. The XML was already syntactically valid. Its problem was content selection and an unnecessary monthly changefreq field, not a broken XML namespace.

Top issues: public images blocked by robots; unsourced sample reviews labeled verified; 52 location URLs without useful detail in both languages. Improvements: narrow robots restrictions, limit location indexing, connect older advice to the hubs.

## Verified findings

| Area | Severity | Confidence | Finding and evidence | Impact and fix |
| --- | --- | --- | --- | --- |
| Crawlability | Warning | Confirmed | robots.ts blocked /bulex/, including public logos and images | Prevents crawler image access; restricted block to internal locale routes. Fixed in source. |
| Location content | Warning | Confirmed | 45 cities per language, but only 19 have both a Dutch property profile and an English translation in geo-en.json | Repeated low-information pages dilute useful content. 26 pairs now noindex,follow and excluded from sitemap; still accessible to users. No ranking penalty claimed. |
| Content trust | Warning | Confirmed | Empty reviews array substituted nine example testimonials with five stars and verified=true | Unsupported customer claims. Removed sample fallback and Google rating image; display honest empty state. Only sourced configured reviews render. |
| Internal links | Warning | Confirmed | Sitemap exposes ten legacy snippets per locale absent from BlogIndex | Weak discovery. Added links from each advice hub to all older guidance. |
| Business schema | Warning | Confirmed | Active graph lacked Organization; Service providers and article publisher were standalone objects | Added stable Organization entity using configured identity, telephone and email, referenced by WebSite and provider/publisher. No invented street address, geo or rating. |
| Sitemap | Info | Confirmed | Valid XML with 178 URLs and monthly changefreq | Removed ignored frequency hint, deduplicated output and excluded noindex areas. Kept reciprocal nl-BE/en-BE/x-default and real publication dates. |
| Infrastructure | Warning | Confirmed | Live homepage link /cdn-cgi/l/email-protection returned 404 in bundled broken-link check | Cloudflare transforms the source mailto link. Repair or disable email obfuscation at the edge; repository source already uses mailto. Open. |
| Social | Pass | Confirmed | Bundled social checker: all seven Open Graph fields and four core Twitter fields present | Missing optional Twitter handles are not an SEO defect; no handles invented. |
| Robots / AI | Pass | Confirmed | Live bots inherit the wildcard allow rule | Explicit individual AI-bot rules are optional, not a required SEO fix. |
| Images | Pass | Confirmed | Crawl found no missing alt attributes; pages use Next Image | Robots correction makes those public assets crawlable. Empty alt on decorative images is legitimate. |
| Performance | Info | Hypothesis | PageSpeed returned API rate limit, no measured CWV | No LCP/INP/CLS score or performance improvement claimed. |

## Validation after fixes

Production build passed. All 45 automated tests passed, including full public-route rendering, reciprocal hreflang, source identity, area indexability and robots image accessibility.

The locally served production build exposed 126 unique sitemap URLs. All returned success without redirects, with one H1, unique nonempty titles/descriptions, canonical agreement and no noindex URLs in the sitemap. Sitemap XML includes the protocol and XHTML alternate namespaces. Nineteen city pairs remain indexable; scheduled unpublished guides remain excluded until their publication dates. Existing genuine article dates are retained; no artificial sitewide lastmod is added.

EN and NL use the same modified page renderer and testimonial component, so structure and behavior remain mirrored. Existing bilingual render tests cover both locales. No visual redesign was introduced.

## Prioritized action plan

See ACTION-PLAN.md for deployment and business follow-ups.

## Unknowns and environment limitations

- These fixes are committed source changes and locally verified build output; a GitHub push alone does not prove deployment.
- Cloudflare email protection requires an edge setting change and a subsequent live link check.
- PageSpeed API was rate-limited. Run PSI or inspect Search Console CWV after deployment; no measured field data was available.
- No Search Console/analytics access: index coverage, actual rankings, traffic and sitemap submission status are unknown.
- Business owner must confirm partner status, legal identity/address, credentials and any published reviews. Missing factual details must not be fabricated for schema.
- Older advice snippets still need editorial expansion and review where useful. Local profiles are sufficient for the indexing gate, not proof of human verification of every factual claim.
- Browser visual QA could not start because the configured Chrome executable is absent. Server-rendered HTML and production HTTP crawl passed; screenshot verification remains separate.

## Evidence and delivery gate

Evidence: seo-evidence/2026-11-16 contains pre/post sitemap XML, raw homepage, complete live/local crawls, bundled robots/social/security/links/redirect checks and verified findings. scripts/audit-seo.py makes the sitemap crawl repeatable using Python's standard library.

PASS: no invented business data or testimonials introduced; sample reviews removed.
PASS: changed shared EN/NL routes render and metadata agree, backed by 45 tests.
PASS: production build and complete 126-URL production-build crawl passed.
PASS: no visual styling or unrelated controls changed; existing design remains in place.

## Production execution follow-up

Hostinger confirmed deployment of a684ca7 completed successfully (build 01a1e63a-4784-7351-83e0-6779fac7e4f9). A fresh live crawl passed all 126 sitemap URLs; robots now permits public image assets. See deployed-crawl.json for evidence.

The email-protection follow-up has a source-level correction: shared escaped EmailLink anchors wrapped in Cloudflare's documented email_off comments, used by both languages' footer/contact/booking/legal sections. This prevents the broken edge rewrite without changing unrelated CDN settings. See https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/. 46 regression tests pass. The follow-up source is released through the existing Git automatic deployment; final live validation is reported in the execution chat. Search Console submission/coverage remains unavailable via current connected tools. The second PageSpeed attempt remains rate-limited.

## Search Console execution result

Authenticated Search Console submission completed on 16 November 2026. The sitemap details report confirms **Sitemap processed successfully**, last read 16 November 2026, and **126 discovered pages**. The initial temporary fetch warning cleared when processing completed. Screenshot: `seo-evidence/2026-11-16/search-console-submitted.jpg`. This supersedes earlier notes that submission access was unavailable. Search performance and index coverage are still processing; sitemap discovery is not proof that all pages are indexed.

## Final production verification

Hostinger completed build `01a1e660-6555-7063-a94d-1ca82ef7b59d` for code commit `489bc4c`. All eight checked EN/NL homepage, contact, booking and legal URLs return HTTP 200 with native mailto destinations and no Cloudflare email-protection rewrite (evidence: `seo-evidence/2026-11-16/live-email-links.json`). The email follow-up and sitemap submission are complete. Tests: 46 passed; production build passed. Google reports 126 sitemap pages discovered; actual indexing, performance reports and PageSpeed measurements remain pending. Earlier open deployment/email/submission notes above are superseded by these verified results.

## Current indexing policy: explicit owner override

The owner requested indexing of every published page. All existing area pages are now indexable and included in the sitemap: 45 cities in both languages, bringing the currently published sitemap to 178 canonical URLs. The earlier 19-pair restriction is removed. Content-quality findings remain relevant editorial work but do not block indexing. Unpublished scheduled guides, invalid routes, API endpoints and internal rewrites remain excluded. Search Console Page indexing data is still processing, so actual coverage cannot yet be confirmed.
