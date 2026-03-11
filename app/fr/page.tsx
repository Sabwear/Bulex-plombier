import type { Metadata } from 'next';
import Link from 'next/link';
import NextImage from 'next/image';
import blogStyles from '@/app/fr/blog/blog.module.css';
import { getBlogPosts } from '@/data/types';
import HomeHeroSlider from '@/components/hero/HomeHeroSlider';
import { HOME_HERO_TRUST_STRIP } from '@/config/home-hero-slides';
import {
  Mail, Award, Zap, Globe, UserCheck,
  Wrench, Settings, Construction,
  Thermometer, Grid, Bath, Gauge, CheckCircle2, MapPin
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Plombier Vaillant Bruxelles | Villant Plombier',
  description:
    "Villant Plombier – votre plombier certifié Vaillant à Bruxelles. Dépannage urgence, remplacement de chaudière, réparation de fuite d'eau et installation sanitaire à Bruxelles.",
  keywords: [
    'plombier Vaillant Bruxelles',
    'plombier urgence Bruxelles',
    'remplacement chaudière Bruxelles',
    'réparation fuite d\'eau Bruxelles',
    'partenaire certifié Vaillant Belgique',
  ],
  alternates: { canonical: 'https://villant-loodgieter.be' },
  openGraph: {
    title: 'Plombier Vaillant Bruxelles | Villant Plombier',
    description: 'Partenaire certifié Vaillant à Bruxelles. Professionnel, rapide et fiable.',
    url: 'https://villant-loodgieter.be',
  },
};


