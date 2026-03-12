import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Plombier Ypres | Villant Plombier',
  description:
    "Plombier Vaillant à Ypres pour la réparation, l'entretien et l'installation de chaudières et systèmes de chauffage. Interventions planifiées selon la disponibilité.",
};

export default function PlombierYpresPage() {
  const city = 'Ypres';

  return (
    <main className="py-16 md:py-20">
      <div className="container">
        <span className="badge badge-green" style={{ marginBottom: '1rem' }}>
          Plombier {city}
        </span>
        <h1 style={{ marginBottom: '1rem' }}>Plombier Vaillant à {city}</h1>
        <p style={{ fontSize: '1.05rem', maxWidth: '60ch', marginBottom: '1.5rem' }}>
          Pour vos besoins en <strong>plomberie et chauffage à {city}</strong>, Villant Plombier met à
          votre disposition des techniciens certifiés Vaillant pour les réparations, l&apos;entretien
          et les remplacements de chaudières.
        </p>

        <div className="grid-3-strict" style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
          {[
            {
              title: `Réparation chaudière Vaillant ${city}`,
              body:
                "Pannes, messages d’erreur ou perte de pression : nous diagnostiquons et réparons votre chaudière Vaillant dans la région.",
            },
            {
              title: `Entretien annuel ${city}`,
              body:
                "Entretien régulier de votre chaudière Vaillant pour optimiser rendement et sécurité, avec rapport écrit à l’appui.",
            },
            {
              title: 'Projet de chauffage central',
              body:
                "Étude et installation de systèmes de chauffage Vaillant pour appartements et maisons de la région.",
            },
          ].map((card) => (
            <div key={card.title} className="card">
              <h2 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{card.title}</h2>
              <p style={{ fontSize: '0.95rem' }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div className="cta-band" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ marginBottom: '0.75rem' }}>Demander une intervention à {city}</h2>
          <p style={{ marginBottom: '1.25rem', maxWidth: '55ch' }}>
            Indiquez votre adresse à {city}, le type d&apos;installation Vaillant concernée et la nature
            du problème. Nous revenons vers vous avec une proposition d&apos;intervention.
          </p>
          <div className="cta-actions">
            <Link href="/fr/contact" className="btn btn-primary">
              Contacter Villant Plombier
            </Link>
            <Link href="/fr/services" className="btn btn-outline">
              Voir nos services
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

