import {adviceAlternate} from './advice';
export type BulexLocale = 'nl' | 'en';
export const pageSegments = {
  home: ['', ''], services: ['diensten', 'services'], solutions: ['oplossingen', 'solutions'],
  areas: ['loodgieter', 'service-areas'], about: ['over-ons', 'about'], contact: ['contact', 'contact'],
  booking: ['demande-offerte', 'book-a-technician'], blog: ['blog', 'advice'], faq: ['faq', 'faq'],
  credentials: ['certificeringen', 'credentials'], privacy: ['privacy', 'privacy'], cookies: ['cookies', 'cookies'],
  consumer: ['consumenteninfo', 'consumer-information'], accessibility: ['toegankelijkheid', 'accessibility'],
  terms: ['gebruiksvoorwaarden', 'terms'], legal: ['juridische-vermelding', 'legal'],
} as const;
export type PageKey = keyof typeof pageSegments;
export function href(locale: BulexLocale, key: PageKey, slug?: string) {
  return `/${locale}${pageSegments[key][locale === 'nl' ? 0 : 1] ? '/' + pageSegments[key][locale === 'nl' ? 0 : 1] : ''}${slug ? '/' + slug : ''}`;
}
export function pageKey(locale: BulexLocale, segment = ''): PageKey | undefined {
  return (Object.keys(pageSegments) as PageKey[]).find(k => pageSegments[k][locale === 'nl' ? 0 : 1] === segment);
}
export const serviceSlugs = [
 ['bulex-herstelling-belgie','boiler-repair'],['bulex-onderhoudscontract','boiler-maintenance'],
 ['boiler-vervangen-belgie','boiler-installation'],['nieuwe-verwarming-belgie','heating-systems'],
 ['warm-water','water-heaters'],['spoeddienst','emergency-service'],
 ['waterlek-herstellen-belgie','water-leak-repair'],['sanitair-installatie-belgie','plumbing-installation']
] as const;
export const solutionSlugs = [['gasketels','gas-boilers'],['warmtepompen','heat-pumps'],['boilers','water-heaters']] as const;
export function equivalentSlug(slug: string, locale: BulexLocale, key?: PageKey) {
 const row = (key==='solutions'?solutionSlugs:key==='services'?serviceSlugs:[...serviceSlugs,...solutionSlugs]).find(r=>r.some(s=>s===slug));
 return row ? row[locale === 'nl' ? 0 : 1] : slug;
}
export function alternatePath(path: string, locale: BulexLocale) {
 const parts=path.split('/').filter(Boolean); const from=parts[0]==='en'?'en':'nl';
 const key=pageKey(from,parts[1]); return key ? href(locale,key,parts[2] ? (key==='blog'?adviceAlternate(parts[2],locale):equivalentSlug(parts[2],locale,key)):undefined):href(locale,'home');
}
