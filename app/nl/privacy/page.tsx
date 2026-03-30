import type { Metadata } from 'next';
import { buildLocaleAlternates } from '@/lib/seoAlternates';

export const metadata: Metadata = {
  title: 'Privacybeleid | vaillant Loodgieter',
  description:
    'Privacybeleid en bescherming van persoonsgegevens – vaillant Loodgieter, Vaillant loodgieter en verwarming in Brussel.',
  alternates: buildLocaleAlternates('/nl/privacy'),
};

export default function PrivacyPage() {
  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem', maxWidth: '48rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Privacybeleid</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>1. Verwerkingsverantwoordelijke</h2>
        <p>
          Dit beleid beschrijft hoe vaillant Loodgieter uw persoonsgegevens verwerkt in het kader van deze website voor loodgieterij- en verwarmingsdiensten (onderhoud en herstelling van Vaillant-ketels).
        </p>
        <p>
          Voor vragen: <strong>contact@vaillant-loodgieter.com</strong> of telefonisch op het nummer op de site.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>2. Verzamelde gegevens</h2>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '0.75rem' }}>
          <li><strong>Contactformulier:</strong> naam, e-mail, telefoon, bericht.</li>
          <li><strong>Navigatie:</strong> IP-adres, browsertype, bezochte pagina&apos;s, serverlogboeken.</li>
          <li><strong>Cookies (bij toestemming):</strong> analytische gegevens – zie Cookiebeleid.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>3. Doeleinden en rechtsgrond (AVG)</h2>
        <p>
          Verwerking voor: beheer van contactaanvragen en precontractuele/contractuele relatie (art. 6.1.b AVG), veiligheid en onderhoud van de site (gerechtvaardigd belang, art. 6.1.f), wettelijke verplichtingen (art. 6.1.c), en analytische cookies op basis van toestemming (art. 6.1.a).
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>4. Bewaartermijn</h2>
        <p>
          Contactgegevens: zolang nodig voor de behandeling van de aanvraag en de contractuele relatie, daarna wettelijke bewaartermijnen. Serverlogboeken: beperkte duur. Cookies: zie Cookiebeleid.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>5. Ontvangers en doorgiften</h2>
        <p>
          Gegevens kunnen worden meegedeeld aan betrokken personeel, technische dienstverleners (hosting, onderhoud) en eventueel aanbieders van analytics met uw toestemming. Geen doorgifte buiten de EER zonder passende waarborgen.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>6. Beveiliging</h2>
        <p>
          Redelijke technische en organisatorische maatregelen om uw gegevens te beschermen tegen ongeautoriseerde toegang, verlies of wijziging. Geen absolute veiligheidsgarantie.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>7. Uw rechten</h2>
        <p>Overeenkomstig de AVG hebt u recht op inzage, rectificatie, wissing, beperking, overdraagbaarheid en bezwaar, en op intrekking van uw toestemming.</p>
        <p>
          Om ze uit te oefenen: <strong>contact@vaillant-loodgieter.com</strong> of per post naar ons hoofdkantoor. U kunt een klacht indienen bij de Gegevensbeschermingsautoriteit:{' '}
          <a href="https://www.gegevensbeschermingsautoriteit.be/" target="_blank" rel="noopener noreferrer">gegevensbeschermingsautoriteit.be</a>.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>8. Cookies</h2>
        <p>
          Het gebruik van cookies wordt toegelicht in ons <a href="/nl/cookies">Cookiebeleid</a>. Een cookiebanner laat u niet-essentiële cookies aanvaarden of weigeren.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>9. Wijzigingen</h2>
        <p>
          Wij kunnen dit beleid wijzigen. Wezenlijke wijzigingen worden op deze pagina aangegeven met de datum van laatste update.
        </p>
      </section>
    </main>
  );
}
