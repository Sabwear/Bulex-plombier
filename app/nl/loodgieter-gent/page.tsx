import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Loodgieter Gent | Villant Loodgieter',
  description:
    'Vaillant loodgieter in Gent voor onderhoud, herstelling en installatie van ketels en verwarming. Interventies volgens beschikbaarheid.',
};

export default function LoodgieterGentPage() {
  return (
    <main className="py-16 md:py-20">
      <div className="container">
        <span className="badge badge-green" style={{ marginBottom: '1rem' }}>
          Loodgieter Gent
        </span>
        <h1 style={{ marginBottom: '1rem' }}>Vaillant loodgieter in Gent</h1>
        <p style={{ fontSize: '1.05rem', maxWidth: '60ch', marginBottom: '1.5rem' }}>
          Voor <strong>Vaillant ketel onderhoud en reparatie in Gent</strong> biedt Villant
          Loodgieter gecertificeerde technici die storingen snel en correct aanpakken.
        </p>

        <div className="grid-3-strict" style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
          {[
            {
              title: 'Vaillant ketel reparatie Gent',
              body: 'Diagnose en herstelling van Vaillant-ketels bij klanten in Gent en omgeving.',
            },
            {
              title: 'Jaarlijks onderhoud',
              body: 'Jaarlijks onderhoud van uw Vaillant-ketel voor betere prestaties en minder storingen.',
            },
            {
              title: 'Nieuwe installatie',
              body: 'Advies en plaatsing van een nieuwe Vaillant-installatie op maat van uw woning in Gent.',
            },
          ].map((card) => (
            <div key={card.title} className="card">
              <h2 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{card.title}</h2>
              <p style={{ fontSize: '0.95rem' }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div className="cta-band" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ marginBottom: '0.75rem' }}>Vraag een interventie in Gent aan</h2>
          <p style={{ marginBottom: '1.25rem', maxWidth: '55ch' }}>
            Stuur ons uw adres in Gent en een beschrijving van het probleem. Wij laten u weten welk
            tijdslot mogelijk is en welke aanpak wij aanbevelen.
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

