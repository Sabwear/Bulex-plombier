> Production browser follow-up: two actual contact-form submissions succeeded but landed in Hostinger Junk. A targeted Inbox rule was ineffective and disabled; six test emails were manually recovered into Inbox. Future automatic Inbox placement still needs Hostinger remediation. Evidence and mailbox changes: `.agent/mail-verification.md`.

> Live email verification (15 November 2026): production /api/mail delivered an enquiry and confirmation to contact@bulex-loodgieter.com. Both landed in Junk despite passing SPF/DKIM/DMARC; Inbox placement remains unresolved. See `.agent/mail-verification.md`.

> Current routing and mail policy (15 November 2026): Dutch is the default with unprefixed public URLs; English uses /en. Old /nl URLs redirect permanently. Application forwarding and MAIL_TO have been removed; enquiries go to the configured sending mailbox and forwarding is managed in Hostinger Mail. Earlier entries below document historical migration decisions.

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

## Logo, call-first UX and editorial calendar — 2026-11-15
Both local and example public call/WhatsApp settings are now 0467802090. Production host variables must be changed separately and rebuilt. NL header/footer use the supplied Dutch logo; EN keeps its existing logo. A compact Flanders badge appears next to the header brand on both screen sizes. Main navigation replaces About with Blog; About remains accessible in utility/footer navigation. Calls are primary in the header, hero/shared actions, sidebars and blog. A mobile call bar appears after 240px of scrolling, with safe-area spacing and reduced-motion support.

Six new full bilingual guides replace the matching legacy article content; six additional articles publish automatically at 09:00 Belgian time on the dates below. Other legacy advice routes remain available. The blog hub and sitemap are dynamic. Future article bodies are kept out of client navigation bundles; only slug mappings are used for language switching.

| Publication (Belgian time) | English guide |
| --- | --- |
| 2026-11-15 — available | Bulex F.28 or F.75 in Brussels: what should you do? |
| 2026-11-15 — available | Bulex boiler maintenance in Antwerp: prepare the visit |
| 2026-11-15 — available | No hot water in Ghent: boiler, Opalia or tap problem? |
| 2026-11-15 — available | Bulex pressure keeps dropping in Anderlecht: what to record |
| 2026-11-15 — available | GeniaAir in Leuven: can a heat pump work with your radiators? |
| 2026-11-15 — available | Water leak in Brussels: what information helps a plumber? |
| 2026-11-22 09:00 | Bulex F.29 in Antwerp: why does the flame stop? |
| 2026-11-29 09:00 | Replacing a Bulex ThemaFast in Brussels: what must be checked? |
| 2026-12-06 09:00 | Cold radiators in Ghent while hot water works: where to start |
| 2026-12-13 09:00 | MiGo or MiPro Sense in Leuven: which Bulex control fits? |
| 2026-12-20 09:00 | A noisy Bulex boiler in Anderlecht: what should you report? |
| 2026-12-27 09:00 | Water heater too small in Antwerp? Compare demand before replacing |

## 15 November 2026 — requester confirmation and success scrolling

Updated shared components/bulex/EnquiryForm.tsx for both EN/NL contact and booking pages: scroll and keyboard focus move to the success panel after the request resolves, with reduced-motion support. Success feedback identifies the requester confirmation address when confirmationSent is explicitly true; otherwise the existing partial-delivery warning remains. No backend recipient changes. Regression checks exercise both languages and both request types with distinct visitor recipients.

Verification: 42 automated checks and TypeScript passed. Hostinger deployed d1e5a5c successfully. Production EN browser test confirmed success focus and scroll position at approximately 24px from the viewport top; separate requester email was received in the configured test mailbox's Junk folder. EN/NL share the same component and structure; localized confirmation routing is covered for both languages and contact/booking forms. Screenshot: qa/production-success-scroll.jpg.

## 15 November 2026 — hosted environment and false-success audit

Hostinger environment API listed the required SMTP/contact keys plus obsolete MAIL_TO; values were masked, so equality could not be read back. Reapplied all populated local environment values through Hostinger's full-set environment update, preserving APP_MODE=production (the existing live robots policy permitted indexing). Empty optional fields were omitted because Hostinger rejects empty values. Applied keys: APP_MODE, BULEX_SITE_URL, NEXT_PUBLIC_SUPPORT_EMAIL, NEXT_PUBLIC_PHONE_NUMBER, NEXT_PUBLIC_WHATSAPP_NUMBER, SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_FROM. Obsolete MAIL_TO was removed. Credentials were not committed or included in diagnostic documentation.

