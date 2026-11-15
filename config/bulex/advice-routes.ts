import rows from './advice-slugs.json';
import type {BulexLocale} from './routes';
// Slugs only: client navigation must not bundle unpublished article bodies.
export function adviceAlternate(slug:string,locale:BulexLocale){return rows.find(row=>row.includes(slug))?.[locale==='nl'?1:2]}
