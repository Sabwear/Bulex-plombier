import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CertificationLogosMarquee from '@/components/CertificationLogosMarquee';

export const metadata: Metadata = {
  title: 'Certificeringen & Merken – Vaillant Loodgieter België',
  description:
    'Ontdek de certificeringen en partnermerken van Vaillant Loodgieter: officieel Vaillant partner met erkende labels en expertise in heel Vlaanderen en België.',
  alternates: { canonical: 'https://vaillant-loodgieter.com/nl/certificeringen' },
  openGraph: {
    title: 'Onze certificeringen en partnermerken',
    description:
      'Vaillant Loodgieter – gecertificeerde Vaillant partner in België, met erkende labels en samenwerking met toonaangevende verwarmingsmerken.',
    url: 'https://vaillant-loodgieter.com/nl/certificeringen',
  },
};

export default function CertificeringenPage() {
  return (
    <>
      {/* HERO */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '2rem' }}>
            <div>
              <span className="badge badge-green" style={{ marginBottom: '1rem' }}>
                Certificeringen & merken
              </span>
              <h1 style={{ marginBottom: '1rem' }}>
                Gecertificeerde Vaillant partner in Vlaanderen en België
              </h1>
              <p style={{ fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Vaillant Loodgieter is een onafhankelijk bedrijf en{' '}
                <strong>officieel gecertificeerd Vaillant partner</strong> voor
                residentiële verwarming en sanitair. Onze technici worden rechtstreeks door de
                fabrikant opgeleid en onze expertise wordt erkend door verschillende labels en
                partners in de sector.
              </p>
              <p style={{ fontSize: '0.98rem', lineHeight: 1.7 }}>
                Wij komen dagelijks tussen in <strong>Vlaanderen</strong> en de rest van{' '}
                <strong>België</strong> voor onderhoud, herstellingen en vervangingen van
                verwarmingsketels, boilers en sanitaire installaties.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <a href="mailto:contact@vaillant-loodgieter.com" className="btn btn-primary">
                  Vraag een interventie aan
                </a>
                <Link href="/nl/diensten" className="btn btn-outline">
                  Bekijk onze diensten →
                </Link>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  maxWidth: '420px',
                  width: '100%',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 50px rgba(15,23,42,0.28)',
                }}
              >
                <Image
                  src="/certifications-marques.avif"
                  alt="Verwarmings- en merkencertificeringen"
                  width={640}
                  height={400}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />

                <div
                  style={{
                    position: 'absolute',
                    left: '12px',
                    bottom: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.4rem 0.7rem',
                    borderRadius: '999px',
                    background: 'rgba(15,23,42,0.88)',
                    color: '#fff',
                    fontSize: '0.78rem',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
                  }}
                >
                  <Image
                    src="/Flag_of_Flanders.svg"
                    alt="Vlaamse leeuw – Vlaanderen"
                    width={22}
                    height={16}
                    style={{ borderRadius: '3px' }}
                  />
                  <span>Actief in Vlaanderen & België</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER MERKEN */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Merken & expertise</span>
            <h2 style={{ marginTop: '1rem' }}>Vaillant Loodgieter, partner van grote merken</h2>
            <div className="divider" />
          </div>

          <div className="grid-2" style={{ gap: '2rem', alignItems: 'flex-start' }}>
            <div>
              <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
                Al meer dan <strong>30 jaar</strong> worden Vaillant-systemen geïnstalleerd,
                onderhouden en hersteld door gespecialiseerde techniekers. Bij Vaillant Loodgieter
                focussen we op <strong>gasverwarming, condensatieketels, warmwaterproductie</strong>{' '}
                en sanitaire installaties, met een sterke kennis van de technologie van de grootste
                fabrikanten.
              </p>
              <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
                Onze kern is uiteraard <strong>Vaillant</strong>, maar onze technici hebben ook
                ervaring met andere toonaangevende merken op de Belgische markt. Zo kunnen we u
                objectief adviseren over de <strong>performantie</strong>,{' '}
                <strong>energie-efficiëntie</strong> en <strong>budget</strong> die het best bij uw
                woning en situatie passen.
              </p>
              <p style={{ lineHeight: 1.8 }}>
                Onze offertes zijn <strong>helder en gedetailleerd</strong>, zodat u precies
                begrijpt welke toestellen worden voorgesteld en welke kosten ermee gepaard gaan.
              </p>
            </div>

            <div>
              <div style={{ marginBottom: '1.25rem', borderRadius: '22px', overflow: 'hidden', boxShadow: '0 18px 40px rgba(15,23,42,0.25)' }}>
                <Image
                  src="/images/plumber-attaches-trying-fix-problem-with-residential-heating-equipment-repair-gas-boiler (1).jpg"
                  alt="Technicus voert onderhoud uit aan een gasketel"
                  width={680}
                  height={420}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.05rem' }}>
              Voorbeelden van merken waarmee we werken
            </h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>
              Naast Vaillant komen we regelmatig in aanraking met ketels en toestellen van onder
              andere:
            </p>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.8, maxWidth: 'none' }}>
              Atlantic, Saunier Duval, Frisquet, Chaffoteaux, De Dietrich, Viessmann, Ariston,
              Buderus, Elm Leblanc, Riello, Geminox, en andere referenties op de markt.
            </p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.75rem', color: 'var(--text-muted)', maxWidth: 'none' }}>
              Opmerking: wij zijn een onafhankelijk installateur en onderhoudspartner. De meeste
              interventies gebeuren op Vaillant-installaties, maar onze technici kennen ook andere
              merken goed genoeg om u correct te informeren.
            </p>
          </div>
        </div>
      </section>

      {/* CERTIFICERINGEN / LABELS */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-gold">Onze certificeringen</span>
            <h2 style={{ marginTop: '1rem' }}>Labels en erkenningen van onze technici</h2>
            <div className="divider" />
          </div>

          <div className="grid-2" style={{ gap: '1.75rem', alignItems: 'flex-start' }}>
            <div>
              <div
                style={{
                  marginBottom: '1.5rem',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  boxShadow: '0 18px 40px rgba(15,23,42,0.22)',
                }}
              >
                <Image
                  src="/images/service-man-adjusting-house-heating-system (1).jpg"
                  alt="Technicus die een verwarmingssysteem afstelt"
                  width={680}
                  height={420}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.02rem' }}>Gecertificeerd Vaillant partner</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
                Als <strong>officieel Vaillant partner</strong> verbinden wij ons tot het respecteren
                van de fabrieksvoorschriften voor installatie, onderhoud en herstelling. Dit
                betekent dat uw toestel wordt behandeld volgens de aanbevelingen van de fabrikant en
                dat de <strong>garantievoorwaarden</strong> worden gerespecteerd.
              </p>

              <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.02rem' }}>
                Veiligheid en conformiteit gasinstallaties
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
                Onze technici zijn opgeleid om te werken volgens de geldende{' '}
                <strong>Belgische normen voor gasinstallaties</strong>. De focus ligt op veiligheid,
                conformiteitsrapporten en een correcte inregeling van uw installatie, zodat deze
                zowel performant als veilig is.
              </p>

              <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.02rem' }}>
                Focus op energie-efficiëntie
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
                Bij elke nieuwe installatie of renovatie denken we mee over uw{' '}
                <strong>energieverbruik</strong>. Condensatieketels, modulerende regelaars en
                performante radiatoren of vloerverwarming maken deel uit van de oplossingen die wij
                voorstellen, met respect voor uw budget.
              </p>

              <div className="card" style={{ padding: '1.5rem', marginTop: '1.75rem' }}>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.05rem' }}>
                  Waarom certificeringen belangrijk zijn
                </h3>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                    fontSize: '0.9rem',
                  }}
                >
                  <li>• Ze garanderen dat uw technicus correct is opgeleid.</li>
                  <li>• Ze beperken het risico op fouten en gevaarlijke situaties.</li>
                  <li>• Ze zijn vaak vereist om aanspraak te maken op garanties of premies.</li>
                  <li>• Ze verplichten ons tot transparante en traceerbare werkwijzen.</li>
                </ul>
                <p style={{ fontSize: '0.86rem', marginTop: '0.85rem', color: 'var(--text-muted)' }}>
                  Heeft u vragen over een specifiek label of wilt u zeker zijn dat uw installatie
                  voldoet aan de huidige normen? Neem gerust contact met ons op.
                </p>
                <div style={{ marginTop: '1rem' }}>
                  <Link href="/nl/contact" className="btn btn-outline">
                    Stel uw vraag →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGO SLIDER */}
      <section style={{ background: 'var(--bg-secondary)', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '1.25rem' }}>
            <span className="badge badge-blue">Partners & labels</span>
            <h2 style={{ marginTop: '1rem' }}>Onze certificerings- en partnerlogo&apos;s</h2>
            <div className="divider" />
          </div>
        </div>
        <CertificationLogosMarquee />
      </section>
    </>
  );
}

