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
