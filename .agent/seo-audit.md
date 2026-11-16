# SEO change record: 16 November 2026

Used SEO full audit/sitemap workflow with specialist review. Current site: Bulex Dutch/English, not historical Vaillant FR/NL. Updated shared EN/NL page renderer and Testimonials component; both locales retain mirrored structure. Narrowed robots disallow to permit images, added bilingual area indexing gate (19 pairs), sitemap deduplication, Organization schema, and legacy advice links. Removed unsourced sample customer reviews.

Validation: 45 tests pass, production build passes, local production sitemap crawl 126/126 successful with correct metadata/canonicals and no noindex entries. Live before-change crawl: 178/178. PSI rate-limited; configured Chrome unavailable. Cloudflare email-obfuscation link remains external follow-up. Reports: FULL-AUDIT-REPORT.md, ACTION-PLAN.md, seo-evidence/2026-11-16. No deployment claimed from source push alone.

## Authorized production execution

Hostinger confirmed completed deployment 01a1e63a-4784-7351-83e0-6779fac7e4f9 of a684ca7 with Git auto-deployment enabled on main. Live crawl now confirms 126/126 URLs successful with correct canonical metadata. Live robots permits public images. PageSpeed remains rate-limited.

Added shared EmailLink to contact/booking, footer and legal pages in both languages. Cloudflare's documented email_off HTML comments prevent its obfuscator from rewriting native mailto links. Configured text and attribute values are HTML-escaped; no dashboard/CDN-wide changes. Regression verifies exemption markers, native destination and escaping. 46 tests pass. The source release is sent through the existing automatic deployment; subsequent live verification is performed in the active chat. Search Console is not exposed by the connected hosting tools.

## Search Console execution result

Authenticated Search Console submission completed on 16 November 2026. The sitemap details report confirms **Sitemap processed successfully**, last read 16 November 2026, and **126 discovered pages**. The initial temporary fetch warning cleared when processing completed. Screenshot: `seo-evidence/2026-11-16/search-console-submitted.jpg`. This supersedes earlier notes that submission access was unavailable. Search performance and index coverage are still processing; sitemap discovery is not proof that all pages are indexed.

## Final production verification

Hostinger completed build `01a1e660-6555-7063-a94d-1ca82ef7b59d` for code commit `489bc4c`. All eight checked EN/NL homepage, contact, booking and legal URLs return HTTP 200 with native mailto destinations and no Cloudflare email-protection rewrite (evidence: `seo-evidence/2026-11-16/live-email-links.json`). The email follow-up and sitemap submission are complete. Tests: 46 passed; production build passed. Google reports 126 sitemap pages discovered; actual indexing, performance reports and PageSpeed measurements remain pending. Earlier open deployment/email/submission notes above are superseded by these verified results.
