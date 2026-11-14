# Bulex Plombier

A bilingual English and Dutch website for Bulex heating and plumbing services in Belgium. Visitors can review services, heating solutions and service areas, read practical advice, and send an enquiry.

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The default route opens English at `/en`; Dutch is available at `/nl`.

## Website

- English and Dutch pages for services, heating solutions, service areas, advice, contact, booking and legal information.
- Enquiry forms send through the shared SMTP mail handler at `/api/mail`.
- `APP_MODE=development` disables indexing; `APP_MODE=production` enables it.

## Configure

Copy [.env.example](./.env.example) to `.env.local` for local development, or enter the same values in your production host's environment settings. Never upload secrets into the public directory or commit them.

The configuration is grouped in `.env.example`: application mode, company/contact details, SMTP, social media and Google settings. The production essentials are:
- `BULEX_SITE_URL`: your final HTTPS origin.
- `APP_MODE`: `development` for testing, `production` for the live website.
- `NEXT_PUBLIC_SUPPORT_EMAIL`, `NEXT_PUBLIC_PHONE_NUMBER`: public contact details.
- `BULEX_COMPANY_NAME`, `BULEX_COMPANY_NUMBER`, `BULEX_COMPANY_ADDRESS`: registered operator details.
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`: private email credentials.

Mail defaults to port 587 (STARTTLS). Use `SMTP_PORT=465` for implicit TLS. The public support email is the default sender and recipient; only set `MAIL_FROM` or `MAIL_TO` if the sender or enquiry inbox is different. `SMTP_SECURE` is only an override for a nonstandard transport setup.

Public social and Google review links use a single `NEXT_PUBLIC_*` naming scheme, listed in the example. `BULEX_GOOGLE_SITE_VERIFICATION` is an optional Search Console token. Analytics and Google Ads configuration fields are retained in the example. They do not activate tags on their own; no optional tracking is installed by the current site.

### Deploy

1. Configure the variables before running `npm run build`; `NEXT_PUBLIC_*` values are included at build time, so rebuild when they change.
2. Run `npm ci`, `npm run test:bulex`, then `npm run build`.
3. Select the host’s **Next.js** framework preset, build command `npm run build`, and output directory `.next` (or leave the framework default). Run `npm run start` using the host's assigned `PORT`. This Next.js application needs a Node.js server; uploading only static files will not run the enquiry API.
4. Set `APP_MODE=production` and the real `BULEX_SITE_URL` for the live deployment. Use `APP_MODE=development` for staging. Rebuild after changing these settings.

### Removed duplicates

| Old setting | Use instead |
| --- | --- |
| `BULEX_PUBLIC_EMAIL` | `NEXT_PUBLIC_SUPPORT_EMAIL` |
| `BULEX_GOOGLE_REVIEW_URL` | `NEXT_PUBLIC_GOOGLE_REVIEW_URL` |
| `BULEX_INSTAGRAM_URL`, `BULEX_FACEBOOK_URL`, `BULEX_LINKEDIN_URL` | Corresponding `NEXT_PUBLIC_*_URL` |
| `ADMIN_EMAIL` | `MAIL_TO` only if the inbox differs |
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
