import {getBulexOrigin} from '@/config/bulex/request-origin';
import {isBulex} from '@/config/bulex/brand';
export const dynamic='force-dynamic';
export async function GET(){const bulexOrigin=await getBulexOrigin();if(!isBulex)return new Response('Not found',{status:404});return new Response(`# Bulex Plombier\n\nAuthorized Bulex partner for heating and plumbing services in Belgium.\n\nLanguages: Dutch (default, no URL prefix), English (/en).\n\n- ${bulexOrigin}/\n- ${bulexOrigin}/en\n- ${bulexOrigin}/diensten\n- ${bulexOrigin}/en/services\n\nContact the team to confirm service availability.\n`,{headers:{'Content-Type':'text/plain; charset=utf-8'}})}
