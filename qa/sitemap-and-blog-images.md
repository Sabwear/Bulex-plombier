# Sitemap presentation and original blog imagery

17 November 2026. Used SEO sitemap, imagegen and UI/accessibility skills.

## Changes

- /sitemap.xml remains the canonical search-engine endpoint with the same 178 published URLs and reciprocal EN/NL/x-default language links. Its XML now references a local XSL stylesheet for readable numbered tables, URL links, alternates and known dates.
- /sitemap provides a responsive HTML view grouped into pages, services, solutions, service areas and advice. It does not depend on browser XSLT, which current Edge warns is being removed. XML styling is optional presentation, not a ranking improvement or a reason to install extensions.
- Both views use config/bulex/sitemap.ts. The XML serializer escapes text/attributes. Existing publication scheduling, indexing mode, host detection and robots sitemap URL remain intact. Known dates retain their original timezone offset; missing dates are not fabricated.
- 22 original generated editorial cover images replace reused photos for all twelve full/scheduled blog posts and ten older guidance snippets. Each article topic gets a distinct asset; EN/NL versions share the corresponding image. Hero, card, social-preview and article schema image paths use the same article data.
- WebP covers are at most 1440px wide; the collection is about 2.4MB. Asset provenance and dimensions are in public/bulex/blog/asset-sources.json. No logos or manufacturer model identifiers were generated. These are illustrative scenes, not records of completed work. Full-post alt text identifies the illustration in both languages.

## Visual decisions

Reading: utility sitemap for visitors and maintainers in the existing restrained Bulex visual language. ENERGY 1 / RHYTHM 1 / MOTION 1. Burgundy links preserve brand identity; white background and Arial prioritize legibility; topic groups and numbered XML rows make long URL lists scannable; no animation is needed for navigation. Mobile HTML wraps long paths; the XML table scrolls within its container. The HTML view is the recommended browser-facing sitemap.

## Verification

49 tests pass and the production build passes. Tests cover reciprocal language alternates, publication dates, XML escaping, the utility route, unique local image references and EN/NL image identity. lxml parsed the XML and transformed all 178 rows and all 534 alternate links. Browser preview confirmed both HTML and XSL table rendering; the browser's XSLT deprecation notice is expected and the HTML fallback avoids that dependency.

## Remaining SEO work

See qa/seo-improvements.md for prioritized evidence-based recommendations. Original local detail and longer reviewed guidance are more valuable than cosmetic sitemap changes. Search Console discovery does not prove full indexing. Field CWV data is still insufficient. Business identity and genuine reviews require real information. External confirmation bounces remain a provider follow-up, recorded in qa/mailchannels-followup.md.

Browser checks: HTML sitemap contains all 178 links and no horizontal overflow at 390px. Both XML/XSL and HTML render successfully. EN/NL blog hubs reference the same six published topic covers; all loaded successfully in the browser. Full/scheduled and legacy asset references are checked across both locales. Screenshots: sitemap-readable-desktop.jpg, sitemap-readable-mobile.jpg and blog-new-covers-preview.jpg. The utility view uses English document language with its Dutch explanatory paragraph explicitly marked nl; staging retains the application indexing mode.

Delivery checks PASS: build and 49 tests; valid XML and reciprocal alternates; real link destinations; mobile overflow check; optimized local images; visual QA of generated cover contact sheet; no fake reviews, logos or completed-work claims. Remaining provider email filtering is explicitly unresolved rather than hidden as a site-code failure.

## Production verification

Hostinger completed deployment 01a1e6da-02ba-7239-9e5b-1c76513f7de9 for code 0966383. The live XML includes the stylesheet instruction and parses all 178 URL entries with 534 language alternatives; the live HTML /sitemap contains 178 page links and English document language. All 22 generated WebP assets return HTTP 200. Evidence: qa/sitemap-images-live-checks.json and qa/sitemap-readable-live.jpg. No Google ranking or external-mail delivery improvement is claimed.
