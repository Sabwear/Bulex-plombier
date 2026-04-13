import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildLocaleAlternates } from '@/lib/seoAlternates';

export const metadata: Metadata = {
  title: 'Vaillant Loodgieter Brussel – Alle Gemeenten | vaillant Loodgieter',
  description:
    'vaillant Loodgieter bedient de 19 gemeenten van Brussel als gecertificeerd Vaillant loodgieter. Van Anderlecht tot Ukkel — waterlekken, ketels, sanitair en verwarmingsdiensten.',
  keywords: [
    'Vaillant loodgieter Brussel',
    'spoedloodgieter Brussel',
    'verwarmingsinstallateur Brussel',
    'waterlek herstellen Brussel',
    'sanitair installatie Brussel',
    'ketel vervangen Brussel',
  ],
  alternates: buildLocaleAlternates('/nl/brussel'),
  openGraph: {
    title: 'Vaillant Loodgieter Brussel – Alle Gemeenten | vaillant Loodgieter',
    description: 'Gecertificeerd Vaillant loodgieter actief in de 19 gemeenten van het Brussels Hoofdstedelijk Gewest.',
    url: 'https://vaillant-loodgieter.com/nl/brussel',
  },
};

const communes = [
  { name: 'Anderlecht', slug: 'anderlecht', desc: 'Loodgieter en Vaillant herstelling in Anderlecht' },
  { name: 'Brussel-Stad', slug: 'brussel-stad', desc: 'Spoedservice en sanitair installatie in de Vijfhoek van Brussel' },
  { name: 'Elsene', slug: 'elsene', desc: 'Ketel vervangen en waterlek herstellen in Elsene' },
  { name: 'Etterbeek', slug: 'etterbeek', desc: 'Verwarmingsinstallateur en onderhoudscontract in Etterbeek' },
  { name: 'Evere', slug: 'evere', desc: 'Sanitair installatie en Vaillant diensten in Evere' },
  { name: 'Ganshoren', slug: 'ganshoren', desc: 'Loodgieterij en ketelherstelling in Ganshoren' },
  { name: 'Jette', slug: 'jette', desc: 'Vaillant loodgieter en nieuwe verwarming in Jette' },
  { name: 'Koekelberg', slug: 'koekelberg', desc: 'Waterlek en verwarmingsdiensten in Koekelberg' },
  { name: 'Sint-Jans-Molenbeek', slug: 'sint-jans-molenbeek', desc: 'Spoedservice en sanitair installatie in Molenbeek' },
  { name: 'Oudergem', slug: 'oudergem', desc: 'Gecertificeerde Vaillant herstelling in Oudergem' },
  { name: 'Schaarbeek', slug: 'schaarbeek', desc: 'Loodgieter en ketelinstallatie in Schaarbeek' },
  { name: 'Sint-Agatha-Berchem', slug: 'sint-agatha-berchem', desc: 'Verwarmingsinstallateur actief in Sint-Agatha-Berchem' },
  { name: 'Sint-Gillis', slug: 'sint-gillis', desc: 'Sanitair en Vaillant loodgieter in Sint-Gillis' },
  { name: 'Sint-Joost-ten-Node', slug: 'sint-joost-ten-node', desc: 'Vaillant herstelling en spoed in Sint-Joost' },
  { name: 'Sint-Lambrechts-Woluwe', slug: 'sint-lambrechts-woluwe', desc: 'Ketel vervangen en waterlek in Sint-Lambrechts-Woluwe' },
  { name: 'Sint-Pieters-Woluwe', slug: 'sint-pieters-woluwe', desc: 'Gecertificeerde technicus voor verwarming in Sint-Pieters-Woluwe' },
  { name: 'Ukkel', slug: 'ukkel', desc: 'Loodgieter en Vaillant onderhoudscontract in Ukkel' },
  { name: 'Vorst', slug: 'vorst', desc: 'Sanitair installatie en ketelherstelling in Vorst' },
  { name: 'Watermaal-Bosvoorde', slug: 'watermaal-bosvoorde', desc: 'Verwarmingsinstallateur en Vaillant diensten in Watermaal-Bosvoorde' },
];

