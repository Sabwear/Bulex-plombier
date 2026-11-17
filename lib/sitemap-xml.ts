import type {MetadataRoute} from 'next';
export function escapeXml(value: string): string {
  return value.replace(/[<>&"']/g, char => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[char]!));
}
export function sitemapXml(entries: MetadataRoute.Sitemap): string {
  const rows = entries.map(entry => {
    const languages = Object.entries(entry.alternates?.languages || {}).map(([language, url]) =>
      `    <xhtml:link rel="alternate" hreflang="${escapeXml(language)}" href="${escapeXml(String(url))}" />`);
    const date = entry.lastModified instanceof Date ? entry.lastModified.toISOString() : entry.lastModified;
    return ['  <url>', `    <loc>${escapeXml(entry.url)}</loc>`, ...languages,
      ...(date ? [`    <lastmod>${escapeXml(date)}</lastmod>`] : []), '  </url>'].join('\n');
  });
  return ['<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...rows, '</urlset>', ''].join('\n');
}
