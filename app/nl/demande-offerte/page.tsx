import type { Metadata } from "next";
import Link from "next/link";
import QuoteNlSmtpForm from "@/components/forms/QuoteNlSmtpForm";

const regions = [
  "Brussels Hoofdstedelijk Gewest",
  "Vlaams-Brabant",
  "Waals-Brabant",
  "Andere",
];

const nlServices = [
  "Vaillant herstelling Brussel",
  "Boiler vervangen Brussel",
  "Nieuwe verwarming Brussel",
  "Waterlek herstellen Brussel",
  "Sanitair installatie Brussel",
  "Vaillant onderhoudscontract",
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

export const metadata: Metadata = {
  title: "Offerte aanvragen | vaillant Loodgieter",
  description:
    "Vraag een offerte aan voor uw loodgieter- of verwarmingsinterventie in Brussel. vaillant Loodgieter, gecertificeerd Vaillant partner.",
  alternates: { canonical: "https://vaillant-loodgieter.com/nl/demande-offerte" },
  openGraph: {
    title: "Offerte aanvragen | vaillant Loodgieter",
    description:
      "Ontvang een transparante offerte voor loodgieterij en verwarming in Brussel.",
    url: "https://vaillant-loodgieter.com/nl/demande-offerte",
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
            <QuoteNlSmtpForm regions={regions} cities={brusselsCities} services={nlServices} />
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
