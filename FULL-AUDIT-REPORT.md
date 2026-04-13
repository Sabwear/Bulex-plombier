# Full SEO Audit Report — `https://vaillant-loodgieter.com`

## Audit Summary

- **Scope**: `full-site` (homepage + shallow crawl signals). Primary URL tested: `https://vaillant-loodgieter.com` (final resolved URL after redirect: `https://vaillant-loodgieter.com/nl`).
- **Business type detected (Likely)**: Local service business — Vaillant heating/plumbing services in Belgium (NL/FR site signals).
- **Overall SEO health (directional)**: **64/100** (from generated dashboard `SEO-REPORT.html`). **Score confidence: Medium** — Core Web Vitals lab data was **not available** in this run due to PageSpeed Insights rate limiting.
- **Top 3 issues**
  1. **No XML sitemap at `/sitemap.xml` (404)** — hurts discovery, indexing efficiency, and hreflang/sitemap alignment checks.
  2. **No JSON-LD structured data detected on homepage (`schema: []`)** — misses high-value rich-result eligibility for local services (Organization/LocalBusiness + WebSite).
  3. **Social sharing metadata is incomplete** — missing required Open Graph fields (`og:image`, `og:type`), reducing CTR on shares and weakening SERP-adjacent signals.
- **Top 3 opportunities**
  1. Add **JSON-LD** for **Organization/LocalBusiness**, **WebSite** (optionally with `SearchAction` if you truly have on-site search), and **BreadcrumbList** on interior pages.
  2. Publish a real **`/sitemap.xml`** and reference it from `robots.txt` (your robots audit flagged **no sitemap directive**).
  3. Tighten **on-page structure** (multiple H1s on homepage) and **internal linking** to reduce “single-inlink” pages surfaced by the internal link scan.

## Environment Limitations

- **PageSpeed Insights**: rate-limited during automated checks; this report **does not include verified LCP/INP/CLS** values from PSI for this session.
- **Automated link checker caveats**:
  - Cloudflare **email protection** URLs under `/cdn-cgi/l/*` may appear as “404” to bots even when the on-page experience is fine.
  - `twitter.com` may return **403** to automated fetchers; that is not always equivalent to a user-facing broken link.

## Measured Evidence Highlights (Scripts)

- **Redirect chain**: `307` from apex → `/nl`, then `200` (see `.seo-tmp/redirect.out.txt`).
- **Robots**: `200`, but **no sitemap directive**; multiple AI crawlers explicitly disallowed (see `.seo-tmp/robots.out.txt`).
- **`llms.txt`**: **404** (see `.seo-tmp/llms.out.txt`).
- **`/sitemap.xml`**: **404** (verified via HTTP check in this audit session).
- **Security headers score**: **40/100**; missing HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` (see `.seo-tmp/security_headers.out.txt`).
- **Social meta score**: **46/100**; missing `og:image` + `og:type`; `og:title` length flagged (see `.seo-tmp/social_meta.out.txt`).
- **Homepage HTML parse (key fields)**:
  - Title: “Vaillant Loodgieter België | Herstelling & Installatie Verwarming”
  - Meta robots: `index, follow`
  - Canonical: `https://vaillant-loodgieter.com/nl`
  - **H1 count**: **3** (usually better as **one** primary H1)
  - **JSON-LD**: **none detected** (`schema: []` in `.seo-tmp/parse.json`)
- **Duplicate content sample (15 pages)**: exact duplicate group `https://vaillant-loodgieter.com` vs `https://vaillant-loodgieter.com/nl` flagged (see `.seo-tmp/duplicate_content.json`).
- **Internal links (depth 1 / 20 pages)**: **19** “potential orphan” pages (≤1 inlinks) — treat as **Hypothesis** until verified with deeper crawl + analytics (see `.seo-tmp/internal_links.out.txt`).
- **Broken links JSON**:6 “broken” — includes **Twitter403** + **Cloudflare email-protection paths** (see `.seo-tmp/broken_links.clean.json`).
- **Entity graph signals**: **No Organization/Person JSON-LD**; no Wikidata/Wikipedia matches for extracted entity name (see `.seo-tmp/entity_checker.json`).
- **Hreflang**: tags present (`fr-be`, `nl-be`, `x-default`) but **return-tag verification not executed** (checker recommends `--verify-returns`) (see `.seo-tmp/hreflang.json`).
- **Readability (homepage extract)**: Flesch reading ease **24.2** (“Very Difficult”) — treat as **Likely** signal (extraction can merge layout text oddly); still worth simplifying copy where possible (see `.seo-tmp/readability.json`).

