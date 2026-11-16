# Contact delivery verification — 15 November 2026

- Live site: https://bulex-loodgieter.com/contact (HTTP 200).
- Local support address, SMTP login and sender all resolve to contact@bulex-loodgieter.com. Credentials remain in ignored environment configuration.
- `npm run check:mail`: encrypted SMTP connection and authentication passed.
- Submitted one labelled test directly to the live form endpoint, POST /api/mail, using the shared Bulex contact fields, Dutch locale and consent. No appointment or callback requested. This verifies the live API/transport; browser interaction was not tested in this run.
- Response: HTTP 200, ok=true, confirmationSent=true; request ID 603d3168-0377-4254-9ecf-7910f9ff9021.
- Test marker: BULEX-DELIVERY-1794770137359.
- Read-only IMAP search confirmed both the enquiry (`[Bulex Contact NL] Website delivery test`) and customer confirmation (`Uw aanvraag is ontvangen | Bulex Plombier`) in INBOX.Junk. Neither was found in INBOX. Messages were left in place and unread.
- Received Authentication-Results: SPF pass, DKIM pass (hostingermail-a), DMARC pass. X-Spam: Yes; no detailed spam scoring was exposed.
- `npm run test:bulex`: all 41 checks passed, including shared EN/NL validation, delivery failures, confirmation failures, attachments and SMTP recipient acceptance.

## Outstanding

Hostinger spam classification prevents confirmed Inbox placement. Available hosting tools do not expose spam/allowlist configuration. Review the two messages in Hostinger Mail, mark legitimate enquiries as not spam, review mailbox rules, and request Hostinger's spam-classification reason if the issue continues. Retest Inbox placement after remediation; do not disable mailbox-wide spam protection. This test uses the same mailbox as sender and visitor to avoid emailing an unrelated person; delivery to an external customer's provider was not tested.

## Code and deployment

No application or environment changes were needed to send email. README and migration records now reflect live evidence. Historical entries in migration/design QA documents describe previous checks and are superseded by this record for email verification.

## Production browser follow-up

The user reported seeing success without receiving email in Inbox. Two submissions were made through the actual production Dutch contact form in the browser, both reaching the success state. IMAP confirmed the first enquiry and confirmation in Junk (marker BULEX-BROWSER-20261115; subjects Production browser verification and Uw aanvraag is ontvangen). SPF/DKIM/DMARC passed; X-Spam: Yes.

