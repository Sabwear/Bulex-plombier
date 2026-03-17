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
  },
};

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

  const mappedRest = rest.map((segment) => {
    const map = SEGMENT_MAP[fromLocale];
    return map[segment] ?? segment;
  });

  return `/${toLocale}${mappedRest.length ? `/${mappedRest.join('/')}` : ''}`;
}

