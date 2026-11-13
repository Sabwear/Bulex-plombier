# Project Summary — `vaillant-plombier`

This repository is a **bilingual (FR/NL) Next.js website** for **Vaillant plumbing/heating services in Belgium**. It is built as a marketing + programmatic SEO site with localized routes, city/commune landing pages, a blog, and contact/quote/intervention forms that can send emails via SMTP.

## Tech stack

- **Next.js**: `^15.5.12`
- **React**: `^19`
- **TypeScript**: `^5`
- **Tailwind CSS**: `^4` (plus project-level utility classes)
- **Email**: `nodemailer`
- **SEO helpers**: `next-seo`

Key scripts:

- **dev**: `npm run dev`
- **build**: `npm run build`
- **lint**: `npm run lint`
- **data validation**: `npm run validate:data` (runs `scripts/validate-communes.ts`)

## High-level architecture

The site uses **Next.js App Router** under `app/` with two top-level locales:

- **French**: `app/fr/...`
- **Dutch**: `app/nl/...`

Locale handling is enforced by:

- `middleware.ts`: redirects `/` (and any non-locale paths) into `/fr` or `/nl` based on cookie and `Accept-Language`, and sets the `NEXT_LOCALE` cookie.
- `config/locale-routes.ts`: maps FR path segments to NL path segments (and vice versa) so route alternates can be computed reliably (including dynamic segments).

There is also a legacy `pages/` directory present, but the primary routing surface is in `app/`.

## Core product surfaces (routes)

### Locale homepages

- `app/fr/page.tsx`
- `app/nl/page.tsx`

These pages share the same overall structure (hero, trust strip, services, proof, service areas, FAQ, etc.) with translated content.

### Programmatic SEO city pages

There are dynamic city landing pages driven by a central data layer:

- FR: `app/fr/plombier/[slug]/page.tsx`
- NL: `app/nl/loodgieter/[slug]/page.tsx`
- Data source: `data/city-data.ts` (loads Brussels communes from `data/communes/*.json` and merges “other Belgian cities”).

`next.config.ts` also defines **permanent redirects** from legacy city URL formats:

- FR legacy: `/fr/plombier-{slug}` → `/fr/plombier/{slug}`
- NL legacy: `/nl/loodgieter-{slug}` → `/nl/loodgieter/{slug}`

### Blog

Blog routes exist under both locales (e.g. `app/fr/blog/...` and `app/nl/blog/...`) and pull content from `data/types` via `getBlogPosts()`.

### Services and static pages

Both locales include equivalents for common pages (services, about, contact, privacy/cookies/legal, quote request).

## Email / forms backend

There is a single App Router API route:

- `app/api/mail/route.ts`

Characteristics:

- **Node runtime** (`export const runtime = "nodejs";`) to support `nodemailer`.
- Accepts **`multipart/form-data`** and supports file attachments under `attachments`.
- Implements a **honeypot** field (`website`) and basic field validation.
- Supports multiple `formType` values, including:
  - `contact` (FR)
  - `intervention` (FR)
  - `quote_fr`
  - `quote_nl`

SMTP config + limits:

- `lib/mail/smtp-config.ts`: loads `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE` and destination addresses.
- `lib/mail/sendViaSmtp.ts`: sends via `nodemailer` and ensures both `MAIL_TO` and `MAIL_FROM` receive submissions (deduplicated).
- Attachment rules: max **5 files**, max **5MB per file**, allow images + PDF.

## Configuration and invariants

### Bilingual consistency (FR/NL)

This project is intentionally bilingual. When editing any layout or content block in one locale, **mirror the equivalent route in the other locale** (same structure/classes/spacing/links/CTA placement; only translated text should differ).

Primary locale routing utilities:

- `config/locale-routes.ts`: segment mapping + alternate locale path generation.
- `middleware.ts`: locale redirect + cookie persistence.

### Secrets and environment variables

Do **not** commit secrets. Local configuration is expected through environment variables (commonly in `.env.local`), including:

- SMTP: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`
- Mail routing: `MAIL_FROM`, `MAIL_TO` (or `ADMIN_EMAIL`)
- Optional public links: e.g. `NEXT_PUBLIC_GOOGLE_REVIEW_URL`

### SEO + images

`next.config.ts` configures:

- allowed image remote patterns (e.g. `images.unsplash.com`)
- fixed quality values for `<Image>`
- permanent redirects for legacy city paths

## Where to look first (for an AI / new contributor)

- **Routing + pages**: `app/fr/**`, `app/nl/**`
- **Locale logic**: `middleware.ts`, `config/locale-routes.ts`
- **Programmatic SEO data**: `data/city-data.ts`, `data/communes/*`
- **Email pipeline**: `app/api/mail/route.ts`, `lib/mail/*`
- **UI building blocks**: `components/**`
- **Project config**: `next.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `tsconfig.json`

## Common change patterns

- **Add a new bilingual page**: create `app/fr/<route>/page.tsx` and `app/nl/<mapped-route>/page.tsx`, and update `SEGMENT_MAP` in `config/locale-routes.ts` if it introduces a new segment pair.
- **Add a new city/commune**:
  - Prefer adding a JSON file under `data/communes/` (for Brussels communes) or extending city lists in `data/city-data.ts`.
  - Run `npm run validate:data`.
- **Add a new form**:
  - Update the client form component(s) to POST `multipart/form-data` to `/api/mail`.
  - Add a new `formType` case in `app/api/mail/route.ts` and keep validation + reply-to rules explicit.

**Credit github.com/sabwear**