## Findings Table

| Area | Severity | Confidence | Finding | Evidence | Fix |
|---|---|---|---|---|---|
| Technical SEO / Indexing | Critical | Confirmed | XML sitemap missing | HTTP **404** for `https://vaillant-loodgieter.com/sitemap.xml` | Generate & publish `sitemap.xml`; submit in Search Console; add `Sitemap:` line in `robots.txt` |
| Technical SEO | Warning | Confirmed | `robots.txt` has no sitemap directive | `.seo-tmp/robots.out.txt` lists “No Sitemap directive found” | Add `Sitemap: https://vaillant-loodgieter.com/sitemap.xml` |
| Technical SEO | Warning | Confirmed | Homepage redirect uses **307** to `/nl` | `.seo-tmp/redirect.out.txt` shows `307` hop | Prefer **301/308** for canonical locale migration if this is permanent |
| On-page SEO | Warning | Confirmed | Multiple **H1** elements on homepage | `.seo-tmp/parse.json` shows **3** H1 strings | Restructure: one H1; demote others to H2/H3 |
| On-page SEO | Warning | Confirmed | Open Graph incomplete (`og:image`, `og:type`) | `.seo-tmp/social_meta.out.txt` | Add absolute `og:image` (1200×630), set `og:type` (usually `website`), add `og:locale` |
| On-page SEO | Warning | Likely | `og:title` flagged as long | `.seo-tmp/social_meta.out.txt` | Shorten title for social (≤ ~60 chars) while keeping SEO title intentional |
| Structured Data | Critical | Confirmed | No JSON-LD entities detected | `.seo-tmp/parse.json` → `"schema": []` + `.seo-tmp/entity_checker.json` | Add JSON-LD: `LocalBusiness`/`HomeAndConstructionBusiness` + `Organization` + `WebSite` |
| Content | Critical | Confirmed (sample) | Exact duplicate content signal between `/` and `/nl` | `.seo-tmp/duplicate_content.json` | Consolidate indexing: consistent canonicals + redirects; ensure only one “primary” URL |
| Content | Warning | Confirmed (sample) | Thin page detected (177 words) | `.seo-tmp/duplicate_content.json` | Expand with unique local intent content or `noindex` if not meant to rank |
| International SEO | Info | Confirmed | `x-default` points to **French** | `.seo-tmp/hreflang.json` shows `x-default → /fr` | Decide market default; align `x-default` with true default audience |
| International SEO | Info | Hypothesis | Return tags not verified | `.seo-tmp/hreflang.json` recommends `--verify-returns` | Run bidirectional hreflang verification across templates |
| Linking | Warning | Hypothesis | Many pages with ≤1 internal inlinks | `.seo-tmp/internal_links.out.txt` | Add contextual internal links among service + city pages |
| Linking | Info | Hypothesis | Automated “broken” includes bot-blocked/CF paths | `.seo-tmp/broken_links.clean.json` | Manually verify; don’t “fix” Twitter 403 as a real user break |
| AI Search / GEO | Warning | Confirmed | `llms.txt` missing | `.seo-tmp/llms.out.txt` | Add `/llms.txt` with brand summary + key URLs |
| AI Search / GEO | Info | Confirmed | Major AI crawlers blocked | `.seo-tmp/robots.out.txt` | Decide policy; blocking reduces AI citation/training reach |
| Performance | Info | Hypothesis | PSI not retrieved (rate limit) | `.seo-tmp/pagespeed.desktop.json` / mobile attempts | Re-run PSI later or use CrUX field data in Search Console |

## Category Scorecard (Directional)

| Category | Score band | Notes |
|---|---:|---|
| Technical SEO | 55–65 | Sitemap missing + robots sitemap directive missing are major gaps |
| On-page SEO | 60–70 | Baseline metadata exists; OG incomplete; multiple H1s |
| Content | 55–70 | Good topical breadth signals on homepage; duplicate/thin flags in sample |
| Structured Data | 25–40 | JSON-LD absent |
| Performance (CWV) | Unknown | PSI rate-limited in this session |
| Internal linking | 60–70 | Strong link volume; orphan warnings need deeper validation |
| GEO / AI readiness | 45–60 | `llms.txt` missing; restrictive robots for AI bots |

## Generated Artifacts

- `C:\Projects\vaillant-plombier\SEO-REPORT.html` (interactive dashboard; overall score reported as **64/100**)
- `C:\Projects\vaillant-plombier\.seo-tmp\` (raw script outputs used as evidence)
