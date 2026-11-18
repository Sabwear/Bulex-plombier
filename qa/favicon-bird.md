# Bulex red-bird favicon

18 November 2026. The owner requested the red bird from the Bulex logo as the website favicon and authorized generation.

Used the imagegen skill with public/bulex/logo.png as a reference to isolate the bird without the wordmark. Generated a transparent square image, then exported browser sizes using Pillow without changing the generated design. Existing header/company logos remain untouched.

Files:

- app/favicon.ico: 16, 32 and 48px entries.
- app/icon.png: 192px transparent PNG.
- app/apple-icon.png: 180px PNG for Apple touch icons.
- public/bulex/favicon-bird.png: 512px master.
- public/bulex/favicon-source.json: provenance and size record.

Removed the manual head link to the full logo. Next.js file-based metadata now supplies icon links across Dutch and English pages, avoiding duplicate competing favicon declarations. These are standard root icon endpoints, passed through by middleware.

Verification: decoded PNG dimensions/alpha and all ICO sizes; visually inspected the mark at 192px. Existing 49 automated tests pass; production build checked before release. Production verification follows the automatic Hostinger deployment and checks live EN/NL icon metadata and binary responses. Browser tabs may retain an old cached favicon until reload or reopening the tab.
