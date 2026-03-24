import { NextResponse } from "next/server";
import {
  getSmtpConfig,
  MAIL_ATTACHMENT_LIMITS,
} from "@/lib/mail/smtp-config";
import { sendViaSmtp } from "@/lib/mail/sendViaSmtp";

export const runtime = "nodejs";

function str(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function isTruthy(v: string): boolean {
  return v === "true" || v === "1" || v === "on" || v === "yes";
}

export async function POST(req: Request) {
  const config = getSmtpConfig();
  if (!config) {
    return NextResponse.json(
      {
        error:
          "SMTP non configuré. Définissez SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM et MAIL_TO (ou ADMIN_EMAIL) dans .env.local.",
      },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const hp = str(formData, "website");
  if (hp.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const formType = str(formData, "formType");
  const replyTo = str(formData, "email") || str(formData, "Email");

  const attachmentParts: { filename: string; content: Buffer; contentType?: string }[] = [];
  const rawFiles = formData.getAll("attachments");

  for (const entry of rawFiles) {
    if (!(entry instanceof File) || entry.size === 0) continue;
    if (attachmentParts.length >= MAIL_ATTACHMENT_LIMITS.maxFiles) {
      return NextResponse.json(
        { error: `Maximum ${MAIL_ATTACHMENT_LIMITS.maxFiles} fichiers.` },
        { status: 400 }
      );
    }
    if (entry.size > MAIL_ATTACHMENT_LIMITS.maxBytesPerFile) {
      return NextResponse.json(
        { error: "Un fichier dépasse la taille maximale (5 Mo)." },
        { status: 400 }
      );
    }
    const mime = (entry.type || "").toLowerCase();
    if (mime && !MAIL_ATTACHMENT_LIMITS.allowedMimeTypes.has(mime)) {
      return NextResponse.json(
        { error: "Type de fichier non autorisé (images ou PDF uniquement)." },
        { status: 400 }
      );
    }
    const buf = Buffer.from(await entry.arrayBuffer());
    attachmentParts.push({
      filename: entry.name || "piece-jointe",
      content: buf,
      contentType: entry.type || undefined,
    });
  }

  let subject: string;
  let body: string;

  switch (formType) {
    case "contact": {
      const nom = str(formData, "nom");
      const email = str(formData, "email");
      if (nom.length < 2 || !email.includes("@")) {
        return NextResponse.json({ error: "Nom ou e-mail invalide." }, { status: 400 });
      }
      const urgent = isTruthy(str(formData, "urgence"));
      subject = `${urgent ? "[URGENCE] " : ""}[Contact FR] ${nom}`;
      body = [
        "Formulaire: Contact (FR)",
        "",
        `Nom: ${nom}`,
        `E-mail: ${email}`,
        `Téléphone: ${str(formData, "telephone") || "—"}`,
        `Adresse: ${str(formData, "adresse")}`,
        `Urgence: ${urgent ? "Oui" : "Non"}`,
        "",
        "Message:",
        str(formData, "message"),
      ].join("\n");
      break;
    }
    case "intervention": {
      const nom = str(formData, "nom");
      const email = str(formData, "email");
      const tel = str(formData, "telephone");
      if (nom.length < 2 || !email.includes("@") || tel.length < 5) {
        return NextResponse.json(
          { error: "Nom, e-mail ou téléphone invalide." },
          { status: 400 }
        );
      }
      const source = str(formData, "source") || "fr";
      subject = `[Intervention FR - ${source}] ${nom}`;
      body = [
        `Formulaire: Demande d'intervention (FR) — ${source}`,
        "",
        `Nom: ${nom}`,
        `E-mail: ${email}`,
        `Téléphone: ${tel}`,
        `Type d'intervention: ${str(formData, "typeIntervention") || "—"}`,
        `Adresse: ${str(formData, "adresse") || "—"}`,
        "",
        "Message:",
        str(formData, "message") || "—",
      ].join("\n");
      break;
    }
    case "quote_fr": {
      const nom = str(formData, "nom");
      const email = str(formData, "email");
      const tel = str(formData, "telephone");
      if (nom.length < 2 || !email.includes("@") || tel.length < 5) {
        return NextResponse.json(
          { error: "Nom, e-mail ou téléphone invalide." },
          { status: 400 }
        );
      }
      subject = `[Devis FR] ${nom}`;
      body = [
        "Formulaire: Demande de devis (FR)",
        "",
        `Nom: ${nom}`,
        `E-mail: ${email}`,
        `Téléphone: ${tel}`,
        `Type d'intervention: ${str(formData, "typeIntervention") || "—"}`,
        `Adresse: ${str(formData, "adresse") || "—"}`,
        "",
        "Message:",
        str(formData, "message") || "—",
      ].join("\n");
      break;
    }
    case "quote_nl": {
      const naam = str(formData, "naam");
      const email = str(formData, "email");
      if (naam.length < 2 || !email.includes("@")) {
        return NextResponse.json({ error: "Naam of e-mail ongeldig." }, { status: 400 });
      }
      subject = `[Offerte NL] ${naam}`;
      body = [
        "Formulier: Offerte aanvraag (NL)",
        "",
        `Naam: ${naam}`,
        `E-mail: ${email}`,
        `Adres: ${str(formData, "adres")}`,
        `Regio: ${str(formData, "regio")}`,
        `Stad / gemeente: ${str(formData, "stad")}`,
        `Dienst: ${str(formData, "dienst")}`,
        "",
        "Beschrijving:",
        str(formData, "beschrijving"),
      ].join("\n");
      break;
    }
    default:
      return NextResponse.json({ error: "Type de formulaire inconnu." }, { status: 400 });
  }

  if (!replyTo || !replyTo.includes("@")) {
    return NextResponse.json({ error: "E-mail de réponse manquant." }, { status: 400 });
  }

  try {
    await sendViaSmtp(config, {
      subject,
      text: body,
      replyTo,
      attachments: attachmentParts,
    });
  } catch (e) {
    console.error("[api/mail]", e);
    return NextResponse.json(
      { error: "Envoi impossible pour le moment. Réessayez plus tard." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
