# Bulex SEO action plan

16 November 2026. Detailed evidence: FULL-AUDIT-REPORT.md.

## Completed in source

1. Allow crawling public /bulex images while keeping internal route restrictions.
2. Restrict indexed location pages to 19 bilingual profiles. The other 26 pairs remain available with noindex,follow and are excluded from sitemap.
3. Remove example reviews and unsupported Google five-star imagery; require source links for published reviews.
4. Add older guidance links to both advice hubs.
5. Add a configured Organization entity and stable schema references.
6. Clean sitemap selection, deduplicate URLs and remove changefreq. Preserve valid XML, reciprocal language alternates, actual publication dates and scheduling.
7. Validate with 45 tests, production build and full local sitemap crawl.

## Deployment and immediate follow-up

- Deploy the GitHub revision through the existing hosting pipeline, using APP_MODE=production. Verify /robots.txt, /sitemap.xml and representative EN/NL pages after deployment.
- Submit https://bulex-loodgieter.com/sitemap.xml in Search Console; inspect representative canonical and noindex URLs. Search Console access was unavailable.
- Fix Cloudflare email obfuscation: /cdn-cgi/l/email-protection is a live 404. Confirm the visible contact link resolves to a functioning mailto afterward.

## Editorial work requiring real information

- Verify partner status and registered operator details; populate real contact and legal information where missing.
- Publish only actual customer reviews with source links and justified verification labels.
- Add useful original local detail in both languages before removing location noindex. Do not index all 90 area URLs merely because they exist.
- Expand older advice using reviewed technical guidance, actual author/reviewer identity and sources. Do not invent dates or expertise.

## Measurement

- Obtain PageSpeed/CrUX LCP, INP and CLS data when the rate limit clears; investigate only measured deficiencies.
- Monitor indexing and query data after deployment. Sitemap submission does not guarantee indexing or rankings.

## Execution update

- Completed: Hostinger deployment of a684ca7 confirmed; fresh production crawl passes 126/126 sitemap URLs.
- Implemented email correction using Cloudflare's documented per-address email_off exemption and escaped native mailto anchors across shared EN/NL templates. 46 tests pass. Release uses the existing automatic Git deployment; live follow-up is recorded in the active execution chat.
- Search Console submission still needs authenticated Search Console access; hosting tools do not expose it. PageSpeed retry remains rate-limited.

## Search Console execution result

Authenticated Search Console submission completed on 16 November 2026. The sitemap details report confirms **Sitemap processed successfully**, last read 16 November 2026, and **126 discovered pages**. The initial temporary fetch warning cleared when processing completed. Screenshot: `seo-evidence/2026-11-16/search-console-submitted.jpg`. This supersedes earlier notes that submission access was unavailable. Search performance and index coverage are still processing; sitemap discovery is not proof that all pages are indexed.

## Final production verification

Hostinger completed build `01a1e660-6555-7063-a94d-1ca82ef7b59d` for code commit `489bc4c`. All eight checked EN/NL homepage, contact, booking and legal URLs return HTTP 200 with native mailto destinations and no Cloudflare email-protection rewrite (evidence: `seo-evidence/2026-11-16/live-email-links.json`). The email follow-up and sitemap submission are complete. Tests: 46 passed; production build passed. Google reports 126 sitemap pages discovered; actual indexing, performance reports and PageSpeed measurements remain pending. Earlier open deployment/email/submission notes above are superseded by these verified results.
