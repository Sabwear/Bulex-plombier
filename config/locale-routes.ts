export type Locale = 'fr' | 'nl';

export const SUPPORTED_LOCALES: Locale[] = ['fr', 'nl'];

/**
 * Segment-level mapping between locales.
 *
 * This is intentionally defined at the segment level (not full paths)
 * so it works for all current and future routes that reuse these slugs,
 * including dynamic routes like /fr/services/[slug] -> /nl/diensten/[slug].
 */
const SEGMENT_MAP: Record<Locale, Record<string, string>> = {
  fr: {
    services: 'diensten',
    'a-propos': 'over-ons',
    plombier: 'loodgieter',
    brussel: 'brussel',
    blog: 'blog',
    contact: 'contact',
    confidentialite: 'privacy',
    cookies: 'cookies',
    'conditions-utilisation': 'gebruiksvoorwaarden',
    'demande-devis': 'demande-offerte',
    certifications: 'certificeringen',
    'mentions-legales': 'juridische-vermelding',
  },
  nl: {
    diensten: 'services',
    'over-ons': 'a-propos',
    loodgieter: 'plombier',
    brussel: 'brussel',
    blog: 'blog',
    contact: 'contact',
    privacy: 'confidentialite',
    cookies: 'cookies',
    gebruiksvoorwaarden: 'conditions-utilisation',
    'demande-offerte': 'demande-devis',
    certificeringen: 'certifications',
    'juridische-vermelding': 'mentions-legales',
  },
};

/**
 * Dynamic-segment slugs that differ between locales (FR -> NL).
 * Keep in sync with data/city-data.ts (cities) and data/fr-services.ts / data/nl-services.ts.
 */
const CITY_SLUGS_FR_TO_NL: Record<string, string> = {
  'bruxelles-ville': 'brussel',
  anvers: 'antwerpen',
  gand: 'gent',
  liege: 'luik',
  louvain: 'leuven',
  bruges: 'brugge',
  namur: 'namen',
  mons: 'bergen',
  malines: 'mechelen',
  courtrai: 'kortrijk',
  ostende: 'oostende',
  tournai: 'doornik',
  mouscron: 'moeskroen',
  roulers: 'roeselare',
  alost: 'aalst',
  termonde: 'dendermonde',
  'saint-nicolas': 'sint-niklaas',
  ypres: 'ieper',
};

const SERVICE_SLUGS_FR_TO_NL: Record<string, string> = {
  'reparation-vaillant-bruxelles': 'vaillant-herstelling-belgie',
  'remplacement-chaudiere-bruxelles': 'boiler-vervangen-belgie',
  'nouveau-chauffage-bruxelles': 'nieuwe-verwarming-belgie',
  'reparation-fuite-eau-bruxelles': 'waterlek-herstellen-belgie',
  'installation-sanitaire-bruxelles': 'sanitair-installatie-belgie',
  'contrat-entretien-vaillant': 'vaillant-onderhoudscontract',
};

const invert = (m: Record<string, string>) =>
  Object.fromEntries(Object.entries(m).map(([k, v]) => [v, k]));

const SLUG_MAPS: Record<Locale, Record<string, Record<string, string>>> = {
  fr: { plombier: CITY_SLUGS_FR_TO_NL, services: SERVICE_SLUGS_FR_TO_NL },
  nl: {
    loodgieter: invert(CITY_SLUGS_FR_TO_NL),
    diensten: invert(SERVICE_SLUGS_FR_TO_NL),
  },
};

export const SERVICE_SLUG_FR_TO_NL = SERVICE_SLUGS_FR_TO_NL;

export function getLocaleFromPathname(pathname: string): Locale {
  if (pathname.startsWith('/nl/')) return 'nl';
  if (pathname === '/nl') return 'nl';
  return 'fr';
}

export function getAlternateLocalePath(pathname: string, targetLocale: Locale): string {
  if (!pathname || pathname === '/') {
    return `/${targetLocale}`;
  }

  const currentLocale = getLocaleFromPathname(pathname);

  if (currentLocale === targetLocale) {
    return pathname;
  }

  const fromLocale = currentLocale;
  const toLocale = targetLocale;

  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return `/${toLocale}`;
  }

  const [, ...rest] = segments;

  const slugMap = SLUG_MAPS[fromLocale][rest[0]] ?? {};

  const mappedRest = rest.map((segment, index) => {
    const map = SEGMENT_MAP[fromLocale];
    if (index === 0) return map[segment] ?? segment;
    if (index === 1) return slugMap[segment] ?? map[segment] ?? segment;
    return map[segment] ?? segment;
  });

  return `/${toLocale}${mappedRest.length ? `/${mappedRest.join('/')}` : ''}`;
}

