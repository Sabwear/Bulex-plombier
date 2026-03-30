import { buildWhatsAppHref } from "@/lib/whatsappPrefill";

export type ConfirmationLocale = "fr" | "nl";

/**
 * Auto-reply after a form submission.
 * Plain text only (no HTML multipart) — confirmed deliverable for this project’s mail path.
 */
export function buildCustomerConfirmationEmail(args: {
  locale: ConfirmationLocale;
  visitorFirstNameOrNom: string;
  submittedCopy: string;
}): { subject: string; text: string } {
  const copy = args.submittedCopy.trim();
  const waHref = buildWhatsAppHref(copy);
  const name = args.visitorFirstNameOrNom.trim() || (args.locale === "nl" ? "klant" : "client");

  if (args.locale === "nl") {
    const subject = "Bevestiging – we hebben uw aanvraag ontvangen | Vaillant Loodgieter";
    const text = [
      `Beste ${name},`,
      "",
      "Bedankt dat u Vaillant Loodgieter heeft gecontacteerd.",
      "",
      "We hebben uw bericht goed ontvangen. Ons team bekijkt uw aanvraag en neemt zo snel mogelijk contact met u op.",
      "",
      "Voor een nog snellere reactie op WhatsApp kunt u dit adres plakken in uw browser (uw bericht wordt vooraf ingevuld):",
      waHref,
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

    return { subject, text };
  }

  const subject = "Accusé de réception – Vaillant Plombier / Loodgieter";
  const text = [
    `Bonjour ${name},`,
    "",
    "Nous vous remercions d’avoir contacté Vaillant Plombier.",
    "",
    "Nous avons bien reçu votre message. Notre équipe en prend connaissance et vous recontacte dans les meilleurs délais.",
    "",
    "Pour une réponse plus rapide sur WhatsApp, copiez ce lien dans votre navigateur (votre message sera pré-rempli) :",
    waHref,
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

  return { subject, text };
}
