# Live email investigation — 15 November 2026

## Read-only production findings

- The user confirmed the issue occurs on the live website, the form keeps displaying Sending, and they are checking the business mailbox.
- Hostinger's website inventory identifies bulex-loodgieter.com as the project's enabled Node.js site. Its live contact page returns Dutch SSR HTML and the expected public contact mailbox link.
- Runtime logs show Next.js 15.5.27, while the prepared local dependency patch is 15.5.28 / Nodemailer 10.1.4. The latest local dependency fixes were not in that observed live deployment.
- Masked live environment inventory includes all expected SMTP keys. Values cannot be read through the API, so this does not verify the actual credentials or server values. The retired MAIL_TO key remains on the host but is ignored by current application code; it was not changed remotely.
- The DNS zone contains enabled Hostinger MX, SPF, DKIM and DMARC records. This does not prove mailbox delivery or successful authentication.
- The available runtime log entries contain startup events, with no parsed SMTP/mail-stage errors. The API only retains appropriately structured JSON log lines; the previous multiline console logging did not satisfy that format.
- Local SMTP verification fails at DNS resolution (EDNS), which is not evidence of a live SMTP DNS failure. No production submission, test email, mailbox access token, credential change, DNS change, deployment or remote environment write was performed during this investigation.

## Prepared changes

- The client request now has a 60-second deadline. A timeout shows Delivery not confirmed, explains that a message may still arrive, and offers the configured telephone link rather than automatically retrying an uncertain delivery.
- Analytics failure cannot turn an already accepted submission into an apparent failed submission.
- SMTP DNS, greeting and idle timeouts are bounded explicitly, retaining TLS and certificate checks.
- Each mail request now emits one-line JSON timestamp/level/message events for received, upload-parsed, enquiry-start/accepted, confirmation-start/accepted, failure stage and completion. Events include only diagnostic references and safe error codes, not user details or credentials.
- These changes require deployment to affect the live site. No confirmed root cause for the live SMTP wait has yet been established; the new stage events will identify where the next user-authorized submission stalls or fails.

## Verification

41 tests pass, including request deadline cancellation, no automatic retries, separate confirmation status and privacy-safe Hostinger-compatible log formatting. Production build passes. Local preview restarted.
