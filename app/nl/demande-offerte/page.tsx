import type { Metadata } from "next";
import Link from "next/link";
import QuoteNlSmtpForm from "@/components/forms/QuoteNlSmtpForm";
import { buildLocaleAlternates } from "@/lib/seoAlternates";

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
  alternates: buildLocaleAlternates("/nl/demande-offerte"),
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
          {/* Details (above form) */}
          <div className="card" style={{ marginBottom: "1.5rem" }}>
            <span className="badge badge-blue" style={{ marginBottom: "0.75rem" }}>
              Hoe werkt het?
            </span>
            <h2 style={{ marginBottom: "0.75rem" }}>Wat u best vermeldt in uw aanvraag</h2>
            <p style={{ fontSize: "0.95rem", marginBottom: "1rem" }}>
              Hoe preciezer uw info, hoe sneller we kunnen inschatten wat er nodig is. Dit helpt ons om
              onnodige heen-en-weer berichten te vermijden en u meteen een duidelijk voorstel te sturen.
            </p>
            <div className="grid gap-4 sm:grid-cols-2" style={{ marginTop: "1rem" }}>
              {[
                { title: "Type interventie", desc: "Herstelling, vervanging, waterlek, sanitair, verwarming of onderhoud." },
                { title: "Adres & gemeente", desc: "Straat, huisnummer en gemeente/stad in Brussel of omgeving." },
                { title: "Toestel (indien van toepassing)", desc: "Merk/model (bv. Vaillant ecoTEC) + foutcode of symptoom." },
                { title: "Urgentie", desc: "Vermeld ‘SPOED’ als u geen verwarming of warm water heeft." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[var(--radius)] border border-[var(--border)] bg-white p-4"
                >
                  <div className="text-sm font-semibold text-[var(--text-heading)]">
                    {item.title}
                  </div>
                  <div className="mt-1 text-sm text-[var(--text-body)]">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "0.9rem", marginTop: "1rem", color: "var(--text-muted)", maxWidth: "none" }}>
              We antwoorden doorgaans snel met een eerste inschatting. Definitieve prijs = afhankelijk van diagnose en benodigde onderdelen.
            </p>
          </div>

          <div className="card" style={{ padding: "2rem" }}>
            <QuoteNlSmtpForm regions={regions} cities={brusselsCities} services={nlServices} />
          </div>

          {/* Details (below form) */}
          <div className="card" style={{ marginTop: "1.5rem" }}>
            <span className="badge badge-gold" style={{ marginBottom: "0.75rem" }}>
              Wat gebeurt er daarna?
            </span>
            <h2 style={{ marginBottom: "0.75rem" }}>Van aanvraag tot interventie</h2>
            <div className="grid gap-4 sm:grid-cols-3" style={{ marginTop: "1rem" }}>
              {[
                { n: "1", title: "Bevestiging", desc: "We bekijken uw aanvraag en stellen eventueel een korte vervolgvraag." },
                { n: "2", title: "Voorstel", desc: "U ontvangt een duidelijke inschatting en/of planning op maat." },
                { n: "3", title: "Interventie", desc: "Gecertificeerde technici voeren de werken uit met transparante communicatie." },
              ].map((step) => (
                <div
                  key={step.n}
                  className="rounded-[var(--radius)] border border-[var(--border)] bg-white p-4"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                    Stap {step.n}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-[var(--text-heading)]">
                    {step.title}
                  </div>
                  <div className="mt-1 text-sm text-[var(--text-body)]">
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "0.9rem", marginTop: "1rem", color: "var(--text-muted)", maxWidth: "none" }}>
              Noodgeval? Zet “SPOED” in uw bericht en geef aan of verwarming/warm water volledig uitvalt.
            </p>
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
