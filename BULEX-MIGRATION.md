# Bulex Plombier implementation and launch notes

## Architecture and baseline
Next.js 15 App Router, React 19, TypeScript, Tailwind 4 plus global/module CSS. Existing /fr and /nl trees each provide home, services/details, city index/details, Brussels, about, contact, quote, certifications, advice/details and four legal pages. Components cover headers/mobile navigation, footer, hero, service templates, upload fields and SMTP forms. City relationships are in data/city-data.ts and commune JSON; scheduled blog records in data/blog. No database, admin application or separate authentication layer found. The only API is POST /api/mail with Nodemailer, environment-based SMTP, attachments, honeypot and customer confirmations. Analytics/Ads are injected by root layout. SEO uses Next metadata, locale alternates, JSON-LD, robots, sitemap and legacy city redirects.

## Current deployment behavior
This checkout serves Bulex exclusively. `npm run dev`, `build` and `start` use Bulex and `.next`. English is the default; Dutch is the only alternate language. Legacy French URLs redirect to their English equivalents, while older source and data remain in the repository for compatibility and reuse. Source is pushed to GitHub. No production deployment has been performed.

## Reuse and redesign
The public Bulex pages reuse Next routing, city relationships, mail transport, attachment rules and conversion helpers. The Bulex layout, service and solution content, city pages, advice, legal information and enquiry forms are implemented in `app/bulex`, `components/bulex` and `config/bulex`. Do not add fabricated testimonials, response-time promises, ratings or unsupported certifications.

## Redirect strategy
/ defaults to EN. FR segments map to existing NL equivalents. Legacy service slugs map explicitly to Bulex service slugs. Old blog slugs map to corresponding new advice topics; city slugs use existing locale maps. Existing Next city redirects remain. Unknown pages return 404. Language switching preserves page type and service/solution identity. No domain-wide live redirects are installed.

## Launch configuration
Set BULEX_SITE_URL to the verified final HTTPS origin and APP_MODE=production only after review. Until then Bulex robots/metadata are noindex and its sitemap is empty. Preserve SMTP_HOST/PORT/USER/PASS/MAIL_FROM/MAIL_TO and existing public telephone configuration. Configure NEXT_PUBLIC_SUPPORT_EMAIL, BULEX_COMPANY_NAME, BULEX_COMPANY_NUMBER, BULEX_COMPANY_ADDRESS for verified company information. Do not invent an email or registered entity.

## Assets and claims
Official logo and photographs sourced from bulex.be via the supplied official brand reference. Source manifest recorded in public/bulex/asset-sources.json. Arial is the official website's observed heading family and is used as a system font. Client confirms authorized partner status. No manufacturer warranty extensions, review scores, guaranteed arrival times or 24/7 claim are published. The review section is always present: genuine review cards when available, otherwise a feedback invitation without fabricated quotes or stars. Final asset usage and company/legal details need client review before launch.

## Commands and validation
- `npm run dev:bulex`: run the Bulex development preview.
- `npm run build:bulex` / `npm run start:bulex`: standard Next.js production output in `.next`.
- Default `npm run dev`, `build`, `start`: Bulex, English default, output in `.next`.
- `npm run test:bulex`: 16 passing automated checks, including the actual API handler with mocked SMTP. No external messages are sent. All 172 EN/NL page variants render in server-side checks without legacy-brand content.
- The Bulex production build and TypeScript validation passed. The build retains the existing global CSS font-import and Tailwind module-type warnings.
- Visual QA is blocked: local listeners fail with EPERM on both wildcard and loopback addresses. See design-qa.md. No rendered fidelity, browser interaction or Core Web Vitals pass is claimed.
- All 16 legacy advice topics have concise EN/NL Bulex-safe replacements. Original full articles remain in source for editorial review; manufacturer-specific fault codes/models are not mechanically relabeled.
- No production deployment has been performed. No real email has been sent. The preview remains noindex pending a final domain, verified company details, asset approval and end-to-end delivery verification.

## Homepage follow-up
Three slides pair localized text with corresponding independent image panels. Text fades over 550ms, images over 900ms; both share the same active slide index. Automatic rotation every 6.5 seconds pauses for focus, hover, hidden tabs and user pause. Manual selection pauses rotation. Reduced-motion preference disables autoplay and animation. Persistent CTAs stay usable during transitions.

All reference sections remain: two-level header, split hero, six services, three-column partner, three solutions, advantages, lifestyle, service areas, reviews/feedback, final red CTA and multi-column footer. Generated illustrative photographs closely follow the approved reference; actual logo/product assets stay authentic. No generated scene is presented as a verified customer testimonial.

