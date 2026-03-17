import type { Metadata } from "next";
import Link from "next/link";

const regions = [
  "Brussels Hoofdstedelijk Gewest",
  "Vlaams-Brabant",
  "Waals-Brabant",
  "Andere",
];

const brusselsCities = [
  "Anderlecht",
  "Oudergem",
  "Sint-Agatha-Berchem",
  "Brussel-Stad",
  "Etterbeek",
  "Evere",
  "Vorst",
  "Ganshoren",
  "Elsene",
  "Jette",
  "Koekelberg",
  "Sint-Jans-Molenbeek",
  "Sint-Gillis",
  "Sint-Joost-ten-Node",
  "Schaarbeek",
  "Ukkel",
  "Watermaal-Bosvoorde",
  "Sint-Lambrechts-Woluwe",
  "Sint-Pieters-Woluwe",
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
  title: "Offerte aanvragen | vaillant Loodgieter",
  description:
    "Vraag een offerte aan voor uw loodgieter- of verwarmingsinterventie in Brussel. vaillant Loodgieter, gecertificeerd Vaillant partner.",
  alternates: { canonical: "https://vaillant-loodgieter.be/nl/demande-offerte" },
  openGraph: {
    title: "Offerte aanvragen | vaillant Loodgieter",
    description:
      "Ontvang een transparante offerte voor loodgieterij en verwarming in Brussel.",
    url: "https://vaillant-loodgieter.be/nl/demande-offerte",
  },
};

export default function DemandeOffertePage() {
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
            Offerte aanvragen
          </span>
          <h1 style={{ marginBottom: "1rem" }}>
            Vraag een duidelijke offerte voor uw interventie in Brussel
          </h1>
          <p style={{ fontSize: "1.1rem", maxWidth: "60ch", marginBottom: "2rem" }}>
            Vul dit formulier in en ontvang snel een eerste inschatting met een
            voorstel op maat.
          </p>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="card" style={{ padding: "2rem" }}>
            <form
              action="mailto:contact@vaillant-loodgieter.be"
              method="post"
              encType="text/plain"
              style={{ display: "grid", gap: "1rem" }}
            >
              <div style={{ display: "grid", gap: "0.4rem" }}>
                <label htmlFor="fullname">Volledige naam</label>
                <input id="fullname" name="Naam" required style={fieldStyle} />
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
                <label htmlFor="address">Adres in Brussel</label>
                <input id="address" name="Adres" required style={fieldStyle} />
              </div>
              <div style={{ display: "grid", gap: "0.4rem" }}>
                <label htmlFor="region">Regio</label>
                <select id="region" name="Regio" style={fieldStyle} required>
                  <option value="">Selecteer een regio</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "grid", gap: "0.4rem" }}>
                <label htmlFor="city">Stad / Gemeente</label>
                <select id="city" name="Stad of gemeente" style={fieldStyle} required>
                  <option value="">Selecteer een stad of gemeente</option>
                  {brusselsCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "grid", gap: "0.4rem" }}>
                <label htmlFor="service">Gewenste dienst</label>
                <select id="service" name="Dienst" style={fieldStyle} required>
                  <option value="">Selecteer een dienst</option>
                  <option>Vaillant herstelling Brussel</option>
                  <option>Boiler vervangen Brussel</option>
                  <option>Nieuwe verwarming Brussel</option>
                  <option>Waterlek herstellen Brussel</option>
                  <option>Sanitair installatie Brussel</option>
                  <option>Vaillant onderhoudscontract</option>
                </select>
              </div>
              <div style={{ display: "grid", gap: "0.4rem" }}>
                <label htmlFor="details">Beschrijving van uw aanvraag</label>
                <textarea
                  id="details"
                  name="Beschrijving"
                  rows={6}
                  required
                  style={fieldStyle}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Verstuur aanvraag
              </button>
            </form>
          </div>

          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <Link href="/nl/contact" className="btn btn-outline">
              Liever rechtstreeks contact?
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