export default function BrusselPage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        background: `linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.5) 100%), url('/images/projects/img-7.jpg') center/cover no-repeat`,
        padding: '5rem 1.5rem 4rem',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="container">
          <span className="badge badge-green" style={{ marginBottom: '1rem' }}>Interventiezone</span>
          <h1 style={{ marginBottom: '1rem' }}>
            Vaillant Loodgieter Brussel — actief in alle 19 gemeenten
          </h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '60ch', marginBottom: '2rem' }}>
            vaillant Loodgieter is uw gecertificeerde Vaillant loodgieter in Brussel, actief in alle gemeenten van het Brussels Hoofdstedelijk Gewest. Van noodservice in loodgieterij tot het vervangen van ketels en sanitaire installaties.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/nl/demande-offerte" className="btn btn-primary">Offerte aanvragen</Link>
            <Link href="/nl/diensten" className="btn btn-outline">
              Onze diensten →
            </Link>
          </div>
        </div>
      </section>

      {/* VALUE PROP */}
      <section style={{ background: 'var(--bg-secondary)', padding: '3rem 1.5rem' }}>
        <div className="container">
          <div className="grid-4" style={{ gap: '1.25rem' }}>
            {[
              { icon: 'plumber-1.svg', label: 'Gecertificeerd Vaillant partner' },
              { icon: 'pipes-7.svg', label: 'De 19 gemeenten van Brussel' },
              { icon: 'wrench-1.svg', label: 'Spoedservice beschikbaar' },
              { icon: 'wrench-2.svg', label: 'Gekwalificeerde technici' },
            ].map((v) => (
              <div key={v.label} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                background: '#fff', borderRadius: 'var(--radius)', padding: '1rem 1.25rem',
                border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)',
              }}>
                <span style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center' }}>
                  <Image src={`/icons/plumbing-elements/${v.icon}`} alt={v.label} width={24} height={24} />
                </span>
                <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>{v.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREAS — FIRST (service areas-first for local area page) */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Alle Gemeenten</span>
            <h2 style={{ marginTop: '1rem' }}>Onze dekking in het Brussels Hoofdstedelijk Gewest</h2>
            <div className="divider" />
            <p>
              Als uw <strong>verwarmingsinstallateur in Brussel</strong>, bedienen wij de hele Brusselse regio.
              Hieronder vindt u de 19 gemeenten waarin wij actief zijn.
            </p>
          </div>

          <div className="grid-3-strict">
            {communes.map((c) => (
              <div
                key={c.name}
                id={c.slug}
                className="card scroll-mt-32"
                style={{ borderLeft: '4px solid var(--color-primary)' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px' }}>
                    <Image src="/icons/plumbing-elements/plumber-1.svg" alt="" width={20} height={20} />
                  </span>
                  <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem', color: 'var(--color-primary)' }}>{c.name}</h3>
                    <p style={{ fontSize: '0.85rem' }}>{c.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)',
            padding: '2rem', marginTop: '2.5rem', textAlign: 'center',
            border: '1px solid var(--border)',
          }}>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Trots om in Brussel en omgeving te werken — uw gecertificeerde Vaillant loodgieter.
            </p>
            <p style={{ fontSize: '0.9rem' }}>
              Staat uw gemeente niet in de lijst? Contacteer ons — we bekijken of uw locatie binnen ons werkgebied valt.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-gold">Diensten in Brussel</span>
            <h2 style={{ marginTop: '1rem' }}>Wat wij bieden in de Brusselse regio</h2>
            <div className="divider" />
            <p>Alle loodgieters- en verwarmingsdiensten, uitgevoerd door gecertificeerde Vaillant technici in uw gemeente.</p>
          </div>
          <div className="grid-3-strict">
            {[
              { icon: 'wrench.svg', title: 'Vaillant Herstelling', href: '/nl/diensten#vaillant-herstelling', desc: 'Snelle herstelling van Vaillant ketels door gecertificeerde technici.' },
              { icon: 'water-heater-1.svg', title: 'Ketel Vervangen', href: '/nl/diensten#boiler-vervangen', desc: 'Professionele vervanging met het juiste Vaillant model voor uw woning.' },
              { icon: 'pipes.svg', title: 'Waterlek Herstellen', href: '/nl/diensten#waterlek', desc: 'Lekdetectie en herstelling zonder onnodig kap- en breekwerk.' },
              { icon: 'bathtub.svg', title: 'Sanitair Installatie', href: '/nl/diensten#sanitair', desc: 'Badkamerrenovatie door gecertificeerde loodgieters.' },
              { icon: 'radiator.svg', title: 'Nieuwe Verwarming', href: '/nl/diensten#verwarming', desc: 'Nieuw verwarmingssysteem op maat voor uw woning in Brussel.' },
              { icon: 'gauge.svg', title: 'Onderhoudscontract', href: '/nl/diensten#onderhoud', desc: 'Jaarlijks Vaillant onderhoud voor optimale prestaties en een langere levensduur.' },
            ].map((s) => (
              <Link key={s.title} href={s.href} style={{ textDecoration: 'none' }}>
                <div className="card">
                  <div className="icon-box">
                    <Image src={`/icons/plumbing-elements/${s.icon}`} alt={s.title} width={32} height={32} />
                  </div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.88rem' }}>{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/nl/diensten" className="btn btn-primary">Bekijk alle diensten</Link>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Voordelen</span>
            <h2 style={{ marginTop: '1rem' }}>Waarom wij uw eerste keuze loodgieter in Brussel zijn</h2>
            <div className="divider" />
          </div>
          <div className="grid-3-strict">
            {[
              { icon: 'pipes-7.svg', title: 'Kennis van de Brusselse markt', desc: 'Brusselse woningen, vooral de oudere panden, hebben specifieke kenmerken zoals verouderde leidingen of harde waterkwaliteit. Onze technici kennen deze uitdagingen en pakken ze nauwkeurig aan.' },
              { icon: 'plumber-1.svg', title: 'Gecertificeerde Vaillant diagnose', desc: 'Onze technici werken niet algemeen. Zij passen de officiële Vaillant diagnosemethode toe, wat leidt tot snellere diagnoses en herhaalde bezoeken voor hetzelfde probleem voorkomt.' },
              { icon: 'flange.svg', title: 'Transparante communicatie', desc: 'Voor aanvang: een duidelijke diagnose en offerte. Na de interventie: een volledig schriftelijk verslag. Geen verrassingen of verborgen kosten.' },
            ].map((b) => (
              <div key={b.title} className="card">
                <div className="icon-box">
                  <Image src={`/icons/plumbing-elements/${b.icon}`} alt={b.title} width={32} height={32} />
                </div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{b.title}</h3>
                <p style={{ fontSize: '0.88rem' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-gold">Getuigenissen in Brussel</span>
            <h2 style={{ marginTop: '1rem' }}>Wat onze Brusselse klanten zeggen</h2>
            <div className="divider" />
          </div>
          <div className="grid-3-strict">
            {[
              { name: 'Jan V., Anderlecht', text: 'Waterlek opgelost in recordtijd. De technicus kende onze oude leidingen heel goed en werkte efficiënt zonder overbodig breekwerk.' },
              { name: 'Fatima A., Schaarbeek', text: 'Ketel vervangen in ons appartement in Schaarbeek. Perfect advies over het juiste model en een onberispelijke installatie.' },
              { name: 'Pierre M., Elsene', text: 'Onderhoudscontract voor onze Vaillant ecoTEC. Elk jaar uiterst punctueel, een altijd duidelijk verslag en een goed werkende ketel.' },
            ].map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p style={{ fontStyle: 'italic', fontSize: '0.9rem', lineHeight: 1.7 }}>&quot;{t.text}&quot;</p>
                <div className="testimonial-author">— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Werkwijze</span>
            <h2 style={{ marginTop: '1rem' }}>Hoe verloopt een interventie in Brussel?</h2>
            <div className="divider" />
          </div>
          <div className="grid-4">
            {[
              { n: '1', title: 'Contact', desc: 'Een e-mail met uw adres in Brussel en een omschrijving van uw probleem.' },
              { n: '2', title: 'Afspraak', desc: 'We leggen een afspraak vast op een moment dat u het beste uitkomt.' },
              { n: '3', title: 'Interventie', desc: 'Gecertificeerde technicus ter plaatse met originele Vaillant onderdelen.' },
              { n: '4', title: 'Verslag', desc: 'Gedetailleerd schriftelijk verslag en onderhoudsadvies na de interventie.' },
            ].map((step) => (
              <div key={step.n} style={{ textAlign: 'center' }}>
                <div className="step-number" style={{ margin: '0 auto 1rem' }}>{step.n}</div>
                <h4 style={{ marginBottom: '0.5rem' }}>{step.title}</h4>
                <p style={{ fontSize: '0.87rem' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '750px' }}>
          <div className="section-header">
            <span className="badge badge-gold">FAQ</span>
            <h2 style={{ marginTop: '1rem' }}>Vragen over onze diensten in Brussel</h2>
            <div className="divider" />
          </div>
          {[
            { q: 'Zijn jullie ook beschikbaar in mijn Brusselse gemeente?', a: 'Ja, we zijn actief in alle 19 gemeenten van het Brussels Hoofdstedelijk Gewest. Mocht uw gemeente of exacte locatie niet in onze lijst staan, neem dan gerust contact met ons op.' },
            { q: 'Hoe snel kunnen jullie ter plaatse zijn voor een Vaillant herstelling?', a: 'De reactietijd hangt af van de planning en uw locatie. Voor dringende interventies, stuur een e-mail met "SPOED" in het onderwerp naar contact@vaillant-loodgieter.com.' },
            { q: 'Werken jullie ook in oude panden in Brussel?', a: 'Absoluut. Onze gecertificeerde technici zijn gewend om in oude Brusselse woningen met verouderde leidingsystemen te werken, wat voor hen geen enkel probleem vormt.' },
          ].map((faq, i) => (
            <details key={i} className="faq-item">
              <summary>{faq.q}</summary>
              <div className="faq-answer">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2>Loodgieter nodig in Brussel?</h2>
          <p>vaillant Loodgieter — een gecertificeerd Vaillant partner actief in alle Brusselse gemeenten.</p>
          <div className="cta-actions">
            <Link href="/nl/contact" className="btn btn-ghost-dark">📧 Stuur een bericht</Link>
            <Link href="/nl/over-ons" className="btn btn-ghost-dark">
              Over ons →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
