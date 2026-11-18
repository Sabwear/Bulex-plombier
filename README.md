# Bulex Plombier

A bilingual English and Dutch website for Bulex heating and plumbing services in Belgium. Visitors can review services, heating solutions and service areas, read practical advice, and send an enquiry.

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Dutch is the default at `/`; English is available at `/en`. Existing `/nl/...` links redirect to the unprefixed Dutch pages.

## Website

- English and Dutch pages for services, heating solutions, service areas, advice, contact, booking and legal information.
- Enquiry forms send through the shared SMTP mail handler at `/api/mail`.
- `APP_MODE=development` disables indexing; `APP_MODE=production` enables it.

## Configure

Copy [.env.example](./.env.example) to `.env.local` for local development, or enter the same values in your production host's environment settings. Never upload secrets into the public directory or commit them.

The configuration is grouped in `.env.example`: application mode, company/contact details, SMTP, social media and Google settings. The production essentials are:
- `BULEX_SITE_URL`: optional fallback origin when request headers are unavailable. Public canonical, hreflang, social, schema, sitemap and robots URLs normally detect the current domain automatically. Leave this blank for automatic detection.
- `APP_MODE`: `development` for testing, `production` for the live website.
- `NEXT_PUBLIC_SUPPORT_EMAIL`, `NEXT_PUBLIC_PHONE_NUMBER`: public contact details.
- `BULEX_COMPANY_NAME`, `BULEX_COMPANY_NUMBER`, `BULEX_COMPANY_ADDRESS`: registered operator details.
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`: private email credentials.

Mail defaults to port 587 (STARTTLS). Use `SMTP_PORT=465` for implicit TLS. The public support email is the default sender and recipient; only set `MAIL_FROM` if the sending mailbox differs. Enquiries go directly to that mailbox; configure any forwarding in Hostinger Mail. `SMTP_SECURE` is only an override for a nonstandard transport setup.

Public social and Google review links use a single `NEXT_PUBLIC_*` naming scheme, listed in the example. `BULEX_GOOGLE_SITE_VERIFICATION` is an optional Search Console token. Analytics and Google Ads configuration fields are retained in the example. These environment fields do not activate tags on their own. The shared layout now installs Google Ads AW-11417443258 only after advertising consent; Google Analytics remains uninstalled.

### Deploy

1. Configure the variables before running `npm run build`; `NEXT_PUBLIC_*` values are included at build time, so rebuild when they change.
2. Run `npm ci`, `npm run test:bulex`, then `npm run build`.
3. Select the host’s **Next.js** framework preset, build command `npm run build`, and output directory `.next` (or leave the framework default). Run `npm run start` using the host's assigned `PORT`. This Next.js application needs a Node.js server; uploading only static files will not run the enquiry API.
4. Set `APP_MODE=production` for the live deployment. The public domain is detected from the request; `BULEX_SITE_URL` is only an optional fallback. Use `APP_MODE=development` for staging. Rebuild after changing these settings.

### Removed duplicates

| Old setting | Use instead |
| --- | --- |
| `BULEX_PUBLIC_EMAIL` | `NEXT_PUBLIC_SUPPORT_EMAIL` |
| `BULEX_GOOGLE_REVIEW_URL` | `NEXT_PUBLIC_GOOGLE_REVIEW_URL` |
| `BULEX_INSTAGRAM_URL`, `BULEX_FACEBOOK_URL`, `BULEX_LINKEDIN_URL` | Corresponding `NEXT_PUBLIC_*_URL` |
| `ADMIN_EMAIL` / `MAIL_TO` | Removed; manage forwarding in Hostinger Mail |
| `SITE_BRAND` | Removed; this checkout serves Bulex |
| `BULEX_LAUNCH_READY` | Replaced by `APP_MODE` |

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local site |
| `npm run build` | Create the production build |
| `npm run start` | Serve the production build |
| `npm run test:bulex` | Run Bulex route, content and enquiry tests |
| `npm run validate:data` | Validate the shared city and commune data |

`npm run dev:bulex`, `npm run build:bulex` and `npm run start:bulex` are equivalent Bulex-specific commands.

## Project map

- `app/bulex/[locale]/[[...path]]/page.tsx`: public page rendering and metadata.
- `middleware.ts` and `config/bulex/middleware.ts`: language routing and legacy URL redirects.
- `config/bulex/`: Bulex copy, services, advice and route definitions.
- `components/bulex/`: public site components and styles.
- `data/city-data.ts`: city and service-area records used by the Bulex pages.
- `app/api/mail/` and `lib/mail/`: enquiry validation and email delivery.
- `tests/bulex.test.cjs`: focused checks for routes, content and form behavior.

French URLs are legacy-only and redirect to the corresponding English page when available. The public site supports English and Dutch; older source files remain in the repository for compatibility and shared data.

See [BULEX-MIGRATION.md](./BULEX-MIGRATION.md) for deployment notes and [design-qa.md](./design-qa.md) for the visual QA record.

## Contact widget

The floating WhatsApp widget uses `NEXT_PUBLIC_WHATSAPP_NUMBER`. The call buttons use `NEXT_PUBLIC_PHONE_NUMBER`, and public email uses `NEXT_PUBLIC_SUPPORT_EMAIL`. Set each independently in your environment. Belgian local numbers, +32 and 0032 formats are supported; links use international digits. Missing phone/WhatsApp settings hide their actions. Rebuild after changing public environment values. Hover or keyboard focus expands the help label; reduced-motion disables the pulse.

## Blog publication schedule

The new blog hub has six published EN/NL guides and six fully written weekly articles in `config/bulex/blog-posts.json`. Each entry has one `publishAt` timestamp with a Belgian timezone offset. The scheduled posts release on 22 and 29 November, then 6, 13, 20 and 27 December 2026 at 09:00 Belgian time.

The hub, article resolution and sitemap check these dates on the server. Future article URLs return 404 and stay out of public lists and sitemap until publication. Pages and sitemap render dynamically, so no weekly rebuild or cron job is required on the Node.js deployment. Existing advice URLs remain available for compatibility. To change a release date, edit `publishAt` and redeploy the source.

The Dutch logo is `public/bulex/loodgieter-logo.webp`; English retains `plombier-logo.webp`. The Flanders header badge is `public/bulex/flanders.webp`. Both phone settings are configured as `0467802090`; update the same env values on your production host and rebuild to apply them there.

### Automatic SEO origin

SEO URLs are resolved per request on the server. A public `Host` takes precedence; when the application receives an internal host, the proxy's single `X-Forwarded-Host` value supplies the public host. `X-Forwarded-Proto` supplies HTTP/HTTPS, with HTTPS as the public-domain default and HTTP for local development. Configure the hosting proxy to overwrite these headers rather than pass arbitrary client-supplied values through. Host values containing paths, credentials, query strings or multiple authorities are rejected. Request paths come from the public EN/NL route, so tracking parameters and internal `/bulex` rewrites do not enter canonical URLs. Preview environments should use `APP_MODE=development` to remain non-indexable.

### Email delivery and uploads

Run `npm run check:mail` in the deployment environment to verify the configured SMTP host, encrypted connection and authentication. This read-only command sends no email and prints no credentials. An SMTP acceptance is not proof of inbox delivery: check the sending mailbox, spam/quarantine and provider delivery logs for the actual test submission, plus SPF/DKIM/DMARC on the sender domain. Live verification on 15 November 2026 passed SMTP TLS/authentication and delivered a real contact request plus its Dutch confirmation to contact@bulex-loodgieter.com. The actual production browser form was also tested twice: both submissions succeeded but landed in Junk, with SPF, DKIM and DMARC passing. Six test messages were manually recovered to Inbox; a targeted mail filter was ineffective and is disabled. Automatic Inbox placement remains unresolved; see `.agent/mail-verification.md` for the evidence and follow-up.

Enquiries go directly to the configured sending mailbox (MAIL_FROM, with the existing support-email/SMTP-login fallback). There is no application forwarding, CC, BCC or extra recipient list. Hostinger Mail manages forwarding rules. Customer confirmation is a separate send. The API requires SMTP acceptance for the intended recipients before returning success; a failed confirmation is reported as confirmationSent:false while keeping the already-accepted enquiry successful. Errors log only a request reference, stage and safe SMTP codes, with no submitted personal data or credentials.

Attachments: at most five JPEG, PNG, GIF, WebP or PDF files; 5 MB per file and 10 MB total. The request reader caps the entire multipart body at 11 MB before parsing, including when Content-Length is absent or false. Filename, extension, declared MIME and file signatures must agree; paths, executable double extensions and empty MIME types are refused. Attachment names are normalized. Files are never written to public storage or executed; Nodemailer can use only supplied buffers, not filesystem paths or remote URLs. Signature checks do not replace malware scanning or full document sanitization. Treat received documents as untrusted, and retain the mailbox provider's malware filtering.

The endpoint refuses cross-site browser submissions and header-injection/duplicate fields. Bounded in-memory rate limits cover client requests and confirmation recipients; at most three requests process concurrently per Node process. The hosting proxy must overwrite client-IP/forwarded headers and enforce an upload size limit. For multiple workers or replicas, apply shared edge/WAF rate limits as well; process-local counters are not a distributed abuse-control service.

### Dutch default URLs

Dutch pages use `/`, `/diensten`, `/oplossingen`, `/loodgieter`, `/blog` and other unprefixed routes. English stays under `/en`. Old `/nl/...` URLs permanently redirect to their Dutch equivalent, preserving query strings; the language switcher maps the current page and article slug. Canonicals, hreflang (including Dutch x-default), sitemap and structured data use these public URLs. Browser-language detection on the homepage remains available with Dutch as the fallback and explicit language choices taking precedence.

### Requester confirmations and success navigation

Contact and booking requests send a separate localized confirmation, including the submitted request, to the visitor's email address. After success the shared EN/NL form scrolls to and focuses its success panel. Reduced-motion users get immediate scrolling. The panel shows the submitted email address only when the API confirms SMTP acceptance; confirmation failure keeps the accepted enquiry successful and explains that no resubmission is needed. Provider spam filtering can still affect delivery.

Hidden anti-spam fields now reject with FORM_VERIFICATION_FAILED and a request reference rather than returning fake delivery success. Browser autofill must leave these fields blank. The shared Bulex form uses company_fax; the API also checks the legacy website field. Hosted SMTP/contact settings were resynchronized from the local working configuration on 15 November 2026, keeping production mode. Hostinger masks values on read, so synchronization establishes the desired values rather than proving the previous values matched.

### Google Ads and delivery investigation — 16 November 2026

The global head integration loads one Google tag using the supplied current snippet URL (`https://www.googletagmanager.com/gtm.js?id=AW-11417443258`) after explicit marketing consent. Consent defaults are denied before tag initialization. Acceptance, custom preferences and withdrawal are available in EN/NL; consent policy version 2 requests a new choice from existing visitors. Google Analytics stays denied. Existing form/WhatsApp conversion action labels are preserved and gated by consent. No email addresses or form text are supplied to conversion events. Cookie settings remain reopenable after dismissal. Verify account-side destinations and conversions in Google Tag Assistant; loading the script alone does not prove Google Ads attribution.

