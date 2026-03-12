import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Loodgieter Brussel | Villant Loodgieter',
  description:
    'Vaillant loodgieter in Brussel voor herstelling, onderhoud en installatie van ketels en verwarmingssystemen. Interventies in de Brusselse regio.',
};

export default function LoodgieterBrusselPage() {
  return (
    <main className="py-16 md:py-20">
      <div className="container">
        <span className="badge badge-green" style={{ marginBottom: '1rem' }}>
          Loodgieter Brussel
        </span>
        <h1 style={{ marginBottom: '1rem' }}>Vaillant loodgieter in Brussel</h1>
        <p style={{ fontSize: '1.05rem', maxWidth: '60ch', marginBottom: '1.5rem' }}>
          Villant Loodgieter is uw <strong>gecertificeerde Vaillant loodgieter in Brussel</strong>{' '}
          voor herstelling, onderhoud en vervanging van ketels, radiatoren en sanitaire installaties.
          Vanuit Brussel bedienen wij ook andere steden in België, afhankelijk van de
          beschikbaarheid van onze ploegen.
        </p>

        <div className="grid-3-strict" style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
          {[
            {
              title: 'Vaillant ketel reparatie Brussel',
              body: 'Diagnose en herstelling van Vaillant-ketels (ecoTEC, turboTEC, condensatie) met originele onderdelen.',
            },
            {
              title: 'Onderhoud Vaillant ketel Brussel',
              body: 'Jaarlijks onderhoud volgens de voorschriften in het Brussels Hoofdstedelijk Gewest, met attest voor verzekering of eigenaar.',
            },
            {
              title: 'Vervanging & installatie',
              body: 'Plaatsing van een nieuwe, energiezuinige Vaillant-ketel afgestemd op uw Brusselse woning of appartement.',
            },
          ].map((card) => (
            <div key={card.title} className="card">
              <h2 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{card.title}</h2>
              <p style={{ fontSize: '0.95rem' }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div className="cta-band" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ marginBottom: '0.75rem' }}>Vraag een interventie in Brussel aan</h2>
          <p style={{ marginBottom: '1.25rem', maxWidth: '55ch' }}>
            Beschrijf uw probleem (ketel, waterlek, verwarming, sanitair) en vermeld uw adres in
            Brussel. Wij analyseren uw vraag snel en sturen u een duidelijke offerte.
          </p>
          <div className="cta-actions">
            <Link href="/nl/contact" className="btn btn-primary">
              Contacteer Villant Loodgieter
            </Link>
            <Link href="/nl/diensten" className="btn btn-outline">
              Bekijk onze diensten
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

