"use client";

import { type FormEvent, type ReactNode, useMemo, useState } from "react";
import FileUploadField from "@/components/forms/FileUploadField";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  formType: "intervention" | "quote_fr";
  source: string;
  privacyLabel: ReactNode;
  submitLabel: string;
};

export default function InterventionSmtpForm({
  formType,
  source,
  privacyLabel,
  submitLabel,
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
      setError("Veuillez compléter les champs obligatoires et accepter la politique de confidentialité.");
      return;
    }

    const fd = new FormData();
    fd.append("formType", formType);
    fd.append("source", source);
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
        setError(data.error || "Envoi impossible. Réessayez plus tard.");
        return;
      }
      setSuccess("Votre demande a été envoyée. Nous vous recontactons rapidement.");
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
      setError("Erreur réseau. Vérifiez votre connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: "999px",
    padding: "14px 16px",
    border: "1px solid rgba(148,163,184,0.40)",
    outline: "none",
    background: "rgba(255,255,255,0.96)",
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    borderRadius: "18px",
    resize: "vertical" as const,
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }} aria-hidden />
      <input
        name="nom"
        required
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        placeholder="Nom Prénom *"
        style={inputStyle}
      />
      <input
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail *"
        style={inputStyle}
      />
      <input
        name="telephone"
        required
        inputMode="tel"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
        placeholder="Numéro de téléphone *"
        style={inputStyle}
      />
      <input
        name="typeIntervention"
        value={typeIntervention}
        onChange={(e) => setTypeIntervention(e.target.value)}
        placeholder="Type d'intervention"
        style={inputStyle}
      />
      <input
        name="adresse"
        value={adresse}
        onChange={(e) => setAdresse(e.target.value)}
        placeholder="Adresse"
        style={inputStyle}
      />
      <textarea
        name="message"
        rows={7}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        style={textareaStyle}
      />
      <FileUploadField
        variant="dark"
        language="fr"
        files={files}
        onFilesChange={setFiles}
        title="Photos et documents (facultatif)"
        dropHint="Glissez-déposez vos fichiers ici ou cliquez dans la zone"
        formatsHint="JPG, PNG, GIF, WebP ou PDF · jusqu’à 5 fichiers · 5 Mo maximum par fichier"
      />
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "0.9rem",
          color: "rgba(234,246,247,0.84)",
          paddingLeft: "6px",
        }}
      >
        <input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} required />
        <span>{privacyLabel}</span>
      </label>
      {error ? <p style={{ color: "#fecaca", fontSize: "0.9rem", margin: 0 }}>{error}</p> : null}
      {success ? <p style={{ color: "#86efac", fontSize: "0.9rem", margin: 0 }}>{success}</p> : null}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "6px" }}>
        <button type="submit" className="btn btn-primary" style={{ minWidth: "160px" }} disabled={isSubmitting}>
          {isSubmitting ? "Envoi…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