An external-recipient production test on 16 November established an asynchronous delivery failure: Hostinger initially accepted both sends, then MailChannels bounced the customer confirmation with `550 5.7.1 [CS] Message blocked`. The business enquiry reached Junk. SMTP acceptance cannot guarantee downstream delivery; the provider report was submitted with the user's approval. Provider remediation and a subsequent external delivery check are required. Do not describe the transport as fully fixed merely because the API returned success.

### SEO audit and indexing policy (16 November 2026)

See [the current audit](FULL-AUDIT-REPORT.md) and [action plan](ACTION-PLAN.md); the older Vaillant report is historical. The sitemap contains canonical published EN/NL URLs with reciprocal language alternates. Only areas with both a Dutch property profile and English translated profile are indexed; other area pages remain available with `noindex,follow`. Add genuine bilingual local detail before changing this gate in `config/bulex/indexability.ts`.

Robots permits public `/bulex/` image assets. Reviews require a source URL and no sample testimonials are published. The advice hubs link older guidance, and business schema uses configured identity/contact details without invented address or ratings.

Reproduce the HTTP sitemap audit with `python3 scripts/audit-seo.py http://localhost:3100 --output /tmp/bulex-seo-crawl.json` against a running production build. Evidence and sitemap structure are saved under `seo-evidence/2026-11-16/`. Live Cloudflare email protection and Search Console/CWV follow-ups remain in the action plan.

