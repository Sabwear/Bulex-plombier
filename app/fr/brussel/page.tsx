import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Plombier Vaillant Bruxelles – Toutes les Communes | Villant Plombier',
  description:
    'Villant Plombier dessert les 19 communes de Bruxelles en tant que plombier certifié Vaillant. D\'Anderlecht à Uccle — fuites d\'eau, chaudières, sanitaires et services de chauffage.',
  keywords: [
    'plombier Vaillant Bruxelles',
    'plombier urgence Bruxelles',
    'chauffagiste Bruxelles',
    'réparation fuite d\'eau Bruxelles',
    'installation sanitaire Bruxelles',
    'remplacement chaudière Bruxelles',
  ],
  alternates: { canonical: 'https://villant-loodgieter.be/brussel' },
  openGraph: {
    title: 'Plombier Vaillant Bruxelles – Toutes les Communes | Villant Plombier',
    description: 'Plombier certifié Vaillant actif dans les 19 communes de la Région de Bruxelles-Capitale.',
    url: 'https://villant-loodgieter.be/brussel',
  },
};

const communes = [
  { name: 'Anderlecht', desc: 'Plombier et réparation Vaillant à Anderlecht' },
  { name: 'Bruxelles-Ville', desc: 'Service d\'urgence et installation sanitaire dans le Pentagone de Bruxelles' },
  { name: 'Ixelles', desc: 'Remplacement de chaudière et réparation de fuite d\'eau à Ixelles' },
  { name: 'Etterbeek', desc: 'Chauffagiste et contrat d\'entretien à Etterbeek' },
  { name: 'Evere', desc: 'Installation sanitaire et services Vaillant à Evere' },
  { name: 'Ganshoren', desc: 'Services de plomberie et réparation de chaudière à Ganshoren' },
  { name: 'Jette', desc: 'Plombier Vaillant et nouveau chauffage à Jette' },
  { name: 'Koekelberg', desc: 'Fuite d\'eau et services de chauffage à Koekelberg' },
  { name: 'Molenbeek', desc: 'Service d\'urgence et installation sanitaire à Molenbeek' },
  { name: 'Auderghem', desc: 'Réparation Vaillant certifiée à Auderghem' },
  { name: 'Schaerbeek', desc: 'Plombier et installation de chaudière à Schaerbeek' },
  { name: 'Berchem-Sainte-Agathe', desc: 'Chauffagiste actif à Berchem-Sainte-Agathe' },
  { name: 'Saint-Gilles', desc: 'Sanitaire et plombier Vaillant à Saint-Gilles' },
  { name: 'Saint-Josse-ten-Noode', desc: 'Réparation Vaillant et urgence à Saint-Josse' },
  { name: 'Woluwe-Saint-Lambert', desc: 'Remplacement de chaudière et fuite d\'eau à Woluwe-Saint-Lambert' },
  { name: 'Woluwe-Saint-Pierre', desc: 'Technicien certifié pour systèmes de chauffage à Woluwe-Saint-Pierre' },
  { name: 'Uccle', desc: 'Plombier et contrat d\'entretien Vaillant à Uccle' },
  { name: 'Forest', desc: 'Installation sanitaire et réparation de chaudière à Forest' },
  { name: 'Watermael-Boitsfort', desc: 'Chauffagiste et services Vaillant à Watermael-Boitsfort' },
];

