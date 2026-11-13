import type { Metadata } from 'next';
import { buildLocaleAlternates } from '@/lib/seoAlternates';

export const metadata: Metadata = {
  title: 'Mentions légales | vaillant Loodgieter',
  description:
    'Mentions légales – Éditeur du site, contact, hébergement et propriété intellectuelle. vaillant Loodgieter, plombier Vaillant Bruxelles.',
  alternates: buildLocaleAlternates('/fr/mentions-legales'),
};

export default function MentionsLegalesPage() {
  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem', maxWidth: '48rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Mentions légales</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>1. Éditeur du site</h2>
        <p>
          Le site est édité par <strong>vaillant Loodgieter</strong>. Siège social et numéros d&apos;identification (BCE, TVA) disponibles sur demande à contact@vaillant-loodgieter.com.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>2. Contact</h2>
        <p>
          Pour toute question relative au site ou aux services (plomberie, chauffage, réparation et entretien de chaudières Vaillant) : e-mail <strong>contact@vaillant-loodgieter.com</strong>, téléphone et adresse indiqués sur la page Contact.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>3. Hébergement</h2>
        <p>
          L&apos;hébergement du site est assuré par un prestataire technique. Les coordonnées de l&apos;hébergeur sont disponibles sur demande à contact@vaillant-loodgieter.com.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>4. Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble du contenu du site (textes, images, logos, marques, structure) est protégé par le droit d&apos;auteur et la propriété intellectuelle. Toute reproduction, représentation ou exploitation non autorisée peut constituer une contrefaçon.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>5. Liens hypertextes</h2>
        <p>
          Le site peut contenir des liens vers des sites tiers. Ces liens sont fournis à titre informatif. vaillant Loodgieter ne contrôle pas le contenu des sites tiers et ne peut être tenue responsable de leur disponibilité ou contenu.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>6. Responsabilité</h2>
        <p>
          Les informations du site sont fournies à titre indicatif. Nous nous efforçons de les maintenir à jour mais ne garantissons pas leur exhaustivité ou absence d&apos;erreur. vaillant Loodgieter ne peut être tenue responsable des dommages directs ou indirects résultant de l&apos;utilisation du site ou des informations qui y figurent. L&apos;utilisateur reste responsable de l&apos;usage qu&apos;il en fait.
        </p>
      </section>
    </main>
  );
}
