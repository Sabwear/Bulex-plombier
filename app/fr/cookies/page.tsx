import type { Metadata } from 'next';
import Link from 'next/link';
import { buildLocaleAlternates } from '@/lib/seoAlternates';

export const metadata: Metadata = {
  title: 'Politique de cookies | vaillant Loodgieter',
  description:
    'Politique de cookies – vaillant Loodgieter. Types de cookies, gestion du consentement et paramètres du navigateur.',
  alternates: buildLocaleAlternates('/fr/cookies'),
};

export default function CookiesPage() {
  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem', maxWidth: '48rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Politique de cookies</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte enregistré sur votre appareil lorsque vous visitez un site. Il permet au site de reconnaître votre appareil, de mémoriser des informations et d&apos;améliorer votre navigation.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>2. Types de cookies utilisés</h2>
        <h3 style={{ fontSize: '1.1rem', marginTop: '1rem', marginBottom: '0.5rem' }}>Cookies strictement nécessaires</h3>
        <p>
          Indispensables au fonctionnement du site (préférences, formulaire). Ils ne peuvent pas être désactivés dans nos systèmes. Les bloquer peut affecter certaines fonctionnalités.
        </p>
        <h3 style={{ fontSize: '1.1rem', marginTop: '1rem', marginBottom: '0.5rem' }}>Cookies analytiques (avec votre consentement)</h3>
        <p>
          Ils permettent de mesurer l&apos;audience (visites, pages consultées) pour améliorer le site. Les données sont agrégées et anonymisées. Nous ne les utilisons que si vous acceptez les cookies via le bandeau.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>3. Base juridique</h2>
        <p>
          Cookies nécessaires : intérêt légitime (sécurité et fonctionnement). Cookies analytiques : consentement (art. 6.1.a RGPD et législation belge sur les communications électroniques).
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>4. Gestion de votre consentement</h2>
        <p>
          Lors de votre première visite, un bandeau vous permet d&apos;accepter ou refuser les cookies non essentiels. Vous pouvez modifier vos choix à tout moment via le lien prévu sur le site ou les paramètres de votre navigateur.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>5. Gérer les cookies dans votre navigateur</h2>
        <p>Vous pouvez accepter, refuser ou supprimer les cookies via les paramètres du navigateur. Liens utiles :</p>
        <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a></li>
          <li><a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies" target="_blank" rel="noopener noreferrer">Firefox</a></li>
          <li><a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Edge</a></li>
          <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          Bloquer certains cookies peut affecter votre expérience de navigation.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>6. Modifications</h2>
        <p>
          Nous pouvons mettre à jour cette politique. Les changements seront publiés sur cette page. Voir aussi notre <Link href="/fr/confidentialite">Politique de confidentialité</Link>.
        </p>
      </section>
    </main>
  );
}
