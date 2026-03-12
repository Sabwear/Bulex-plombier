import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Plombier Charleroi | Villant Plombier',
  description:
    "Plombier Vaillant à Charleroi pour la réparation, l'entretien et l'installation de chaudières et systèmes de chauffage. Interventions planifiées selon la disponibilité de nos équipes.",
};

export default function PlombierCharleroiPage() {
  const city = 'Charleroi';

  return (
    <main className="py-16 md:py-20">
      <div className="container">
        <span className="badge badge-green" style={{ marginBottom: '1rem' }}>
          Plombier {city}
        </span>
        <h1 style={{ marginBottom: '1rem' }}>Plombier Vaillant à {city}</h1>

        <p style={{ fontSize: '1.05rem', maxWidth: '65ch', marginBottom: '1rem' }}>
          Villant Plombier accompagne les particuliers à {city} pour la{' '}
          <strong>réparation, l&apos;entretien et le remplacement de chaudières Vaillant</strong>, ainsi
          que pour les interventions de plomberie et de chauffage central.
        </p>
        <p style={{ fontSize: '1.05rem', maxWidth: '65ch', marginBottom: '1.5rem' }}>
          Basés à Bruxelles et actifs dans plusieurs grandes villes de Belgique, nous planifions les
          interventions à {city} en fonction de la disponibilité de nos techniciens et de l&apos;urgence
          de votre demande.
        </p>

        <section style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Nos services à {city}</h2>
          <div className="grid-3-strict">
            {[
              {
                title: `Réparation chaudière Vaillant ${city}`,
                body:
                  "Diagnostic sur place, vérification des composants et remplacement des pièces défectueuses de votre chaudière Vaillant (ecoTEC, turboTEC, condensation).",
              },
              {
                title: `Entretien Vaillant ${city}`,
                body:
                  "Entretien périodique de votre chaudière Vaillant pour sécuriser l'installation, optimiser le rendement et limiter les risques de panne.",
              },
              {
                title: 'Installation & remplacement',
                body:
                  "Conseil et installation de nouvelles chaudières Vaillant à haut rendement adaptées aux appartements et maisons de Charleroi.",
              },
            ].map((card) => (
              <div key={card.title} className="card">
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{card.title}</h3>
                <p style={{ fontSize: '0.95rem' }}>{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>
            Pourquoi choisir Villant Plombier à {city} ?
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxWidth: '65ch' }}>
            {[
              'Partenaire certifié Vaillant, avec une expertise spécifique sur les systèmes de la marque.',
              'Interventions documentées avec un rapport clair après chaque service.',
              'Utilisation exclusive de pièces d’origine Vaillant pour préserver la garantie constructeur.',
            ].map((item) => (
              <li key={item} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>•</span>
                <span style={{ fontSize: '0.95rem' }}>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="cta-band" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ marginBottom: '0.75rem' }}>
            Demander une intervention plombier à {city}
          </h2>
          <p style={{ marginBottom: '1.25rem', maxWidth: '55ch' }}>
            Décrivez votre problème (chaudière, radiateurs, fuite d&apos;eau, sanitaire) et indiquez
            votre adresse à {city}. Nous analysons votre demande et vous envoyons un devis sans
            surprise.
          </p>
          <div className="cta-actions">
            <Link href="/fr/contact" className="btn btn-primary">
              Contacter Villant Plombier
            </Link>
            <Link href="/fr/services" className="btn btn-outline">
              Voir tous les services
            </Link>
          </div>
        </section>

        <section style={{ marginTop: '2.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>FAQ – {city}</h2>
          <details className="faq-item">
            <summary>Intervenez-vous dans tous les quartiers de Charleroi ?</summary>
            <div className="faq-answer">
              Nous planifions des interventions dans l&apos;ensemble de la ville de Charleroi selon la
              disponibilité de nos équipes. Indiquez simplement votre adresse complète dans votre
              demande.
            </div>
          </details>
          <details className="faq-item">
            <summary>Pouvez-vous entretenir toutes les chaudières Vaillant ?</summary>
            <div className="faq-answer">
              Oui, nos techniciens sont formés sur les principales gammes Vaillant (ecoTEC, turboTEC,
              condensation) et appliquent les protocoles du fabricant.
            </div>
          </details>
        </section>
      </div>
    </main>
  );
}