A Hostinger filter named “Website Bulex enquiries to Inbox” was created with Match all rules: Subject contains “[Bulex ” AND From equals contact@bulex-loodgieter.com; action Move message to Inbox. The second production browser submission (BULEX-INBOX-FIX-20261115, Production Inbox verification) still reached Junk, so the rule was disabled. It remains saved but inactive. No allow/block lists or global spam protection were changed.

All six labelled verification messages were manually moved from Spam to Inbox using Hostinger Mail. Their presence in Inbox is manual recovery, not proof that future messages land there automatically. No messages were deleted. Mailbox-provider remediation remains outstanding; Hostinger support must investigate the false-positive classification. No support message was sent. Application code and credentials were unchanged.

Evidence: qa/production-contact-success.jpg and qa/production-contact-inbox.jpg. Browser testing is now complete for the Dutch contact page; English/booking browser flows and external customer confirmation delivery remain untested.

## Requester confirmation UX update

Shared EN/NL contact and booking success feedback now focuses and scrolls the success panel into view, respects reduced motion, and displays the submitted recipient when confirmationSent is explicitly true. API tests check localized confirmation routing separately from the business enquiry for all four locale/request-type combinations. Hostinger spam classification remains a separate known limitation.

Production verification of commit d1e5a5c: Hostinger build 01a1e0ae-ce48-71fc-acb6-4e60ecbeb199 completed. English browser contact submission succeeded; success panel was focused and its top measured 23.82 CSS pixels from viewport top. Screenshot: qa/production-success-scroll.jpg. Marker BULEX-SUCCESS-SCROLL-20261115. Read-only IMAP confirmed the EN enquiry and separate confirmation (Your request has been received | Bulex Plombier) addressed to the submitted contact@bulex-loodgieter.com mailbox, both in Junk. External-recipient delivery is not established by this same-mailbox test. All 42 regression checks and TypeScript pass.

## 15 November 2026 — hosted environment and false-success audit

Hostinger environment API listed the required SMTP/contact keys plus obsolete MAIL_TO; values were masked, so equality could not be read back. Reapplied all populated local environment values through Hostinger's full-set environment update, preserving APP_MODE=production (the existing live robots policy permitted indexing). Empty optional fields were omitted because Hostinger rejects empty values. Applied keys: APP_MODE, BULEX_SITE_URL, NEXT_PUBLIC_SUPPORT_EMAIL, NEXT_PUBLIC_PHONE_NUMBER, NEXT_PUBLIC_WHATSAPP_NUMBER, SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_FROM. Obsolete MAIL_TO was removed. Credentials were not committed or included in diagnostic documentation.

Found a separate false-success path: filled hidden website field returned HTTP 200 / ok=true without SMTP. This is intentional bot-discard behavior but can mislead real users if autofill touches the field. The route now returns 422 / FORM_VERIFICATION_FAILED with a request ID and logs the rejection. Shared EN/NL form uses a less autofill-prone company_fax field (with legacy website still checked by the API), displays localized verification errors and diagnostic references, and requires an API request ID before claiming success. Origin/content-type rejections also receive references; Bulex validation failures are logged. This is a confirmed defect, not yet a confirmed explanation of the user's specific missing submission.

Validation: 43 tests and TypeScript pass. Regressions verify both hidden-field names never send mail or claim success. Existing attachment, throttling, timeout, origin, recipient and confirmation-failure checks remain passing. User's submitted name/email/time requested for correlation. Current Hostinger runtime log only exposed the last deployment's successful test; earlier submissions are not established by these logs. Provider spam filtering remains a separate known problem.

### Deployment verification of environment/false-success fix

Hostinger build 01a1e0b6-495f-738e-a461-52bd9f9bb83d deployed commit 6ab7819 successfully. Before deployment, a live request containing only website=Autofilled company returned HTTP 200 / ok=true. After deployment, both website and company_fax cases returned HTTP 422 / FORM_VERIFICATION_FAILED with request IDs, and Hostinger logs recorded verification rejections.

A normal Dutch production browser submission after synchronization succeeded (marker BULEX-ENV-AUDIT-20261115, request 237404fb-b0c4-451d-a6a9-a096aade99d4). Hostinger logs recorded enquiry-accepted, confirmation-accepted and completed. Read-only IMAP confirmed the enquiry and separate confirmation in INBOX.Junk, both addressed to contact@bulex-loodgieter.com. Screenshot: qa/production-env-audit-success.jpg. No claim of Inbox placement or delivery to an external visitor provider is made. The user's own failed test remains uncorrelated pending the requested identifying details.

The www API POST probe followed a canonical-host redirect and returned 405 after method conversion. Normal pages canonicalize to the non-www site and the form uses a relative /api/mail URL; this probe does not establish a defect in the current browser form.

## 16 November 2026 — Google Ads and confirmed outbound block

Installed one consent-gated Google tag AW-11417443258 in the root head lifecycle using Google's current gtm.js snippet (official documentation updated 6 November 2026). Explicit marketing acceptance enables advertising storage/user-data/personalization; analytics stays denied. Declining does not load the tag, withdrawal updates denial and stops application conversion events, and storage failures disable marketing for the session. Existing form and WhatsApp conversion labels remain. EN/NL consent banner, custom choices, reopen button and privacy/cookie notices are mirrored. Consent version increments to 2.

External production API test BULEX-EXTERNAL-20261116 returned HTTP 200 / confirmationSent=true, request a66e6793-87c2-4986-a965-e80c3156141a. The business enquiry was found in Junk. A Returned mail notice in Inbox confirmed downstream rejection of the visitor confirmation: smtp.mailchannels.net returned 550 5.7.1 [CS] Message blocked; transaction 4d1e982f5f28df3c. The MailChannels Insights page showed Blocked (Spam Content). With explicit user approval, submitted Not Spam / Report False Positive; page confirmed Thank you. Your request has been submitted. No separate support message was sent. Screenshot is local-only because it contains the visitor's personal email. No assertion of successful external delivery is made.

44 automated checks and TypeScript pass before deployment. New regression covers no loader before consent, one loader after consent, default denial, and denial after withdrawal or storage failure.

### Production verification — 16 November 2026

Hostinger build 01a1e61b-97bb-739e-aeb4-f186feb9cf2a deployed commit 56f5cf2 successfully. Production EN browser checks: zero googletagmanager scripts before consent and after rejection; reopening Cookie settings, choosing marketing and saving inserted exactly one bulex-google-tag script with the requested AW-11417443258 URL. Withdrawal controls work; screenshot qa/google-ads-consent-live.jpg. No claim of account-side attribution or Tag Assistant verification is made.

Then withdrew marketing consent before a labelled production browser form submission (BULEX-AFTER-REPORT-20261116) to avoid generating a test conversion. The actual form reached success and the business enquiry arrived in INBOX, without X-Spam. The customer confirmation was asynchronously bounced again with 550 5.7.1 [CS] Message blocked, transaction 1bb18af51b9fe092, at 20:49:34 UTC. The earlier false-positive report did not establish successful external delivery. A local-only support draft includes the relevant sender, recipient and transaction details; it has not been sent. Provider action remains required. No further repeated test emails were sent.

## Contact form rejection fix

User supplied screenshot reference 5178b01e-57fb-4949-84a8-de06c39e8f56. Exact Hostinger log correlation: upload parsed, then FORM_VERIFICATION_FAILED, without SMTP starting. Off-screen company_fax text input removed from shared EnquiryForm across EN/NL contact/booking to avoid autofill-induced rejection. Retained existing server protections and legacy trap rejection. 47 regression tests pass. Read-only SMTP verification passed. Environment values masked by hosting API, keys complete; no env mutation or credential logging. qa/contact-autofill-fix.md records cause and boundaries. Next step is deployment and a labeled own-mailbox browser test.