The SEO release `a684ca7` was confirmed deployed by Hostinger and passed a live 126-URL sitemap crawl. Public email anchors now use the shared `EmailLink` component with Cloudflare's documented `email_off` exemption, keeping native `mailto:` destinations available without a decoder. EN/NL footer, contact, booking and legal pages use the same implementation. Regression checks cover HTML escaping and exemption markers.

## Search Console execution result

Authenticated Search Console submission completed on 16 November 2026. The sitemap details report confirms **Sitemap processed successfully**, last read 16 November 2026, and **126 discovered pages**. The initial temporary fetch warning cleared when processing completed. Screenshot: `seo-evidence/2026-11-16/search-console-submitted.jpg`. This supersedes earlier notes that submission access was unavailable. Search performance and index coverage are still processing; sitemap discovery is not proof that all pages are indexed.

## Final production verification

Hostinger completed build `01a1e660-6555-7063-a94d-1ca82ef7b59d` for code commit `489bc4c`. All eight checked EN/NL homepage, contact, booking and legal URLs return HTTP 200 with native mailto destinations and no Cloudflare email-protection rewrite (evidence: `seo-evidence/2026-11-16/live-email-links.json`). The email follow-up and sitemap submission are complete. Tests: 46 passed; production build passed. Google reports 126 sitemap pages discovered; actual indexing, performance reports and PageSpeed measurements remain pending. Earlier open deployment/email/submission notes above are superseded by these verified results.

