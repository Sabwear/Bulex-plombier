import {getCityBySlug} from '@/data/city-data';

/** All existing published service areas are eligible for indexing at the owner's request. */
export function isIndexableArea(slug: string): boolean {
  return Boolean(getCityBySlug('nl', slug));
}
