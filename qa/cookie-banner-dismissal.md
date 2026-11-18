# Cookie banner dismissal and WhatsApp visibility

18 November 2026. User requested a first-visit cookie notice that stays dismissed and reopens only through Cookie settings on the policy page, without covering WhatsApp.

## Confirmed issue and changes

The previous CookieConsent component rendered a fixed Cookie settings button after the banner was dismissed. Its lower-left position overlapped the WhatsApp widget. Removed that floating control entirely. CookieSettingsButton now appears inline inside the EN/NL cookie policy article and opens the shared dialog through an explicit event.

The first-visit banner appears only without a current saved choice. Accept, reject and the new close button persist that choice and dismiss it. Close means reject optional tracking. Existing consent version 2 is preserved, so deployment does not force existing visitors to consent again. Expiry/cleared storage/material policy-version changes can still require a new choice.

Persistence uses localStorage plus a first-party SameSite=Lax preference cookie (Secure on HTTPS), valid for the existing six-month period. Either current copy can restore a valid choice. If all persistent writes fail, a temporary choice keeps the notice dismissed within the page session and optional tracking stays disabled. A newer temporary rejection overrides a stale saved grant. Google tag/conversion checks read the same source. The policy describes the actual storage and location of settings.

The compact banner is above the WhatsApp control rather than across the bottom; mobile positioning reserves extra room when the call bar is visible. No always-visible cookie widget remains on ordinary pages. Existing colors, typography and motion remain unchanged.

## Verification

51 automated tests pass and production build passes. Regressions cover blocked localStorage with cookie fallback, stale cookie rejection, fully blocked persistence with tracking disabled, and settings controls only on the policy page in both languages. Existing Google Ads consent, phone-conversion and contact-form checks continue passing.

Local production browser checks:

- Fresh visitor: banner appears.
- Close without marketing: banner disappears; reload shows no banner and no floating settings button; WhatsApp remains present.
- EN policy button opens preferences; withdrawal closes it; NL policy button opens the same localized preferences.
- Desktop banner/WhatsApp rectangles do not intersect (22px vertical clearance).
- 390px mobile: no horizontal overflow; banner and WhatsApp do not intersect.
- Mobile after scrolling until the call bar is visible: banner bottom 670px, WhatsApp top approximately 698px; no overlap.

Screenshot: qa/cookie-whatsapp-first-visit-mobile.jpg.

Design read: existing Bulex utility consent flow, ENERGY/RHYTHM/MOTION unchanged. Compact positioning exists to preserve access to WhatsApp, and the policy button provides the requested manual entry point. PASS: real native controls and visible focus; persistent rejection does not enable optional tracking; no new animation; matching EN/NL structure; responsive overlap measurements and existing tests/build pass.

## Production result

Hostinger build 01a1ef97-1d75-7290-9acb-c908c6fb4ebb deployed code 710f5cb. Automatic deployment had not picked up the commit, so the existing connected Git main branch was deployed explicitly.

Live browser verification on /en: existing saved preference suppresses the banner; floating settings count is zero; WhatsApp remains present. On /en/cookies, the single inline Cookie settings button opens the preferences dialog. After withdrawing optional consent, navigating home and reloading: banner count zero, floating settings count zero, Google loader count zero, WhatsApp present. Screenshot: qa/cookie-dismissed-live.jpg. First-visit desktop/mobile geometry and EN/NL policy dialogs were verified against the same production build locally before release. All51 tests and production build pass.
