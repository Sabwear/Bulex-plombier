import {randomUUID} from 'node:crypto';
import {validateAttachments} from '@/lib/mail/attachments';
import {boundedFormData,BodyLimitError,consumeMailLimit,mailClientKey,sameOriginMail,validMailFields,logMailEvent} from '@/lib/mail/protection';
import {validateBulexRequest,bulexConfirmation} from '@/lib/mail/bulex-request';
import {isBulex} from '@/config/bulex/brand';
import { NextResponse } from "next/server";
import {
  getSmtpConfig,
  validMailAddress,
} from "@/lib/mail/smtp-config";
import { sendViaSmtp } from "@/lib/mail/sendViaSmtp";
import {
  buildCustomerConfirmationEmail,
  type ConfirmationLocale,
} from "@/lib/mail/buildCustomerConfirmation";

export const runtime = "nodejs";

function str(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function isTruthy(v: string): boolean {
  return v === "true" || v === "1" || v === "on" || v === "yes";
}


function validEmail(s: string): boolean {
  return validMailAddress(s.trim());
}

let activeUploads=0;
export async function POST(req:Request){
 if(!sameOriginMail(req))return NextResponse.json({error:'Request not allowed.'},{status:403});
 if(!/^multipart\/form-data;.*boundary=/i.test(req.headers.get('content-type')||''))return NextResponse.json({error:'Multipart form required.'},{status:415});
 if(!consumeMailLimit('ip:'+mailClientKey(req),10,15*60*1000))return NextResponse.json({error:'Too many requests. Please call our team.'},{status:429,headers:{'Retry-After':'900'}});
 if(activeUploads>=3)return NextResponse.json({error:'Please try again shortly.'},{status:503});
 activeUploads++;try{return await handleMail(req);}finally{activeUploads--;}
}
async function handleMail(req:Request){
 const requestId=randomUUID();logMailEvent("INFO",requestId,"received");
  const config = getSmtpConfig();
  if (!config) {
    logMailEvent("ERROR",requestId,"configuration",{code:"SMTP_CONFIG_INVALID"});
    return NextResponse.json(
      {
        error:
          "Email delivery is temporarily unavailable. Please contact the team by telephone.",
        requestId,
      },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await boundedFormData(req);
  } catch(error) {
    logMailEvent("ERROR",requestId,"upload",{code:error instanceof BodyLimitError?"UPLOAD_LIMIT":"UPLOAD_INVALID"});
    return NextResponse.json({ error: "Invalid or oversized upload." }, { status: error instanceof BodyLimitError?413:400 });
  }

  logMailEvent("INFO",requestId,"upload-parsed");
  if(!validMailFields(formData))return NextResponse.json({error:"Invalid form fields."},{status:400});
  const hp = str(formData, "website");
  if (hp.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const formType = str(formData, "formType");
  const replyTo = str(formData, "email") || str(formData, "Email");

  let attachmentParts;
  try{attachmentParts=await validateAttachments(formData.getAll('attachments'));}catch{return NextResponse.json({code:'ATTACHMENT_INVALID',error:'Attachments must be valid JPG, PNG, GIF, WebP or PDF files (5 files, 5 MB each, 10 MB total).'}, {status:400});}

  let subject: string;
  let body: string;

  switch (formType) {
    case "bulex": {
      if (!isBulex) return NextResponse.json({ error: "Unknown form." }, { status: 400 });
      const result = validateBulexRequest(formData);
      if ('error' in result) return NextResponse.json(result, { status: 400 });
      subject = result.subject;
      body = result.body;
      break;
    }
    case "contact": {
      const nom = str(formData, "nom");
      const email = str(formData, "email");
      const tel = str(formData, "telephone");
      const localeTag = str(formData, "locale");
      const isNl = localeTag === "nl";
      if (nom.length < 2 || !validEmail(email)) {
        return NextResponse.json(
          {
            error: isNl ? "Naam of e-mail ongeldig." : "Nom ou e-mail invalide.",
          },
          { status: 400 }
        );
      }
      if (tel.length < 5) {
        return NextResponse.json(
          {
            error: isNl ? "Telefoonnummer ongeldig." : "Numéro de téléphone invalide.",
          },
          { status: 400 }
        );
      }
      const urgent = isTruthy(str(formData, "urgence"));
      if (isNl) {
        subject = `${urgent ? "[SPOED] " : ""}[Contact NL] ${nom}`;
        body = [
          "Formulier: Contact (NL)",
          "",
          `Naam: ${nom}`,
          `E-mail: ${email}`,
          `Telefoon: ${tel}`,
          `Adres: ${str(formData, "adresse")}`,
          `Spoed: ${urgent ? "Ja" : "Nee"}`,
          "",
          "Bericht:",
          str(formData, "message"),
        ].join("\n");
      } else {
        subject = `${urgent ? "[URGENCE] " : ""}[Contact FR] ${nom}`;
        body = [
          "Formulaire: Contact (FR)",
          "",
          `Nom: ${nom}`,
          `E-mail: ${email}`,
          `Téléphone: ${tel}`,
          `Adresse: ${str(formData, "adresse")}`,
          `Urgence: ${urgent ? "Oui" : "Non"}`,
          "",
          "Message:",
          str(formData, "message"),
        ].join("\n");
      }
      break;
    }
    case "intervention": {
      const nom = str(formData, "nom");
      const email = str(formData, "email");
      const tel = str(formData, "telephone");
      const localeTag = str(formData, "locale");
      const isNl = localeTag === "nl";
      if (nom.length < 2 || !validEmail(email)) {
        return NextResponse.json(
          {
            error: isNl
              ? "Naam of e-mail ongeldig."
              : "Nom ou e-mail invalide.",
          },
          { status: 400 }
        );
      }
      if (tel.length < 5) {
        return NextResponse.json(
          {
            error: isNl
              ? "Telefoonnummer ongeldig."
              : "Numéro de téléphone invalide.",
          },
          { status: 400 }
        );
      }
      const source = str(formData, "source") || "fr";
      if (isNl) {
        subject = `[Intervention NL - ${source}] ${nom}`;
        body = [
          `Formulier: Interventieaanvraag (NL) — ${source}`,
          "",
          `Naam: ${nom}`,
          `E-mail: ${email}`,
          `Telefoon: ${tel}`,
          `Type interventie: ${str(formData, "typeIntervention") || "—"}`,
          `Adres: ${str(formData, "adresse") || "—"}`,
          "",
          "Bericht:",
          str(formData, "message") || "—",
        ].join("\n");
      } else {
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
      }
      break;
    }
    case "quote_fr": {
      const naam = str(formData, "naam");
      const email = str(formData, "email");
      const tel = str(formData, "telephone");
      if (naam.length < 2 || !validEmail(email)) {
        return NextResponse.json({ error: "Nom ou e-mail invalide." }, { status: 400 });
      }
      if (tel.length < 5) {
        return NextResponse.json({ error: "Numéro de téléphone invalide." }, { status: 400 });
      }
      const adres = str(formData, "adres");
      const regio = str(formData, "regio");
      const stad = str(formData, "stad");
      const dienst = str(formData, "dienst");
      const beschrijving = str(formData, "beschrijving");
      if (adres.length < 3 || !regio || !stad || !dienst || beschrijving.length < 5) {
        return NextResponse.json(
          { error: "Veuillez compléter tous les champs obligatoires." },
          { status: 400 }
        );
      }
      subject = `[Devis FR] ${naam}`;
      body = [
        "Formulaire: Demande de devis (FR)",
        "",
        `Nom: ${naam}`,
        `E-mail: ${email}`,
        `Téléphone: ${tel}`,
        `Adresse: ${adres}`,
        `Région / province: ${regio}`,
        `Commune / ville: ${stad}`,
        `Service: ${dienst}`,
        "",
        "Description:",
        beschrijving,
      ].join("\n");
      break;
    }
    case "quote_nl": {
      const naam = str(formData, "naam");
      const email = str(formData, "email");
      const tel = str(formData, "telephone");
      if (naam.length < 2 || !validEmail(email)) {
        return NextResponse.json({ error: "Naam of e-mail ongeldig." }, { status: 400 });
      }
      if (tel.length < 5) {
        return NextResponse.json({ error: "Telefoonnummer ongeldig." }, { status: 400 });
      }
      subject = `[Offerte NL] ${naam}`;
      body = [
        "Formulier: Offerte aanvraag (NL)",
        "",
        `Naam: ${naam}`,
        `E-mail: ${email}`,
        `Telefoon: ${tel}`,
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

  if (!validMailAddress(replyTo)) {
    return NextResponse.json({ error: "E-mail de réponse manquant." }, { status: 400 });
  }

  if(!consumeMailLimit('recipient:'+replyTo.toLowerCase(),3,60*60*1000)||!consumeMailLimit('global-delivery',100,15*60*1000))return NextResponse.json({error:"Too many requests. Please call our team."},{status:429,headers:{'Retry-After':'3600'}});
  try {
    logMailEvent("INFO",requestId,"enquiry-start");
    await sendViaSmtp(config, {
      senderName: formType === "bulex" ? "Bulex Plombier" : undefined,
      subject,
      text: body,
      replyTo,
      attachments: attachmentParts,
    });
    logMailEvent("INFO",requestId,"enquiry-accepted");
  } catch (e) {
    logMailEvent("ERROR",requestId,"enquiry",e);
    return NextResponse.json(
      { error: "We could not deliver your request. Please call our team or try again later.",requestId },
      { status: 502 }
    );
  }

  let confirmLocale: ConfirmationLocale = "fr";
  let visitorName = str(formData, "nom");
  if (formType === "quote_nl") {
    confirmLocale = "nl";
    visitorName = str(formData, "naam");
  } else if (formType === "quote_fr") {
    visitorName = str(formData, "naam");
  } else if (str(formData, "locale") === "nl") {
    confirmLocale = "nl";
  }

  let confirmationSent=true;
  try {
    logMailEvent("INFO",requestId,"confirmation-start");
    const { subject: subjC, text: textC } = formType === "bulex" ? bulexConfirmation(str(formData,"locale"), visitorName, body) : buildCustomerConfirmationEmail({
      locale: confirmLocale,
      visitorFirstNameOrNom: visitorName,
      submittedCopy: body,
    });
    await sendViaSmtp(config, {
      senderName: formType === "bulex" ? "Bulex Plombier" : undefined,
      to: replyTo,
      subject: subjC,
      text: textC,
      replyTo: config.mailFrom,
    });
    logMailEvent("INFO",requestId,"confirmation-accepted");
  } catch (e) {
    confirmationSent=false;logMailEvent("ERROR",requestId,"confirmation",e);
  }

  logMailEvent("INFO",requestId,"completed");
  return NextResponse.json({ ok: true,confirmationSent,requestId }, { status: 200 });
}
