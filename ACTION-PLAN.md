# Current Bulex SEO action plan

16 November 2026. This replaces the earlier location-indexing restriction at the owner's explicit request to index every published page.

## Implemented

- All 45 existing service areas in both languages are eligible for indexing (90 area URLs). Production sitemap should contain 178 canonical published pages at the current publication date.
- Removed the local-detail indexing restriction; both languages use the same policy. Content quality remains an editorial improvement, not an indexing block.
- Scheduled unpublished articles remain unpublished; invalid URLs, API endpoints and internal rewrite paths are not public indexable pages.
- Valid XML, reciprocal language alternates, actual article dates, canonical URLs, crawlable public images, native email links, sourced reviews and business schema remain in place.
- 46 automated tests and production build pass for this policy change.

## Production execution

Push to the existing GitHub/Hostinger automatic deployment, verify all sitemap URLs live, and resubmit the expanded sitemap in Search Console. Request indexing through URL inspection where Google's quota permits. A request or sitemap submission is not a guarantee that Google indexes every URL.

## Remaining external dependencies

- Search Console Page indexing report currently says “Processing data, please check again in a day or so”. No exclusion reasons are available yet.
- Check Core Web Vitals report; PageSpeed API previously rate-limited. Record measured results only.
- Actual indexing and performance can only be confirmed once Google processes the site.

## Editorial work

The owner has already confirmed authorized partner status in BULEX-MIGRATION.md. Registered identity/address and review sources must come from real business records. Do not invent them. Improve repetitive city descriptions and older short advice with original reviewed information; all published areas remain eligible for indexing as requested.

## Measured follow-up fixes

PageSpeed browser run on 16 November 2026 for the English homepage (root negotiated to /en): mobile Performance 98, Accessibility 96, Best Practices 100, SEO 100; LCP 2.3 seconds, CLS 0, total blocking time 90 ms. These are lab measurements, not field INP/CWV. Report: https://pagespeed.web.dev/analysis/https-bulex-loodgieter-com/jkiou6mmgd?form_factor=mobile .

Implemented the observed small fixes: footer links have at least 32px height to resolve adjacent touch-target spacing; llms.txt now has descriptive Markdown links and Dutch/English sections; first hero image explicitly uses fetchPriority=high. Shared components preserve the same EN/NL structure and styling. No claim of improved score until a new measurement completes. 46 tests and production build pass.

Google URL inspection confirms the Dutch homepage is already indexed; a recrawl request was accepted into the priority queue. The field Core Web Vitals report has insufficient mobile and desktop usage data in the last 90 days. This supersedes the earlier API-only performance limitation.

Hostinger static-file follow-up: corrected public/llms.txt as well as the dynamic route, because the host serves the static file before Node middleware. The static version uses actual Markdown links, unprefixed Dutch URLs and /en English URLs.

## All-published-pages execution result

The live sitemap now contains 178 canonical published URLs; the complete crawl passes with no failed/redirected/noindex URLs, duplicate metadata, missing descriptions or canonical mismatches. Google Search Console reports Success and 178 discovered pages. Both homepage crawl/indexing requests were accepted. The Dutch homepage is confirmed indexed; English was discovered but not yet indexed at inspection. This is an indexing request for the site, not a claim that all 178 URLs are already in Google.

Measured follow-up fixes are live: first hero fetch priority is high; EN/NL mobile checks at 390px confirm 32px footer targets and no horizontal overflow; hosted llms.txt now contains correct Markdown links and current language paths. Final code release: d032056, Hostinger build 01a1e66c-81f6-70e7-ad75-bb56c624b7ab. Evidence: all-published-live-crawl.json, all-178-google-submitted.jpg, en-indexing-requested.jpg, mobile-footer-verified.jpg, llms-final.txt and final-checks.json under seo-evidence/2026-11-16.

Delivery checks PASS: 46 tests and production build; complete live sitemap crawl; matching shared EN/NL changes; mobile target dimensions and overflow measured; no invented credentials, address, dates or reviews. Remaining work needs Google processing/usage data or real business/editorial information. The PageSpeed baseline remains 98 Performance / 96 Accessibility / 100 Best Practices / 100 SEO; no unmeasured post-fix score is claimed.

## 17 November: presentation and editorial assets

Readable sitemap added at /sitemap; XML gains optional XSL table presentation while preserving existing URLs, language links and publication scheduling. Twenty-two distinct generated WebP covers replace repeated images across full/scheduled posts and older advice; EN/NL remain aligned. Prioritized remaining improvements are now in qa/seo-improvements.md. The latest bounce screenshot confirms a separate downstream MailChannels block; provider follow-up details are in qa/mailchannels-followup.md.
