import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Plombier Louvain | Villant Plombier',
  description:
    "Plombier Vaillant à Louvain pour la réparation, l'entretien et l'installation de chaudières et systèmes de chauffage. Interventions selon disponibilité.",
};

export default function PlombierLouvainPage() {
  return (
    <main className="py-16 md:py-20">
      <div className="container">
        <span className="badge badge-green" style={{ marginBottom: '1rem' }}>
          Plombier Louvain
        </span>
        <h1 style={{ marginBottom: '1rem' }}>Plombier Vaillant à Louvain</h1>
        <p style={{ fontSize: '1.05rem', maxWidth: '60ch', marginBottom: '1.5rem' }}>
          À Louvain, Villant Plombier met à votre disposition des techniciens certifiés Vaillant
          pour l&apos;entretien, la réparation et le remplacement de chaudières, ainsi que pour les
          travaux de plomberie et de chauffage central.
        </p>

        <div className="grid-3-strict" style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
          {[
            {
              title: 'Réparation chaudière Vaillant Louvain',
              body: "Recherche de panne, remplacement de pièces et remise en service de votre chaudière Vaillant dans la région de Louvain.",
            },
            {
              title: 'Entretien Vaillant Louvain',
              body: "Entretien préventif de votre installation pour limiter les pannes et optimiser votre consommation d’énergie.",
            },
            {
              title: 'Conseil & installation',
              body: "Accompagnement pour choisir et installer une nouvelle chaudière Vaillant adaptée à votre logement à Louvain.",
            },
          ].map((card) => (
            <div key={card.title} className="card">
              <h2 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{card.title}</h2>
              <p style={{ fontSize: '0.95rem' }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div className="cta-band" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ marginBottom: '0.75rem' }}>Demander un plombier à Louvain</h2>
          <p style={{ marginBottom: '1.25rem', maxWidth: '55ch' }}>
            Envoyez-nous un e-mail avec votre adresse à Louvain, la description du problème et, si
            possible, le modèle de votre chaudière Vaillant. Nous revenons vers vous avec un devis
            et une proposition de créneau.
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

