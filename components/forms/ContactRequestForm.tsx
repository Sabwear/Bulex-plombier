"use client";

import { FormEvent, useMemo, useState } from "react";
import FileUploadField from "@/components/forms/FileUploadField";
import FormSuccessModal from "@/components/forms/FormSuccessModal";
import { contactPrefillText } from "@/lib/whatsappPrefill";
import { trackFormSubmitConversion } from "@/lib/gtagConversions";

type FormState = {
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  urgence: boolean;
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialState: FormState = {
  nom: "",
  email: "",
  telephone: "",
  adresse: "",
  urgence: false,
  message: "",
};

interface ContactRequestFormProps {
  supportEmail: string;
  locale?: "fr" | "nl";
}

export default function ContactRequestForm({
  supportEmail,
  locale = "fr",
}: ContactRequestFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successEmail, setSuccessEmail] = useState("");
  const [whatsappPrefill, setWhatsappPrefill] = useState("");

  const id = `contact-${locale}`;

  const t =
    locale === "nl"
      ? {
          errIncomplete: "Vul de verplichte velden correct in.",
          errSend: "Verzenden mislukt. Probeer het later opnieuw.",
          errNetwork: "Netwerkfout. Controleer uw verbinding.",
          sending: "Bezig met verzenden…",
          submit: "Verstuur aanvraag",
          lblName: "Volledige naam *",
          lblEmail: "E-mail *",
          lblPhone: "Telefoon *",
          lblAddr: "Adres *",
          lblMsg: "Bericht *",
          phName: "Jan Janssen",
          phEmail: "jan@voorbeeld.be",
          phPhone: "+32 …",
          phAddr: "Straat, nr., postcode, stad",
          urgentLabel: "Deze aanvraag als spoed markeren",
          phMsg: "Beschrijf uw situatie…",
          fileTitle: "Foto’s en documenten (optioneel)",
          fileDrop: "Sleep bestanden hierheen of klik in het vak",
          fileFormats:
            "JPG, PNG, GIF, WebP of PDF · max. 5 bestanden · max. 5 MB per bestand",
          footer: `Berichten worden verzonden via ${supportEmail}; u ontvangt een antwoord op uw e-mailadres.`,
        }
      : {
          errIncomplete: "Veuillez compléter correctement les champs obligatoires.",
          errSend: "Envoi impossible. Réessayez plus tard.",
          errNetwork: "Erreur réseau. Vérifiez votre connexion.",
          sending: "Envoi en cours…",
          submit: "Envoyer la demande",
          lblName: "Nom et prénom *",
          lblEmail: "Adresse e-mail *",
          lblPhone: "Téléphone *",
          lblAddr: "Adresse *",
          lblMsg: "Message *",
          phName: "Jean Dupont",
          phEmail: "jean@exemple.be",
          phPhone: "+32 …",
          phAddr: "Rue, n°, code postal, ville",
          urgentLabel: "Marquer cette demande comme urgente",
          phMsg: "Décrivez votre situation…",
          fileTitle: "Photos et documents (facultatif)",
          fileDrop: "Glissez-déposez vos fichiers ici ou cliquez dans la zone",
          fileFormats:
            "JPG, PNG, GIF, WebP ou PDF · jusqu’à 5 fichiers · 5 Mo maximum par fichier",
          footer: `Les messages sont envoyés depuis ${supportEmail} ; réponse directe à votre adresse e-mail.`,
        };

  const canSubmit = useMemo(() => {
    return (
      form.nom.trim().length > 1 &&
      EMAIL_REGEX.test(form.email) &&
      form.telephone.trim().length >= 5 &&
      form.adresse.trim().length > 2 &&
      form.message.trim().length > 8
    );
  }, [form]);

  const updateField = (key: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!canSubmit) {
      setError(t.errIncomplete);
      return;
    }

    const fd = new FormData();
    fd.append("formType", "contact");
    if (locale === "nl") {
      fd.append("locale", "nl");
    }
    fd.append("nom", form.nom.trim());
    fd.append("email", form.email.trim());
    fd.append("telephone", form.telephone.trim());
    fd.append("adresse", form.adresse.trim());
    fd.append("urgence", form.urgence ? "true" : "false");
    fd.append("message", form.message.trim());
    for (const f of files) fd.append("attachments", f);

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/mail", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error || t.errSend);
        return;
      }
      setSuccessEmail(form.email.trim());
      setSuccessOpen(true);
      trackFormSubmitConversion();
      setForm(initialState);
      setFiles([]);
      (event.target as HTMLFormElement).reset();
    } catch {
      setError(t.errNetwork);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div className="card" style={{ marginBottom: "1.5rem" }}>
      <form onSubmit={handleSubmit} noValidate style={{ display: "grid", gap: "0.85rem" }}>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }}
          aria-hidden
        />
        <div style={{ display: "grid", gap: "0.4rem" }}>
          <label htmlFor={`${id}-name`} style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-heading)" }}>
            {t.lblName}
          </label>
          <input
            id={`${id}-name`}
            name="Nom"
            required
            value={form.nom}
            onChange={(e) => updateField("nom", e.target.value)}
            placeholder={t.phName}
            style={{ width: "100%", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "0.7rem 0.8rem" }}
          />
        </div>
        <div style={{ display: "grid", gap: "0.4rem" }}>
          <label htmlFor={`${id}-email`} style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-heading)" }}>
            {t.lblEmail}
          </label>
          <input
            id={`${id}-email`}
            type="email"
            name="Email"
            required
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder={t.phEmail}
            style={{ width: "100%", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "0.7rem 0.8rem" }}
          />
        </div>
        <div style={{ display: "grid", gap: "0.4rem" }}>
          <label htmlFor={`${id}-phone`} style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-heading)" }}>
            {t.lblPhone}
          </label>
          <input
            id={`${id}-phone`}
            type="tel"
            name="Telephone"
            required
            inputMode="tel"
            autoComplete="tel"
            value={form.telephone}
            onChange={(e) => updateField("telephone", e.target.value)}
            placeholder={t.phPhone}
            style={{ width: "100%", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "0.7rem 0.8rem" }}
          />
        </div>
        <div style={{ display: "grid", gap: "0.4rem" }}>
          <label htmlFor={`${id}-addr`} style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-heading)" }}>
            {t.lblAddr}
          </label>
          <input
            id={`${id}-addr`}
            name="Adresse"
            required
            value={form.adresse}
            onChange={(e) => updateField("adresse", e.target.value)}
            placeholder={t.phAddr}
            style={{ width: "100%", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "0.7rem 0.8rem" }}
          />
        </div>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
          }}
        >
          <input type="checkbox" checked={form.urgence} onChange={(e) => updateField("urgence", e.target.checked)} />
          {t.urgentLabel}
        </label>
        <div style={{ display: "grid", gap: "0.4rem" }}>
          <label htmlFor={`${id}-msg`} style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-heading)" }}>
            {t.lblMsg}
          </label>
          <textarea
            id={`${id}-msg`}
            name="Message"
            rows={5}
            required
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            placeholder={t.phMsg}
            style={{ width: "100%", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "0.7rem 0.8rem", resize: "vertical" }}
          />
        </div>
        <FileUploadField
          variant="light"
          language={locale}
          files={files}
          onFilesChange={setFiles}
          title={t.fileTitle}
          dropHint={t.fileDrop}
          formatsHint={t.fileFormats}
        />
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? t.sending : t.submit}
        </button>
      </form>

      <p style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
        {t.footer}
      </p>
      {error ? <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "#b42318" }}>{error}</p> : null}
    </div>
    <FormSuccessModal
      open={successOpen}
      onClose={() => {
        setSuccessOpen(false);
        setWhatsappPrefill("");
      }}
      locale={locale}
      userEmail={successEmail}
      whatsappPrefillText={whatsappPrefill}
    />
    </>
  );
}
