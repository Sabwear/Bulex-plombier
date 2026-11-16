import {getBulexOrigin} from '@/config/bulex/request-origin';
import {isBulex} from '@/config/bulex/brand';
export const dynamic='force-dynamic';
export async function GET(){
 const origin=await getBulexOrigin();
 if(!isBulex)return new Response('Not found',{status:404});
 return new Response(`# Bulex Plombier

> Authorized Bulex partner for heating and plumbing services in Belgium.

Dutch pages use unprefixed URLs. English pages use /en. Contact the team to confirm availability; an enquiry does not confirm an appointment.

## Dutch

- [Home](${origin}/): Heating and plumbing services.
- [Diensten](${origin}/diensten): Repair, maintenance and installation.
- [Werkgebied](${origin}/loodgieter): Published service areas.
- [Blog en advies](${origin}/blog): Practical heating and hot-water guidance.
- [Contact](${origin}/contact): Service enquiries.

## English

- [Home](${origin}/en): Heating and plumbing services.
- [Services](${origin}/en/services): Repair, maintenance and installation.
- [Service areas](${origin}/en/service-areas): Published service areas.
- [Advice](${origin}/en/advice): Practical heating and hot-water guidance.
- [Contact](${origin}/en/contact): Service enquiries.

## Website information

- [Sitemap](${origin}/sitemap.xml): Published canonical pages and language alternatives.
- [Legal information](${origin}/en/legal): Website operator information.
- [Privacy policy](${origin}/en/privacy): How enquiry data is handled.
`,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
}
