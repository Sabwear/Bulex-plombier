import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Loodgieter Leuven | Villant Loodgieter',
  description:
    'Vaillant loodgieter in Leuven voor ketelreparatie, onderhoud en installatie. Interventies volgens beschikbaarheid van onze ploegen.',
};

export default function LoodgieterLeuvenPage() {
  return (
    <main className="py-16 md:py-20">
      <div className="container">
        <span className="badge badge-green" style={{ marginBottom: '1rem' }}>
          Loodgieter Leuven
        </span>
        <h1 style={{ marginBottom: '1rem' }}>Vaillant loodgieter in Leuven</h1>
        <p style={{ fontSize: '1.05rem', maxWidth: '60ch', marginBottom: '1.5rem' }}>
          Villant Loodgieter ondersteunt klanten in Leuven met{' '}
          <strong>Vaillant ketel onderhoud, reparatie en vervanging</strong>, evenals algemene
          loodgieterij en centrale verwarming.
        </p>

        <div className="grid-3-strict" style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
          {[
            {
              title: 'Vaillant ketel reparatie Leuven',
              body: 'Snelle diagnose en herstelling van uw Vaillant-ketel in Leuven en omgeving.',
            },
            {
              title: 'Onderhoud in Leuven',
              body: 'Periodiek onderhoud van uw installatie voor een langere levensduur en een lager verbruik.',
            },
            {
              title: 'Nieuwe verwarmingsprojecten',
              body: 'Advies en installatie van nieuwe Vaillant-verwarmingssystemen afgestemd op uw woning in Leuven.',
            },
          ].map((card) => (
            <div key={card.title} className="card">
              <h2 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{card.title}</h2>
              <p style={{ fontSize: '0.95rem' }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div className="cta-band" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ marginBottom: '0.75rem' }}>Vraag een loodgieter in Leuven aan</h2>
          <p style={{ marginBottom: '1.25rem', maxWidth: '55ch' }}>
            Beschrijf uw probleem en vermeld uw adres in Leuven. We koppelen terug met een voorstel
            van planning en een duidelijke prijsinschatting.
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