### Current indexing policy: all published pages

At the owner's request, all 45 existing cities in EN/NL are eligible for indexing; the sitemap includes all 178 currently published canonical routes. This supersedes the earlier bilingual-profile indexing gate. Future scheduled guides remain excluded until publication. Private endpoints and invalid URLs are excluded. `config/bulex/indexability.ts` now checks city existence only; the same policy applies to both languages. Actual Google indexing depends on crawling and selection, not only the index directive.

Measured SEO follow-up: shared footer links have a 32px minimum target height, llms.txt uses descriptive Markdown links, and the first hero image has explicit high fetch priority. Browser PageSpeed baseline on /en measured mobile 98 Performance / 96 Accessibility / 100 Best Practices / 100 SEO; field Core Web Vitals data is insufficient. 46 tests and production build pass.

Hostinger may serve `public/llms.txt` before Node middleware. Keep this static Markdown fallback aligned with `app/bulex-meta/route.ts`; relative links preserve the serving domain and Dutch unprefixed routes.

## All-published-pages execution result

The live sitemap now contains 178 canonical published URLs; the complete crawl passes with no failed/redirected/noindex URLs, duplicate metadata, missing descriptions or canonical mismatches. Google Search Console reports Success and 178 discovered pages. Both homepage crawl/indexing requests were accepted. The Dutch homepage is confirmed indexed; English was discovered but not yet indexed at inspection. This is an indexing request for the site, not a claim that all 178 URLs are already in Google.