export default function HomePage() {
  const posts = getBlogPosts();
  const trustStrip = HOME_HERO_TRUST_STRIP.fr;
  return (
    <>
      <HomeHeroSlider lang="fr" />

      <section style={{ paddingTop: '1.25rem' }}>
        <div className="container">
          <div className="grid-4">
            {trustStrip.map((item, index) => {
              const icons = [Award, Zap, UserCheck, MapPin];
              const Icon = icons[index] ?? CheckCircle2;
              return (
                <div
                  key={item.title}
                  style={{
                    textAlign: 'left',
                    padding: '0',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.6rem',
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <h3 style={{ fontSize: 'var(--text-base)', marginBottom: '0.25rem' }}>{item.title}</h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{item.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ───────────────────────────────────────── */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Pourquoi choisir Villant Plombier</span>
            <h2>Vos avantages en tant que client</h2>
            <div className="divider" />
            <p>En tant que partenaire certifié Vaillant, nous offrons une qualité mesurable — pas seulement des promesses. Nos techniciens combinent une formation du fabricant avec des années d'expérience pratique à Bruxelles.</p>
          </div>

          <div className="grid-3-strict">
            {[
              { icon: <UserCheck size={32} />, title: 'Partenaire Officiel Certifié Vaillant', desc: "Nous sommes officiellement certifiés par Vaillant. Nos techniciens ont suivi une formation directe du fabricant et sont reconnus pour l'installation, l'entretien et la réparation des systèmes Vaillant." },
              { icon: <Wrench size={32} />, title: 'Techniciens qualifiés et expérimentés', desc: "Chaque membre de notre équipe est qualifié et possède une solide expérience en systèmes de chauffage et sanitaires. Vous ne travaillerez jamais avec des novices — un travail d'artisan certifié." },
              { icon: <Construction size={32} />, title: 'Approche transparente sans surprise', desc: "Nous vous fournissons un diagnostic clair avant de commencer. Pas de coûts cachés, pas de surprises sur la facture. Chaque intervention est documentée et détaillée." },
              { icon: <Settings size={32} />, title: 'Pièces Vaillant originales', desc: "Lors de chaque réparation, nous utilisons exclusivement des pièces d'origine Vaillant — afin que votre garantie reste valide et que le système continue de fonctionner de manière optimale." },
              { icon: <MapPin size={32} />, title: 'Connaissance locale de Bruxelles', desc: "Nous connaissons les défis spécifiques des logements bruxellois : vieilles canalisations, qualité de l'eau urbaine et normes de construction. Cela nous rend rapides et précis." },
              { icon: <Thermometer size={32} />, title: 'Contrat d\'entretien disponible', desc: "Protégez votre investissement avec un contrat d'entretien Vaillant. L'entretien annuel prolonge la durée de vie de votre chaudière et maintient ses performances énergétiques." },
            ].map((b) => (
              <div key={b.title} className="card">
                <div className="icon-box">
                  {b.icon}
                </div>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '10px' }}>{b.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────── */}
      <section style={{ background: 'var(--color-gray-50)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Nos Services</span>
            <h2>Ce que nous faisons à Bruxelles</h2>
            <div className="divider" />
            <p>Des services d'urgence aux installations complètes — nous couvrons toutes les facettes de la plomberie et du chauffage à Bruxelles.</p>
          </div>

          <div className="grid-3-strict">
            {[
              { image: '/images/service/1.jpg', icon: <Wrench size={32} />, title: 'Réparation Vaillant Bruxelles', desc: "Problème avec votre chaudière Vaillant ? Nos techniciens certifiés diagnostiquent et réparent tous les modèles Vaillant avec rapidité et précision.", link: '/diensten#vaillant-herstelling' },
              { image: '/images/service/2.jpg', icon: <Thermometer size={32} />, title: 'Remplacement Chaudière Bruxelles', desc: "Votre ancienne chaudière est en fin de vie ? Nous installons une nouvelle chaudière Vaillant économe en énergie avec mise en service complète.", link: '/diensten#boiler-vervangen' },
              { image: '/images/service/3.jpg', icon: <Grid size={32} />, title: 'Installation d\'un Nouveau Chauffage', desc: "Des projets de nouveau chauffage à Bruxelles ? Nous concevons et installons un système adapté à votre domicile ou vos locaux professionnels.", link: '/diensten#verwarming' },
              { image: '/images/service/4.jpg', icon: <Construction size={32} />, title: 'Réparation Fuite d\'Eau Bruxelles', desc: "Une fuite d'eau cause rapidement des dégâts. Notre équipe localise et répare les fuites immédiatement pour éviter de graves dommages à votre propriété.", link: '/diensten#waterlek' },
              { image: '/images/service/5.jpg', icon: <Bath size={32} />, title: 'Installation Sanitaire Bruxelles', desc: "Rénovation de salle de bain ou appareils sanitaires ? Nous installons tout de manière experte : toilettes, douche, baignoire, lavabo et plus.", link: '/diensten#sanitair' },
              { image: '/images/service/6.jpg', icon: <Gauge size={32} />, title: 'Contrat d\'Entretien Vaillant', desc: "Entretien annuel de votre installation Vaillant. Comprend l'inspection, le nettoyage et un rapport pour des performances et une durabilité garanties.", link: '/diensten#onderhoud' },
            ].map((s) => (
              <div key={s.title} className="card">
                <div className="card-image">
                  <img src={s.image} alt={s.title} />
                </div>
                <div className="icon-box" style={{ marginTop: '-42px', position: 'relative', border: '2px solid #fff' }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)', marginBottom: '16px' }}>{s.desc}</p>
                <Link href={s.link} style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-primary)' }}>
                  Plus d'infos →
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/diensten" className="btn btn-primary">Voir tous les services</Link>
          </div>
        </div>
      </section>

      {/* ── PROOF ──────────────────────────────────────────── */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Preuve &amp; Confiance</span>
            <h2>Pourquoi les clients nous font confiance</h2>
            <div className="divider" />
            <p>Deux points concrets et vérifiables distinguent Villant Plombier des plombiers génériques à Bruxelles.</p>
          </div>

          {/* Proof cards */}
          <div className="grid-2" style={{ marginBottom: '40px' }}>
            {[
              {
                icon: <Award size={48} color="var(--color-primary)" />,
                title: 'Partenaire certifié Vaillant',
                body: "Villant Plombier est officiellement certifié partenaire par Vaillant, l'un des principaux fabricants européens de systèmes de chauffage. Notre certification est accordée directement par le constructeur et reflète une réelle expertise de la marque.",
              },
              {
                icon: <UserCheck size={48} color="var(--color-primary)" />,
                title: 'Techniciens qualifiés et expérimentés',
                body: "Notre équipe est exclusivement composée de techniciens qualifiés ayant une expérience prouvée. Nous ne laissons pas la place à des ouvriers non spécialisés. Chaque intervention est effectuée par un artisan à la pointe des normes d'aujourd'hui.",
              },
            ].map((p) => (
              <div key={p.title} className="proof-card">
                <div style={{ marginBottom: '16px' }}>{p.icon}</div>
                <h3 style={{ marginBottom: '12px' }}>{p.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>{p.body}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid-3">
            {[
              { name: 'Thomas V., Ixelles', text: "Ma chaudière Vaillant est tombée en panne un matin d'hiver froid. Villant a envoyé quelqu'un le jour même, le technicien a rapidement diagnostiqué le problème et remis le système en marche. Un service impressionnant." },
              { name: 'Sophie M., Saint-Gilles', text: "Ils ont remplacé notre vieille chaudière par une nouvelle Vaillant. Travail soigné, communication très claire et aucun coût caché à la fin. À recommander absolument à Bruxelles." },
              { name: 'Karim L., Anderlecht', text: "La fuite d'eau de la salle de bain a été rapidement localisée et réparée. Ils ont expliqué chaque étape et ont laissé l'endroit très propre. Une équipe de pros, ça se remarque." },
            ].map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p style={{ fontStyle: 'italic', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>&quot;{t.text}&quot;</p>
                <div className="testimonial-author">— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS ──────────────────────────────────── */}
      <section style={{ background: 'var(--color-gray-50)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Région</span>
            <h2>Plombier dans tout Bruxelles</h2>
            <div className="divider" />
            <p>En tant que plombier Vaillant certifié à Bruxelles, nous desservons l&apos;ensemble des 19 communes et la périphérie immédiate.</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '32px' }}>
            {[
              { name: 'Anderlecht', slug: 'anderlecht' },
              { name: 'Auderghem', slug: 'auderghem' },
              { name: 'Berchem-Sainte-Agathe', slug: 'berchem-sainte-agathe' },
              { name: 'Bruxelles-Ville', slug: 'bruxelles-ville' },
              { name: 'Etterbeek', slug: 'etterbeek' },
              { name: 'Evere', slug: 'evere' },
              { name: 'Forest', slug: 'forest' },
              { name: 'Ganshoren', slug: 'ganshoren' },
              { name: 'Ixelles', slug: 'ixelles' },
              { name: 'Jette', slug: 'jette' },
              { name: 'Koekelberg', slug: 'koekelberg' },
              { name: 'Molenbeek', slug: 'molenbeek' },
              { name: 'Saint-Gilles', slug: 'saint-gilles' },
              { name: 'Saint-Josse-ten-Noode', slug: 'saint-josse-ten-noode' },
              { name: 'Schaerbeek', slug: 'schaerbeek' },
              { name: 'Uccle', slug: 'uccle' },
              { name: 'Watermael-Boitsfort', slug: 'watermael-boitsfort' },
              { name: 'Woluwe-Saint-Lambert', slug: 'woluwe-saint-lambert' },
              { name: 'Woluwe-Saint-Pierre', slug: 'woluwe-saint-pierre' },
            ].map((area) => (
              <Link key={area.slug} href={`/fr/plombier/${area.slug}`} className="area-chip" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} /> {area.name}
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/fr/plombier" className="btn btn-outline">Voir toutes les communes desservies</Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────── */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Méthode de travail</span>
            <h2>Comment ça marche ?</h2>
            <div className="divider" />
            <p>Quatre étapes simples — de votre premier contact jusqu'à une installation fonctionnelle.</p>
          </div>

          <div className="steps-grid">
            {[
              { n: '1', title: '', desc: "Envoyez un e-mail à contact@villant-loodgieter.be. Décrivez votre problème ou votre demande le plus précisément possible." },
              { n: '2', title: 'Diagnostic et Devis', desc: "Notre technicien se rend sur place et pose un diagnostic transparent. Vous recevez un devis clair et précis avant de commencer les travaux." },
              { n: '3', title: 'Intervention experte', desc: "Des techniciens certifiés effectuent la réparation ou l'installation en appliquant les normes rigoureuses et des pièces d'origine Vaillant." },
              { n: '4', title: 'Suivi et Entretien', desc: "Après l'intervention, un bilan de fonctionnement. Nous vous conseillons sur l'entretien annuel recommandé pour votre installation Vaillant." },
            ].map((step) => (
              <div key={step.n} className="step-item">
                <div className="step-number" style={{ margin: '0 auto' }}>{step.n}</div>
                <h4>{step.title}</h4>
                <p style={{ fontSize: 'var(--text-sm)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-gray-50)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <span className="badge badge-green">FAQ</span>
            <h2>Foire Aux Questions</h2>
            <div className="divider" />
          </div>
          {[
            { q: 'Êtes-vous un partenaire officiel certifié Vaillant ?', a: "Oui. Villant Plombier est officiellement certifié par la marque Vaillant. Nos techniciens participent aux formations directes du fabricant et sont reconnus pour l'installation, l'entretien et la réparation des systèmes Vaillant en Belgique." },
            { q: 'Combien coûte une réparation de chaudière Vaillant à Bruxelles ?', a: "Le coût final dépend du défaut spécifique et des pièces Vaillant nécessaires. Nous faisons toujours un diagnostic sur place et nous fournissons un devis clair. Pas de frais supplémentaires surprises. Écrivez à contact@villant-loodgieter.be pour une estimation." },
            { q: 'À quelle vitesse pouvez-vous intervenir en cas d\'urgence ?', a: "Nous visons l'intervention la plus rapide possible pour les pannes totales de chauffage et de l'eau. Mentionnez « URGENCE » dans l'en-tête de votre e-mail pour que votre demande soit priorisée." },
            { q: 'Quels appareils Vaillant réparez-vous ?', a: "Nous réparons et entretenons tous les modèles Vaillant, en incluant les chaudières murales à gaz (série ecoTEC, turboTEC), ainsi que les différentes solutions thermodynamiques et les pompes à chaleur de la marque." },
            { q: 'Proposez-vous un contrat d\'entretien pour les installations Vaillant ?', a: "Oui, un contrat d'entretien de chauffage Vaillant complet incluant la révision annuelle, le nettoyage et la vérification des réglages. L'entretien obligatoire augmente la durabilité et optimise le fonctionnement de votre appareil." },
            { q: 'Quelles communes sont couvertes par Villant Plombier à Bruxelles ?', a: "Toute la Région de Bruxelles-Capitale. De Anderlecht, Ixelles, Schaerbeek à Uccle en passant par Woluwe ou Saint-Gilles." },
          ].map((faq, i) => (
            <details key={i} className="faq-item">
              <summary>{faq.q}</summary>
              <div className="faq-answer">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* ── BLOG CAROUSEL ──────────────────────────────────── */}
      <section>
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green">Blog & Conseils</span>
            <h2>Dernières actualités de Villant Plombier</h2>
            <div className="divider" />
            <p>Découvrez nos conseils d&apos;experts pour l&apos;entretien et l&apos;optimisation de votre chaudière Vaillant.</p>
          </div>

          <div className="grid-3-strict">
            {posts.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={blogStyles.blogCard}>
                <div className={blogStyles.cardImage}>
                  <NextImage src={post.image} alt={post.languages.fr.title} fill className="object-cover" />
                </div>
                <div className={blogStyles.cardContent}>
                  <div className={blogStyles.cardDate}>
                    {new Date(post.languages.fr.date).toLocaleDateString('fr-BE', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h3 className={blogStyles.cardTitle}>{post.languages.fr.title}</h3>
                  <p className={blogStyles.cardExcerpt}>{post.languages.fr.excerpt}</p>
                  <span className={blogStyles.cardLink}>Lire la suite →</span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/blog" className="btn btn-outline" style={{ display: 'none' }}>Voir tous les articles</Link>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ───────────────────────────────────────── */}
      <section className="cta-band">
        <div className="container">
          <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', marginBottom: '20px' }}>
            Fiers de travailler à Bruxelles et environs
          </span>
          <h2>Prêt à réparer ou optimiser votre installation Vaillant ?</h2>
          <p>Contactez dès aujourd'hui votre partenaire certifié Vaillant à Bruxelles. Nous analysons votre demande rapidement.</p>
          <div className="cta-actions">
            <a href="mailto:contact@villant-loodgieter.be" className="btn btn-ghost-dark" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={18} /> contact@villant-loodgieter.be
            </a>
            <Link href="/diensten" className="btn btn-ghost-dark">
              Voir nos services
            </Link>
          </div>
          <p style={{ marginTop: '24px', fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.55)', maxWidth: 'none' }}>
            Partenaire certifié Vaillant · Techniciens qualifiés · Tout Bruxelles
          </p>
        </div>
      </section>
    </>
  );
}
