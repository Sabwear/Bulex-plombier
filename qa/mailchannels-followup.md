# External confirmation bounce follow-up

The screenshot supplied on 17 November 2026 shows a confirmation sent by contact@bulex-loodgieter.com rejected by smtp.mailchannels.net with 550 5.7.1 [CS] Message blocked. Transaction 2fe2f67f6ea896e4; provider timestamp 17 November 2026 00:01:36 UTC. No retry will occur according to the bounce.

This is a downstream filtering failure after Hostinger SMTP acceptance. It is separate from the fixed FORM_VERIFICATION_FAILED submission error. The screenshot does not establish that Hotmail itself rejected the message, or that SMTP credentials are wrong. Prior same-mailbox tests cannot establish external delivery.

Hostinger support should review the transaction, classification, sending account reputation and authentication, and apply a false-positive correction if appropriate. The message's MailChannels Insights link can provide more detail. No support message or false-positive submission has been sent in this run; the user asked for an explanation, not authorization to contact support. No repeated test messages were sent.

Suggested support text:

> Our legitimate website customer confirmation from contact@bulex-loodgieter.com was blocked by MailChannels with 550 5.7.1 [CS]. Transaction: 2fe2f67f6ea896e4, timestamp: 2026-11-17 00:01:36 UTC. Please investigate the exact classification and sender status, verify authentication and review this as a false positive. Hostinger SMTP accepted the message before the asynchronous bounce. Please confirm remediation before we send another external test.