Measured follow-up fixes are live: first hero fetch priority is high; EN/NL mobile checks at 390px confirm 32px footer targets and no horizontal overflow; hosted llms.txt now contains correct Markdown links and current language paths. Final code release: d032056, Hostinger build 01a1e66c-81f6-70e7-ad75-bb56c624b7ab. Evidence: all-published-live-crawl.json, all-178-google-submitted.jpg, en-indexing-requested.jpg, mobile-footer-verified.jpg, llms-final.txt and final-checks.json under seo-evidence/2026-11-16.

Delivery checks PASS: 46 tests and production build; complete live sitemap crawl; matching shared EN/NL changes; mobile target dimensions and overflow measured; no invented credentials, address, dates or reviews. Remaining work needs Google processing/usage data or real business/editorial information. The PageSpeed baseline remains 98 Performance / 96 Accessibility / 100 Best Practices / 100 SEO; no unmeasured post-fix score is claimed.

### Contact autofill fix

The contact error reference `5178b01e-57fb-4949-84a8-de06c39e8f56` was a pre-SMTP verification rejection: an off-screen anti-spam text field was filled. The shared EN/NL contact and booking form no longer includes that browser-autofill target. Existing server origin/rate/field/upload checks remain, and direct legacy trap submissions still reject. SMTP connection and authentication passed without changing environment values. See `qa/contact-autofill-fix.md` for evidence and validation. Reload an already-open form to load the corrected version.

Production verification of the autofill fix passed: the Dutch browser contact submission reached success and Hostinger logged SMTP acceptance for enquiry and confirmation. Code release `c92d5b7`; evidence in `qa/contact-autofill-fix.md` and `qa/contact-autofill-fixed-live.jpg`. All 47 tests and production build pass. SMTP acceptance does not establish Inbox placement.

### Readable sitemap and original article covers (17 November 2026)

Use `/sitemap` for a readable, responsive view grouped by topic. `/sitemap.xml` stays the search-engine endpoint and adds an optional XSL presentation for compatible browsers. Edge/Chrome are retiring XSLT, so the HTML view remains available independently. Both use `config/bulex/sitemap.ts`; canonical URLs, language alternates and scheduled publication are preserved.

Blog imagery now uses 22 distinct generated topic illustrations under `public/bulex/blog/`, including scheduled posts and older advice. EN/NL article variants share the matching cover; other topics no longer reuse homepage photos. Images are illustrations rather than actual job photographs. Provenance: `public/bulex/blog/asset-sources.json`. QA and priorities: `qa/sitemap-and-blog-images.md` and `qa/seo-improvements.md`.

The newer returned-mail screenshot confirms MailChannels rejected an external confirmation after SMTP acceptance. This differs from the fixed contact-form autofill rejection; see `qa/mailchannels-followup.md`. Provider review remains necessary and no successful external delivery is claimed.

Production verification passed for sitemap/image release `0966383`: `/sitemap` shows all 178 links, XML retains 178 entries and 534 language alternates, and all 22 new WebP assets return HTTP 200. Hostinger build `01a1e6da-02ba-7239-9e5b-1c76513f7de9` completed. Evidence: `qa/sitemap-images-live-checks.json` and `qa/sitemap-readable-live.jpg`.

### Google Ads website phone conversion (18 November 2026)

The global consent-gated Google tag now configures `AW-11417443258/sMZZCOKQqpscELq3ocQq` with `phone_conversion_number: '+32467802090'` immediately after tag initialization. It applies to both languages through the shared root integration and runs once per document after marketing consent. Existing form/WhatsApp conversions remain separate. See `qa/google-phone-conversion.md`; actual forwarding-number replacement and call attribution need account-side verification.

Phone-conversion code `35b0cfa` is deployed (Hostinger build `01a1ef6f-2602-732c-8cd2-ec1a227b71b9`). Exact label and number are present in the served root-layout bundle; browser consent checks confirm zero loaders while declined and one after acceptance. See `qa/google-phone-live-checks.json`. This verifies installation, not a real attributed call.
