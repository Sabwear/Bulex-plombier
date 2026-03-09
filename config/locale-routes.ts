export type Locale = 'fr' | 'nl';

export const FR_TO_NL: Record<string, string> = {
  '/fr': '/nl',
  '/fr/services': '/nl/diensten',
  '/fr/plombier': '/nl/brussel',
  '/fr/blog': '/nl/blog',
  '/fr/a-propos': '/nl/over-ons',
  '/fr/contact': '/nl/contact',
};

export const NL_TO_FR: Record<string, string> = {
  '/nl': '/fr',
  '/nl/diensten': '/fr/services',
  '/nl/brussel': '/fr/plombier',
  '/nl/blog': '/fr/blog',
  '/nl/over-ons': '/fr/a-propos',
  '/nl/contact': '/fr/contact',
};

const HOME_BY_LOCALE: Record<Locale, string> = {
  fr: '/fr',
  nl: '/nl',
};

const NO_DYNAMIC_EQUIVALENT = new Set([
  '/fr/plombier',
  '/nl/brussel',
]);

/**
 * Resolve the equivalent path in the requested locale.
 * Falls back to locale home if no mapping is found.
 */
export function getAlternateLocalePath(pathname: string, targetLocale: Locale): string {
  const map = targetLocale === 'nl' ? FR_TO_NL : NL_TO_FR;

  if (map[pathname]) {
    return map[pathname];
  }

  const keys = Object.keys(map).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    if (key === '/fr' || key === '/nl') continue;
    if (NO_DYNAMIC_EQUIVALENT.has(key)) continue;
    if (pathname.startsWith(`${key}/`)) {
      const rest = pathname.slice(key.length);
      return `${map[key]}${rest}`;
    }
  }

  return HOME_BY_LOCALE[targetLocale];
}

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname.startsWith('/nl') ? 'nl' : 'fr';
}

