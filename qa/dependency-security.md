# Dependency security patch — 15 November 2026

## Reported advisories

- Next.js is pinned to 15.5.28 in package.json and package-lock.json, and that version is installed. The publisher lists this as the patched 15.x release for GHSA-2464-fhr4-w9xw and CVE-2026-94482 / GHSA-p3m5-59mp-jv5r.
- Nodemailer is pinned and installed at 10.1.4. The publisher lists this as the patched version for GHSA-8c8m-p3m8-cjg8, GHSA-m943-m63m-w62w and GHSA-85x2-q946-cp5h.
- The updated dependency tree resolves Sharp 0.35.5 for Next.js image optimization.

## Additional compatible fixes

The first audit after the requested upgrades identified separate PostCSS, source-map-js and Zod issues. Compatible updates were applied without moving the application to Next.js 16. Next.js's otherwise pinned PostCSS 8.4.31 is scoped to patched PostCSS 8.5.23 through npm overrides. The root PostCSS dependency resolves to 8.5.28, source-map-js to 1.2.2, and Zod to 4.6.7. These versions are recorded in the lockfile.

## Verification

- npm audit --omit=dev: 0 vulnerabilities.
- Full npm audit: 7 moderate package findings remain, all propagated from one development-only minimatch advisory, GHSA-g3hv-75wg-m249, through the TypeScript ESLint dependency chain. No critical or high findings remain. No forced major-version upgrade or out-of-range minimatch override was applied to that toolchain.
- 39 application tests pass with the updated installed packages.
- Production Next.js build passes.
- Production HTTP smoke tests return SSR HTML, correct locale and canonical metadata for Dutch home/contact and English home/article pages. The /nl/contact legacy redirect returns 308 to /contact.
- Next.js's production image optimizer returns a successful image response for the hero WebP at width 640, quality 75.
- npm ls reports the intended Next.js, Nodemailer, PostCSS and source-map-js versions without dependency errors.
- Development preview restarted on localhost:3012. No deployment or GitHub push was performed.

References:
- https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw
- https://github.com/vercel/next.js/security/advisories/GHSA-p3m5-59mp-jv5r
- https://github.com/nodemailer/nodemailer/security/advisories/GHSA-8c8m-p3m8-cjg8
- https://github.com/advisories/GHSA-m943-m63m-w62w
- https://github.com/advisories/GHSA-85x2-q946-cp5h
- https://github.com/advisories/GHSA-fxqj-rqcc-2cmp
- https://github.com/advisories/GHSA-g3hv-75wg-m249
