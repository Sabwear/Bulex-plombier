# Current Bulex SEO action plan

16 November 2026. This replaces the earlier location-indexing restriction at the owner's explicit request to index every published page.

## Implemented

- All 45 existing service areas in both languages are eligible for indexing (90 area URLs). Production sitemap should contain 178 canonical published pages at the current publication date.
- Removed the local-detail indexing restriction; both languages use the same policy. Content quality remains an editorial improvement, not an indexing block.
- Scheduled unpublished articles remain unpublished; invalid URLs, API endpoints and internal rewrite paths are not public indexable pages.
- Valid XML, reciprocal language alternates, actual article dates, canonical URLs, crawlable public images, native email links, sourced reviews and business schema remain in place.
- 46 automated tests and production build pass for this policy change.

## Production execution

Push to the existing GitHub/Hostinger automatic deployment, verify all sitemap URLs live, and resubmit the expanded sitemap in Search Console. Request indexing through URL inspection where Google's quota permits. A request or sitemap submission is not a guarantee that Google indexes every URL.

## Remaining external dependencies

- Search Console Page indexing report currently says “Processing data, please check again in a day or so”. No exclusion reasons are available yet.
- Check Core Web Vitals report; PageSpeed API previously rate-limited. Record measured results only.
- Actual indexing and performance can only be confirmed once Google processes the site.

## Editorial work

The owner has already confirmed authorized partner status in BULEX-MIGRATION.md. Registered identity/address and review sources must come from real business records. Do not invent them. Improve repetitive city descriptions and older short advice with original reviewed information; all published areas remain eligible for indexing as requested.