## Local and manufacturer content integration — 2026-11-14
- City pages now render original housing profiles, landmarks and local issue lists; English translations cover all 19 Brussels communes. Existing postcodes, city routes and nearby-city relationships remain intact.
- Old response-time estimates and unsupported service-contract claims are not republished. Old-brand mentions in generic local issue labels are removed, not turned into claims about a different installed appliance.
- Manufacturer-backed product families, exact selected model/article references and source links appear on solution pages and relevant service/advice pages. This is a selected reference catalogue, not a live stock feed.
- Fault-code summaries appear on repair/emergency pages and the fault-code article, with model-specific caveats and no internal repair instructions.
- Validation: 18 automated checks pass, including local content and model references in both languages; production build passes. Browser layout review remains outstanding.

## Editorial SEO and Belgian policy layer — 2026-11-14
Expanded seven main page types, eight service details and three solution details using localized, structured editorial blocks. Content addresses actual enquiry decisions: shared flues, simultaneous hot-water use, access, quotations, concealed leaks and appliance variants. All main page types now have distinct descriptive metadata; existing canonicals, alternates, slugs and sitemap generation remain in place. No search-volume or ranking claims are made.

Added EN/NL privacy, cookies, consumer information/complaints, accessibility and expanded website/legal terms. Consumer information explains applicable withdrawal rights and the limited urgent-repair exception; it does not treat the enquiry as a contract. Footer links expose all policies. A versioned six-month local consent preference, native keyboard-operable preferences dialog and equal accept/reject controls are implemented. No optional tags are installed. Choices accurately say that only necessary storage is active. The redundant language cookie was removed; English remains the root default. Legacy conversion events additionally require marketing consent.

Before public launch the operator must supply BULEX_COMPANY_NAME, BULEX_COMPANY_NUMBER, BULEX_COMPANY_ADDRESS and NEXT_PUBLIC_SUPPORT_EMAIL; verify provider/processor identities, retention schedule and any international transfers. Current legal text explicitly identifies incomplete operator information instead of inventing it. These deployment-specific facts and contract-stage consumer notices are not established by source code. No claim of legal certification is made.

Sources used:
- https://www.autoriteprotectiondonnees.be/cookies-et-autres-traceurs
- https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en
- https://consumerconnect.be/fr/themes/achat-produit-ou-service/droit-de-retractation/achat-a-distance/regle-generale
- https://economie.fgov.be/fr/themes/line/commerce-electronique/vente-par-internet/site-dentreprise-et-comptes
- https://www.google.com/about/company/user-consent-policy/
- https://developers.google.com/search/docs/essentials

Verification: 22 automated checks pass, covering locale routing, localized policy routes, metadata uniqueness, consent expiry/validation and all public-page server rendering. Production build passes. The SEO helper HTML parser could not run because beautifulsoup4 is absent; no score is claimed. Browser verification remains blocked: the local dev server encounters EMFILE watcher failures and the attempted HTTP request returned no response.

## Review carousel
Nine explicitly labeled example reviews are shown only while the genuine reviews array is empty. Review navigation uses responsive page dots, native touch scrolling, mouse dragging and keyboard arrows. Autoplay pauses during hover/focus/drag, when the page is hidden, or for reduced motion. No review schema or verified labels are added to examples.
Set NEXT_PUBLIC_GOOGLE_REVIEW_URL to the business's exact HTTPS Google Business review link to activate the external review button. No business listing URL was supplied or found; the button remains visibly unavailable rather than pointing at an unrelated listing.

## Production environment consolidation
The current local environment was reduced from 18 configured keys to 12, preserving SMTP credentials and the separate recipient inbox. All public contact/social/review settings now use the existing NEXT_PUBLIC_* names. SMTP sender and recipient default to NEXT_PUBLIC_SUPPORT_EMAIL, with MAIL_FROM and MAIL_TO retained only as optional routing overrides. SMTP port defaults to 587 and implicit TLS is inferred for 465; SMTP_SECURE remains an optional special-case override. ADMIN_EMAIL, SITE_BRAND and unused analytics environment switches were removed. .env.example and README document the minimal deployment configuration and build-time public settings. 24 tests and the production build pass; no live email was sent.

## Environment correction
The full environment template is restored, grouped by application, company/contact, mail, social and Google settings. APP_MODE=development or production replaces the separate launch-ready flag. Existing local values were preserved and MAIL_FROM restored from the identical public email. Previously removed tracking fields are present again but their deleted values were not recoverable from the ignored local file; fill them only if needed for an integration. No tracking scripts are enabled by restoring configuration fields.
