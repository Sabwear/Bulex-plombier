# Infra / Environment Fixes — vaillant-loodgieter.com

These SEO issues **cannot be fixed in the repository code**. They live in the
production environment (env vars), the hosting/CDN layer (Cloudflare), or
external configuration. The code is already correct/parameterised — these are
the remaining production actions.

Status legend: ⬜ todo · ✅ done

---

## 1. ⬜ Production phone number env var — [C1]

The code now reads the phone number from a single env var and formats it for
display, `tel:` links, schema, and WhatsApp:

- File: `config/public-phone.ts`
- Env var: **`NEXT_PUBLIC_PHONE_NUMBER`**

If this var is **not** set in production, the app falls back to the placeholder
`02 345 67 89` (`+3223456789`). 

**Action:** set in the production environment (Vercel/host project settings):

```
NEXT_PUBLIC_PHONE_NUMBER=32 467 80 20 90
```

Accepted formats: human-readable (`"02 345 67 89"`), digits, or `+`-prefixed.
After setting, **redeploy** (NEXT_PUBLIC_* vars are inlined at build time).

**Verify:** click "Appeler"/"Bellen" on any location page → dials the real
number; run a location page through Google Rich Results Test → `telephone` is
the real E.164 number, not `+32-XXX-...`.

---

## 2. ⬜ Cloudflare AI-crawler / robots policy — [C3]

`app/robots.ts` defines the intended policy, but the **live** `robots.txt` is
overridden by Cloudflare's managed robots / "Block AI bots" feature. This means
GPTBot / ClaudeBot / Google-Extended etc. may be disallowed on the live site
regardless of the app config — hurting AEO/GEO visibility.

**Action (choose one):**
- **Want AI-search traffic:** in Cloudflare dashboard → disable the "Block AI
  Scrapers and Crawlers" / managed robots feature so the live `robots.txt`
  matches `app/robots.ts`.
- **Block intentionally:** keep it, and align `app/robots.ts` to match so the
  repo and live policy don't contradict each other.

**Verify:**
```
curl https://vaillant-loodgieter.com/robots.txt
```
The output should reflect the intended policy (GPTBot/ClaudeBot/Google-Extended
not unexpectedly disallowed).

---

## 3. ⬜ Twitter/X handle — [H1, M3]

Code now derives the Twitter handle and meta (`twitter:site`/`twitter:creator`)
and `sameAs` from the env var:

- Env var: **`NEXT_PUBLIC_TWITTER_URL`**
- Helper: `config/social-links.ts` → `getTwitterHandle()`

The audit flagged a typo on the live site (`villant_loodgieter` /
inconsistent handle). The value in `.env.local` is
`https://twitter.com/vaillantloodgieter`.

**Action:**
- Confirm the **real, existing** X/Twitter account handle.
- Set the correct full URL in the production env var, e.g.:
  ```
  NEXT_PUBLIC_TWITTER_URL=https://twitter.com/<real-handle>
  ```
- If there is **no** account, leave the var empty — the code already omits the
  link, `sameAs` entry, and twitter meta when it's blank.
- Redeploy.

**Verify:** footer X link resolves (no typo); view-source shows correct
`twitter:site`/`twitter:creator`; `sameAs` in JSON-LD uses the right URL.

---

## 4. ⬜ Cloudflare email-obfuscation 404 link — [H1]

Cloudflare's **Email Address Obfuscation** rewrites `mailto:` links into
`/cdn-cgi/l/email-protection#...`. On this site that link returns a **404** (the
NL footer/contact), creating a broken link.

**Action (choose one):**
- Cloudflare dashboard → **Scrape Shield → Email Address Obfuscation → Off**
  (simplest), or
- Ensure the Cloudflare email-decode script is allowed to load (CSP/JS), or
- Render the email as plain text / a non-`mailto:` element so CF doesn't rewrite
  it.

**Verify:**
```
python .cursor/skills/seo/scripts/broken_links.py https://vaillant-loodgieter.com/nl
```
→ 0 broken links; the email link no longer points to a 404.

---

## Re-audit checklist (production)

- [ ] `NEXT_PUBLIC_PHONE_NUMBER` set in prod + redeployed (real number dials)
- [ ] Live `robots.txt` matches intended AI-crawler policy
- [ ] `NEXT_PUBLIC_TWITTER_URL` correct (or empty) + redeployed
- [ ] Email-obfuscation 404 resolved; `broken_links.py` returns 0
