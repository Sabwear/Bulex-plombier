"""Crawl sitemap URLs and save reproducible rendered HTML SEO evidence."""
import argparse, concurrent.futures, json, urllib.request, xml.etree.ElementTree as ET
from html.parser import HTMLParser
from collections import Counter
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.title=''; self.in_title=False; self.h1=0; self.meta={}; self.canonical=[]; self.links=[]; self.missing_alt=0; self.schemas=[]; self.script=False; self.schema=''
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='title': self.in_title=True
        if tag=='h1': self.h1+=1
        if tag=='meta': self.meta[a.get('name',a.get('property',''))]=a.get('content','')
        if tag=='link' and a.get('rel')=='canonical': self.canonical.append(a.get('href'))
        if tag=='a': self.links.append(a.get('href',''))
        if tag=='img' and 'alt' not in a: self.missing_alt+=1
        if tag=='script' and a.get('type')=='application/ld+json': self.script=True; self.schema=''
    def handle_data(self,data):
        if self.in_title: self.title+=data
        if self.script: self.schema+=data
    def handle_endtag(self,tag):
        if tag=='title': self.in_title=False
        if tag=='script' and self.script:
            try: self.schemas.append(json.loads(self.schema))
            except ValueError: self.schemas.append({'error':'invalid JSON'})
            self.script=False

def fetch(url):
    with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Bulex-SEO-Audit/1.0'}),timeout=30) as r: return r.status,r.url,r.read().decode()
def main():
    p=argparse.ArgumentParser(); p.add_argument('origin'); p.add_argument('--output',required=True); p.add_argument('--source-origin'); a=p.parse_args()
    _,_,xml=fetch(a.origin+'/sitemap.xml'); root=ET.fromstring(xml); ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
    urls=[n.text for n in root.findall('s:url/s:loc',ns)]
    def inspect(url):
        target=url.replace(a.source_origin,a.origin,1) if a.source_origin else url
        try:
            status,final,html=fetch(target); page=Page(); page.feed(html)
            return dict(url=url,status=status,redirect=final!=target,title=page.title,description=page.meta.get('description'),h1=page.h1,canonical=page.canonical,robots=page.meta.get('robots'),missing_alt=page.missing_alt,schemas=page.schemas,links=page.links)
        except Exception as e: return dict(url=url,error=str(e))
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool: pages=list(pool.map(inspect,urls))
    titles=Counter(p.get('title') for p in pages); descriptions=Counter(p.get('description') for p in pages)
    summary=dict(urls=len(urls),unique_urls=len(set(urls)),errors=sum('error' in p for p in pages),redirects=sum(p.get('redirect',False) for p in pages),bad_h1=sum(p.get('h1')!=1 for p in pages),missing_description=sum(not p.get('description') for p in pages),bad_canonical=[p['url'] for p in pages if [u.rstrip('/') for u in p.get('canonical',[])]!=[p['url'].rstrip('/')]],noindex=[p['url'] for p in pages if 'noindex' in (p.get('robots') or '')],duplicate_titles={k:v for k,v in titles.items() if v>1},duplicate_descriptions={k:v for k,v in descriptions.items() if v>1},missing_alt=sum(p.get('missing_alt',0) for p in pages))
    with open(a.output,'w') as f: json.dump(dict(summary=summary,pages=pages),f,indent=2)
    print(json.dumps(summary,indent=2))
if __name__=='__main__': main()
