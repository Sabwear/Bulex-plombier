'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { usePathname } from 'next/navigation';
import { Mail, MapPin, MessageCircle, CheckCircle2 } from 'lucide-react';
import LanguageSwitcher from '@/components/header/LanguageSwitcher';

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
              alt="vaillant Plombier"
              className={styles.logoImage}
            />
          </div>
          <p className={styles.tagline}>
            {isNl ? "Gecertificeerd Vaillant partner in België. Gekwalificeerde technici voor al uw loodgieterij en verwarming." : "Partenaire certifié Vaillant en Belgique. Des techniciens qualifiés pour tous vos besoins en plomberie et chauffage."}
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

          <div style={{ marginTop: 'var(--space-6)' }}>
            <Suspense fallback={null}>
              <LanguageSwitcher theme="light" />
            </Suspense>
          </div>
        </div>

        {/* Services column */}
        <div className={styles.col}>
          <div className={styles.colTitle}>{isNl ? "Diensten" : "Services"}</div>
          <ul className={styles.linkList}>
            <li>
              <Link href={isNl ? "/nl/diensten" : "/fr/services"}>
                {isNl ? "Alle diensten" : "Tous les services"}
              </Link>
            </li>
            <li>
              <Link
                href={
                  isNl
                    ? "/nl/diensten#vaillant-herstelling"
                    : "/fr/services#vaillant-herstelling"
                }
              >
                {isNl ? "Vaillant herstelling" : "Réparation Vaillant"}
              </Link>
            </li>
            <li>
              <Link
                href={
                  isNl
                    ? "/nl/diensten#boiler-vervangen"
                    : "/fr/services#boiler-vervangen"
                }
              >
                {isNl ? "Boiler vervangen" : "Remplacement de chaudière"}
              </Link>
            </li>
            <li>
              <Link
                href={
                  isNl ? "/nl/diensten#waterlek" : "/fr/services#waterlek"
                }
              >
                {isNl ? "Waterlek herstellen" : "Réparation de fuite d'eau"}
              </Link>
            </li>
            <li>
              <Link
                href={
                  isNl ? "/nl/diensten#sanitair" : "/fr/services#sanitair"
                }
              >
                {isNl ? "Sanitair installatie" : "Installation sanitaire"}
              </Link>
            </li>
            <li>
              <Link
                href={
                  isNl ? "/nl/diensten#onderhoud" : "/fr/services#onderhoud"
                }
              >
                {isNl ? "Onderhoudscontract" : "Contrat d'entretien"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Privacy / Legal column */}
        <div className={styles.col}>
          <div className={styles.colTitle}>
            {isNl ? "Privacy" : "Confidentialité"}
          </div>
          <ul className={styles.linkList}>
            <li>
              <Link href={isNl ? "/nl/privacy" : "/fr/confidentialite"}>
                {isNl ? "Privacybeleid" : "Politique de confidentialité"}
              </Link>
            </li>
            <li>
              <Link href={isNl ? "/nl/cookies" : "/fr/cookies"}>
                {isNl ? "Cookiebeleid" : "Politique de cookies"}
              </Link>
            </li>
            <li>
              <Link
                href={
                  isNl ? "/nl/juridische-vermelding" : "/fr/mentions-legales"
                }
              >
                {isNl ? "Juridische vermelding" : "Mentions légales"}
              </Link>
            </li>
            <li>
              <Link
                href={
                  isNl ? "/nl/gebruiksvoorwaarden" : "/fr/conditions-utilisation"
                }
              >
                {isNl ? "Gebruiksvoorwaarden" : "Conditions d’utilisation"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Nav column */}
        <div className={styles.col}>
          <div className={styles.colTitle}>{isNl ? "Navigatie" : "Navigation"}</div>
          <ul className={styles.linkList}>
            <li>
              <Link href={isNl ? "/nl" : "/fr"}>
                {isNl ? "Startpagina" : "Accueil"}
              </Link>
            </li>
            <li>
              <Link href={isNl ? "/nl/over-ons" : "/fr/a-propos"}>
                {isNl ? "Over ons" : "À propos"}
              </Link>
            </li>
            <li>
              <Link href={isNl ? "/nl/brussel" : "/fr/brussel"}>
                {isNl ? "Regio Brussel" : "Région de Bruxelles"}
              </Link>
            </li>
            <li>
              <Link href={isNl ? "/nl/contact" : "/fr/contact"}>
                {isNl ? "Contact" : "Contact"}
              </Link>
            </li>
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
                <a href="mailto:contact@vaillant-loodgieter.com" className={styles.contactValue}>
                  contact@vaillant-loodgieter.com
                </a>
              </div>
            </li>
            <li className={styles.contactItem}>
              <div className={styles.contactIcon}><MessageCircle size={18} /></div>
              <div className={styles.contactText}>
                <span className={styles.contactLabel}>WhatsApp</span>
                <a
                  href="https://wa.me/3223456789"
                  className={styles.contactValue}
                >
                  +32 2 345 67 89
                </a>
              </div>
            </li>
          </ul>
          <a href="mailto:contact@vaillant-loodgieter.com" className="btn btn-primary btn-sm">
            {isNl ? "Stuur een bericht" : "Envoyer un message"}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} vaillant Loodgieter.{" "}
            {isNl ? "Alle rechten voorbehouden." : "Tous droits réservés."}{" "}
            <Link href={isNl ? "/nl/juridische-vermelding" : "/fr/mentions-legales"}>
              {isNl ? "Juridische vermelding" : "Mentions légales"}
            </Link>
          </p>
          <span className={styles.serving}>
            {isNl ? "Trots werkzaam in België — uw gecertificeerde Vaillant loodgieter." : "Fier d'opérer en Belgique — votre plombier Vaillant certifié."}
          </span>
        </div>
      </div>
    </footer>
  );
}
