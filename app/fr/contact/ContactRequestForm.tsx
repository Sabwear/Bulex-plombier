"use client";

import { FormEvent, useMemo, useState } from "react";
import FileUploadField from "@/components/forms/FileUploadField";

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
}

export default function ContactRequestForm({ supportEmail }: ContactRequestFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return (
      form.nom.trim().length > 1 &&
      EMAIL_REGEX.test(form.email) &&
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
    setHint(null);

    if (!canSubmit) {
      setError("Veuillez compléter correctement les champs obligatoires.");
      return;
    }

    const fd = new FormData();
    fd.append("formType", "contact");
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
        setError(data.error || "Envoi impossible. Réessayez plus tard.");
        return;
      }
      setHint("Votre message a été envoyé. Nous vous répondrons rapidement.");
      setForm(initialState);
      setFiles([]);
      (event.target as HTMLFormElement).reset();
    } catch {
      setError("Erreur réseau. Vérifiez votre connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
        <input
          name="Nom"
          required
          value={form.nom}
          onChange={(e) => updateField("nom", e.target.value)}
          placeholder="Nom complet"
          style={{ width: "100%", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "0.7rem 0.8rem" }}
        />
        <input
          type="email"
          name="Email"
          required
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="Adresse e-mail"
          style={{ width: "100%", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "0.7rem 0.8rem" }}
        />
        <input
          type="tel"
          name="Telephone"
          value={form.telephone}
          onChange={(e) => updateField("telephone", e.target.value)}
          placeholder="Telephone (facultatif)"
          style={{ width: "100%", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "0.7rem 0.8rem" }}
        />
        <input
          name="Adresse"
          required
          value={form.adresse}
          onChange={(e) => updateField("adresse", e.target.value)}
          placeholder="Adresse (ville)"
          style={{ width: "100%", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "0.7rem 0.8rem" }}
        />
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
          Marquer cette demande comme urgente
        </label>
        <textarea
          name="Message"
          rows={5}
          required
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          placeholder="Décrivez votre demande..."
          style={{ width: "100%", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "0.7rem 0.8rem", resize: "vertical" }}
        />
        <FileUploadField
          variant="light"
          language="fr"
          files={files}
          onFilesChange={setFiles}
          title="Photos et documents (facultatif)"
          dropHint="Glissez-déposez vos fichiers ici ou cliquez dans la zone"
          formatsHint="JPG, PNG, GIF, WebP ou PDF · jusqu’à 5 fichiers · 5 Mo maximum par fichier"
        />
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours…" : "Envoyer la demande"}
        </button>
      </form>

      <p style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
        Les messages sont envoyés depuis {supportEmail} ; réponse directe à votre adresse e-mail.
      </p>
      {error ? <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "#b42318" }}>{error}</p> : null}
      {hint ? <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--color-primary)" }}>{hint}</p> : null}
    </div>
  );
}
