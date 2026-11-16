import {getCityBySlug} from '@/data/city-data';
import translations from './geo-en.json';

/** Keep both translations out of search until each has useful local detail. */
export function isIndexableArea(slug: string): boolean {
  const city = getCityBySlug('nl', slug);
  const key = slug === 'brussel' ? 'bruxelles-ville' : slug;
  const english = (translations as Record<string, {profile: string}>)[key];
  return Boolean(city?.building_profile && english?.profile);
}
