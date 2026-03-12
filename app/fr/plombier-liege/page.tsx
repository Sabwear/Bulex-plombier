import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Plombier Liège | Villant Plombier',
  description:
    "Plombier Vaillant à Liège pour la réparation, l'entretien et l'installation de chaudières et de systèmes de chauffage. Interventions planifiées selon la disponibilité de nos équipes.",
};

export default function PlombierLiegePage() {
  const city = 'Liège';

  return (
    <main className="py-16 md:py-20">
      <div className="container">
        <span className="badge badge-green" style={{ marginBottom: '1rem' }}>
          Plombier {city}
        </span>
        <h1 style={{ marginBottom: '1rem' }}>Plombier Vaillant à {city}</h1>

        <p style={{ fontSize: '1.05rem', maxWidth: '65ch', marginBottom: '1rem' }}>
          Villant Plombier propose des services complets de{' '}
          <strong>plomberie et de chauffage à {city}</strong>, avec une expertise particulière sur les
          chaudières Vaillant : réparation de panne, entretien préventif et remplacement.
        </p>
        <p style={{ fontSize: '1.05rem', maxWidth: '65ch', marginBottom: '1.5rem' }}>
          Nos techniciens certifiés se déplacent à {city} et dans d&apos;autres grandes villes de
          Belgique en fonction de la disponibilité des équipes et de l&apos;urgence de votre
          intervention.
        </p>

        <section style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Nos services à {city}</h2>
          <div className="grid-3-strict">
            {[
              {
                title: `Réparation chaudière Vaillant ${city}`,
                body:
                  "Identification des codes d'erreur, contrôle des composants clés (brûleur, pompe, capteurs) et remplacement des pièces Vaillant défectueuses.",
              },
              {
                title: `Entretien Vaillant ${city}`,
                body:
                  "Nettoyage, réglage et vérification complète de votre chaudière Vaillant avec remise d’un rapport pour votre dossier d’assurance.",
              },
              {
                title: 'Installation et modernisation',
                body:
                  "Étude de votre installation actuelle et proposition de chaudières Vaillant plus performantes et plus économiques adaptées aux logements liégeois.",
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
              'Partenaire certifié Vaillant pour des interventions conformes aux recommandations du fabricant.',
              'Utilisation de pièces d’origine Vaillant afin de protéger votre garantie.',
              'Devis transparent avant travaux et rapport écrit après chaque intervention.',
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
            Indiquez votre adresse à {city}, le type d&apos;installation (chaudière, radiateurs,
            sanitaire) et les symptômes constatés. Nous analysons votre demande et revenons vers vous
            avec une proposition d&apos;intervention.
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
            <summary>Intervenez-vous en urgence à Liège ?</summary>
            <div className="faq-answer">
              Nous faisons de notre mieux pour planifier des interventions rapides à Liège lorsque
              nos équipes sont disponibles. Précisez dans votre message s&apos;il s&apos;agit d&apos;une
              urgence afin que nous puissions prioriser votre demande.
            </div>
          </details>
          <details className="faq-item">
            <summary>Travaillez-vous uniquement sur des chaudières Vaillant ?</summary>
            <div className="faq-answer">
              Notre spécialité est la marque Vaillant. Cela nous permet d&apos;offrir un haut niveau
              d&apos;expertise sur ces systèmes, tout en restant compétitifs sur les délais et la
              qualité des réparations.
            </div>
          </details>
        </section>
      </div>
    </main>
  );
}

