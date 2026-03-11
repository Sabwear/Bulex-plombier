'use client';

import Link from 'next/link';
import styles from './Footer.module.css';
import { usePathname } from 'next/navigation';
import { Mail, MapPin, Globe, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname() || '/';
  const isNl = pathname.startsWith('/nl');

  return (
    <footer className={styles.footer}>
      <div className={styles.main}>

        {/* Brand column */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img
              src="/logo-vaillant-loodgieter.png"
              alt="Villant Plombier"
              className={styles.logoImage}
            />
          </div>
          <p className={styles.tagline}>
            {isNl ? "Gecertificeerd Vaillant partner in Brussel. Gekwalificeerde technici voor al uw loodgieterij en verwarming." : "Partenaire certifié Vaillant à Bruxelles. Des techniciens qualifiés pour tous vos besoins en plomberie et chauffage."}
          </p>
          <div className={styles.trust}>
            <span className={styles.trustBadge}>
              <CheckCircle2 size={14} style={{ marginRight: '6px', color: 'var(--color-primary)' }} />
              {isNl ? "Gecertificeerd Vaillant Partner" : "Partenaire Certifié Vaillant"}
            </span>
            <span className={styles.trustBadge}>
              <CheckCircle2 size={14} style={{ marginRight: '6px', color: 'var(--color-primary)' }} />
              {isNl ? "Gekwalificeerde Technici" : "Techniciens Qualifiés"}
            </span>
          </div>
        </div>

        {/* Services column */}
        <div className={styles.col}>
          <div className={styles.colTitle}>{isNl ? "Diensten" : "Services"}</div>
          <ul className={styles.linkList}>
            <li><Link href={isNl ? "/nl/diensten" : "/fr/services"}>{isNl ? "Alle diensten" : "Tous les services"}</Link></li>
            <li><Link href={isNl ? "/nl/diensten#vaillant-herstelling" : "/fr/services#vaillant-herstelling"}>{isNl ? "Vaillant herstelling" : "Réparation Vaillant"}</Link></li>
            <li><Link href={isNl ? "/nl/diensten#boiler-vervangen" : "/fr/services#boiler-vervangen"}>{isNl ? "Boiler vervangen" : "Remplacement de chaudière"}</Link></li>
            <li><Link href={isNl ? "/nl/diensten#waterlek" : "/fr/services#waterlek"}>{isNl ? "Waterlek herstellen" : "Réparation de fuite d'eau"}</Link></li>
            <li><Link href={isNl ? "/nl/diensten#sanitair" : "/fr/services#sanitair"}>{isNl ? "Sanitair installatie" : "Installation sanitaire"}</Link></li>
            <li><Link href={isNl ? "/nl/diensten#onderhoud" : "/fr/services#onderhoud"}>{isNl ? "Onderhoudscontract" : "Contrat d'entretien"}</Link></li>
          </ul>
        </div>

        {/* Nav column */}
        <div className={styles.col}>
          <div className={styles.colTitle}>{isNl ? "Navigatie" : "Navigation"}</div>
          <ul className={styles.linkList}>
            <li><Link href={isNl ? "/nl" : "/fr"}>{isNl ? "Startpagina" : "Accueil"}</Link></li>
            <li><Link href={isNl ? "/nl/over-ons" : "/fr/a-propos"}>{isNl ? "Over ons" : "À propos"}</Link></li>
            <li><Link href={isNl ? "/nl/brussel" : "/fr/brussel"}>{isNl ? "Regio Brussel" : "Région de Bruxelles"}</Link></li>
            <li><Link href={isNl ? "/nl/contact" : "/fr/contact"}>{isNl ? "Contact" : "Contact"}</Link></li>
          </ul>
        </div>

        {/* Contact column */}
        <div className={styles.col}>
          <div className={styles.colTitle}>Contact</div>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <div className={styles.contactIcon}><Mail size={18} /></div>
              <div className={styles.contactText}>
                <span className={styles.contactLabel}>{isNl ? "E-mail" : "E-mail"}</span>
                <a href="mailto:contact@villant-loodgieter.be" className={styles.contactValue}>
                  contact@villant-loodgieter.be
                </a>
              </div>
            </li>
            <li className={styles.contactItem}>
              <div className={styles.contactIcon}><MapPin size={18} /></div>
              <div className={styles.contactText}>
                <span className={styles.contactLabel}>{isNl ? "Regio" : "Région"}</span>
                <span className={styles.contactValue}>{isNl ? "Brussel, België" : "Bruxelles, Belgique"}</span>
              </div>
            </li>
            <li className={styles.contactItem}>
              <div className={styles.contactIcon}><Globe size={18} /></div>
              <div className={styles.contactText}>
                <span className={styles.contactLabel}>{isNl ? "Website" : "Site web"}</span>
                <a href="https://villant-loodgieter.be" className={styles.contactValue}>
                  villant-loodgieter.be
                </a>
              </div>
            </li>
          </ul>
          <a href="mailto:contact@villant-loodgieter.be" className="btn btn-primary btn-sm">
            {isNl ? "Stuur een bericht" : "Envoyer un message"}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Villant Loodgieter. {isNl ? "Alle rechten voorbehouden." : "Tous droits réservés."}{' '}
            <Link href={isNl ? "/nl/contact" : "/fr/contact"}>Contact</Link> · <Link href={isNl ? "/nl/over-ons" : "/fr/a-propos"}>{isNl ? "Over ons" : "À propos"}</Link>
          </p>
          <span className={styles.serving}>
            {isNl ? "Trots werkzaam in Brussel en omstreken — uw gecertificeerde Vaillant loodgieter." : "Fier d'opérer à Bruxelles et environs — votre plombier Vaillant certifié."}
          </span>
        </div>
      </div>
    </footer>
  );
}
