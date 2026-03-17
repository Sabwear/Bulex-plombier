import type { Locale } from './locale-routes';

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

type LocaleNavigation = {
  topBar: {
    urgencyText: string;
    interventionLabel: string;
    interventionHref: string;
  };
  navItems: NavItem[];
  cta: {
    label: string;
    href: string;
  };
};

const phoneDisplay = process.env.NEXT_PUBLIC_PHONE_DISPLAY || '02 345 67 89';
const phoneDigits = phoneDisplay.replace(/\D/g, '');
const phoneHref =
  phoneDigits.length > 0 ? `tel:+${phoneDigits.padStart(11, '32')}` : 'tel:+3223456789';

export const SITE_PHONE = {
  display: phoneDisplay,
  href: phoneHref,
};

export const SITE_NAVIGATION: Record<Locale, LocaleNavigation> = {
  fr: {
    topBar: {
      urgencyText: 'Urgence plomberie & chauffage en Belgique',
      interventionLabel: 'Planifier une intervention',
      interventionHref: '/fr/demande-devis',
    },
    navItems: [
      { label: 'Accueil', href: '/fr' },
      { label: 'Services', href: '/fr/services' },
      {
        label: 'Vaillant Plombier Belgique',
        href: '/fr/plombier',
        children: [
          { label: 'Toutes les zones desservies', href: '/fr/plombier' },
          { label: 'Région Bruxelles', href: '/fr/brussel' },
          { label: 'Nos services', href: '/fr/services' },
          { label: 'Contact urgence', href: '/fr/contact' },
        ],
      },
      { label: 'Blogs', href: '/fr/blog' },
      { label: 'À propos', href: '/fr/a-propos' },
      { label: 'Contact', href: '/fr/contact' },
    ],
    cta: {
      label: 'Contactez-nous',
      href: '/fr/contact',
    },
  },
  nl: {
    topBar: {
      urgencyText: 'Spoed loodgieterij & verwarming in België',
      interventionLabel: 'Plan een interventie',
      interventionHref: '/nl/demande-offerte',
    },
    navItems: [
      { label: 'Home', href: '/nl' },
      { label: 'Diensten', href: '/nl/diensten' },
      {
        label: 'Vaillant Loodgieter België',
        href: '/nl/loodgieter',
        children: [
          { label: 'Alle bediende zones', href: '/nl/loodgieter' },
          { label: 'Regio Brussel', href: '/nl/brussel' },
          { label: 'Onze diensten', href: '/nl/diensten' },
          { label: 'Spoed contact', href: '/nl/contact' },
        ],
      },
      { label: 'Blogs', href: '/nl/blog' },
      { label: 'Over ons', href: '/nl/over-ons' },
      { label: 'Contact', href: '/nl/contact' },
    ],
    cta: {
      label: 'Neem contact op',
      href: '/nl/contact',
    },
  },
};