Found a separate false-success path: filled hidden website field returned HTTP 200 / ok=true without SMTP. This is intentional bot-discard behavior but can mislead real users if autofill touches the field. The route now returns 422 / FORM_VERIFICATION_FAILED with a request ID and logs the rejection. Shared EN/NL form uses a less autofill-prone company_fax field (with legacy website still checked by the API), displays localized verification errors and diagnostic references, and requires an API request ID before claiming success. Origin/content-type rejections also receive references; Bulex validation failures are logged. This is a confirmed defect, not yet a confirmed explanation of the user's specific missing submission.

Validation: 43 tests and TypeScript pass. Regressions verify both hidden-field names never send mail or claim success. Existing attachment, throttling, timeout, origin, recipient and confirmation-failure checks remain passing. User's submitted name/email/time requested for correlation. Current Hostinger runtime log only exposed the last deployment's successful test; earlier submissions are not established by these logs. Provider spam filtering remains a separate known problem.

### Deployment verification of environment/false-success fix

Hostinger build 01a1e0b6-495f-738e-a461-52bd9f9bb83d deployed commit 6ab7819 successfully. Before deployment, a live request containing only website=Autofilled company returned HTTP 200 / ok=true. After deployment, both website and company_fax cases returned HTTP 422 / FORM_VERIFICATION_FAILED with request IDs, and Hostinger logs recorded verification rejections.

A normal Dutch production browser submission after synchronization succeeded (marker BULEX-ENV-AUDIT-20261115, request 237404fb-b0c4-451d-a6a9-a096aade99d4). Hostinger logs recorded enquiry-accepted, confirmation-accepted and completed. Read-only IMAP confirmed the enquiry and separate confirmation in INBOX.Junk, both addressed to contact@bulex-loodgieter.com. Screenshot: qa/production-env-audit-success.jpg. No claim of Inbox placement or delivery to an external visitor provider is made. The user's own failed test remains uncorrelated pending the requested identifying details.

The www API POST probe followed a canonical-host redirect and returned 405 after method conversion. Normal pages canonicalize to the non-www site and the form uses a relative /api/mail URL; this probe does not establish a defect in the current browser form.

## 16 November 2026 — Google Ads and confirmed outbound block

Installed one consent-gated Google tag AW-11417443258 in the root head lifecycle using Google's current gtm.js snippet (official documentation updated 6 November 2026). Explicit marketing acceptance enables advertising storage/user-data/personalization; analytics stays denied. Declining does not load the tag, withdrawal updates denial and stops application conversion events, and storage failures disable marketing for the session. Existing form and WhatsApp conversion labels remain. EN/NL consent banner, custom choices, reopen button and privacy/cookie notices are mirrored. Consent version increments to 2.

External production API test BULEX-EXTERNAL-20261116 returned HTTP 200 / confirmationSent=true, request a66e6793-87c2-4986-a965-e80c3156141a. The business enquiry was found in Junk. A Returned mail notice in Inbox confirmed downstream rejection of the visitor confirmation: smtp.mailchannels.net returned 550 5.7.1 [CS] Message blocked; transaction 4d1e982f5f28df3c. The MailChannels Insights page showed Blocked (Spam Content). With explicit user approval, submitted Not Spam / Report False Positive; page confirmed Thank you. Your request has been submitted. No separate support message was sent. Screenshot is local-only because it contains the visitor's personal email. No assertion of successful external delivery is made.

44 automated checks and TypeScript pass before deployment. New regression covers no loader before consent, one loader after consent, default denial, and denial after withdrawal or storage failure.

### Production verification — 16 November 2026

Hostinger build 01a1e61b-97bb-739e-aeb4-f186feb9cf2a deployed commit 56f5cf2 successfully. Production EN browser checks: zero googletagmanager scripts before consent and after rejection; reopening Cookie settings, choosing marketing and saving inserted exactly one bulex-google-tag script with the requested AW-11417443258 URL. Withdrawal controls work; screenshot qa/google-ads-consent-live.jpg. No claim of account-side attribution or Tag Assistant verification is made.

Then withdrew marketing consent before a labelled production browser form submission (BULEX-AFTER-REPORT-20261116) to avoid generating a test conversion. The actual form reached success and the business enquiry arrived in INBOX, without X-Spam. The customer confirmation was asynchronously bounced again with 550 5.7.1 [CS] Message blocked, transaction 1bb18af51b9fe092, at 20:49:34 UTC. The earlier false-positive report did not establish successful external delivery. A local-only support draft includes the relevant sender, recipient and transaction details; it has not been sent. Provider action remains required. No further repeated test emails were sent.
