# Email and upload checks — 15 November 2026

## Delivery diagnosis

- The configured SMTP host is smtp.hostinger.com, port 465 with implicit TLS. Required settings are present and the sender matches the SMTP login. Enquiries now go only to the configured sending mailbox. Application forwarding overrides have been removed; Hostinger Mail controls forwarding. Credentials are not included here.
- Read-only SMTP verification failed at DNS resolution with EDNS / CONN in this execution environment. No real test email was sent. Authentication, provider acceptance and actual inbox arrival are therefore unconfirmed; this does not establish a production SMTP outage.
- Added `npm run check:mail` for the same read-only connection/TLS/authentication check in the hosting environment. Real inbox delivery additionally needs provider delivery logs and checking the sending mailbox/spam/quarantine and sender-domain SPF/DKIM/DMARC.

## Changes

- SMTP now requires encrypted transport, certificate verification, TLS 1.2 or newer and bounded connection/socket timeouts.
- The enquiry recipient is the configured sending mailbox; there is no separate MAIL_TO, CC, BCC or forwarding list. Acceptance is checked for every intended recipient instead of treating any resolved send call as full success.
- A failed primary send returns failure. A failed customer confirmation returns confirmationSent:false alongside the successful enquiry; the UI explains that the enquiry should not be submitted again.
- Server logs contain request references, stage and safe SMTP error codes; raw errors containing credentials or recipient information are not logged.
- Before multipart parsing, the stream reader enforces an 11 MB body cap regardless of Content-Length. Upload time and in-flight request counts are bounded.
- Attachments are limited to five files, 5 MB each and 10 MB total. MIME, extension and signatures must agree for JPEG, PNG, GIF, WebP and PDF. Empty/unknown MIME types, unsafe names, executable double extensions and forged signatures are rejected. Names are normalized.
- Files are kept as buffers, never written to a public directory or executed. Nodemailer filesystem and URL access are disabled; content disposition is attachment.
- Same-origin browser checks, bounded field lengths, duplicate-field and header-injection rejection, request throttling and confirmation-recipient throttling reduce endpoint abuse.

## Validation

39 tests pass, including prior mail/form behavior with mocked SMTP, valid PNG/PDF handling, spoofed/mismatched files, filename attacks, individual/aggregate upload caps, cross-site submission, false Content-Length, throttling, partial SMTP acceptance and admin/confirmation failures. TypeScript checking and the production build pass. No live email was used in these tests.

## Limits

Signature validation is not antivirus scanning or full PDF/image sanitization. Mailbox malware filtering remains necessary for untrusted documents. Throttling and concurrency limits apply per Node process; deployments with several workers need shared edge/WAF limits. Proxy headers must be overwritten by the trusted host. These checks do not constitute a complete penetration test of the website or hosting infrastructure.

References: https://nodemailer.com/smtp ; https://nodemailer.com/message ; https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html
