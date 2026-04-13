# SEO Action Plan — `https://vaillant-loodgieter.com`

Prioritized for **impact vs effort**. Execute in order.

## Immediate (this week)

1. **Ship `sitemap.xml` + reference it in `robots.txt` (Critical)**
   - **Why**: `/sitemap.xml` is **404**; robots audit shows **no sitemap directive**.
   - **Do**: Generate sitemap including NL/FR routes + priority pages; add:
     - `Sitemap: https://vaillant-loodgieter.com/sitemap.xml`
   - **Verify**: `https://vaillant-loodgieter.com/sitemap.xml` returns **200**; submit in Google Search Console.

2. **Add homepage JSON-LD (Critical)**
   - **Why**: Parsed HTML shows **`schema: []`**; entity checker flags missing Organization/Person JSON-LD.
   - **Do** (JSON-LD only): `Organization` + `LocalBusiness`/`HomeAndConstructionBusiness` (pick the best fit) with:
     - `name`, `url`, `logo`, `image`, `telephone`, `address` (if public), `areaServed`, `sameAs` (social profiles)
     - `WebSite` with `url` (add `potentialAction/SearchAction` **only** if you have real on-site search)
   - **Verify**: Rich Results Test + ensure no placeholders.

3. **Fix social preview tags (High)**
   - **Why**: `og:image` + `og:type` missing; hurts share CTR and tooling confidence.
   - **Do**: Add absolute `og:image` (1200×630), `og:type=website`, `og:locale`, `twitter:image`.

4. **Resolve duplicate homepage indexing signals (High)**
   - **Why**: Duplicate scan flags `/` vs `/nl` as identical content.
   - **Do**: Decide canonical “primary” URL; align:
     - redirects (prefer **301/308** if permanent),
     - canonical tags,
     - internal links (always link to the canonical path).

## Quick wins (1–2 weeks)

5. **Heading structure cleanup (Medium)**
   - **Why**: Homepage shows **3 H1s** in parsed HTML.
   - **Do**: One H1; demote others.

6. **Internal linking improvements (Medium)**
   - **Why**: Crawl sample shows many pages with **≤1** internal inlinks.
   - **Do**: Add contextual links between service pages ↔ city pages ↔ blog posts.

7. **Expand thin content (Medium)**
   - **Why**: Sample page ~177 words flagged.
   - **Do**: Expand with unique local intent sections (FAQ without FAQ schema spam), or `noindex` if not meant to rank.

8. **Security headers (Medium — often platform-level)**
   - **Why**: Security header score **40/100**; missing HSTS and common hardening headers.
   - **Do**: Add HSTS + `X-Content-Type-Options` + `Referrer-Policy` + `Permissions-Policy` (+ clickjacking protection) via hosting/CDN.

## Strategic (2–6 weeks)

9. **Hreflang hardening (Strategic)**
   - **Why**: Tags exist, but return-tag reciprocation wasn’t verified.
   - **Do**: Run bidirectional checks across templates; confirm `x-default` matches your real default market.

10. **Knowledge Graph / E-E-A-T packaging (Strategic)**
   - **Why**: No Wikipedia/Wikidata matches; `sameAs` is empty in schema.
   - **Do**: Legit listings + press/awards + consistent NAP; only add `sameAs` URLs you control.

11. **AI discovery policy (Strategic)**
   - **Why**: `llms.txt` missing; multiple AI bots disallowed.
   - **Do**: Decide whether you want AI citations; if yes, add `/llms.txt` and revisit selective bot rules.

## Measurement checklist (after fixes)

- Search Console: coverage, sitemaps, hreflang errors, page experience (field data)
- Re-run PSI when not rate-limited; track **LCP / INP / CLS**
- Re-run broken link check; manually validate bot-blocked URLs

## Artifacts

- Detailed narrative: `C:\Projects\vaillant-plombier\FULL-AUDIT-REPORT.md`
- Dashboard: `C:\Projects\vaillant-plombier\SEO-REPORT.html`
- Raw evidence: `C:\Projects\vaillant-plombier\.seo-tmp\`
