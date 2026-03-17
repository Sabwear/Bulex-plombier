import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Conditions d'utilisation | vaillant Loodgieter",
  description:
    "Conditions d'utilisation du site – vaillant Loodgieter. Usage du site, propriété intellectuelle et limitation de responsabilité.",
};

export default function ConditionsUtilisationPage() {
  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem', maxWidth: '48rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Conditions d&apos;utilisation du site</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>1. Objet</h2>
        <p>
          Ces conditions définissent les modalités d&apos;accès et d&apos;utilisation du site. Le site a pour but de présenter les services de plomberie et de chauffage (réparation et entretien de chaudières Vaillant) et de permettre la prise de contact.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>2. Acceptation</h2>
        <p>
          En accédant au site et en l&apos;utilisant, vous acceptez les présentes conditions. Si vous ne les acceptez pas, vous devez cesser toute utilisation du site.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>3. Utilisation acceptable</h2>
        <p>Vous vous engagez à ne pas utiliser le site à des fins illégales ou contraires aux droits de tiers, à ne pas porter atteinte à son fonctionnement ou à sa sécurité, et à ne pas extraire ou utiliser abusivement les données du site (prospection non sollicitée, robots excessifs, etc.).</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>4. Informations et propriété intellectuelle</h2>
        <p>
          Les informations du site sont à titre indicatif et ne constituent pas une offre contractuelle ni un conseil personnalisé. Les éléments du site (textes, images, logos, structure) sont protégés par la propriété intellectuelle ; toute reproduction ou exploitation non autorisée est interdite.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>5. Limitation de responsabilité</h2>
        <p>
          vaillant Loodgieter ne peut être tenue responsable des dommages directs ou indirects résultant de l&apos;accès ou de l&apos;utilisation du site, de l&apos;indisponibilité du site, de l&apos;utilisation des informations qui y figurent ou de l&apos;utilisation de sites tiers accessibles par lien. Rien dans ces conditions n&apos;exclut les responsabilités qui ne peuvent être exclues par la loi.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>6. Données personnelles</h2>
        <p>
          Voir notre <Link href="/fr/confidentialite">Politique de confidentialité</Link> pour les traitements de données et vos droits.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>7. Droit applicable</h2>
        <p>
          Les présentes conditions sont régies par le droit belge. En cas de litige, les tribunaux belges compétents seront seuls compétents, sans préjudice des dispositions en matière de protection des consommateurs.
        </p>
      </section>
    </main>
  );
}
