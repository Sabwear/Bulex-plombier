import { getPublicPhoneE164Digits } from "@/config/public-phone";

/** WhatsApp `text` URL param is limited; stay under ~4k to be safe across clients. */
export const WHATSAPP_TEXT_MAX = 3800;

export function buildWhatsAppHref(prefillText: string): string {
  const digits = getPublicPhoneE164Digits();
  const base = `https://wa.me/${digits}`;
  const trimmed = prefillText.trim();
  if (!trimmed) return base;
  let text = trimmed;
  if (text.length > WHATSAPP_TEXT_MAX) {
    text =
      text.slice(0, WHATSAPP_TEXT_MAX - 120) +
      "\n\n[…]";
  }
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function contactPrefillText(
  locale: "fr" | "nl",
  p: {
    nom: string;
    email: string;
    telephone: string;
    adresse: string;
    urgence: boolean;
    message: string;
    attachmentCount: number;
  }
): string {
  if (locale === "nl") {
    return [
      "Hallo — hierbij een kopie van mijn contactaanvraag via de website:",
      "",
      `Naam: ${p.nom}`,
      `E-mail: ${p.email}`,
      `Telefoon: ${p.telephone || "—"}`,
      `Adres: ${p.adresse}`,
      `Spoed: ${p.urgence ? "Ja" : "Nee"}`,
      "",
      "Bericht:",
      p.message,
      "",
      p.attachmentCount > 0
        ? `(Bijlagen zijn ook per e-mail verzonden: ${p.attachmentCount} bestand(en).)`
        : "",
    ]
      .filter(Boolean)
      .join("\n");
  }
  return [
    "Bonjour — copie de ma demande de contact envoyée depuis le site :",
    "",
    `Nom : ${p.nom}`,
    `E-mail : ${p.email}`,
    `Téléphone : ${p.telephone || "—"}`,
    `Adresse : ${p.adresse}`,
    `Urgence : ${p.urgence ? "Oui" : "Non"}`,
    "",
    "Message :",
    p.message,
    "",
    p.attachmentCount > 0
      ? `(Pièces jointes également envoyées par e-mail : ${p.attachmentCount} fichier(s).)`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function interventionPrefillText(
  locale: "fr" | "nl",
  p: {
    nom: string;
    email: string;
    telephone: string;
    typeIntervention: string;
    adresse: string;
    message: string;
    source: string;
    attachmentCount: number;
  }
): string {
  if (locale === "nl") {
    return [
      "Hallo — kopie van mijn interventieaanvraag via de website:",
      `Bron: ${p.source}`,
      "",
      `Naam: ${p.nom}`,
      `E-mail: ${p.email}`,
      `Telefoon: ${p.telephone}`,
      `Type interventie: ${p.typeIntervention || "—"}`,
      `Adres: ${p.adresse || "—"}`,
      "",
      "Bericht:",
      p.message || "—",
      "",
      p.attachmentCount > 0
        ? `(Bijlagen ook per e-mail: ${p.attachmentCount} bestand(en).)`
        : "",
    ]
      .filter(Boolean)
      .join("\n");
  }
  return [
    "Bonjour — copie de ma demande d’intervention envoyée depuis le site :",
    `Source : ${p.source}`,
    "",
    `Nom : ${p.nom}`,
    `E-mail : ${p.email}`,
    `Téléphone : ${p.telephone}`,
    `Type d’intervention : ${p.typeIntervention || "—"}`,
    `Adresse : ${p.adresse || "—"}`,
    "",
    "Message :",
    p.message || "—",
    "",
    p.attachmentCount > 0
      ? `(Pièces jointes également par e-mail : ${p.attachmentCount} fichier(s).)`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function quotePrefillText(
  locale: "fr" | "nl",
  p: {
    naam: string;
    email: string;
    telephone: string;
    adres: string;
    regio: string;
    stad: string;
    dienst: string;
    beschrijving: string;
    attachmentCount: number;
  }
): string {
  if (locale === "nl") {
    return [
      "Hallo — kopie van mijn offerteaanvraag via de website:",
      "",
      `Naam: ${p.naam}`,
      `E-mail: ${p.email}`,
      `Telefoon: ${p.telephone}`,
      `Adres: ${p.adres}`,
      `Regio: ${p.regio}`,
      `Stad/gemeente: ${p.stad}`,
      `Dienst: ${p.dienst}`,
      "",
      "Beschrijving:",
      p.beschrijving,
      "",
      p.attachmentCount > 0
        ? `(Bijlagen ook per e-mail: ${p.attachmentCount} bestand(en).)`
        : "",
    ]
      .filter(Boolean)
      .join("\n");
  }
  return [
    "Bonjour — copie de ma demande de devis envoyée depuis le site :",
    "",
    `Nom : ${p.naam}`,
    `E-mail : ${p.email}`,
    `Téléphone : ${p.telephone}`,
    `Adresse : ${p.adres}`,
    `Région / province : ${p.regio}`,
    `Commune / ville : ${p.stad}`,
    `Service : ${p.dienst}`,
    "",
    "Description :",
    p.beschrijving,
    "",
    p.attachmentCount > 0
      ? `(Pièces jointes également par e-mail : ${p.attachmentCount} fichier(s).)`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}
