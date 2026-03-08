import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Services – Réparation Vaillant Bruxelles | Villant Plombier',
  description:
    'Tous les services de plomberie et de chauffage à Bruxelles : réparation Vaillant, remplacement de chaudière, nouveau chauffage, réparation fuite d\'eau, installation sanitaire et contrat d\'entretien.',
  keywords: [
    'réparation Vaillant Bruxelles',
    'remplacement chaudière Bruxelles',
    'installation nouveau chauffage Bruxelles',
    'réparation fuite d\'eau Bruxelles',
    'installation sanitaire Bruxelles',
    'contrat d\'entretien Vaillant',
    'plombier urgence Bruxelles',
  ],
  alternates: { canonical: 'https://villant-loodgieter.be/services' },
  openGraph: {
    title: 'Services – Réparation Vaillant Bruxelles | Villant Plombier',
    description: 'Services professionnels de plomberie et de chauffage par un partenaire certifié Vaillant à Bruxelles.',
    url: 'https://villant-loodgieter.be/services',
  },
};

const services = [
  {
    id: 'vaillant-herstelling',
    icon: 'wrench.svg',
    title: 'Réparation Vaillant Bruxelles',
    keyword: 'Réparation Vaillant',
    short: 'Une panne ? Nous réparons votre chaudière Vaillant rapidement et correctement.',
    body: [
      'Une chaudière Vaillant qui tombe en panne est plus qu\'inconfortable — en hiver, cela peut devenir une urgence. En tant que partenaire certifié Vaillant, nous disposons des connaissances spécialisées et des pièces d\'origine pour réparer votre appareil rapidement et durablement.',
      'Nos techniciens sont formés par Vaillant et connaissent parfaitement tous les modèles ecoTEC, turboTEC et ecoCOMPACT. Nous diagnostiquons le problème avec précision avant que vous n\'engagiez des frais — pour que vous puissiez prendre une décision éclairée.',
      'Après la réparation, vous recevrez un rapport technique avec les actions effectuées et une recommandation pour un entretien préventif afin d\'éviter toute récidive.',
    ],
    highlights: ['Pièces Vaillant d\'origine', 'Technicien certifié', 'Rapport technique après intervention'],
  },
  {
    id: 'boiler-vervangen',
    icon: 'water-heater-1.svg',
    title: 'Remplacement Chaudière Bruxelles',
    keyword: 'Remplacement chaudière',
    short: 'Vieil appareil ? Nous installons votre nouvelle chaudière Vaillant de manière professionnelle.',
    body: [
      'Une chaudière de plus de 15 ans consomme jusqu\'à 30 % de gaz en plus qu\'un appareil moderne. Remplacer sa chaudière à Bruxelles est donc un investissement au rendement mesurable — non seulement en termes de confort, mais aussi de facture énergétique.',
      'Nous vous accompagnons dans le choix du modèle Vaillant adapté en fonction de votre type de logement, du nombre de pièces et de vos besoins en chauffage. Ensuite, nous assurons une installation complète conforme aux normes belges, y compris la mise en service.',
      'Les solutions de chauffage durable sont notre spécialité : de la chaudière murale au gaz traditionnelle aux combinaisons de pompes à chaleur hybrides.',
    ],
    highlights: ['Conseils sur mesure', 'Installation et mise en service complètes', 'Conforme aux normes belges'],
  },
  {
    id: 'verwarming',
    icon: 'radiator.svg',
    title: 'Nouveau Chauffage Bruxelles',
    keyword: 'Nouveau chauffage',
    short: 'Nouvelle construction ou rénovation ? Nous concevons et installons votre système de chauffage.',
    body: [
      'Qu\'il s\'agisse de chauffer une nouvelle construction ou de remplacer un système complet dans une maison existante — un dimensionnement correct détermine votre confort et votre consommation d\'énergie pour les années à venir. Nous réalisons une analyse thermique avant de proposer un système.',
      'En tant qu\'installateurs certifiés à Bruxelles, nous travaillons avec des produits Vaillant dont les performances ne sont plus à prouver sous le climat belge. Nous installons le chauffage au sol, les radiateurs et les systèmes de contrôle thermostatique.',
      'Chaque projet est livré avec une documentation complète et un dossier technique pour votre déclaration PEB si applicable.',
    ],
    highlights: ['Analyse thermique préalable', 'Documentation complète et dossier PEB', 'Installateur certifié Vaillant'],
  },
  {
    id: 'waterlek',
    icon: 'pipes.svg',
    title: 'Réparation Fuite d\'Eau Bruxelles',
    keyword: 'Réparation fuite d\'eau',
    short: 'Une fuite d\'eau cause rapidement des dégâts — nous localisons et réparons rapidement.',
    body: [
      'Une fuite d\'eau — visible ou invisible — peut causer des dégâts importants à votre structure, vos sols et vos murs en peu de temps. Nos techniciens disposent du matériel nécessaire pour détecter les fuites invisibles sans démolition inutile.',
      'Après la localisation, nous vous donnons une explication claire du problème et de l\'option de réparation. Nous travaillons rapidement et efficacement pour minimiser les dégâts des eaux dans votre propriété à Bruxelles.',
      'Objection : "Je ne vois pas de fuite, alors il n\'y a rien ?" — Les fuites cachées dans les tuyaux derrière les murs ou sous les planchers se remarquent à l\'augmentation de la facture d\'eau ou aux taches d\'humidité. N\'attendez pas que les dégâts soient visibles.',
    ],
    highlights: ['Détection de fuites sans démolition inutile', 'Intervention rapide', 'Devis clair avant de commencer'],
  },
  {
    id: 'sanitair',
    icon: 'bathtub.svg',
    title: 'Installation Sanitaire Bruxelles',
    keyword: 'Installation sanitaire',
    short: 'Rénovation de salle de bain ou nouveaux appareils — installation par des plombiers certifiés.',
    body: [
      'D\'un simple robinet à une rénovation complète de salle de bain à Bruxelles — nos plombiers qualifiés installent tous les équipements sanitaires : WC, douche, baignoire, lavabo, bidet et plus.',
      'Nous respectons la réglementation en matière de construction à Bruxelles lors de chaque installation. Chaque projet est terminé avec les joints nécessaires, la ventilation de sécurité et le contrôle de la pression de l\'eau.',
      'Vous doutez du choix de vos appareils ? Nos techniciens vous conseillent sur des configurations permettant d\'économiser l\'eau qui réduiront également votre consommation d\'énergie.',
    ],
    highlights: ['Tous les équipements sanitaires', 'Conforme à la réglementation bruxelloise', 'Conseils pour économiser l\'eau'],
  },
  {
    id: 'onderhoud',
    icon: 'gauge.svg',
    title: 'Contrat d\'Entretien Vaillant',
    keyword: 'Contrat d\'entretien',
    short: 'Entretien professionnel annuel pour maximiser la durée de vie de votre installation.',
    body: [
      'L\'entretien préventif est la protection la plus rentable pour votre système de chauffage. Un contrat d\'entretien annuel Vaillant comprend une inspection complète, le nettoyage du brûleur et de l\'échangeur de chaleur, et un rapport écrit.',
      'Objection : "Ma chaudière fonctionne bien, pourquoi l\'entretenir ?" — Les chaudières qui ne sont pas entretenues chaque année perdent progressivement de leur efficacité et sont plus susceptibles de tomber en panne — précisément au moment où vous en avez le plus besoin.',
      'En tant que partenaire certifié Vaillant, nous effectuons l\'entretien selon les protocoles officiels Vaillant, ce qui permet à votre garantie de rester en vigueur.',
    ],
    highlights: ['Inspection et nettoyage annuels', 'La garantie reste valide', 'Rapport écrit'],
  },
];

