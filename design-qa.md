# Bulex implementation QA

final result: blocked

## Source and comparison state
Source visual truth: approved homepage image attached to the task (1024 × 1536 pixels). Desktop layout includes two-level header, red split hero, six services, three-column partner section, three heating solutions, advantages/lifestyle/areas, reviews, red CTA and white footer. The user's additional spacing requirement calls for 88–112px between main desktop sections.

Implementation: app/bulex/[locale]/[[...path]]/page.tsx and components/bulex. No browser-rendered implementation screenshot could be captured. Starting Next on both 0.0.0.0:3001 and 127.0.0.1:3001 failed with listen EPERM. No implementation viewport or density normalization is therefore claimed; full-view and focused-region comparison remain blocked.

## Required fidelity surfaces
- Typography: Arial used, confirmed from computed heading styles on official bulex.be. Heading hierarchy and weights implemented but wrapping needs browser verification.
- Spacing/layout: scoped 1240px container, desktop section gaps around 104px, responsive 2/3/6-column service grids, stacked mobile hero. Layout overflow and visual rhythm unverified in a browser.
- Color: approved mockup red #D50032, white, near-black, neutral borders. Kept mockup red CTAs rather than copying the current official site's blue utility buttons. Hover/focus states implemented, not browser-tested.
- Images: original Bulex logo and real source photography downloaded and optimized to local WebP. No mockup crops or generated product logos. Product/lifestyle photographs differ from the mockup; genuine source photography takes precedence. No rendered crop assessment yet.
- Copy: EN/NL dictionaries, default English, no fabricated reviews, rating stars, 24/7 or fixed response promises. Reviews section always present; a feedback invitation is shown until genuine sourced testimonials are available. Company legal identity and final domain require verified deployment configuration.

## Findings
- P1: Browser visual comparison and interaction QA blocked by local server permission. Run npm run dev and inspect /nl and /en before acceptance.
- P2: Exact photo composition differs from generated reference. Assess real-asset cropping at desktop and mobile widths during visual QA.
- Launch blocker: verified company identity, final origin and real SMTP delivery still require review. Preview stays noindex until explicitly configured ready.

## Verification completed
TypeScript and both brand production builds passed. Sixteen automated checks pass, including server-side rendering of all 172 migrated EN/NL routes and SMTP envelope branding. This is not browser-rendered evidence. Final results are tracked in BULEX-MIGRATION.md. Tests cover redirect identities, all service/solution/advice locale links, city link preservation, asset bypass, internal route guard, server validation, consent, attachments, honeypot, bilingual confirmations and original NL contact flow using a mocked mail transport. No real email sent.

## Comparison history
No visual comparison iterations claimed. Automated tests found and resolved a water-heater service/solution slug collision and an image-path guard collision. These are functional fixes, not visual QA passes.

## Remaining checklist
1. Launch the isolated Bulex preview.
2. Capture /en at 1024px and compare side by side with the supplied reference; check hero, partner and product crops.
3. Inspect /nl and /en at 390px, 768px and 1440px, including menu, dropdown keyboard access, forms and city search.
4. Inspect browser console, image loading and horizontal overflow.
5. Run a deliberately authorized real email delivery test and confirm company details before launch.

## Latest changes awaiting browser QA
Bulex is now the default and only public brand, with English default routing. Hero now has three synchronized slides, separate text/image fades, navigation dots/arrows, autoplay without a play/pause button, and reduced-motion support. All three generated service/lifestyle photographs are integrated and optimized as WebP. Production build and all 16 tests pass after these changes. Verify actual autoplay timing, focus pause, mobile crops and no layout shift when the preview can run.

Header updated after inspecting the official Bulex site: grey utility strip, white navigation row, understated navigation and blue booking CTA. Main roof logo uses the user-supplied Downloads asset; the dark footer uses a generated transparent light variant. Three explicitly labeled illustrative review cards are shown only while the genuine reviews array is empty. Browser verification remains blocked by the local server permission restriction described above.

## Approved internal section revision — 2026-11-14
final result: blocked
Reworked partner/solutions/benefits/area/review composition to match the supplied cropped reference. Added generated red-accent technician, boiler, water-heater and decorative map assets; retained existing heat-pump and lifestyle photography. Sample reviews remain explicitly labeled.
18 automated checks and production build pass. A production preview now starts on port 3001, but /en returns a plain-text routing 404 in the browser; screenshot comparison remains blocked. Exact visual fidelity has not been verified.

Latest bottom revision follows the new white-footer reference, superseding the earlier dark-footer request: compact review cards, red contact strip with pale bird motif, five footer columns, vertical separators and legal row. Verified social links render only when BULEX_INSTAGRAM_URL, BULEX_FACEBOOK_URL or BULEX_LINKEDIN_URL are configured. Root / now always redirects to /en; explicit Dutch URLs remain available. All 18 tests pass. Visual comparison remains unverified due to the preview routing issue recorded above.

Editorial/policy update: expanded EN/NL main and detail pages; unique metadata and main headings; linked privacy/cookies/terms/legal/consumer/accessibility pages. Native consent dialog, same-level accept/reject, six-month necessary preference storage and marketing-event gate added. Build and 22 checks pass. Visual cookie-banner review remains blocked by local EMFILE watcher failures; no legal certification or visual pass is claimed.

CTA refinement: red calendar booking button restored in the header; bottom contact strip now uses explicit copy/action columns, larger heading, matched action sizes, white booking button, white outlined call button with inset keyline, and responsive stacking. Shared CTA has an accessible section label. Visual comparison remains blocked as recorded above.

Review carousel revision: nine labeled examples; mouse drag, native touch swipe, automatic paging and dot navigation, with reduced-motion and interaction pauses. Google review action requires the verified business URL. Server-rendered tests check example/real-review separation. Production build passes; interactive browser verification remains outstanding due to the previously recorded preview issues.
