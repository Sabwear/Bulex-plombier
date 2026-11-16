# Sitemap validation

Before: 178 unique URLs, valid sitemap XML. After: 126 unique URLs, valid sitemap XML; 52 low-information area URLs excluded and noindexed in matching pages.

The complete production-build HTTP crawl passed: no failures, redirects, mismatched canonicals, noindex entries, duplicate titles/descriptions or missing image alt attributes. Homepage trailing slash is normalized for canonical comparison. Automated tests verify reciprocal EN/NL/x-default alternates and future-publication exclusion.

Only actual known article dates are emitted. changefreq was removed because it is not used by Google. The optional stylesheet is not required for machine-readable XML validity.
