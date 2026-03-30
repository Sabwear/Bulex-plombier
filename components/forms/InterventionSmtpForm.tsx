"use client";

import { type FormEvent, type ReactNode, useMemo, useState } from "react";
import FileUploadField from "@/components/forms/FileUploadField";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  formType: "intervention" | "quote_fr";
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
  const [success, setSuccess] = useState<string | null>(null);

  const t =
    locale === "nl"
      ? {
          errIncomplete:
            "Vul de verplichte velden in en aanvaard het privacybeleid.",
          errSend: "Verzenden mislukt. Probeer het later opnieuw.",
          success: "Uw aanvraag is verzonden. We nemen snel contact met u op.",
          errNetwork: "Netwerkfout. Controleer uw verbinding.",
          sending: "Verzenden…",
          phName: "Naam voornaam *",
          phEmail: "E-mail *",
          phPhone: "Telefoonnummer *",
          phType: "Type interventie",
          phAddr: "Adres",
          phMsg: "Bericht",
          fileTitle: "Foto’s en documenten (optioneel)",
          fileDrop: "Sleep bestanden hierheen of klik in het vak",
          fileFormats: "JPG, PNG, GIF, WebP of PDF · max. 5 bestanden · max. 5 MB per bestand",
        }
      : {
          errIncomplete:
            "Veuillez compléter les champs obligatoires et accepter la politique de confidentialité.",
          errSend: "Envoi impossible. Réessayez plus tard.",
          success:
            "Votre demande a été envoyée. Nous vous recontactons rapidement.",
          errNetwork: "Erreur réseau. Vérifiez votre connexion.",
          sending: "Envoi…",
          phName: "Nom Prénom *",
          phEmail: "E-mail *",
          phPhone: "Numéro de téléphone *",
          phType: "Type d'intervention",
          phAddr: "Adresse",
          phMsg: "Message",
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
    setSuccess(null);
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
      setSuccess(t.success);
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
  const okColor = surface === "light" ? "var(--color-primary)" : "#86efac";

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }} aria-hidden />
      <input
        name="nom"
        required
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        placeholder={t.phName}
        style={inputStyle}
      />
      <input
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t.phEmail}
        style={inputStyle}
      />
      <input
        name="telephone"
        required
        inputMode="tel"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
        placeholder={t.phPhone}
        style={inputStyle}
      />
      <input
        name="typeIntervention"
        value={typeIntervention}
        onChange={(e) => setTypeIntervention(e.target.value)}
        placeholder={t.phType}
        style={inputStyle}
      />
      <input
        name="adresse"
        value={adresse}
        onChange={(e) => setAdresse(e.target.value)}
        placeholder={t.phAddr}
        style={inputStyle}
      />
      <textarea
        name="message"
        rows={7}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t.phMsg}
        style={textareaStyle}
      />
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
      {success ? <p style={{ color: okColor, fontSize: "0.9rem", margin: 0 }}>{success}</p> : null}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "6px" }}>
        <button type="submit" className="btn btn-primary" style={{ minWidth: "160px" }} disabled={isSubmitting}>
          {isSubmitting ? t.sending : submitLabel}
        </button>
      </div>
    </form>
  );
}
