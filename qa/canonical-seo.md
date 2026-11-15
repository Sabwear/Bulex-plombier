# Canonical origin and targeted SEO checks — 15 November 2026

Scope: canonical-origin detection and directly related technical SEO defects. This is not a complete content, legal or production-performance audit.

## Confirmed fixes

| Area | Evidence before | Implementation and verification |
| --- | --- | --- |
| Canonical origin | `brand.ts` used a module-level URL falling back to `http://localhost:3000`. | Server request origin resolves current public Host, reverse-proxy public host when Host is internal, validated protocol and local port. HTTP checks passed for localhost:3012 and simulated HTTPS proxy domain heating.example. |
| Consistency | The same static origin fed metadata, JSON-LD, sitemap, robots and discovery text. | All six consumers share the request-origin resolver. Regression tests switch between two domains to check cross-request isolation. |
| Robots caching | robots.ts did not opt into dynamic rendering. | robots.txt now resolves per request, matching the sitemap origin. Indexability remains controlled by existing APP_MODE. |
| Clean public URLs | Canonical path must remain independent of UTM queries and internal rewrites. | Fetched EN/NL HTML with utm_source queries: one canonical per page, clean public paths, matching hreflang and Open Graph URLs, no internal /bulex route prefix. |
| Article previews | All Open Graph images used the homepage hero and default website type. | Articles use their own illustration, article type and configured publication dates. Twitter images match. |
| Detail descriptions | Service/solution descriptions used short card excerpts; every article description gained an ellipsis even when short. | Descriptions summarize actual page text, normalize whitespace and truncate at word boundaries only when needed. |

## Validation

- 33 automated tests pass, including all migrated routes and existing form/mail behavior with mocked SMTP.
- Production Next.js build passes.
- Origin cases include Dutch/English metadata, multiple public domains, localhost and IPv6, proxy hosting, HTTPS/HTTP, conflicting forwarded hosts, malformed hosts and invalid protocol values.
- No public contact configuration or credentials changed. BULEX_SITE_URL remains available as an optional fallback; it is not required for domain detection.
- README documents reverse-proxy header handling and non-indexable preview mode.

## Limits

The bundled robots/redirect scripts could not run because requests is unavailable in the default Python. Direct HTTP requests, Python's standard HTMLParser and application tests supplied evidence instead. Production Search Console indexing, Google-selected canonicals and field Core Web Vitals have not been measured. The hosting proxy should overwrite forwarded headers before passing requests to the application, as documented.

References checked: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls and https://nextjs.org/docs/app/api-reference/functions/generate-metadata
