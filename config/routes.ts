/**
 * Route mapping entre les deux langues du site.
 *
 * Utilisé par le sélecteur de langue pour trouver l'équivalent
 * de la page courante dans l'autre langue.
 *
 * Convention :
 *   - Les routes FR commencent par /fr
 *   - Les routes NL commencent par /nl
 */

/** Convertit un chemin FR en son équivalent NL */
export const FR_TO_NL: Record<string, string> = {
  '/fr':              '/nl',
  '/fr/services':     '/nl/diensten',
  '/fr/a-propos':     '/nl/over-ons',
  '/fr/contact':      '/nl/contact',
  '/fr/blog':         '/nl/blog',
  '/fr/brussel':      '/nl/brussel',
  '/fr/plombier':     '/nl/loodgieter',
};

/** Convertit un chemin NL en son équivalent FR */
export const NL_TO_FR: Record<string, string> = {
  '/nl':              '/fr',
  '/nl/diensten':     '/fr/services',
  '/nl/over-ons':     '/fr/a-propos',
  '/nl/contact':      '/fr/contact',
  '/nl/blog':         '/fr/blog',
  '/nl/brussel':      '/fr/brussel',
  '/nl/loodgieter':   '/fr/plombier',
};

/**
 * Retourne le chemin équivalent dans l'autre langue.
 * - path   : chemin courant (ex. "/fr/contact" ou "/nl/contact")
 * - target : langue cible ('fr' | 'nl')
 *
 * Stratégie :
 *  1. Cherche une correspondance exacte dans la table.
 *  2. Cherche une correspondance par préfixe (pour les sous-pages comme /fr/blog/mon-article).
 *  3. Fallback : homepage de la langue cible.
 */
export function getAlternateRoute(path: string, target: 'fr' | 'nl'): string {
  const map = target === 'nl' ? FR_TO_NL : NL_TO_FR;

  // 1. Correspondance exacte
  if (map[path]) return map[path];

  // 2. Correspondance par préfixe pour les sous-pages
  const sortedKeys = Object.keys(map).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (key !== '/fr' && key !== '/nl' && path.startsWith(key + '/')) {
      const rest = path.slice(key.length); // ex. "/mon-article"
      return map[key] + rest;
    }
  }

  // 3. Fallback
  return target === 'nl' ? '/nl' : '/fr';
}
