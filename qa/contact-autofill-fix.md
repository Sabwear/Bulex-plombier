# Contact-form verification rejection

## Confirmed cause

The customer's screenshot shows request 5178b01e-57fb-4949-84a8-de06c39e8f56. Hostinger logs at 23:48:50 UTC on 16 November 2026 show received, upload-parsed, then verification / FORM_VERIFICATION_FAILED. No enquiry-start or SMTP call occurred. This establishes a filled legacy website/company_fax field; browser autofill of the off-screen company_fax text field is the likely source. The field's actual contents were intentionally not logged.

The supplied SMTP configuration uses Hostinger SMTP on port 465 with implicit TLS. Read-only local SMTP diagnostics passed encrypted connection and authentication. Hostinger lists all required environment keys; its API masks values. No environment changes were needed for this verified failure, and no credentials were copied into documentation.

## Fix

Removed the off-screen company_fax text input from the shared EN/NL contact and booking form. Browser/contact-manager autofill can no longer populate that irrelevant text field. Visible name, email, telephone and address autocomplete remain available.

Server origin checks, request/recipient throttles, required consent and field validation, upload limits, attachment inspection and SMTP acceptance checks remain active. Legacy website/company_fax fields still reject fabricated direct requests server-side. The API never returns success for a rejected request.

## Validation

47 automated tests pass, including rendering all four locale/form combinations without an off-screen text trap, existing forged-honeypot rejections, valid contact/booking delivery, attachment limits and delivery-failure behavior. Production build is run before release. Production verification follows deployment using a clearly labeled test addressed to the website's own mailbox, without an actual appointment request.

This fixes the screenshot's submission rejection. It does not establish that every downstream mailbox accepts customer confirmations; prior MailChannels filtering is a separate recorded issue.
