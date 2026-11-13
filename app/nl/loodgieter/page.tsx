import { Metadata } from "next";
import Link from "next/link";
import { getCities } from "@/data/city-data";
import styles from "@/app/fr/plombier/page.module.css";
import { buildLocaleAlternates } from "@/lib/seoAlternates";
import { getPublicPhoneTelHref } from "@/config/public-phone";

export const revalidate = 86400;

export const metadata: Metadata = {
  title:
    "Vaillant loodgieter in België — Brussel en grote steden | vaillant Loodgieter",
  description:
    "Vind uw gecertificeerde Vaillant loodgieter in België: Brussel en grote Belgische steden. Herstelling, onderhoud en installatie van verwarming en loodgieterij.",
  alternates: buildLocaleAlternates("/nl/loodgieter"),
  openGraph: {
    type: "website",
    locale: "nl_BE",
    url: "https://vaillant-loodgieter.com/nl/loodgieter",
    siteName: "vaillant Loodgieter",
    title: "Vaillant loodgieter in België — Brussel en grote steden",
    description:
      "Gecertificeerde Vaillant loodgieter in België: Brussel en grote Belgische steden.",
  },
};

export default function LoodgieterHubPage() {
  const cities = getCities("nl");

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className="badge badge-green">✓ Gecertificeerd Vaillant</span>
          <h1 className={styles.heroTitle}>
            Vaillant loodgieter in België
          </h1>
          <p className={styles.heroSub}>
            We grijpen in in België, met een sterke aanwezigheid in Brussel en
            in de belangrijkste steden van het land. Hieronder vindt u al onze
            interventiezones.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">België</span>
            <h2>Onze interventiezones</h2>
            <div className="divider" />
            <p>
              Hier vindt u de gemeenten van Brussel-Hoofdstad en de grote
              Belgische steden die we bedienen. Klik op een stad voor de
              dedicated pagina.
            </p>
          </div>
          <div className={styles.grid}>
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/nl/loodgieter/${c.slug}`}
                className={styles.communeCard}
              >
                <div className={styles.communeHeader}>
                  <h3 className={styles.communeName}>{c.name}</h3>
                  {c.postal_code && (
                    <span className={styles.postalCode}>{c.postal_code}</span>
                  )}
                </div>
                <p className={styles.communeSnippet}>
                  {c.response_time_minutes
                    ? `Interventie in ~${c.response_time_minutes} min`
                    : "Interventietijd te bevestigen"}
                  {c.services.length > 0 &&
                    ` · ${c.services.length} diensten beschikbaar`}
                </p>
                <span className={styles.communeArrow}>
                  Details bekijken →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Uw gemeente of stad staat er niet bij?</h2>
          <p>
            Neem rechtstreeks contact op: we grijpen in Brussel en in vele
            steden en regio&apos;s in België in, ook als ze nog niet op deze
            pagina staan.
          </p>
          <div className="cta-actions">
            <a href={getPublicPhoneTelHref()} className="btn btn-primary" target="_blank" rel="noreferrer">
              📞 Bellen
            </a>
            <Link href="/nl/contact" className="btn btn-ghost-dark">
              📋 Offerte aanvragen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
