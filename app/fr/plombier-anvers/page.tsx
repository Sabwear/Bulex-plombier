import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Plombier Anvers | Villant Plombier',
  description:
    "Plombier Vaillant à Anvers pour la réparation, l'entretien et l'installation de chaudières et systèmes de chauffage. Interventions selon disponibilité de nos équipes.",
};

export default function PlombierAnversPage() {
  return (
    <main className="py-16 md:py-20">
      <div className="container">
        <span className="badge badge-green" style={{ marginBottom: '1rem' }}>
          Plombier Anvers
        </span>
        <h1 style={{ marginBottom: '1rem' }}>Plombier Vaillant à Anvers</h1>
        <p style={{ fontSize: '1.05rem', maxWidth: '60ch', marginBottom: '1.5rem' }}>
          Villant Plombier accompagne les particuliers à Anvers pour la
          <strong> réparation et l&apos;entretien de chaudières Vaillant</strong>, ainsi que pour les
          interventions de plomberie et de chauffage central. Basés à Bruxelles et actifs dans
          plusieurs villes de Belgique, nous planifions les interventions à Anvers selon la
          disponibilité de nos techniciens.
        </p>

        <div className="grid-3-strict" style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
          {[
            {
              title: 'Réparation chaudière Vaillant Anvers',
              body: "Diagnostic sur place de votre chaudière Vaillant, remplacement des pièces défectueuses et remise en service complète.",
            },
            {
              title: 'Entretien chaudière Vaillant Anvers',
              body: "Entretien périodique de votre chaudière Vaillant pour assurer sécurité, rendement et conformité vis-à-vis de votre assureur.",
            },
            {
              title: 'Projets de chauffage à Anvers',
              body: "Conseil et installation de nouvelles chaudières ou systèmes de chauffage adaptés aux appartements et maisons d’Anvers.",
            },
          ].map((card) => (
            <div key={card.title} className="card">
              <h2 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{card.title}</h2>
              <p style={{ fontSize: '0.95rem' }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div className="cta-band" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ marginBottom: '0.75rem' }}>
            Demander un plombier Vaillant à Anvers
          </h2>
          <p style={{ marginBottom: '1.25rem', maxWidth: '55ch' }}>
            Envoyez-nous un e-mail avec votre adresse à Anvers, le type d&apos;installation (chaudière
            Vaillant, radiateurs, sanitaire) et la nature du problème. Nous vérifions la
            disponibilité d&apos;une équipe et vous communiquons un devis.
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

