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
- The site stays `noindex` with an empty sitemap until a production URL and launch approval are configured.

## Configure

Create `.env.local` for local or deployment-specific values. Do not commit credentials.

For a production launch, set:

- `BULEX_SITE_URL`: the final HTTPS origin, without a trailing slash.
- `BULEX_LAUNCH_READY=true`: enables indexing and sitemap entries after the site has been reviewed.

Optional public business details:

- `BULEX_PUBLIC_EMAIL`
- `BULEX_COMPANY_NAME`
- `BULEX_COMPANY_NUMBER`
- `BULEX_COMPANY_ADDRESS`
- `NEXT_PUBLIC_PHONE_NUMBER`

Email delivery uses `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`, `MAIL_FROM` and `MAIL_TO`. Configure real company and mail details before launch.

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
