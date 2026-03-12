import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Plombier Hasselt | Villant Plombier',
  description:
    "Plombier Vaillant à Hasselt pour la réparation, l'entretien et l'installation de chaudières et systèmes de chauffage. Service selon la disponibilité de nos équipes.",
};

export default function PlombierHasseltPage() {
  return (
    <main className="py-16 md:py-20">
      <div className="container">
        <span className="badge badge-green" style={{ marginBottom: '1rem' }}>
          Plombier Hasselt
        </span>
        <h1 style={{ marginBottom: '1rem' }}>Plombier Vaillant à Hasselt</h1>
        <p style={{ fontSize: '1.05rem', maxWidth: '60ch', marginBottom: '1.5rem' }}>
          Pour vos besoins en plomberie et chauffage à Hasselt, Villant Plombier propose des
          interventions ciblées sur les <strong>chaudières Vaillant</strong>, les fuites et les
          installations de chauffage central.
        </p>

        <div className="grid-3-strict" style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
          {[
            {
              title: 'Réparation Vaillant Hasselt',
              body: "Intervention sur les pannes de chaudières Vaillant à Hasselt, avec diagnostic clair et pièces d'origine.",
            },
            {
              title: 'Entretien chaudière Hasselt',
              body: "Entretien régulier de votre chaudière Vaillant pour maintenir le rendement et limiter les risques de panne.",
            },
            {
              title: 'Projets de chauffage',
              body: "Étude et mise en place de solutions de chauffage Vaillant adaptées aux habitations de Hasselt.",
            },
          ].map((card) => (
            <div key={card.title} className="card">
              <h2 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{card.title}</h2>
              <p style={{ fontSize: '0.95rem' }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div className="cta-band" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ marginBottom: '0.75rem' }}>Demander une intervention à Hasselt</h2>
          <p style={{ marginBottom: '1.25rem', maxWidth: '55ch' }}>
            Indiquez votre adresse à Hasselt, le type d&apos;installation et la nature du problème.
            Nous vérifions la faisabilité et la disponibilité d&apos;une équipe Villant Plombier.
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

