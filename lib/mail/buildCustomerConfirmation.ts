import { buildWhatsAppHref } from "@/lib/whatsappPrefill";

export type ConfirmationLocale = "fr" | "nl";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Auto-reply sent to the visitor after a form submission (thank-you + copy of request + WhatsApp link in HTML).
 */
export function buildCustomerConfirmationEmail(args: {
  locale: ConfirmationLocale;
  visitorFirstNameOrNom: string;
  /** Same plain-text body that was sent to the business inbox (used for WhatsApp ?text=). */
  submittedCopy: string;
}): { subject: string; text: string; html: string } {
  const copy = args.submittedCopy.trim();
  const waHref = buildWhatsAppHref(copy);
  const name = args.visitorFirstNameOrNom.trim() || (args.locale === "nl" ? "klant" : "client");
  const safeName = escapeHtml(name);
  const safeCopy = escapeHtml(copy);
  const safeWaHref = escapeHtml(waHref);

  if (args.locale === "nl") {
    const subject = "Bevestiging – we hebben uw aanvraag ontvangen | Vaillant Loodgieter";
    const text = [
      `Beste ${name},`,
      "",
      "Bedankt dat u Vaillant Loodgieter heeft gecontacteerd.",
      "",
      "We hebben uw bericht goed ontvangen. Ons team bekijkt uw aanvraag en neemt zo snel mogelijk contact met u op.",
      "",
      "Voor een nog snellere reactie op WhatsApp: open de HTML-versie van deze e-mail en gebruik de knop — uw bericht wordt dan automatisch ingevuld.",
      "",
      "Hieronder vindt u een kopie van wat u ons heeft gestuurd (zonder bijlagen).",
      "",
      "—",
      "",
      copy,
      "",
      "—",
      "",
      "Met vriendelijke groeten,",
      "Vaillant Loodgieter · België",
    ].join("\n");

    const html = `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8" /></head>
<body style="font-family:system-ui,Segoe UI,sans-serif;font-size:15px;line-height:1.5;color:#1e293b;">
<p>Beste ${safeName},</p>
<p>Bedankt dat u Vaillant Loodgieter heeft gecontacteerd.</p>
<p>We hebben uw bericht goed ontvangen. Ons team bekijkt uw aanvraag en neemt zo snel mogelijk contact met u op.</p>
<p><strong>WhatsApp</strong> — klik op de onderstaande knop om hetzelfde bericht als hieronder te openen in WhatsApp (uw aanvraag wordt meegestuurd):</p>
<p style="margin:20px 0;">
  <a href="${safeWaHref}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600;">Open WhatsApp met uw aanvraag</a>
</p>
<p style="font-size:14px;color:#64748b;">Hieronder staat een kopie van uw bericht (zonder bijlagen).</p>
<hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />
<div style="white-space:pre-wrap;font-family:ui-monospace,monospace;font-size:13px;background:#f8fafc;padding:16px;border-radius:8px;border:1px solid #e2e8f0;">${safeCopy}</div>
<hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />
<p>Met vriendelijke groeten,<br />Vaillant Loodgieter · België</p>
</body>
</html>`;

    return { subject, text, html };
  }

  const subject = "Accusé de réception – Vaillant Plombier / Loodgieter";
  const text = [
    `Bonjour ${name},`,
    "",
    "Nous vous remercions d’avoir contacté Vaillant Plombier.",
    "",
    "Nous avons bien reçu votre message. Notre équipe en prend connaissance et vous recontacte dans les meilleurs délais.",
    "",
    "Pour une réponse plus rapide sur WhatsApp : ouvrez la version HTML de cet e-mail et utilisez le bouton — votre message sera pré-rempli.",
    "",
    "Vous trouverez ci-dessous une copie de votre demande (sans les pièces jointes).",
    "",
    "—",
    "",
    copy,
    "",
    "—",
    "",
    "Cordialement,",
    "Vaillant Plombier · Belgique",
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8" /></head>
<body style="font-family:system-ui,Segoe UI,sans-serif;font-size:15px;line-height:1.5;color:#1e293b;">
<p>Bonjour ${safeName},</p>
<p>Nous vous remercions d’avoir contacté Vaillant Plombier.</p>
<p>Nous avons bien reçu votre message. Notre équipe en prend connaissance et vous recontacte dans les meilleurs délais.</p>
<p><strong>WhatsApp</strong> — cliquez sur le bouton ci-dessous pour ouvrir WhatsApp avec le même contenu que votre demande ci-dessous (pré-rempli) :</p>
<p style="margin:20px 0;">
  <a href="${safeWaHref}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600;">Ouvrir WhatsApp avec votre demande</a>
</p>
<p style="font-size:14px;color:#64748b;">Copie de votre message (sans pièces jointes) :</p>
<hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />
<div style="white-space:pre-wrap;font-family:ui-monospace,monospace;font-size:13px;background:#f8fafc;padding:16px;border-radius:8px;border:1px solid #e2e8f0;">${safeCopy}</div>
<hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />
<p>Cordialement,<br />Vaillant Plombier · Belgique</p>
</body>
</html>`;

  return { subject, text, html };
}
