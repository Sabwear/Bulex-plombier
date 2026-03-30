"use client";

import { FormEvent, useMemo, useState } from "react";
import FileUploadField from "@/components/forms/FileUploadField";
import FormSuccessModal from "@/components/forms/FormSuccessModal";
import { quotePrefillText } from "@/lib/whatsappPrefill";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  padding: "0.75rem 0.85rem",
  background: "#fff",
  color: "var(--text-primary)",
  fontSize: "0.95rem",
};

type Props = {
  locale: "fr" | "nl";
  regions: string[];
  cities: string[];
  services: string[];
};

export default function QuoteRequestSmtpForm({ locale, regions, cities, services }: Props) {
  const id = `quote-${locale}`;
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [telefoon, setTelefoon] = useState("");
  const [adres, setAdres] = useState("");
  const [regio, setRegio] = useState("");
  const [stad, setStad] = useState("");
  const [dienst, setDienst] = useState("");
  const [besch, setBesch] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successEmail, setSuccessEmail] = useState("");
  const [whatsappPrefill, setWhatsappPrefill] = useState("");

  const t =
    locale === "nl"
      ? {
          errIncomplete: "Vul alle verplichte velden correct in.",
          errSend: "Verzenden mislukt. Probeer later opnieuw.",
          errNetwork: "Netwerkfout. Controleer uw verbinding.",
          lblName: "Volledige naam *",
          lblEmail: "E-mail *",
          lblPhone: "Telefoon *",
          phPhone: "+32 …",
          lblAddress: "Adres (straat + nr., stad) *",
          lblRegion: "Regio / provincie *",
          lblCity: "Gemeente / stad *",
          lblService: "Gewenste dienst *",
          lblDetails: "Beschrijving van uw aanvraag *",
          phRegion: "Selecteer een regio",
          phCity: "Selecteer een gemeente of stad",
          phService: "Selecteer een dienst",
          submit: "Verstuur aanvraag",
          submitting: "Bezig…",
          fileTitle: "Foto's en documenten (optioneel)",
          fileDrop: "Sleep bestanden hierheen of klik in het vak",
          fileFormats: "JPG, PNG, GIF, WebP of PDF · max. 5 bestanden · 5 MB per bestand",
        }
      : {
          errIncomplete: "Veuillez remplir correctement tous les champs obligatoires.",
          errSend: "Envoi impossible. Réessayez plus tard.",
          errNetwork: "Erreur réseau. Vérifiez votre connexion.",
          lblName: "Nom et prénom *",
          lblEmail: "Adresse e-mail *",
          lblPhone: "Téléphone *",
          phPhone: "+32 …",
          lblAddress: "Adresse (rue + n°, ville) *",
          lblRegion: "Région / province *",
          lblCity: "Commune / ville *",
          lblService: "Service souhaité *",
          lblDetails: "Description de votre demande *",
          phRegion: "Sélectionnez une région",
          phCity: "Sélectionnez une commune ou une ville",
          phService: "Sélectionnez un service",
          submit: "Envoyer la demande",
          submitting: "Envoi…",
          fileTitle: "Photos et documents (facultatif)",
          fileDrop: "Glissez-déposez vos fichiers ici ou cliquez dans la zone",
          fileFormats:
            "JPG, PNG, GIF, WebP ou PDF · jusqu’à 5 fichiers · 5 Mo maximum par fichier",
        };

  const canSubmit = useMemo(() => {
    return (
      naam.trim().length > 1 &&
      EMAIL_REGEX.test(email) &&
      telefoon.trim().length >= 5 &&
      adres.trim().length > 2 &&
      regio &&
      stad &&
      dienst &&
      besch.trim().length > 5
    );
  }, [naam, email, telefoon, adres, regio, stad, dienst, besch]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!canSubmit) {
      setError(t.errIncomplete);
      return;
    }

    const fd = new FormData();
    fd.append("formType", locale === "fr" ? "quote_fr" : "quote_nl");
    fd.append("naam", naam.trim());
    fd.append("email", email.trim());
    fd.append("telephone", telefoon.trim());
    fd.append("adres", adres.trim());
    fd.append("regio", regio);
    fd.append("stad", stad);
    fd.append("dienst", dienst);
    fd.append("beschrijving", besch.trim());
    for (const f of files) fd.append("attachments", f);

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/mail", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error || t.errSend);
        return;
      }
      setWhatsappPrefill(
        quotePrefillText(locale, {
          naam: naam.trim(),
          email: email.trim(),
          telephone: telefoon.trim(),
          adres: adres.trim(),
          regio,
          stad,
          dienst,
          beschrijving: besch.trim(),
          attachmentCount: files.length,
        })
      );
      setSuccessEmail(email.trim());
      setSuccessOpen(true);
      setNaam("");
      setEmail("");
      setTelefoon("");
      setAdres("");
      setRegio("");
      setStad("");
      setDienst("");
      setBesch("");
      setFiles([]);
      (e.target as HTMLFormElement).reset();
    } catch {
      setError(t.errNetwork);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }}
          aria-hidden
        />
        <div style={{ display: "grid", gap: "0.4rem" }}>
          <label htmlFor={`${id}-name`}>{t.lblName}</label>
          <input id={`${id}-name`} name="naam" required value={naam} onChange={(e) => setNaam(e.target.value)} style={fieldStyle} />
        </div>
        <div style={{ display: "grid", gap: "0.4rem" }}>
          <label htmlFor={`${id}-email`}>{t.lblEmail}</label>
          <input
            id={`${id}-email`}
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={fieldStyle}
          />
        </div>
        <div style={{ display: "grid", gap: "0.4rem" }}>
          <label htmlFor={`${id}-phone`}>{t.lblPhone}</label>
          <input
            id={`${id}-phone`}
            type="tel"
            name="telephone"
            required
            inputMode="tel"
            autoComplete="tel"
            value={telefoon}
            onChange={(e) => setTelefoon(e.target.value)}
            placeholder={t.phPhone}
            style={fieldStyle}
          />
        </div>
        <div style={{ display: "grid", gap: "0.4rem" }}>
          <label htmlFor={`${id}-adres`}>{t.lblAddress}</label>
          <input id={`${id}-adres`} name="adres" required value={adres} onChange={(e) => setAdres(e.target.value)} style={fieldStyle} />
        </div>
        <div style={{ display: "grid", gap: "0.4rem" }}>
          <label htmlFor={`${id}-region`}>{t.lblRegion}</label>
          <select id={`${id}-region`} name="regio" required value={regio} onChange={(e) => setRegio(e.target.value)} style={fieldStyle}>
            <option value="">{t.phRegion}</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "grid", gap: "0.4rem" }}>
          <label htmlFor={`${id}-city`}>{t.lblCity}</label>
          <select id={`${id}-city`} name="stad" required value={stad} onChange={(e) => setStad(e.target.value)} style={fieldStyle}>
            <option value="">{t.phCity}</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "grid", gap: "0.4rem" }}>
          <label htmlFor={`${id}-service`}>{t.lblService}</label>
          <select id={`${id}-service`} name="dienst" required value={dienst} onChange={(e) => setDienst(e.target.value)} style={fieldStyle}>
            <option value="">{t.phService}</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "grid", gap: "0.4rem" }}>
          <label htmlFor={`${id}-details`}>{t.lblDetails}</label>
          <textarea id={`${id}-details`} name="beschrijving" rows={6} required value={besch} onChange={(e) => setBesch(e.target.value)} style={fieldStyle} />
        </div>
        <FileUploadField
          variant="light"
          language={locale}
          id={`${id}-files`}
          files={files}
          onFilesChange={setFiles}
          title={t.fileTitle}
          dropHint={t.fileDrop}
          formatsHint={t.fileFormats}
        />
        {error ? <p style={{ color: "#b42318", margin: 0 }}>{error}</p> : null}
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? t.submitting : t.submit}
        </button>
      </form>
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
