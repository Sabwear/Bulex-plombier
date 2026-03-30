import type { Metadata } from "next";
import Link from "next/link";
import QuoteRequestSmtpForm from "@/components/forms/QuoteRequestSmtpForm";
import {
  quoteCitiesNl,
  quoteRegionsNl,
  quoteServicesNl,
} from "@/config/quote-form-options";
import { buildLocaleAlternates } from "@/lib/seoAlternates";

const tips = [
  { title: "Type interventie", desc: "Herstelling, vervanging, waterlek, sanitair, verwarming of onderhoud." },
  { title: "Adres & gemeente", desc: "Straat, huisnummer en gemeente/stad in België." },
  { title: "Toestel (indien van toepassing)", desc: "Merk/model (bv. Vaillant ecoTEC) + foutcode of symptoom." },
  { title: "Urgentie", desc: "Vermeld ‘SPOED’ als u geen verwarming of warm water heeft." },
];

const steps = [
  { n: "1", title: "Bevestiging", desc: "We bekijken uw aanvraag en stellen eventueel een korte vervolgvraag." },
  { n: "2", title: "Voorstel", desc: "U ontvangt een duidelijke inschatting en/of planning op maat." },
  { n: "3", title: "Interventie", desc: "Gecertificeerde technici voeren de werken uit met transparante communicatie." },
];

export const metadata: Metadata = {
  title: "Offerte aanvragen | vaillant Loodgieter",
  description:
    "Vraag een offerte aan voor loodgieterij of verwarming in België. vaillant Loodgieter, gecertificeerd Vaillant partner.",
  alternates: buildLocaleAlternates("/nl/demande-offerte"),
  openGraph: {
    title: "Offerte aanvragen | vaillant Loodgieter",
    description:
      "Ontvang een transparante offerte voor loodgieterij en verwarming in België.",
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
          padding: "5rem 1.5rem 3rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container">
          <span className="badge badge-green" style={{ marginBottom: "1rem" }}>
            Offerte aanvragen
          </span>
          <h1 style={{ marginBottom: "1rem" }}>
            Vraag een duidelijke offerte voor uw interventie in België
          </h1>
          <p style={{ fontSize: "1.1rem", maxWidth: "60ch", marginBottom: 0 }}>
            Vul het formulier in. We antwoorden snel met een eerste inschatting en een voorstel op maat.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-16" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col gap-10">
              <div
                className="rounded-xl border p-6 shadow-sm"
                style={{
                  borderColor: "var(--border)",
                  background: "#fff",
                }}
              >
                <span className="badge badge-blue" style={{ marginBottom: "0.75rem" }}>
                  Hoe werkt het?
                </span>
                <h2 className="text-lg font-semibold" style={{ color: "var(--text-heading)", marginBottom: "0.5rem" }}>
                  Wat u best vermeldt in uw aanvraag
                </h2>
                <p style={{ fontSize: "0.95rem", color: "var(--text-body)", marginBottom: "1.25rem", maxWidth: "none" }}>
                  Hoe preciezer uw info, hoe sneller we kunnen inschatten wat er nodig is. Zo vermijden we onnodig heen-en-weer en krijgt u sneller een duidelijk voorstel.
                </p>
                <div className="divide-y divide-[var(--border)]">
                  {tips.map((item) => (
                    <div key={item.title} className="py-3 first:pt-0">
                      <div className="text-sm font-semibold" style={{ color: "var(--text-heading)" }}>
                        {item.title}
                      </div>
                      <div className="mt-1 text-sm" style={{ color: "var(--text-body)" }}>
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "0.9rem", marginTop: "1rem", color: "var(--text-muted)", maxWidth: "none" }}>
                  We antwoorden doorgaans snel met een eerste inschatting. Definitieve prijs hangt af van diagnose en benodigde onderdelen.
                </p>
              </div>

              <div
                className="rounded-xl border p-6 shadow-sm"
                style={{
                  borderColor: "var(--border)",
                  background: "#fff",
                }}
              >
                <span className="badge badge-gold" style={{ marginBottom: "0.75rem" }}>
                  Wat gebeurt er daarna?
                </span>
                <h2 className="text-lg font-semibold" style={{ color: "var(--text-heading)", marginBottom: "1rem" }}>
                  Van aanvraag tot interventie
                </h2>
                <div className="divide-y divide-[var(--border)]">
                  {steps.map((step) => (
                    <div key={step.n} className="py-3 first:pt-0">
                      <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                        Stap {step.n}
                      </div>
                      <div className="mt-1 text-sm font-semibold" style={{ color: "var(--text-heading)" }}>
                        {step.title}
                      </div>
                      <div className="mt-1 text-sm" style={{ color: "var(--text-body)" }}>
                        {step.desc}
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "0.9rem", marginTop: "1rem", color: "var(--text-muted)", maxWidth: "none" }}>
                  Noodgeval? Zet “SPOED” in uw bericht en geef aan of verwarming/warm water volledig uitvalt.
                </p>
              </div>

              <div>
                <Link href="/nl/contact" className="btn btn-outline">
                  Liever rechtstreeks contact?
                </Link>
              </div>
            </div>

            <div
              className="lg:sticky lg:top-24 rounded-xl border p-6 shadow-sm"
              style={{
                borderColor: "var(--border)",
                background: "#fff",
              }}
            >
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-heading)", marginBottom: "1rem" }}>
                Uw aanvraag
              </h2>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "1rem", marginTop: "-0.25rem" }}>
                Door dit formulier te versturen, aanvaardt u ons{" "}
                <Link href="/nl/privacy" style={{ color: "var(--color-primary)", fontWeight: 600, textDecoration: "underline" }}>
                  privacybeleid
                </Link>
                .
              </p>
              <QuoteRequestSmtpForm
                locale="nl"
                regions={quoteRegionsNl}
                cities={quoteCitiesNl}
                services={quoteServicesNl}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
