import type { Metadata } from "next";
import Link from "next/link";

const regions = [
  "Bruxelles-Capitale",
  "Brabant flamand",
  "Brabant wallon",
  "Autre",
];

const brusselsCities = [
  "Anderlecht",
  "Auderghem",
  "Berchem-Sainte-Agathe",
  "Bruxelles-Ville",
  "Etterbeek",
  "Evere",
  "Forest",
  "Ganshoren",
  "Ixelles",
  "Jette",
  "Koekelberg",
  "Molenbeek-Saint-Jean",
  "Saint-Gilles",
  "Saint-Josse-ten-Noode",
  "Schaerbeek",
  "Uccle",
  "Watermael-Boitsfort",
  "Woluwe-Saint-Lambert",
  "Woluwe-Saint-Pierre",
];

const fieldStyle = {
  width: "100%",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  padding: "0.75rem 0.85rem",
  background: "#fff",
  color: "var(--text-primary)",
  fontSize: "0.95rem",
};

export const metadata: Metadata = {
  title: "Demande de devis | Villant Plombier",
  description:
    "Demandez un devis pour votre intervention plomberie ou chauffage a Bruxelles. Villant Plombier, partenaire certifie Vaillant.",
  alternates: { canonical: "https://villant-loodgieter.be/demande-devis" },
  openGraph: {
    title: "Demande de devis | Villant Plombier",
    description:
      "Recevez un devis transparent pour vos travaux de plomberie et chauffage a Bruxelles.",
    url: "https://villant-loodgieter.be/demande-devis",
  },
};

export default function DemandeDevisPage() {
  return (
    <>
      <section
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.55) 100%), url('/images/contact.jpg') center/cover no-repeat",
          padding: "5rem 1.5rem 4rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container">
          <span className="badge badge-green" style={{ marginBottom: "1rem" }}>
            Demande de devis
          </span>
          <h1 style={{ marginBottom: "1rem" }}>
            Obtenez un devis clair pour votre intervention a Bruxelles
          </h1>
          <p style={{ fontSize: "1.1rem", maxWidth: "60ch", marginBottom: "2rem" }}>
            Remplissez ce formulaire pour recevoir une estimation rapide. Nous
            revenons vers vous avec un diagnostic initial et une proposition
            adaptee.
          </p>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="card" style={{ padding: "2rem" }}>
            <form
              action="mailto:contact@villant-loodgieter.be"
              method="post"
              encType="text/plain"
              style={{ display: "grid", gap: "1rem" }}
            >
              <div style={{ display: "grid", gap: "0.4rem" }}>
                <label htmlFor="fullname">Nom complet</label>
                <input id="fullname" name="Nom" required style={fieldStyle} />
              </div>
              <div style={{ display: "grid", gap: "0.4rem" }}>
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  name="Email"
                  type="email"
                  required
                  style={fieldStyle}
                />
              </div>
              <div style={{ display: "grid", gap: "0.4rem" }}>
                <label htmlFor="address">Adresse a Bruxelles</label>
                <input id="address" name="Adresse" required style={fieldStyle} />
              </div>
              <div style={{ display: "grid", gap: "0.4rem" }}>
                <label htmlFor="region">Region</label>
                <select id="region" name="Region" style={fieldStyle} required>
                  <option value="">Selectionnez une region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "grid", gap: "0.4rem" }}>
                <label htmlFor="city">Ville / Commune</label>
                <select id="city" name="Ville ou commune" style={fieldStyle} required>
                  <option value="">Selectionnez une ville ou commune</option>
                  {brusselsCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "grid", gap: "0.4rem" }}>
                <label htmlFor="service">Service demande</label>
                <select id="service" name="Service" style={fieldStyle} required>
                  <option value="">Selectionnez un service</option>
                  <option>Reparation Vaillant Bruxelles</option>
                  <option>Remplacement Chaudiere Bruxelles</option>
                  <option>Nouveau Chauffage Bruxelles</option>
                  <option>Reparation Fuite d'Eau Bruxelles</option>
                  <option>Installation Sanitaire Bruxelles</option>
                  <option>Contrat d'Entretien Vaillant</option>
                </select>
              </div>
              <div style={{ display: "grid", gap: "0.4rem" }}>
                <label htmlFor="details">Description du besoin</label>
                <textarea
                  id="details"
                  name="Description"
                  rows={6}
                  required
                  style={fieldStyle}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Envoyer la demande
              </button>
            </form>
          </div>

          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <Link href="/contact" className="btn btn-outline">
              Vous preferez contacter directement ?
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
