# Navigation and multilingual SEO verification — 15 November 2026

Scope: the requested call-button, navigation, footer and language-routing changes. This is a targeted implementation check, not a full SEO or legal audit.

- Confirmed: mobile call bar restored to a 62px minimum height and the original 23px Lucide Phone outline. Text stays centered; the redundant Call now label stays removed.
- Confirmed: header telephone action has an accessible EN/NL name and no visible text. Mobile hamburger morphs into a close icon. Closed navigation is inert, Escape closes it, and menu links close it on selection. Reduced-motion preferences disable the transitions.
- Confirmed: 320px viewport has no horizontal overflow; the header content fits its container. Browser language switching preserves the current article and loads Dutch text and the Dutch logo.
- Confirmed: the root route negotiates supported Accept-Language values and quality weights, honours an explicit BULEX_LOCALE preference, defaults to English and keeps query strings. Explicit /en and /nl URLs are not language-redirected. Negotiated redirects use private/no-store and Vary headers.
- Confirmed: the footer links to localized reviews and contact pages, all eight services and all existing policy/solution/about pages. Links are domain-relative and contain no localhost origins or homepage anchors.
- Confirmed: 31 automated tests pass, including all public-page rendering, footer targets and reciprocal sitemap alternates. The production build passes.
- Confirmed: fetched EN/NL review-page HTML has correct server-rendered language, self canonical, reciprocal regional hreflang and English x-default. Sitemap entries carry matching alternates and future articles remain excluded.
- Schema checker limitation: the bundled validator warns that the top-level JSON-LD object has no @type. It contains @context and @graph; each graph member has @type. A separate JSON/HTML check verified this valid graph structure. No schema change was needed for that warning.
- Parser limitation: the bundled HTML parser could not run because beautifulsoup4 is unavailable in the default Python. Verification used Python's standard HTMLParser and the existing application test suite.
- Production rankings, Search Console indexing and real-user Core Web Vitals were not measured in this local check. Development mode deliberately remains non-indexable.

Reference used: https://developers.google.com/search/docs/specialty/international/localized-versions
