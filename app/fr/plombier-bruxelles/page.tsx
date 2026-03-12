import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Plombier Bruxelles | Villant Plombier',
  description:
    "Plombier Vaillant certifié à Bruxelles pour la réparation, l'entretien et l'installation de chaudières et systèmes de chauffage. Interventions dans les principaux quartiers de Bruxelles.",
};

export default function PlombierBruxellesPage() {
  return (
    <main className="py-16 md:py-20">
      <div className="container">
        <span className="badge badge-green" style={{ marginBottom: '1rem' }}>
          Plombier Bruxelles
        </span>
        <h1 style={{ marginBottom: '1rem' }}>Plombier Vaillant à Bruxelles</h1>
        <p style={{ fontSize: '1.05rem', maxWidth: '60ch', marginBottom: '1.5rem' }}>
          Villant Plombier est votre <strong>plombier certifié Vaillant à Bruxelles</strong> pour la
          réparation, l&apos;entretien et l&apos;installation de chaudières, radiateurs et
          installations sanitaires. Basés à Bruxelles et actifs dans plusieurs villes en Belgique,
          nous intervenons rapidement en cas de panne ou de fuite.
        </p>

        <div className="grid-3-strict" style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
          {[
            {
              title: 'Réparation chaudière Vaillant Bruxelles',
              body: "Diagnostic précis et remplacement des pièces défectueuses sur votre chaudière Vaillant ecoTEC, turboTEC ou condensation. Nous utilisons uniquement des pièces d'origine.",
            },
            {
              title: 'Entretien chaudière Vaillant Bruxelles',
              body: "Entretien annuel conforme aux exigences légales en Région de Bruxelles-Capitale, avec attestation pour votre assurance ou votre propriétaire.",
            },
            {
              title: 'Installation & remplacement',
              body: "Remplacement de votre ancienne chaudière par un modèle Vaillant à haute performance énergétique, dimensionné pour votre logement bruxellois.",
            },
          ].map((card) => (
            <div key={card.title} className="card">
              <h2 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{card.title}</h2>
              <p style={{ fontSize: '0.95rem' }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Zones d&apos;intervention à Bruxelles</h2>
          <p style={{ fontSize: '0.95rem', marginBottom: '1rem', maxWidth: '60ch' }}>
            Nous intervenons dans l&apos;ensemble de Bruxelles et de sa périphérie immédiate. Pour des
            interventions dans d&apos;autres grandes villes de Belgique (comme Anvers, Gand, Namur ou
            Liège), contactez-nous afin de vérifier la disponibilité de nos équipes.
          </p>
        </div>

        <div className="cta-band" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ marginBottom: '0.75rem' }}>
            Demander une intervention plombier à Bruxelles
          </h2>
          <p style={{ marginBottom: '1.25rem', maxWidth: '55ch' }}>
            Décrivez votre problème (chaudière, fuite d&apos;eau, radiateur, sanitaire) et indiquez
            votre adresse à Bruxelles. Nous analysons votre demande rapidement et vous envoyons un
            devis clair.
          </p>
          <div className="cta-actions">
            <Link href="/fr/contact" className="btn btn-primary">
              Contacter Villant Plombier
            </Link>
            <Link href="/fr/services" className="btn btn-outline">
              Voir tous les services
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

