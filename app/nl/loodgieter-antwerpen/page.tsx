import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Loodgieter Antwerpen | Villant Loodgieter',
  description:
    'Vaillant loodgieter in Antwerpen voor ketelreparatie, onderhoud en installatie. Interventies afhankelijk van de beschikbaarheid van onze ploegen.',
};

export default function LoodgieterAntwerpenPage() {
  return (
    <main className="py-16 md:py-20">
      <div className="container">
        <span className="badge badge-green" style={{ marginBottom: '1rem' }}>
          Loodgieter Antwerpen
        </span>
        <h1 style={{ marginBottom: '1rem' }}>Vaillant loodgieter in Antwerpen</h1>
        <p style={{ fontSize: '1.05rem', maxWidth: '60ch', marginBottom: '1.5rem' }}>
          Villant Loodgieter helpt particuliere klanten in Antwerpen met{' '}
          <strong>Vaillant ketel reparatie, onderhoud en vervanging</strong>, evenals
          loodgieterswerken en centrale verwarming.
        </p>

        <div className="grid-3-strict" style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
          {[
            {
              title: 'Vaillant ketel reparatie Antwerpen',
              body: 'Analyse van storingen en vervanging van defecte onderdelen op uw Vaillant-ketel in Antwerpen.',
            },
            {
              title: 'Onderhoud in Antwerpen',
              body: 'Periodiek onderhoud om rendement en veiligheid van uw verwarming te garanderen, met verslag.',
            },
            {
              title: 'Nieuwe verwarmingsinstallatie',
              body: 'Advies en installatie van nieuwe Vaillant-systemen afgestemd op uw woning in Antwerpen.',
            },
          ].map((card) => (
            <div key={card.title} className="card">
              <h2 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{card.title}</h2>
              <p style={{ fontSize: '0.95rem' }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div className="cta-band" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ marginBottom: '0.75rem' }}>Vraag een loodgieter in Antwerpen aan</h2>
          <p style={{ marginBottom: '1.25rem', maxWidth: '55ch' }}>
            Stuur ons een e-mail met uw adres in Antwerpen, het type installatie en een korte
            omschrijving van het probleem. We bekijken de beschikbaarheid en sturen u een offerte.
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