export default function DienstenPage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        background: `linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.5) 100%), url('/assets/images/service/6.jpg') center/cover no-repeat`,
        padding: '5rem 1.5rem 4rem',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="container">
          <span className="badge badge-green" style={{ marginBottom: '1rem' }}>Services Certifiés Vaillant</span>
          <h1 style={{ marginBottom: '1rem' }}>
            Réparation Vaillant Bruxelles &amp; tous les services de plomberie
          </h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '60ch', marginBottom: '2rem' }}>
            Villant Loodgieter est votre partenaire certifié pour tous les services de chauffage et de plomberie à Bruxelles. Du service d'urgence au contrat d'entretien annuel Vaillant.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="mailto:contact@villant-loodgieter.be" className="btn btn-primary">Demander un devis</a>
            <Link href="/" className="btn btn-outline">← Retour à l'accueil</Link>
          </div>
        </div>
      </section>

      {/* VALUE PROP */}
      <section style={{ background: 'var(--bg-secondary)', padding: '3rem 1.5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {[
              { icon: 'plumber-1.svg', text: 'Partenaire certifié Vaillant' },
              { icon: 'wrench-2.svg', text: 'Techniciens qualifiés' },
              { icon: 'pipes-7.svg', text: 'Devis transparents' },
              { icon: 'flange.svg', text: 'Pièces Vaillant d\'origine' },
            ].map((v) => (
              <div key={v.text} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                background: '#fff', borderRadius: 'var(--radius)', padding: '1rem 1.25rem',
                border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)',
              }}>
                <span style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center' }}>
                  <Image src={`/icons/plumbing-elements/${v.icon}`} alt={v.text} width={24} height={24} />
                </span>
                <span style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{v.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES (detailed) */}
      <section>
        <div className="container">
          <div className="section-header">
            <h2>Nos services</h2>
            <div className="divider" />
            <p>Chacun de nos services est effectué par des techniciens certifiés avec des pièces d'origine Vaillant.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {services.map((s, i) => (
              <div
                key={s.id}
                id={s.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: i % 2 === 0 ? '1fr 2fr' : '2fr 1fr',
                  gap: '2.5rem',
                  background: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2.5rem',
                  border: '1px solid var(--border)',
                  alignItems: 'center',
                }}
              >
                <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                  <div style={{
                    width: '80px', height: '80px',
                    background: 'var(--color-primary-light)',
                    borderRadius: 'var(--radius)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1rem',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--color-primary-mid)',
                  }}>
                    <Image src={`/icons/plumbing-elements/${s.icon}`} alt={s.title} width={40} height={40} />
                  </div>
                  <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>{s.keyword}</span>
                  <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', marginTop: '0.5rem' }}>{s.title}</h2>
                  <p style={{ fontWeight: 600, color: 'var(--brand-color)', marginBottom: '1rem' }}>{s.short}</p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {s.highlights.map((h) => (
                      <li key={h} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--brand-accent)', fontWeight: 700 }}>✓</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                  {s.body.map((para, pi) => (
                    <p key={pi} style={{ marginBottom: pi < s.body.length - 1 ? '1rem' : 0, fontSize: '0.95rem', lineHeight: 1.75 }}>{para}</p>
                  ))}
                  <div style={{ marginTop: '1.5rem' }}>
                    <a href="mailto:contact@villant-loodgieter.be" className="btn btn-primary" style={{ fontSize: '0.9rem' }}>
                      Priez un devis
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-gold">Avantages</span>
            <h2 style={{ marginTop: '1rem' }}>Pourquoi choisir Villant Plombier ?</h2>
            <div className="divider" />
          </div>
          <div className="grid-3-strict">
            {[
              { icon: 'plumber-1.svg', title: 'Certifié Vaillant', desc: 'La certification officielle est le résultat d\'une formation directe du fabricant — nous ne sommes pas des experts auto-déclarés.' },
              { icon: 'flange.svg', title: 'Pièces d\'origine', desc: 'Nous utilisons exclusivement des pièces Vaillant d\'origine pour que votre garantie reste intacte.' },
              { icon: 'pipes-7.svg', title: 'Historique écrit', desc: 'Après chaque intervention, vous recevez un rapport technique détaillé — pour votre dossier et la déclaration PEB.' },
            ].map((b) => (
              <div key={b.title} className="card">
                <div className="icon-box">
                  <Image src={`/icons/plumbing-elements/${b.icon}`} alt={b.title} width={32} height={32} />
                </div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{b.title}</h3>
                <p style={{ fontSize: '0.9rem' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Témoignages</span>
            <h2 style={{ marginTop: '1rem' }}>Ce que disent nos clients</h2>
            <div className="divider" />
          </div>
          <div className="grid-3">
            {[
              { name: 'Marc D., Schaerbeek', text: 'La réparation Vaillant s\'est déroulée rapidement. Le technicien était professionnel, a expliqué chaque étape et a travaillé proprement. La chaudière fonctionne mieux que jamais.' },
              { name: 'Amina B., Molenbeek', text: 'Remplacement de la chaudière suite aux conseils de Villant. Ils ont choisi le bon modèle pour mon appartement et l\'installation s\'est déroulée sans accroc. Je recommande !' },
              { name: 'Lieve T., Uccle', text: 'J\'ai souscrit un contrat d\'entretien pour mon ecoTEC Vaillant. Ils sont ponctuels chaque année, le rapport est clair et la chaudière fonctionne parfaitement.' },
            ].map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p style={{ fontStyle: 'italic', fontSize: '0.9rem', lineHeight: 1.7 }}>&quot;{t.text}&quot;</p>
                <div className="testimonial-author">— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge badge-gold">Région</span>
          <h2 style={{ marginTop: '1rem', marginBottom: '1rem' }}>Actif dans tout Bruxelles</h2>
          <div className="divider" />
          <p style={{ margin: '0 auto 2rem', maxWidth: '55ch' }}>
            Nous fournissons tous les services ci-dessus dans les 19 communes de Bruxelles. Fiers de travailler à Bruxelles et ses environs.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
            {['Anderlecht', 'Bruxelles-Ville', 'Ixelles', 'Etterbeek', 'Evere', 'Ganshoren', 'Jette', 'Koekelberg', 'Molenbeek', 'Auderghem', 'Schaerbeek', 'Saint-Gilles', 'Saint-Josse', 'Uccle', 'Forest'].map((a) => (
              <span key={a} className="area-chip">📍 {a}</span>
            ))}
          </div>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/brussel" className="btn btn-outline">En savoir plus sur notre zone →</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Méthode de travail</span>
            <h2 style={{ marginTop: '1rem' }}>Comment demander un service ?</h2>
            <div className="divider" />
          </div>
          <div className="grid-4">
            {[
              { n: '1', title: 'Contactez-nous', desc: 'E-mail à contact@villant-loodgieter.be avec votre problème et votre adresse à Bruxelles.' },
              { n: '2', title: 'Diagnostic', desc: 'Notre technicien inspecte et établit un devis transparent avant toute intervention.' },
              { n: '3', title: 'Intervention', desc: 'Des professionnels certifiés effectuent le service avec des pièces Vaillant d\'origine.' },
              { n: '4', title: 'Rapport', desc: 'Vous recevez un rapport technique écrit et des recommandations d\'entretien.' },
            ].map((step) => (
              <div key={step.n} style={{ textAlign: 'center' }}>
                <div className="step-number" style={{ margin: '0 auto 1rem' }}>{step.n}</div>
                <h4 style={{ marginBottom: '0.5rem' }}>{step.title}</h4>
                <p style={{ fontSize: '0.87rem' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ maxWidth: '750px' }}>
          <div className="section-header">
            <span className="badge badge-gold">FAQ</span>
            <h2 style={{ marginTop: '1rem' }}>Questions fréquentes sur nos services</h2>
            <div className="divider" />
          </div>
          {[
            { q: 'Travaillez-vous exclusivement avec des appareils Vaillant ?', a: 'Notre spécialité et notre certification concernent les systèmes Vaillant. Nous sommes vos experts de référence pour la réparation, l\'entretien et l\'installation Vaillant à Bruxelles.' },
            { q: 'Que faire si j\'ai besoin d\'une réparation d\'urgence ?', a: 'Envoyez un e-mail avec "URGENCE" en objet à contact@villant-loodgieter.be. Nous traitons les demandes d\'intervention urgente en priorité.' },
            { q: 'Le remplacement de la chaudière modifie-t-il ma facture d\'énergie ?', a: 'Une chaudière Vaillant moderne et économe en énergie peut réduire considérablement votre consommation de gaz par rapport à un appareil obsolète. Nous vous conseillons sur les économies réalistes pour votre situation spécifique.' },
            { q: 'Combien de temps dure un entretien ?', a: 'Un entretien annuel standard dure en moyenne 1 à 2 heures, selon le modèle et l\'état de l\'installation.' },
          ].map((faq, i) => (
            <details key={i} className="faq-item">
              <summary>{faq.q}</summary>
              <div className="faq-answer">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2>Prêt à optimiser votre installation Vaillant ?</h2>
          <p>Contactez Villant Plombier — votre plombier certifié Vaillant à Bruxelles.</p>
          <div className="cta-actions">
            <a href="mailto:contact@villant-loodgieter.be" className="btn btn-ghost-dark">📧 Envoyer un message</a>
            <Link href="/over-ons" className="btn btn-ghost-dark">
              À propos de nous →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
