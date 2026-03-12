import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité | Villant Loodgieter',
  description:
    'Politique de confidentialité et protection des données personnelles – Villant Loodgieter, plombier et chauffage Vaillant à Bruxelles.',
};

export default function ConfidentialitePage() {
  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem', maxWidth: '48rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Politique de confidentialité</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>1. Responsable du traitement</h2>
        <p>
          La présente politique décrit comment Villant Loodgieter traite vos données à caractère personnel dans le cadre de ce site dédié aux services de plomberie et de chauffage (entretien et réparation de chaudières Vaillant).
        </p>
        <p>
          Pour toute question : <strong>contact@villant-loodgieter.be</strong> ou par téléphone au numéro indiqué sur le site.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>2. Données collectées</h2>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
          <li><strong>Formulaire de contact :</strong> nom, e-mail, téléphone, message.</li>
          <li><strong>Navigation :</strong> adresse IP, type de navigateur, pages consultées, journaux serveur.</li>
          <li><strong>Cookies (si consentement) :</strong> données analytiques – voir Politique de cookies.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>3. Finalités et base juridique (RGPD)</h2>
        <p>
          Traitement pour : gestion des demandes de contact et relation précontractuelle/contractuelle (art. 6.1.b RGPD), sécurité et maintenance du site (intérêt légitime, art. 6.1.f), obligations légales (art. 6.1.c), et cookies analytiques sur base du consentement (art. 6.1.a).
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>4. Durée de conservation</h2>
        <p>
          Données de contact : durée nécessaire au traitement de la demande et à la relation contractuelle, puis respect des obligations légales. Journaux serveur : durée limitée. Cookies : voir Politique de cookies.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>5. Destinataires et transferts</h2>
        <p>
          Les données peuvent être communiquées au personnel concerné, aux prestataires techniques (hébergement, maintenance) et, le cas échéant, aux fournisseurs d&apos;analytics avec votre consentement. Pas de transfert hors EEE sans garanties appropriées.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>6. Sécurité</h2>
        <p>
          Mesures techniques et organisationnelles raisonnables pour protéger vos données contre accès non autorisé, perte ou altération. Aucune garantie de sécurité absolue n&apos;est promise.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>7. Vos droits</h2>
        <p>Conformément au RGPD, vous disposez des droits d&apos;accès, de rectification, d&apos;effacement, de limitation, de portabilité et d&apos;opposition, ainsi que du droit de retirer votre consentement.</p>
        <p>
          Pour les exercer : <strong>contact@villant-loodgieter.be</strong> ou courrier à notre siège. Vous pouvez introduire une réclamation auprès de l&apos;Autorité de protection des données :{' '}
          <a href="https://www.autoriteprotectiondonnees.be/" target="_blank" rel="noopener noreferrer">autoriteprotectiondonnees.be</a>.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>8. Cookies</h2>
        <p>
          L&apos;utilisation de cookies est détaillée dans notre <a href="/fr/cookies">Politique de cookies</a>. Un bandeau de consentement vous permet d&apos;accepter ou refuser les cookies non essentiels.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>9. Modifications</h2>
        <p>
          Nous pouvons modifier cette politique. Les changements substantiels seront indiqués sur cette page avec la date de dernière mise à jour.
        </p>
      </section>
    </main>
  );
}
