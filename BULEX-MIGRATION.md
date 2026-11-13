# Bulex migration audit and implementation

## Architecture and baseline
Next.js 15 App Router, React 19, TypeScript, Tailwind 4 plus global/module CSS. Existing /fr and /nl trees each provide home, services/details, city index/details, Brussels, about, contact, quote, certifications, advice/details and four legal pages. Components cover headers/mobile navigation, footer, hero, service templates, upload fields and SMTP forms. City relationships are in data/city-data.ts and commune JSON; scheduled blog records in data/blog. No database, admin application or separate authentication layer found. The only API is POST /api/mail with Nodemailer, environment-based SMTP, attachments, honeypot and customer confirmations. Analytics/Ads are injected by root layout. SEO uses Next metadata, locale alternates, JSON-LD, robots, sitemap and legacy city redirects.

Baseline has extensive uncommitted user changes. None are reverted. No push, publication or deployment is performed.

## Current deployment behavior
Updated at the user's request: this checkout serves Bulex exclusively; no brand flag is required. `npm run dev`, `build` and `start` use Bulex and `.next-bulex`. English is the default; a deliberate Dutch language preference is retained. Old French and Vaillant URLs are compatibility redirects only. Historical source/data with pre-existing edits is retained rather than destructively deleted. No live site is modified or deployed.

## Reuse and redesign
Reuse Next routing, city source/relationships, mail transport/attachment rules and conversion helper. Replace the public layout, hero, cards, service/solution content, city presentation, about, FAQ, advice, legal and enquiry presentation with bilingual shared templates. Do not carry over generated testimonials/intervention stories, response-time promises, ratings, Vaillant product model names or unsupported certifications.

## Redirect strategy
/ defaults to EN. FR segments map to existing NL equivalents. Legacy service slugs map explicitly to Bulex service slugs. Old blog slugs map to corresponding new advice topics; city slugs use existing locale maps. Existing Next city redirects remain. Unknown pages return 404. Language switching preserves page type and service/solution identity. No domain-wide live redirects are installed.

## Launch configuration
Set BULEX_SITE_URL to the verified final HTTPS origin and BULEX_LAUNCH_READY=true only after review. Until then Bulex robots/metadata are noindex and its sitemap is empty. Preserve SMTP_HOST/PORT/USER/PASS/MAIL_FROM/MAIL_TO and existing public telephone configuration. Configure BULEX_PUBLIC_EMAIL, BULEX_COMPANY_NAME, BULEX_COMPANY_NUMBER, BULEX_COMPANY_ADDRESS for verified company information. Do not invent an email or registered entity.

## Assets and claims
Official logo and photographs sourced from bulex.be via the supplied official brand reference. Source manifest recorded in public/bulex/asset-sources.json. Arial is the official website's observed heading family and is used as a system font. Client confirms authorized partner status. No manufacturer warranty extensions, review scores, guaranteed arrival times or 24/7 claim are published. The review section is always present: genuine review cards when available, otherwise a feedback invitation without fabricated quotes or stars. Final asset usage and company/legal details need client review before launch.

## Commands and validation
- `npm run dev:bulex`: run the Bulex development preview.
- `npm run build:bulex` / `npm run start:bulex`: isolated Bulex production output in `.next-bulex`.
- Default `npm run dev`, `build`, `start`: Bulex, English default, output in `.next-bulex`.
- `npm run test:bulex`: 16 passing automated checks, including actual API handler with mocked SMTP. No external messages sent. All 172 migrated EN/NL page variants render in server-side checks without Vaillant branding.
- Bulex and original Vaillant production builds and TypeScript validation passed. Build retains the original global CSS font-import and Tailwind module-type warnings.
- Visual QA is blocked: local listeners fail with EPERM on both wildcard and loopback addresses. See design-qa.md. No rendered fidelity, browser interaction or Core Web Vitals pass is claimed.
- All 16 legacy advice topics have concise EN/NL Bulex-safe replacements. Original full articles remain in source for editorial review; manufacturer-specific fault codes/models are not mechanically relabeled.
- No source push or deployment performed. No real email sent. The preview remains noindex pending final domain, company details, asset approval and end-to-end delivery verification.

## Homepage follow-up
Three slides pair localized text with corresponding independent image panels. Text fades over 550ms, images over 900ms; both share the same active slide index. Automatic rotation every 6.5 seconds pauses for focus, hover, hidden tabs and user pause. Manual selection pauses rotation. Reduced-motion preference disables autoplay and animation. Persistent CTAs stay usable during transitions.

All reference sections remain: two-level header, split hero, six services, three-column partner, three solutions, advantages, lifestyle, service areas, reviews/feedback, final red CTA and multi-column footer. Generated illustrative photographs closely follow the approved reference; actual logo/product assets stay authentic. No generated scene is presented as a verified customer testimonial.
