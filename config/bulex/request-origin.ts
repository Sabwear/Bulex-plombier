import {headers} from 'next/headers';
import {resolvePublicOrigin} from './origin';
export async function getBulexOrigin(){return resolvePublicOrigin(await headers(),process.env.BULEX_SITE_URL);}
