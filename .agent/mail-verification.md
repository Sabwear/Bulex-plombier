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