export default function BrusselPage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        background: `linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.5) 100%), url('/images/projects/img-7.jpg') center/cover no-repeat`,
        padding: '5rem 1.5rem 4rem',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="container">
          <span className="badge badge-green" style={{ marginBottom: '1rem' }}>Région d'intervention</span>
          <h1 style={{ marginBottom: '1rem' }}>
            Plombier Vaillant Bruxelles — actif dans les 19 communes
          </h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '60ch', marginBottom: '2rem' }}>
            Villant Plombier est votre plombier certifié Vaillant à Bruxelles, actif dans toutes les communes de la Région de Bruxelles-Capitale. Du service d'urgence en plomberie au remplacement de chaudières et aux installations sanitaires.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="mailto:contact@villant-loodgieter.be" className="btn btn-primary">Demander un devis</a>
            <Link href="/diensten" className="btn btn-outline">
              Nos services →
            </Link>
          </div>
        </div>
      </section>

      {/* VALUE PROP */}
      <section style={{ background: 'var(--bg-secondary)', padding: '3rem 1.5rem' }}>
        <div className="container">
          <div className="grid-4" style={{ gap: '1.25rem' }}>
            {[
              { icon: 'plumber-1.svg', label: 'Partenaire certifié Vaillant' },
              { icon: 'pipes-7.svg', label: 'Les 19 communes de Bruxelles' },
              { icon: 'wrench-1.svg', label: 'Service d\'urgence disponible' },
              { icon: 'wrench-2.svg', label: 'Techniciens qualifiés' },
            ].map((v) => (
              <div key={v.label} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                background: '#fff', borderRadius: 'var(--radius)', padding: '1rem 1.25rem',
                border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)',
              }}>
                <span style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center' }}>
                  <Image src={`/icons/plumbing-elements/${v.icon}`} alt={v.label} width={24} height={24} />
                </span>
                <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>{v.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREAS — FIRST (service areas-first for local area page) */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Toutes les Communes</span>
            <h2 style={{ marginTop: '1rem' }}>Notre couverture en Région Bruxelles-Capitale</h2>
            <div className="divider" />
            <p>
              En tant que votre <strong>chauffagiste à Bruxelles</strong>, nous desservons l'ensemble de la région bruxelloise.
              Vous trouverez ci-dessous les 19 communes dans lesquelles nous intervenons.
            </p>
          </div>

          <div className="grid-3-strict">
            {communes.map((c) => (
              <div key={c.name} className="card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '2px' }}>
                    <Image src="/icons/plumbing-elements/plumber-1.svg" alt="" width={20} height={20} />
                  </span>
                  <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem', color: 'var(--color-primary)' }}>{c.name}</h3>
                    <p style={{ fontSize: '0.85rem' }}>{c.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)',
            padding: '2rem', marginTop: '2.5rem', textAlign: 'center',
            border: '1px solid var(--border)',
          }}>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Fiers de travailler à Bruxelles et ses environs — votre plombier Vaillant certifié.
            </p>
            <p style={{ fontSize: '0.9rem' }}>
              Votre commune n'est pas dans la liste ? Contactez-nous — nous verrons si votre situation se trouve dans notre rayon d'intervention.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-gold">Services à Bruxelles</span>
            <h2 style={{ marginTop: '1rem' }}>Ce que nous offrons en Région bruxelloise</h2>
            <div className="divider" />
            <p>Tous les services de plomberie et de chauffage, réalisés par des techniciens Vaillant certifiés dans votre commune.</p>
          </div>
          <div className="grid-3-strict">
            {[
              { icon: 'wrench.svg', title: 'Réparation Vaillant', href: '/diensten#vaillant-herstelling', desc: 'Réparation rapide des chaudières Vaillant par des techniciens certifiés.' },
              { icon: 'water-heater-1.svg', title: 'Remplacement de Chaudière', href: '/diensten#boiler-vervangen', desc: 'Remplacement professionnel avec le modèle Vaillant adapté à votre logement.' },
              { icon: 'pipes.svg', title: 'Réparation de Fuite d\'Eau', href: '/diensten#waterlek', desc: 'Détection des fuites et réparation sans démolition inutile.' },
              { icon: 'bathtub.svg', title: 'Installation Sanitaire', href: '/diensten#sanitair', desc: 'Rénovation de salle de bain par des plombiers certifiés.' },
              { icon: 'radiator.svg', title: 'Nouveau Chauffage', href: '/diensten#verwarming', desc: 'Nouveau système de chauffage sur mesure pour votre habitation à Bruxelles.' },
              { icon: 'gauge.svg', title: 'Contrat d\'Entretien', href: '/diensten#onderhoud', desc: 'Entretien annuel Vaillant pour des performances optimales et une durée de vie plus longue.' },
            ].map((s) => (
              <Link key={s.title} href={s.href} style={{ textDecoration: 'none' }}>
                <div className="card">
                  <div className="icon-box">
                    <Image src={`/icons/plumbing-elements/${s.icon}`} alt={s.title} width={32} height={32} />
                  </div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.88rem' }}>{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/diensten" className="btn btn-primary">Voir tous les services</Link>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Avantages</span>
            <h2 style={{ marginTop: '1rem' }}>Pourquoi nous sommes votre plombier de choix à Bruxelles</h2>
            <div className="divider" />
          </div>
          <div className="grid-3-strict">
            {[
              { icon: 'pipes-7.svg', title: 'Connaissance du marché bruxellois', desc: 'Les habitations bruxelloises, et en particulier les immeubles anciens, ont des spécificités telles que des canalisations vieillissantes ou une qualité d\'eau dure. Nos techniciens connaissent ces défis et y font face avec précision.' },
              { icon: 'plumber-1.svg', title: 'Diagnostic Vaillant certifié', desc: 'Nos techniciens ne travaillent pas de manière générique. Ils appliquent la méthode de diagnostic officielle de Vaillant, ce qui permet d\'obtenir des diagnostics plus rapides et d\'éviter des visites répétées pour le même problème.' },
              { icon: 'flange.svg', title: 'Communication transparente', desc: 'Avant de commencer : un diagnostic et un devis clair. Après l\'intervention : un rapport écrit complet. Aucun frais surprise ni coût caché.' },
            ].map((b) => (
              <div key={b.title} className="card">
                <div className="icon-box">
                  <Image src={`/icons/plumbing-elements/${b.icon}`} alt={b.title} width={32} height={32} />
                </div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{b.title}</h3>
                <p style={{ fontSize: '0.88rem' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-gold">Témoignages à Bruxelles</span>
            <h2 style={{ marginTop: '1rem' }}>Ce que disent nos clients bruxellois</h2>
            <div className="divider" />
          </div>
          <div className="grid-3-strict">
            {[
              { name: 'Jan V., Anderlecht', text: 'Fuite d\'eau résolue en un temps record. Le technicien connaissait très bien nos anciennes canalisations et a travaillé efficacement sans rien casser de superflu.' },
              { name: 'Fatima A., Schaerbeek', text: 'Remplacement de la chaudière dans notre appartement à Schaerbeek. Des conseils parfaits sur le modèle approprié et une installation impeccable.' },
              { name: 'Pierre M., Ixelles', text: 'Contrat d\'entretien pour our Vaillant ecoTEC. Extrêmement ponctuel chaque année, un rapport toujours clair et une chaudière performante.' },
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

      {/* HOW IT WORKS */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue">Méthode de travail</span>
            <h2 style={{ marginTop: '1rem' }}>Comment se déroule une intervention à Bruxelles ?</h2>
            <div className="divider" />
          </div>
          <div className="grid-4">
            {[
              { n: '1', title: 'Contact', desc: 'Un e-mail mentionnant votre adresse à Bruxelles et une description de votre problème.' },
              { n: '2', title: 'Rendez-vous', desc: 'Nous fixons un rendez-vous au moment qui vous convient le mieux.' },
              { n: '3', title: 'Intervention', desc: 'Technicien certifié présent sur place avec des pièces Vaillant d\'origine.' },
              { n: '4', title: 'Rapport', desc: 'Rapport détaillé par écrit et conseils d\'entretien fournis après l\'intervention.' },
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
            <h2 style={{ marginTop: '1rem' }}>Questions concernant nos services à Bruxelles</h2>
            <div className="divider" />
          </div>
          {[
            { q: 'Êtes-vous également disponible dans ma commune bruxelloise ?', a: 'Oui, nous sommes actifs dans les 19 communes de la Région de Bruxelles-Capitale. Si votre commune ou votre localité exacte ne figure pas dans notre liste, n\'hésitez pas à nous contacter.' },
            { q: 'En combien de temps pouvez-vous intervenir pour une réparation Vaillant ?', a: 'Le temps de réaction dépend du planning et de votre emplacement. Pour des interventions urgentes, envoyez un e-mail avec la mention "URGENCE" dans l\'objet à contact@villant-loodgieter.be.' },
            { q: 'Intervenez-vous également dans des propriétés anciennes à Bruxelles ?', a: 'Absolument. Nos techniciens certifiés ont l\'habitude de travailler dans des habitations bruxelloises anciennes avec des systèmes de canalisation obsolètes, ce qui ne pose aucun problème pour eux.' },
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
          <h2>Besoin d'un plombier à Bruxelles ?</h2>
          <p>Villant Plombier — un partenaire Vaillant certifié actif dans toutes les communes bruxelloises.</p>
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
