"use client";

import { type FormEvent, type ReactNode, useMemo, useState } from "react";
import FileUploadField from "@/components/forms/FileUploadField";
import FormSuccessModal from "@/components/forms/FormSuccessModal";
import { interventionPrefillText } from "@/lib/whatsappPrefill";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  formType: "intervention";
  source: string;
  privacyLabel: ReactNode;
  submitLabel: string;
  /** Use `nl` for Dutch copy and server-side NL email labels (submits over HTTPS, no mailto warning). */
  locale?: "fr" | "nl";
  /** `light` for contact-style pages on white background; `dark` for homepage gradient sections. */
  surface?: "dark" | "light";
};

export default function InterventionSmtpForm({
  formType,
  source,
  privacyLabel,
  submitLabel,
  locale = "fr",
  surface = "dark",
}: Props) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [typeIntervention, setTypeIntervention] = useState("");
  const [adresse, setAdresse] = useState("");
  const [message, setMessage] = useState("");
  const [accept, setAccept] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successModalEmail, setSuccessModalEmail] = useState("");
  const [whatsappPrefill, setWhatsappPrefill] = useState("");

  const fieldId = `iv-${source.replace(/[^a-z0-9-]/gi, "-")}-${locale}`;

  const t =
    locale === "nl"
      ? {
          errIncomplete:
            "Vul de verplichte velden in en aanvaard het privacybeleid.",
          errSend: "Verzenden mislukt. Probeer het later opnieuw.",
          errNetwork: "Netwerkfout. Controleer uw verbinding.",
          sending: "Verzenden…",
          lblName: "Naam en voornaam *",
          lblEmail: "E-mail *",
          lblPhone: "Telefoon *",
          lblType: "Type interventie",
          lblAddr: "Adres",
          lblMsg: "Bericht",
          phName: "Jan Janssen",
          phEmail: "jan@voorbeeld.be",
          phPhone: "+32 …",
          phType: "Ketelstoring, lek, …",
          phAddr: "Straat, stad",
          phMsg: "Uw vraag of symptomen…",
          fileTitle: "Foto’s en documenten (optioneel)",
          fileDrop: "Sleep bestanden hierheen of klik in het vak",
          fileFormats: "JPG, PNG, GIF, WebP of PDF · max. 5 bestanden · max. 5 MB per bestand",
        }
      : {
          errIncomplete:
            "Veuillez compléter les champs obligatoires et accepter la politique de confidentialité.",
          errSend: "Envoi impossible. Réessayez plus tard.",
          errNetwork: "Erreur réseau. Vérifiez votre connexion.",
          sending: "Envoi…",
          lblName: "Nom et prénom *",
          lblEmail: "Adresse e-mail *",
          lblPhone: "Téléphone *",
          lblType: "Type d'intervention",
          lblAddr: "Adresse",
          lblMsg: "Message",
          phName: "Jean Dupont",
          phEmail: "jean@exemple.be",
          phPhone: "+32 …",
          phType: "Panne, fuite, …",
          phAddr: "Rue, ville",
          phMsg: "Votre demande ou symptômes…",
          fileTitle: "Photos et documents (facultatif)",
          fileDrop: "Glissez-déposez vos fichiers ici ou cliquez dans la zone",
          fileFormats:
            "JPG, PNG, GIF, WebP ou PDF · jusqu’à 5 fichiers · 5 Mo maximum par fichier",
        };

  const canSubmit = useMemo(() => {
    return (
      nom.trim().length > 1 &&
      EMAIL_REGEX.test(email) &&
      telephone.trim().length > 4 &&
      accept
    );
  }, [nom, email, telephone, accept]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!canSubmit) {
      setError(t.errIncomplete);
      return;
    }

    const fd = new FormData();
    fd.append("formType", formType);
    fd.append("source", source);
    if (locale === "nl") {
      fd.append("locale", "nl");
    }
    fd.append("nom", nom.trim());
    fd.append("email", email.trim());
    fd.append("telephone", telephone.trim());
    fd.append("typeIntervention", typeIntervention.trim());
    fd.append("adresse", adresse.trim());
    fd.append("message", message.trim());
    for (const f of files) fd.append("attachments", f);

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/mail", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error || t.errSend);
        return;
      }
      const sentTo = email.trim();
      setWhatsappPrefill(
        interventionPrefillText(locale, {
          nom: nom.trim(),
          email: email.trim(),
          telephone: telephone.trim(),
          typeIntervention: typeIntervention.trim(),
          adresse: adresse.trim(),
          message: message.trim(),
          source,
          attachmentCount: files.length,
        })
      );
      setSuccessModalEmail(sentTo);
      setSuccessModalOpen(true);
      setNom("");
      setEmail("");
      setTelephone("");
      setTypeIntervention("");
      setAdresse("");
      setMessage("");
      setAccept(false);
      setFiles([]);
      (e.target as HTMLFormElement).reset();
    } catch {
      setError(t.errNetwork);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties =
    surface === "light"
      ? {
          width: "100%",
          borderRadius: "999px",
          padding: "12px 14px",
          border: "1px solid rgba(148,163,184,0.50)",
          outline: "none",
          background: "#fff",
        }
      : {
          width: "100%",
          borderRadius: "999px",
          padding: "14px 16px",
          border: "1px solid rgba(148,163,184,0.40)",
          outline: "none",
          background: "rgba(255,255,255,0.96)",
        };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    borderRadius: surface === "light" ? "16px" : "18px",
    resize: "vertical" as const,
  };

  const labelColor =
    surface === "light" ? "var(--text-muted)" : "rgba(234,246,247,0.84)";
  const errColor = surface === "light" ? "#b42318" : "#fecaca";
  const lblHeading: React.CSSProperties = {
    fontSize: surface === "light" ? "0.88rem" : "0.9rem",
    fontWeight: 600,
    color: surface === "light" ? "var(--text-heading)" : "rgba(234,246,247,0.96)",
  };

  return (
    <>
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }} aria-hidden />
      <div style={{ display: "grid", gap: "0.35rem" }}>
        <label htmlFor={`${fieldId}-nom`} style={lblHeading}>{t.lblName}</label>
        <input
          id={`${fieldId}-nom`}
          name="nom"
          required
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder={t.phName}
          style={inputStyle}
        />
      </div>
      <div style={{ display: "grid", gap: "0.35rem" }}>
        <label htmlFor={`${fieldId}-email`} style={lblHeading}>{t.lblEmail}</label>
        <input
          id={`${fieldId}-email`}
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.phEmail}
          style={inputStyle}
        />
      </div>
      <div style={{ display: "grid", gap: "0.35rem" }}>
        <label htmlFor={`${fieldId}-tel`} style={lblHeading}>{t.lblPhone}</label>
        <input
          id={`${fieldId}-tel`}
          name="telephone"
          required
          inputMode="tel"
          autoComplete="tel"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          placeholder={t.phPhone}
          style={inputStyle}
        />
      </div>
      <div style={{ display: "grid", gap: "0.35rem" }}>
        <label htmlFor={`${fieldId}-type`} style={lblHeading}>{t.lblType}</label>
        <input
          id={`${fieldId}-type`}
          name="typeIntervention"
          value={typeIntervention}
          onChange={(e) => setTypeIntervention(e.target.value)}
          placeholder={t.phType}
          style={inputStyle}
        />
      </div>
      <div style={{ display: "grid", gap: "0.35rem" }}>
        <label htmlFor={`${fieldId}-addr`} style={lblHeading}>{t.lblAddr}</label>
        <input
          id={`${fieldId}-addr`}
          name="adresse"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          placeholder={t.phAddr}
          style={inputStyle}
        />
      </div>
      <div style={{ display: "grid", gap: "0.35rem" }}>
        <label htmlFor={`${fieldId}-msg`} style={lblHeading}>{t.lblMsg}</label>
        <textarea
          id={`${fieldId}-msg`}
          name="message"
          rows={7}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.phMsg}
          style={textareaStyle}
        />
      </div>
      <FileUploadField
        variant={surface === "light" ? "light" : "dark"}
        language={locale}
        files={files}
        onFilesChange={setFiles}
        title={t.fileTitle}
        dropHint={t.fileDrop}
        formatsHint={t.fileFormats}
      />
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: surface === "light" ? "0.86rem" : "0.9rem",
          color: labelColor,
          paddingLeft: surface === "light" ? "2px" : "6px",
        }}
      >
        <input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} required />
        <span>{privacyLabel}</span>
      </label>
      {error ? <p style={{ color: errColor, fontSize: "0.9rem", margin: 0 }}>{error}</p> : null}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "6px" }}>
        <button type="submit" className="btn btn-primary" style={{ minWidth: "160px" }} disabled={isSubmitting}>
          {isSubmitting ? t.sending : submitLabel}
        </button>
      </div>
    </form>
    <FormSuccessModal
      open={successModalOpen}
      onClose={() => {
        setSuccessModalOpen(false);
        setWhatsappPrefill("");
      }}
      locale={locale}
      userEmail={successModalEmail}
      whatsappPrefillText={whatsappPrefill}
    />
    </>
  );
}
