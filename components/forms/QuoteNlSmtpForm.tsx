"use client";

import { FormEvent, useMemo, useState } from "react";
import FileUploadField from "@/components/forms/FileUploadField";

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

type RegionOption = string;
type CityOption = string;
type ServiceOption = string;

type Props = {
  regions: RegionOption[];
  cities: CityOption[];
  services: ServiceOption[];
};

export default function QuoteNlSmtpForm({ regions, cities, services }: Props) {
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [adres, setAdres] = useState("");
  const [regio, setRegio] = useState("");
  const [stad, setStad] = useState("");
  const [dienst, setDienst] = useState("");
  const [besch, setBesch] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return (
      naam.trim().length > 1 &&
      EMAIL_REGEX.test(email) &&
      adres.trim().length > 2 &&
      regio &&
      stad &&
      dienst &&
      besch.trim().length > 5
    );
  }, [naam, email, adres, regio, stad, dienst, besch]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!canSubmit) {
      setError("Vul alle verplichte velden correct in.");
      return;
    }

    const fd = new FormData();
    fd.append("formType", "quote_nl");
    fd.append("naam", naam.trim());
    fd.append("email", email.trim());
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
        setError(data.error || "Verzenden mislukt. Probeer later opnieuw.");
        return;
      }
      setSuccess("Uw aanvraag is verzonden. We nemen snel contact op.");
      setNaam("");
      setEmail("");
      setAdres("");
      setRegio("");
      setStad("");
      setDienst("");
      setBesch("");
      setFiles([]);
      (e.target as HTMLFormElement).reset();
    } catch {
      setError("Netwerkfout. Controleer uw verbinding.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }} aria-hidden />
      <div style={{ display: "grid", gap: "0.4rem" }}>
        <label htmlFor="fullname-nl">Volledige naam</label>
        <input id="fullname-nl" name="naam" required value={naam} onChange={(e) => setNaam(e.target.value)} style={fieldStyle} />
      </div>
      <div style={{ display: "grid", gap: "0.4rem" }}>
        <label htmlFor="email-nl">E-mail</label>
        <input id="email-nl" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={fieldStyle} />
      </div>
      <div style={{ display: "grid", gap: "0.4rem" }}>
        <label htmlFor="address-nl">Adres in Brussel</label>
        <input id="address-nl" required value={adres} onChange={(e) => setAdres(e.target.value)} style={fieldStyle} />
      </div>
      <div style={{ display: "grid", gap: "0.4rem" }}>
        <label htmlFor="region-nl">Regio</label>
        <select id="region-nl" required value={regio} onChange={(e) => setRegio(e.target.value)} style={fieldStyle}>
          <option value="">Selecteer een regio</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "grid", gap: "0.4rem" }}>
        <label htmlFor="city-nl">Stad / Gemeente</label>
        <select id="city-nl" required value={stad} onChange={(e) => setStad(e.target.value)} style={fieldStyle}>
          <option value="">Selecteer een stad of gemeente</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "grid", gap: "0.4rem" }}>
        <label htmlFor="service-nl">Gewenste dienst</label>
        <select id="service-nl" required value={dienst} onChange={(e) => setDienst(e.target.value)} style={fieldStyle}>
          <option value="">Selecteer een dienst</option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "grid", gap: "0.4rem" }}>
        <label htmlFor="details-nl">Beschrijving van uw aanvraag</label>
        <textarea id="details-nl" rows={6} required value={besch} onChange={(e) => setBesch(e.target.value)} style={fieldStyle} />
      </div>
      <FileUploadField
        variant="light"
        language="nl"
        id="files-nl"
        files={files}
        onFilesChange={setFiles}
        title="Foto's en documenten (optioneel)"
        dropHint="Sleep bestanden hierheen of klik in het vak"
        formatsHint="JPG, PNG, GIF, WebP of PDF · max. 5 bestanden · 5 MB per bestand"
      />
      {error ? <p style={{ color: "#b42318", margin: 0 }}>{error}</p> : null}
      {success ? <p style={{ color: "var(--color-primary)", margin: 0, fontWeight: 600 }}>{success}</p> : null}
      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Bezig…" : "Verstuur aanvraag"}
      </button>
    </form>
  );
}
