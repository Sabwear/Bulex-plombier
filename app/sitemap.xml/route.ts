import sitemap from '@/config/bulex/sitemap';
import {sitemapXml} from '@/lib/sitemap-xml';
export const dynamic='force-dynamic';
export async function GET() {
  return new Response(sitemapXml(await sitemap()), {
    headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'},
  });
}
