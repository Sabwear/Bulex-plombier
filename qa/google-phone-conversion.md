# Google Ads website phone conversion

18 November 2026. Requested destination: AW-11417443258/sMZZCOKQqpscELq3ocQq. Requested phone: +32467802090.

The shared Google tag initializer in lib/google-tag.ts now sends exactly:

```js
gtag('config', 'AW-11417443258/sMZZCOKQqpscELq3ocQq', {
  phone_conversion_number: '+32467802090'
});
```

It runs immediately after the async Google tag script is appended to document.head, following gtag('js', new Date()). GoogleTag is mounted in the root head for the Dutch and English site. The config is queued through the existing dataLayer, so asynchronous script loading does not lose it.

Marketing consent is required. Without consent, no Google script or phone config is created; repeated synchronization does not duplicate the loader/config; withdrawal updates consent to denied. Existing form and WhatsApp conversion destinations remain separate.

49 tests and production build pass. The regression verifies the exact destination/number, command order, single configuration and withdrawal behavior. Account-side Google forwarding-number availability, phone-text matching and actual call attribution still require Google Tag Assistant / Google Ads testing with an eligible ad visit. Installing the snippet is not proof of a recorded call. No phone click or test conversion was generated.

Reference: https://support.google.com/google-ads/answer/6095883

## Production verification

Hostinger completed build 01a1ef6f-2602-732c-8cd2-ec1a227b71b9 for code 35b0cfa. The live page serves /_next/static/chunks/app/layout-a897b5d4673a5e47.js containing the exact phone conversion destination, number and phone_conversion_number option. Browser DOM check: no loader after withdrawal/reload; exactly one Google loader in document.head after marketing acceptance. Consent was withdrawn again after the test. Command arguments/order and single execution are covered by the regression test; the browser's read-only evaluation did not expose its dataLayer, so no live queue-inspection claim is made. No call click or synthetic conversion was generated. Actual account-side phone replacement and call attribution remain unverified.

Evidence: qa/google-phone-live-checks.json and qa/google-phone-consent-live.jpg.
