const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const Module = require('node:module');
// A test-local TS loader avoids adding a package or altering the application's runtime.
const resolve = Module._resolveFilename;
Module._resolveFilename = function (id,...args) {return resolve.call(this,id.startsWith('@/')?path.join(process.cwd(),id.slice(2)):id,...args)};
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true,jsx:ts.JsxEmit.ReactJSX}}).outputText,filename);
require.extensions['.tsx']=require.extensions['.ts'];
require.extensions['.css']=()=>{};
const {NextRequest}=require('next/server');
let seoRequestHeaders=new Headers({host:'localhost:3001'});
require('next/headers').headers=async()=>seoRequestHeaders;
const {bulexMiddleware}=require('../config/bulex/middleware.ts');
const {href,alternatePath,parsePublicPath}=require('../config/bulex/routes.ts');
const {getServices,getSolutions}=require('../config/bulex/content.ts');
const {getAdvice,adviceAlternate}=require('../config/bulex/advice.ts');
const {getCities}=require('../data/city-data.ts');
const {validateBulexRequest,bulexConfirmation}=require('../lib/mail/bulex-request.ts');
function request(p,cookie){return new NextRequest('http://localhost:3001'+p,{headers:cookie?{cookie}:undefined})}
function destination(response){return new URL(response.headers.get('location')||response.headers.get('x-middleware-rewrite')).pathname}
test('Dutch is the unprefixed default and old Dutch links redirect permanently',()=>{
 for(const headers of [{},{'accept-language':'nl-BE'},{cookie:'BULEX_LOCALE=nl','accept-language':'en'}]){const result=bulexMiddleware(new NextRequest('http://localhost:3001/',{headers}));assert.equal(destination(result),'/bulex/nl');assert.equal(result.headers.get('x-middleware-request-x-bulex-locale'),'nl');}
 for(const [old,target] of [['/nl','/'],['/nl/contact','/contact'],['/nl/diensten/bulex-herstelling-belgie','/diensten/bulex-herstelling-belgie'],['/nl/loodgieter-antwerpen','/loodgieter/antwerpen']]){const result=bulexMiddleware(request(old));assert.equal(result.status,308);assert.equal(destination(result),target);}
 assert.equal(destination(bulexMiddleware(new NextRequest('http://localhost:3001/',{headers:{'accept-language':'en'}}))),'/en');
 assert.equal(destination(bulexMiddleware(new NextRequest('http://localhost:3001/',{headers:{'accept-language':'fr'}}))),'/bulex/nl');
 assert.equal(destination(bulexMiddleware(request('/en/services/boiler-repair'))),'/bulex/en/services/boiler-repair');
 assert.equal(new URL(bulexMiddleware(request('/nl/contact?ref=test')).headers.get('location')).search,'?ref=test');
});
test('Legacy French URLs redirect to English equivalents and preserve query strings',()=>{for(const [from,to] of [['/fr','/en'],['/fr/contact','/en/contact'],['/fr/services/reparation-vaillant-bruxelles','/en/services/boiler-repair'],['/fr/services/contrat-entretien-vaillant','/en/services/boiler-maintenance'],['/fr/plombier/anvers','/en/service-areas/antwerpen'],['/fr/brussel','/en/service-areas/brussel'],['/fr/demande-devis','/en/book-a-technician']])assert.equal(destination(bulexMiddleware(request(from))),to);assert.equal(new URL(bulexMiddleware(request('/fr/contact?ref=test')).headers.get('location')).search,'?ref=test')});
test('All service, solution and advice language links round-trip',()=>{for(const key of ['services','solutions','blog']){const getter={services:getServices,solutions:getSolutions,blog:getAdvice}[key];for(const record of getter('nl')){const dutch=href('nl',key,record.slug);const english=alternatePath(dutch,'en');assert.ok(getter('en').some(s=>href('en',key,s.slug)===english),english);assert.equal(alternatePath(english,'nl'),dutch)}}});
test('Legacy advice URLs redirect to English or Dutch articles',()=>{for(const a of getAdvice('nl')){assert.equal(destination(bulexMiddleware(request(`/fr/blog/${a.legacy}`))),href('en','blog',adviceAlternate(a.legacy,'en')));assert.equal(destination(bulexMiddleware(request(`/nl/blog/${a.legacy}`))),href('nl','blog',a.slug))}});
test('All existing city slugs retain EN/NL identity',()=>{for(const city of getCities('nl'))assert.equal(alternatePath(href('nl','areas',city.slug),'en'),href('en','areas',city.slug))});
test('Public requests rewrite while internal route is inaccessible',()=>{assert.equal(destination(bulexMiddleware(request('/en/contact'))),'/bulex/en/contact');assert.equal(bulexMiddleware(request('/bulex/en/contact')).status,404);assert.equal(bulexMiddleware(request('/api/mail')).headers.get('x-middleware-next'),'1');assert.equal(bulexMiddleware(request('/bulex/hero.webp')).headers.get('x-middleware-next'),'1')});
function validData(){const data=new FormData();Object.entries({formType:'bulex',locale:'en',nom:'Test Visitor',email:'visitor@example.test',telephone:'+32000000000',adresse:'Test address',service:'Boiler repair',message:'Test enquiry for automated validation only.',consent:'true',requestType:'booking'}).forEach(([k,v])=>data.set(k,v));return data}
test('Bulex enquiries validate required data and consent on server',()=>{assert.ok('body'in validateBulexRequest(validData()));for(const key of ['nom','email','telephone','adresse','message','service','consent','locale']){const data=validData();data.set(key,'');assert.ok('error'in validateBulexRequest(data),key)}});
test('Confirmations are localized and contain only the new brand',()=>{for(const l of ['en','nl']){const mail=bulexConfirmation(l,'Test','Example');assert.match(mail.subject,/Bulex Plombier/);assert.doesNotMatch(mail.text,/Vaillant/);assert.match(mail.text,l==='en'?/not yet confirmed/:/nog niet bevestigd/)}});
// Stub only external SMTP; exercise the real route, validation, attachment handling and two mail calls.
const smtp=require('../lib/mail/smtp-config.ts');const actualGetSmtpConfig=smtp.getSmtpConfig;smtp.getSmtpConfig=()=>({mailFrom:'team@example.test',mailTo:'admin@example.test'});
const transport=require('../lib/mail/sendViaSmtp.ts');const actualSendViaSmtp=transport.sendViaSmtp;const sent=[];transport.sendViaSmtp=async(_,mail)=>{sent.push(mail)};
const {POST}=require('../app/api/mail/route.ts');
const {resetMailLimits}=require('../lib/mail/protection.ts');test.beforeEach(()=>resetMailLimits());
test('Real mail route sends enquiry and localized confirmation through existing transport',async()=>{sent.length=0;const data=validData();data.append('attachments',new File([Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aZusAAAAASUVORK5CYII=','base64')],'photo.png',{type:'image/png'}));const result=await POST(new Request('http://localhost/api/mail',{method:'POST',body:data}));assert.equal(result.status,200);assert.equal(sent.length,2);assert.match(sent[0].subject,/Bulex Booking EN/);assert.equal(sent[0].attachments.length,1);assert.equal(sent[1].to,'visitor@example.test');assert.match(sent[1].text,/Your appointment is not yet confirmed/)});
test('Contact and booking confirmations go to the submitted requester in both languages',async()=>{
 for(const locale of ['en','nl'])for(const requestType of ['contact','booking']){
  resetMailLimits();sent.length=0;const data=validData();data.set('locale',locale);data.set('requestType',requestType);data.set('email',`${locale}-${requestType}@example.test`);
  const response=await POST(new Request('http://localhost/api/mail',{method:'POST',body:data}));
  assert.equal(response.status,200);assert.equal((await response.json()).confirmationSent,true);assert.equal(sent.length,2);
  assert.equal(sent[1].to,`${locale}-${requestType}@example.test`);assert.equal(sent[1].replyTo,'team@example.test');
  assert.match(sent[1].text,/Test enquiry for automated validation only/);assert.match(sent[1].subject,locale==='nl'?/Uw aanvraag is ontvangen/:/Your request has been received/);
 }
});
test('An autofilled Bulex honeypot cannot claim delivery and has a traceable rejection',async()=>{
 sent.length=0;const data=validData();data.set('company_fax','Autofilled company');
 const response=await POST(new Request('http://localhost/api/mail',{method:'POST',body:data}));const result=await response.json();
 assert.equal(response.status,422);assert.equal(result.code,'FORM_VERIFICATION_FAILED');assert.ok(result.requestId);assert.notEqual(result.ok,true);assert.equal(sent.length,0);
});
test('Honeypot and invalid inputs never send email',async()=>{sent.length=0;const data=validData();data.set('website','spam');const rejected=await POST(new Request('http://localhost/api/mail',{method:'POST',body:data}));assert.equal(rejected.status,422);assert.equal((await rejected.json()).code,'FORM_VERIFICATION_FAILED');assert.equal(sent.length,0);data.set('website','');data.delete('consent');assert.equal((await POST(new Request('http://localhost/api/mail',{method:'POST',body:data}))).status,400);assert.equal(sent.length,0)});
test('Disallowed attachments are rejected before transport',async()=>{sent.length=0;const data=validData();data.append('attachments',new File(['test'],'run.exe',{type:'application/octet-stream'}));assert.equal((await POST(new Request('http://localhost/api/mail',{method:'POST',body:data}))).status,400);assert.equal(sent.length,0)});
test('Existing NL contact form remains supported',async()=>{sent.length=0;const data=validData();data.set('formType','contact');data.set('locale','nl');assert.equal((await POST(new Request('http://localhost/api/mail',{method:'POST',body:data}))).status,200);assert.equal(sent.length,2);assert.match(sent[0].subject,/Contact NL/)});
test('Bulex is the only public brand and French is not a public language',()=>{const {middleware}=require('../middleware.ts');assert.equal(destination(middleware(request('/'))),'/bulex/nl');assert.equal(destination(middleware(request('/nl/contact'))),'/contact');assert.equal(destination(middleware(request('/fr/contact'))),'/en/contact')});
test('Legacy AI-discovery document is replaced only in Bulex mode',()=>{assert.equal(destination(bulexMiddleware(request('/llms.txt'))),'/bulex-meta')});
test('SMTP envelope always uses Bulex display name',async()=>{const nodemailer=require('nodemailer');const original=nodemailer.createTransport;const envelopes=[];nodemailer.createTransport=()=>({sendMail:async mail=>{envelopes.push(mail);return {accepted:mail.to.split(", ")}}});try{const cfg={mailFrom:'team@example.test',mailTo:'admin@example.test'};await actualSendViaSmtp(cfg,{senderName:'Bulex Plombier',subject:'Test',text:'Test'});await actualSendViaSmtp(cfg,{subject:'Test',text:'Test'});assert.equal(envelopes[0].from.name,'Bulex Plombier');assert.equal(envelopes[1].from.name,'Bulex Plombier');}finally{nodemailer.createTransport=original}});
test('Every migrated page renders without old branding or invalid internal links',async()=>{const {renderToStaticMarkup}=require('react-dom/server');const Page=require('../app/bulex/[locale]/[[...path]]/page.tsx').default;const {pageSegments}=require('../config/bulex/routes.ts');let count=0;for(const locale of ['nl','en']){const paths=Object.keys(pageSegments).map(key=>href(locale,key));paths.push(...getServices(locale).map(s=>href(locale,'services',s.slug)),...getSolutions(locale).map(s=>href(locale,'solutions',s.slug)),...getAdvice(locale).map(s=>href(locale,'blog',s.slug)),...getCities('nl').map(c=>href(locale,'areas',c.slug)));for(const url of paths){const segments=parsePublicPath(url).segments;const element=await Page({params:Promise.resolve({locale,path:segments})});const html=renderToStaticMarkup(element);assert.ok(html.includes('id="main-content"'),url);assert.doesNotMatch(html,/vaillant|href="#"|\/fr\//i,url); for(const match of html.matchAll(/<a[^>]+href="(\/[^" ]*)"/g)){ const link=match[1].split('#')[0];const {locale:targetLocale,segments:target}=parsePublicPath(link); const key=require('../config/bulex/routes.ts').pageKey(targetLocale,target[0]);assert.ok(key,link);if(target[1]){const records=key==='services'?getServices(targetLocale):key==='solutions'?getSolutions(targetLocale):key==='blog'?getAdvice(targetLocale):key==='areas'?getCities('nl'):[];assert.ok(records.some(record=>record.slug===target[1]),link);}}assert.match(html,/<h1[ >]/,url);count++;}}assert.ok(count>150,`Rendered ${count} routes`)});

test('Restored local content keeps all Brussels profiles and model references are sourced',()=>{
 const translations=require('../config/bulex/geo-en.json');
 const {products}=require('../config/bulex/products.ts');
 const communes=fs.readdirSync(path.join(process.cwd(),'data/communes')).filter(f=>f.endsWith('.json'));
 for(const file of communes){const key=file.replace('.json','');assert.ok(translations[key]?.profile,key);assert.equal(translations[key].issues.length,4,key)}
 for(const product of products){assert.match(product.source,/^https:\/\/www\.bulex\.be\//);assert.ok(product.en&&product.nl)}
});
test('Local and product content actually appears in both public languages',async()=>{
 const {renderToStaticMarkup}=require('react-dom/server');
 const Page=require('../app/bulex/[locale]/[[...path]]/page.tsx').default;
 for(const locale of ['en','nl']){
  const local=renderToStaticMarkup(await Page({params:Promise.resolve({locale,path:parsePublicPath(href(locale,'areas','anderlecht')).segments})}));
  assert.match(local,/1070/);assert.match(local,/Parc Astrid/);
  assert.match(local,locale==='en'?/Terraced workers/:/Arbeiderswoningen/);
  assert.doesNotMatch(local,/within 30 minutes|binnen 30 minuten|Vaillant/i);
  const solution=renderToStaticMarkup(await Page({params:Promise.resolve({locale,path:parsePublicPath(href(locale,'solutions',getSolutions(locale)[0].slug)).segments})}));
  assert.match(solution,/ThemaFast Condens/);assert.match(solution,/0010043888/);
  const repair=renderToStaticMarkup(await Page({params:Promise.resolve({locale,path:parsePublicPath(href(locale,'services',getServices(locale)[0].slug)).segments})}));
  assert.match(repair,/F 28/);assert.match(repair,/codes-d-erreur/);
 }
});

test('Consent parsing expires choices and rejects malformed or future records',()=>{
 const {parseConsent,CONSENT_MAX_AGE,CONSENT_VERSION}=require('../config/bulex/consent.ts');
 const now=2000000000000,choice={version:CONSENT_VERSION,necessary:true,analytics:false,marketing:false,updatedAt:now};
 assert.ok(parseConsent(JSON.stringify(choice),now));
 assert.equal(parseConsent(JSON.stringify({...choice,updatedAt:now-CONSENT_MAX_AGE}),now),null);
 assert.equal(parseConsent(JSON.stringify({...choice,updatedAt:now+1}),now),null);
 assert.equal(parseConsent('invalid',now),null);
 assert.equal(parseConsent(JSON.stringify({...choice,version:0}),now),null);
});
test('Main pages have unique metadata and translated editorial sections',async()=>{
 const {generateMetadata}=require('../app/bulex/[locale]/[[...path]]/page.tsx');
 const {pageSegments}=require('../config/bulex/routes.ts'),editorial=require('../config/bulex/editorial.json');
 for(const locale of ['en','nl']){
  const descriptions=[];
  for(const key of Object.keys(pageSegments)){
   const metadata=await generateMetadata({params:Promise.resolve({locale,path:parsePublicPath(href(locale,key)).segments})});
   assert.ok(metadata.description.length>60,key);descriptions.push(metadata.description);
   assert.equal(metadata.alternates.languages['x-default'],href('nl',key));
  }
  assert.equal(new Set(descriptions).size,descriptions.length);
  for(const topic of ['services','solutions','areas','about','contact','booking','blog',...Array.from({length:8},(_,i)=>'service-'+i),...Array.from({length:3},(_,i)=>'solution-'+i)]){
   assert.ok(editorial[topic][locale].length>=2,topic);
  }
 }
});
test('All policy routes render linked localized content without invented company details',async()=>{
 const {renderToStaticMarkup}=require('react-dom/server'),Page=require('../app/bulex/[locale]/[[...path]]/page.tsx').default;
 for(const locale of ['en','nl'])for(const key of ['privacy','cookies','terms','legal','consumer','accessibility']){
  const html=renderToStaticMarkup(await Page({params:Promise.resolve({locale,path:parsePublicPath(href(locale,key)).segments})}));
  assert.match(html,/bx-legal/);assert.match(html,/bx-cookie-dialog/);
  assert.doesNotMatch(html,/Cookiebot|googletagmanager\.com|application\/ld\+json[^]*FAQPage/);
 }
});
test('Legacy conversion events are blocked without valid marketing consent',()=>{
 const originalWindow=global.window,originalStorage=global.localStorage,calls=[];
 const {CONSENT_KEY,CONSENT_VERSION}=require('../config/bulex/consent.ts');
 const {trackFormSubmitConversion}=require('../lib/gtagConversions.ts');
 let stored=null;
 global.window={gtag:(...args)=>calls.push(args)};
 global.localStorage={getItem:key=>key===CONSENT_KEY?stored:null};
 try{
  trackFormSubmitConversion();assert.equal(calls.length,0);
  stored=JSON.stringify({version:CONSENT_VERSION,necessary:true,analytics:false,marketing:false,updatedAt:Date.now()});
  trackFormSubmitConversion();assert.equal(calls.length,0);
  stored=JSON.stringify({version:CONSENT_VERSION,necessary:true,analytics:false,marketing:true,updatedAt:Date.now()});
  trackFormSubmitConversion();assert.equal(calls.length,1);
  stored=null;trackFormSubmitConversion();assert.equal(calls.length,1);
 }finally{global.window=originalWindow;global.localStorage=originalStorage}
});
test('Review carousel renders nine customer reviews with Google review image and switches to custom reviews without mixing them',()=>{
 const React=require('react'),{renderToStaticMarkup}=require('react-dom/server'),Testimonials=require('../components/bulex/Testimonials.tsx').default;
 const {reviews}=require('../config/bulex/content.ts');
 const sample=renderToStaticMarkup(React.createElement(Testimonials,{locale:'en'}));
 assert.equal((sample.match(/class="bx-testimonial-card"/g)||[]).length,9);
 assert.match(sample,/google-avis\.png/);assert.match(sample,/Verified customer/);assert.match(sample,/Thomas V\./);
 reviews.push({name:'Test review fixture',text:{en:'A sourced review fixture',nl:'Een beoordelingsfixture'},rating:4,sourceUrl:'https://example.test/review',verified:false});
 try{const real=renderToStaticMarkup(React.createElement(Testimonials,{locale:'en',googleReviewUrl:'https://g.page/r/test/review'}));
 assert.equal((real.match(/class="bx-testimonial-card"/g)||[]).length,1);
 assert.doesNotMatch(real,/Thomas V\.|Sample homeowner/);
 assert.match(real,/https:\/\/g.page\/r\/test\/review/);
 }finally{reviews.pop()}
});

test('SMTP configuration uses the sending mailbox and ignores retired forwarding overrides',()=>{
 const keys=['SMTP_HOST','SMTP_USER','SMTP_PASS','SMTP_PORT','SMTP_SECURE','MAIL_FROM','MAIL_TO','ADMIN_EMAIL','NEXT_PUBLIC_SUPPORT_EMAIL'];
 const saved=Object.fromEntries(keys.map(k=>[k,process.env[k]]));
 try{
  keys.forEach(k=>delete process.env[k]);
  Object.assign(process.env,{SMTP_HOST:'smtp.example.test',SMTP_USER:'login@example.test',SMTP_PASS:'test-secret',NEXT_PUBLIC_SUPPORT_EMAIL:'contact@example.test'});
  let cfg=actualGetSmtpConfig();
  assert.equal(cfg.mailFrom,'contact@example.test');assert.equal(cfg.mailTo,undefined);
  assert.equal(cfg.port,587);assert.equal(cfg.secure,false);
  Object.assign(process.env,{MAIL_FROM:'sender@example.test',MAIL_TO:'office@example.test',SMTP_PORT:'465'});
  cfg=actualGetSmtpConfig();assert.equal(cfg.mailFrom,'sender@example.test');assert.equal(cfg.mailTo,undefined);assert.equal(cfg.secure,true);
  process.env.SMTP_PORT='587invalid';assert.equal(actualGetSmtpConfig(),null);
  process.env.SMTP_PORT='70000';assert.equal(actualGetSmtpConfig(),null);
  delete process.env.SMTP_PASS;assert.equal(actualGetSmtpConfig(),null);
 }finally{for(const k of keys){if(saved[k]===undefined)delete process.env[k];else process.env[k]=saved[k]}}
});
test('Application mode replaces the separate launch flag',()=>{
 const {resolveAppMode}=require('../config/bulex/brand.ts');
 assert.equal(resolveAppMode('production','development'),'production');
 assert.equal(resolveAppMode('development','production'),'development');
 assert.equal(resolveAppMode(undefined,'production'),'production');
 assert.equal(resolveAppMode(undefined,'development'),'development');
});
test('Public contact numbers use env values without hardcoded fallbacks',()=>{
 const phone=require('../config/public-phone.ts'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
 const Widget=require('../components/WhatsAppWidget.tsx').default;
 const savedPhone=process.env.NEXT_PUBLIC_PHONE_NUMBER,savedWhatsApp=process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
 try{
  delete process.env.NEXT_PUBLIC_PHONE_NUMBER;delete process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  assert.equal(phone.getPublicPhoneTelHref(),'');assert.equal(phone.getWhatsAppE164Digits(),'');assert.equal(renderToStaticMarkup(React.createElement(Widget,{})),'');
  process.env.NEXT_PUBLIC_PHONE_NUMBER='02 123 45 67';process.env.NEXT_PUBLIC_WHATSAPP_NUMBER='0032 470 12 34 56';
  assert.equal(phone.getPublicPhoneTelHref(),'tel:+3221234567');assert.equal(phone.getWhatsAppE164Digits(),'32470123456');
  const html=renderToStaticMarkup(React.createElement(Widget,{locale:'en'}));
  assert.match(html,/https:\/\/wa.me\/32470123456/);assert.match(html,/Do you need help/);assert.doesNotMatch(html,/vaillant/i);
  assert.match(renderToStaticMarkup(React.createElement(Widget,{locale:'nl'})),/Kunnen we u helpen/);
 }finally{if(savedPhone===undefined)delete process.env.NEXT_PUBLIC_PHONE_NUMBER;else process.env.NEXT_PUBLIC_PHONE_NUMBER=savedPhone;if(savedWhatsApp===undefined)delete process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;else process.env.NEXT_PUBLIC_WHATSAPP_NUMBER=savedWhatsApp}
});
test('Six blog posts are live and six release weekly with future routes excluded',async()=>{
 const {blogPosts,getPublishedBlogPosts,getScheduledBlogPosts}=require('../config/bulex/blog.ts');
 const now=new Date('2026-11-15T12:00:00Z');
 assert.equal(blogPosts.length,12);assert.equal(getPublishedBlogPosts(now).length,6);
 const scheduled=getScheduledBlogPosts(now);assert.equal(scheduled.length,6);
 for(let i=1;i<scheduled.length;i++)assert.equal(Date.parse(scheduled[i].publishAt)-Date.parse(scheduled[i-1].publishAt),7*86400000);
 for(const post of scheduled){
  const before=new Date(Date.parse(post.publishAt)-1),at=new Date(post.publishAt);
  for(const locale of ['en','nl']){
   assert.ok(!getAdvice(locale,before).some(p=>p.slug===post.slug[locale]),post.id);
   assert.ok(getAdvice(locale,at).some(p=>p.slug===post.slug[locale]),post.id);
   assert.equal(alternatePath(href('en','blog',post.slug.en),locale),href(locale,'blog',post.slug[locale]));
  }
 }
 const {generateMetadata}=require('../app/bulex/[locale]/[[...path]]/page.tsx');
 const next=getScheduledBlogPosts()[0];if(next){const future=await generateMetadata({params:Promise.resolve({locale:'en',path:['advice',next.slug.en]})});
 assert.equal(future.robots.index,false);assert.match(future.title,/404/);}
});
test('All twelve posts contain translated original sections and valid local/service relationships',()=>{
 const {blogPosts}=require('../config/bulex/blog.ts');
 for(const p of blogPosts){assert.ok(getCities('nl').some(c=>c.slug===p.area),p.area);assert.ok(getServices('en')[p.service]);
  for(const locale of ['en','nl']){assert.ok(p.answer[locale].length>150);assert.ok(p.sections.length>=3);assert.ok(p.sections.every(s=>s.heading[locale]&&s.body[locale].length>180));assert.ok(p.takeaways[locale].length>=3)}
  assert.ok(p.sources.every(s=>s.startsWith('https://www.bulex.be/')));
 }
});
test('Dutch logo appears only in Dutch pages and new header blog link is present',async()=>{
 const {renderToStaticMarkup}=require('react-dom/server'),Page=require('../app/bulex/[locale]/[[...path]]/page.tsx').default;
 const saved=process.env.NEXT_PUBLIC_PHONE_NUMBER;process.env.NEXT_PUBLIC_PHONE_NUMBER='0467802090';
 try{for(const locale of ['en','nl']){
  const html=renderToStaticMarkup(await Page({params:Promise.resolve({locale,path:[]})}));
  if(locale==='nl')assert.match(html,/loodgieter-logo/);else assert.doesNotMatch(html,/loodgieter-logo/);
  assert.match(html,/flanders.webp/);assert.ok(html.includes(href(locale,'blog')));assert.match(html,/bx-mobile-call-bar/);
 }}finally{if(saved===undefined)delete process.env.NEXT_PUBLIC_PHONE_NUMBER;else process.env.NEXT_PUBLIC_PHONE_NUMBER=saved}
});

 test('Footer links go to localized public subpages without home anchors or localhost origins',()=>{
 const {renderToStaticMarkup}=require('react-dom/server');const {Footer}=require('../components/bulex/Shared.tsx');
 for(const locale of ['en','nl']){const html=renderToStaticMarkup(Footer({locale}));assert.doesNotMatch(html,/href="[^" ]*(?:localhost|127\.0\.0\.1|#)/);assert.ok(html.includes(`href="${href(locale,'reviews')}"`));assert.ok(html.includes(`href="${href(locale,'contact')}"`));for(const service of getServices(locale))assert.ok(html.includes(`href="${href(locale,'services',service.slug)}"`));}
});
 test('Each published sitemap entry has reciprocal EN/NL and fallback alternates',async()=>{
 const brand=require('../config/bulex/brand.ts');const previous=brand.bulexIndexable;brand.bulexIndexable=true;
 try{const entries=await require('../app/sitemap.ts').default();const urls=new Map(entries.map(e=>[e.url,e]));for(const entry of entries){const langs=entry.alternates.languages;assert.ok(Object.values(langs).includes(entry.url));assert.equal(langs['x-default'],langs['nl-BE']);for(const target of Object.values(langs)){assert.ok(urls.has(target),target);assert.deepEqual(urls.get(target).alternates.languages,langs);}}}finally{brand.bulexIndexable=previous;}
});

test('Public origin follows the request domain, protocol and local port with validated proxy fallback',()=>{
 const {resolvePublicOrigin}=require('../config/bulex/origin.ts');
 for(const [headers,expected] of [
  [{host:'localhost:3012'},'http://localhost:3012'],
  [{host:'127.0.0.1:3012'},'http://127.0.0.1:3012'],
  [{host:'[::1]:3012'},'http://[::1]:3012'],
  [{host:'bulex.example'},'https://bulex.example'],
  [{host:'bulex.example','x-forwarded-proto':'https'},'https://bulex.example'],
  [{host:'bulex.example','x-forwarded-proto':'http'},'http://bulex.example'],
  [{host:'localhost:3000','x-forwarded-host':'bulex.example','x-forwarded-proto':'https'},'https://bulex.example'],
  [{host:'10.0.0.2:3000','x-forwarded-host':'www.bulex.example','x-forwarded-proto':'https'},'https://www.bulex.example'],
  [{host:'bulex.example','x-forwarded-host':'untrusted.example'},'https://bulex.example'],
  [{host:'localhost:3012','x-forwarded-host':'evil.example/path'},'http://localhost:3012'],
  [{host:'localhost:3012','x-forwarded-host':'one.example,two.example'},'http://localhost:3012'],
  [{host:'bulex.example','x-forwarded-proto':'javascript:'},'https://bulex.example'],
 ])assert.equal(resolvePublicOrigin(new Headers(headers),'http://localhost:3000'),expected,JSON.stringify(headers));
 assert.equal(resolvePublicOrigin(new Headers(), 'https://bulex.example/en?x=1'),'https://bulex.example');
 for(const host of ['bad.example/path','bad.example?query','user@bad.example','-bad.example','bad..example','bad.example:99999'])assert.throws(()=>resolvePublicOrigin(new Headers({host})));
 assert.throws(()=>resolvePublicOrigin(new Headers(),'javascript:alert(1)'));
});
test('Canonical, hreflang, social URLs, schema, sitemap, robots and llms use one detected origin',async()=>{
 const brand=require('../config/bulex/brand.ts'),previousIndexable=brand.bulexIndexable,previousHeaders=seoRequestHeaders;
 const {generateMetadata,default:Page}=require('../app/bulex/[locale]/[[...path]]/page.tsx');
 const {renderToStaticMarkup}=require('react-dom/server');
 brand.bulexIndexable=true;
 try{
  for(const domain of ['first.example','second.example']){
   seoRequestHeaders=new Headers({host:'localhost:3000','x-forwarded-host':domain,'x-forwarded-proto':'https'});
   const origin='https://'+domain,props={params:Promise.resolve({locale:'en',path:['advice','water-leak']})};
   const meta=await generateMetadata(props);assert.equal(meta.metadataBase.origin,origin);assert.equal(meta.alternates.canonical,'/en/advice/water-leak');assert.equal(meta.openGraph.url,'/en/advice/water-leak');assert.equal(meta.openGraph.type,'article');assert.equal(meta.openGraph.images[0].url,'/bulex/'+getAdvice('en').find(a=>a.slug==='water-leak').image+'.webp');
   const html=renderToStaticMarkup(await Page(props));assert.ok(html.includes(origin+'/en/advice/water-leak'));assert.doesNotMatch(html,/http:\/\/localhost:3000/);
   const sitemap=await require('../app/sitemap.ts').default();assert.ok(sitemap.every(entry=>entry.url.startsWith(origin+'/')));
   const robots=await require('../app/robots.ts').default();assert.equal(robots.sitemap,origin+'/sitemap.xml');
   const llms=await require('../app/bulex-meta/route.ts').GET();assert.ok((await llms.text()).includes(origin+'/en'));
  }
 }finally{brand.bulexIndexable=previousIndexable;seoRequestHeaders=previousHeaders;}
});

test('Attachment contents, extension and MIME must agree; unsafe names and missing types are refused',async()=>{
 const {validateAttachments}=require('../lib/mail/attachments.ts');
 const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aZusAAAAASUVORK5CYII=','base64');
 const good=await validateAttachments([new File([png],'boiler photo.png',{type:'image/png'})]);assert.equal(good[0].filename,'boiler-photo.png');assert.deepEqual(good[0].content,png);
 const pdf=await validateAttachments([new File(['%PDF-1.7\n1 0 obj\n<<>>\nendobj\n%%EOF\n'],'manual.pdf',{type:'application/pdf'})]);assert.equal(pdf[0].contentType,'application/pdf');
 for(const [data,name,type] of [['<script>alert(1)</script>','photo.png','image/png'],[png,'photo.jpg','image/jpeg'],[png,'photo.png',''],[png,'photo.svg','image/svg+xml'],[png,'shell.php.png','image/png'],[png,'../photo.png','image/png'],[png,'photo\r\nBcc-test.png','image/png'],['%PDF-1.7 no trailer','manual.pdf','application/pdf'],['','empty.png','image/png']])await assert.rejects(()=>validateAttachments([new File([data],name,{type})]),name);
 await assert.rejects(()=>validateAttachments(['https://example.test/remote.png']));
 await assert.rejects(()=>validateAttachments(Array.from({length:6},()=>new File([png],'photo.png',{type:'image/png'}))));
 await assert.rejects(()=>validateAttachments([new File([Buffer.alloc(5*1024*1024+1)],'photo.png',{type:'image/png'})]));
 const padded=Buffer.alloc(4*1024*1024);png.copy(padded);png.subarray(-12).copy(padded,padded.length-12);
 await assert.rejects(()=>validateAttachments(Array.from({length:3},()=>new File([padded],'photo.png',{type:'image/png'}))));
});
test('Cross-site, invalid fields, header injection and forged attachments never reach SMTP',async()=>{
 sent.length=0;
 const foreign=await POST(new Request('http://localhost/api/mail',{method:'POST',headers:{origin:'https://other.test'},body:validData()}));assert.equal(foreign.status,403);
 const duplicates=validData();duplicates.append('email','attacker@example.test');assert.equal((await POST(new Request('http://localhost/api/mail',{method:'POST',body:duplicates}))).status,400);
 const injected=validData();injected.set('nom','Name\r\nBcc: attacker@example.test');assert.equal((await POST(new Request('http://localhost/api/mail',{method:'POST',body:injected}))).status,400);
 const forged=validData();forged.append('attachments',new File(['executable content'],'photo.png',{type:'image/png'}));const result=await POST(new Request('http://localhost/api/mail',{method:'POST',body:forged}));assert.equal(result.status,400);assert.equal((await result.json()).code,'ATTACHMENT_INVALID');assert.equal(sent.length,0);
});
test('Request byte cap applies before form parsing, including a false Content-Length',async()=>{
 const {boundedFormData,MAIL_ATTACHMENT_LIMITS}= {...require('../lib/mail/protection.ts'),...require('../lib/mail/smtp-config.ts')};
 const oversized=new Request('http://localhost/api/mail',{method:'POST',headers:{'content-type':'multipart/form-data; boundary=test','content-length':String(MAIL_ATTACHMENT_LIMITS.maxRequestBytes+1)},body:'small'});
 await assert.rejects(()=>boundedFormData(oversized),{name:'Error'});
 const streamed=new Request('http://localhost/api/mail',{method:'POST',headers:{'content-type':'multipart/form-data; boundary=test','content-length':'1'},body:Buffer.alloc(MAIL_ATTACHMENT_LIMITS.maxRequestBytes+1)});
 await assert.rejects(()=>boundedFormData(streamed));
});
test('Mail throttles expire and repeated confirmation requests stop before another SMTP send',async()=>{
 const {consumeMailLimit}=require('../lib/mail/protection.ts');assert.equal(consumeMailLimit('test',1,100,1000),true);assert.equal(consumeMailLimit('test',1,100,1050),false);assert.equal(consumeMailLimit('test',1,100,1100),true);
 sent.length=0;for(let i=0;i<3;i++)assert.equal((await POST(new Request('http://localhost/api/mail',{method:'POST',body:validData()}))).status,200);
 const result=await POST(new Request('http://localhost/api/mail',{method:'POST',body:validData()}));assert.equal(result.status,429);assert.equal(sent.length,6);assert.ok(result.headers.has('retry-after'));
});
test('Admin failure is not success; a confirmation failure reports partial success without resending the lead',async()=>{
 const original=transport.sendViaSmtp,originalLog=console.error,logs=[];console.error=(...args)=>logs.push(args);
 try{
  transport.sendViaSmtp=async()=>{throw Object.assign(new Error('secret visitor@example.test SMTP_PASS=private'),{code:'EAUTH',responseCode:535})};
  let response=await POST(new Request('http://localhost/api/mail',{method:'POST',body:validData()}));assert.equal(response.status,502);assert.doesNotMatch(JSON.stringify(logs),/visitor@example|SMTP_PASS|private/);assert.match(JSON.stringify(logs),/EAUTH/);
  resetMailLimits();let calls=0;transport.sendViaSmtp=async()=>{if(++calls===2)throw Object.assign(new Error('secret'),{code:'ERECIPIENT'})};
  response=await POST(new Request('http://localhost/api/mail',{method:'POST',body:validData()}));const body=await response.json();assert.equal(response.status,200);assert.equal(body.confirmationSent,false);assert.ok(body.requestId);assert.equal(calls,2);
 }finally{transport.sendViaSmtp=original;console.error=originalLog;}
});
test('SMTP sends to its mailbox only, leaves forwarding to the provider and verifies acceptance',async()=>{
 const nodemailer=require('nodemailer'),original=nodemailer.createTransport;let settings,envelope;
 const cfg={host:'smtp.example.test',port:587,secure:false,user:'sender@example.test',pass:'not-a-real-password',mailFrom:'sender@example.test',mailTo:'admin@example.test'};
 nodemailer.createTransport=(options)=>{settings=options;return {sendMail:async mail=>{envelope=mail;return{accepted:['sender@example.test']}}}};
 try{
  await actualSendViaSmtp(cfg,{subject:'Test',text:'Test'});assert.equal(settings.requireTLS,true);assert.equal(settings.tls.rejectUnauthorized,true);assert.equal(settings.disableFileAccess,true);assert.equal(settings.disableUrlAccess,true);assert.equal(envelope.to,cfg.mailFrom);assert.equal(envelope.cc,undefined);assert.equal(envelope.bcc,undefined);assert.equal(envelope.disableFileAccess,true);
  await assert.rejects(()=>actualSendViaSmtp(cfg,{to:'second@example.test',subject:'Test',text:'Test'}),{code:'ERECIPIENT'});
  await assert.rejects(()=>actualSendViaSmtp(cfg,{subject:'Test',text:'Test',replyTo:'visitor@example.test\r\nBcc: bad@example.test'}),{code:'EADDRESS'});
 }finally{nodemailer.createTransport=original;}
});

test('Slow submissions abort at their deadline without claiming delivery or automatically retrying',async()=>{
 const {submitEnquiry,EnquiryTimeoutError}=require('../lib/mail/submit-request.ts');let calls=0;
 const slowFetch=async(url,options)=>{calls++;return new Promise((resolve,reject)=>{options.signal.addEventListener('abort',()=>reject(new Error('aborted')),{once:true})})};
 await assert.rejects(()=>submitEnquiry(validData(),{timeoutMs:10,fetchImpl:slowFetch}),EnquiryTimeoutError);assert.equal(calls,1);
 const result=await submitEnquiry(validData(),{timeoutMs:100,fetchImpl:async()=>Response.json({ok:true,confirmationSent:false})});assert.equal(result.result.ok,true);assert.equal(result.result.confirmationSent,false);
});
test('Hostinger mail logs are single-line JSON and include diagnostic stages without personal data',()=>{
 const {logMailEvent}=require('../lib/mail/protection.ts');const original=console.error,lines=[];console.error=line=>lines.push(line);
 try{logMailEvent('ERROR','test-request','enquiry',Object.assign(new Error('secret visitor@example.test'),{code:'ETIMEDOUT',responseCode:421}));assert.equal(lines.length,1);const entry=JSON.parse(lines[0]);assert.ok(Date.parse(entry.timestamp));assert.equal(entry.level,'ERROR');assert.match(entry.message,/enquiry request=test-request code=ETIMEDOUT responseCode=421/);assert.doesNotMatch(lines[0],/secret|visitor@example/);}finally{console.error=original;}
});
