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
const {bulexMiddleware}=require('../config/bulex/middleware.ts');
const {href,alternatePath}=require('../config/bulex/routes.ts');
const {getServices,getSolutions}=require('../config/bulex/content.ts');
const {getAdvice,adviceAlternate}=require('../config/bulex/advice.ts');
const {getCities}=require('../data/city-data.ts');
const {validateBulexRequest,bulexConfirmation}=require('../lib/mail/bulex-request.ts');
function request(p,cookie){return new NextRequest('http://localhost:3001'+p,{headers:cookie?{cookie}:undefined})}
function destination(response){return new URL(response.headers.get('location')||response.headers.get('x-middleware-rewrite')).pathname}
test('Root always defaults to English and explicit Dutch routes work',()=>{assert.equal(destination(bulexMiddleware(request('/'))),'/en');assert.equal(destination(bulexMiddleware(request('/','BULEX_LOCALE=en'))),'/en');assert.equal(destination(bulexMiddleware(request('/','BULEX_LOCALE=nl'))),'/en');assert.equal(destination(bulexMiddleware(request('/nl','BULEX_LOCALE=en'))),'/bulex/nl')});
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
test('Real mail route sends enquiry and localized confirmation through existing transport',async()=>{sent.length=0;const data=validData();data.append('attachments',new File(['test'],'photo.png',{type:'image/png'}));const result=await POST(new Request('http://localhost/api/mail',{method:'POST',body:data}));assert.equal(result.status,200);assert.equal(sent.length,2);assert.match(sent[0].subject,/Bulex Booking EN/);assert.equal(sent[0].attachments.length,1);assert.deepEqual(sent[1].to,['visitor@example.test']);assert.match(sent[1].text,/Your appointment is not yet confirmed/)});
test('Honeypot and invalid inputs never send email',async()=>{sent.length=0;const data=validData();data.set('website','spam');assert.equal((await POST(new Request('http://localhost/api/mail',{method:'POST',body:data}))).status,200);assert.equal(sent.length,0);data.set('website','');data.delete('consent');assert.equal((await POST(new Request('http://localhost/api/mail',{method:'POST',body:data}))).status,400);assert.equal(sent.length,0)});
test('Disallowed attachments are rejected before transport',async()=>{sent.length=0;const data=validData();data.append('attachments',new File(['test'],'run.exe',{type:'application/octet-stream'}));assert.equal((await POST(new Request('http://localhost/api/mail',{method:'POST',body:data}))).status,400);assert.equal(sent.length,0)});
test('Existing NL contact form remains supported',async()=>{sent.length=0;const data=validData();data.set('formType','contact');data.set('locale','nl');assert.equal((await POST(new Request('http://localhost/api/mail',{method:'POST',body:data}))).status,200);assert.equal(sent.length,2);assert.match(sent[0].subject,/Contact NL/)});
test('Bulex is the only public brand and French is not a public language',()=>{const {middleware}=require('../middleware.ts');assert.equal(destination(middleware(request('/'))),'/en');assert.equal(destination(middleware(request('/nl/contact'))),'/bulex/nl/contact');assert.equal(destination(middleware(request('/fr/contact'))),'/en/contact')});
test('Legacy AI-discovery document is replaced only in Bulex mode',()=>{assert.equal(destination(bulexMiddleware(request('/llms.txt'))),'/bulex-meta')});
test('SMTP envelope always uses Bulex display name',async()=>{const nodemailer=require('nodemailer');const original=nodemailer.createTransport;const envelopes=[];nodemailer.createTransport=()=>({sendMail:async mail=>envelopes.push(mail)});try{const cfg={mailFrom:'team@example.test',mailTo:'admin@example.test'};await actualSendViaSmtp(cfg,{senderName:'Bulex Plombier',subject:'Test',text:'Test'});await actualSendViaSmtp(cfg,{subject:'Test',text:'Test'});assert.equal(envelopes[0].from.name,'Bulex Plombier');assert.equal(envelopes[1].from.name,'Bulex Plombier');}finally{nodemailer.createTransport=original}});
test('Every migrated page renders without old branding or invalid internal links',async()=>{const {renderToStaticMarkup}=require('react-dom/server');const Page=require('../app/bulex/[locale]/[[...path]]/page.tsx').default;const {pageSegments}=require('../config/bulex/routes.ts');let count=0;for(const locale of ['nl','en']){const paths=Object.keys(pageSegments).map(key=>href(locale,key));paths.push(...getServices(locale).map(s=>href(locale,'services',s.slug)),...getSolutions(locale).map(s=>href(locale,'solutions',s.slug)),...getAdvice(locale).map(s=>href(locale,'blog',s.slug)),...getCities('nl').map(c=>href(locale,'areas',c.slug)));for(const url of paths){const segments=url.split('/').filter(Boolean);const element=await Page({params:Promise.resolve({locale,path:segments.slice(1)})});const html=renderToStaticMarkup(element);assert.ok(html.includes('id="main-content"'),url);assert.doesNotMatch(html,/vaillant|href="#"|\/fr\//i,url); for(const match of html.matchAll(/href="(\/(?:nl|en)(?:\/[^"]*)?)"/g)){ const link=match[1].split('#')[0]; const target=link.split('/').filter(Boolean); const key=require('../config/bulex/routes.ts').pageKey(target[0],target[1]); assert.ok(key,link); if(target[2]){const records=key==='services'?getServices(target[0]):key==='solutions'?getSolutions(target[0]):key==='blog'?getAdvice(target[0]):key==='areas'?getCities('nl'):[];assert.ok(records.some(record=>record.slug===target[2]),link);}}assert.match(html,/<h1[ >]/,url);count++;}}assert.ok(count>150,`Rendered ${count} routes`)});

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
  const local=renderToStaticMarkup(await Page({params:Promise.resolve({locale,path:href(locale,'areas','anderlecht').split('/').slice(2)})}));
  assert.match(local,/1070/);assert.match(local,/Parc Astrid/);
  assert.match(local,locale==='en'?/Terraced workers/:/Arbeiderswoningen/);
  assert.doesNotMatch(local,/within 30 minutes|binnen 30 minuten|Vaillant/i);
  const solution=renderToStaticMarkup(await Page({params:Promise.resolve({locale,path:href(locale,'solutions',getSolutions(locale)[0].slug).split('/').slice(2)})}));
  assert.match(solution,/ThemaFast Condens/);assert.match(solution,/0010043888/);
  const repair=renderToStaticMarkup(await Page({params:Promise.resolve({locale,path:href(locale,'services',getServices(locale)[0].slug).split('/').slice(2)})}));
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
   const metadata=await generateMetadata({params:Promise.resolve({locale,path:href(locale,key).split('/').slice(2)})});
   assert.ok(metadata.description.length>60,key);descriptions.push(metadata.description);
   assert.equal(metadata.alternates.languages['x-default'],href('en',key));
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
  const html=renderToStaticMarkup(await Page({params:Promise.resolve({locale,path:href(locale,key).split('/').slice(2)})}));
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
test('Review carousel uses nine labeled examples and switches to real reviews without mixing them',()=>{
 const React=require('react'),{renderToStaticMarkup}=require('react-dom/server'),Testimonials=require('../components/bulex/Testimonials.tsx').default;
 const {reviews}=require('../config/bulex/content.ts');
 const sample=renderToStaticMarkup(React.createElement(Testimonials,{locale:'en'}));
 assert.equal((sample.match(/class="bx-testimonial-card"/g)||[]).length,9);
 assert.match(sample,/Illustrative examples only/);assert.doesNotMatch(sample,/Verified customer/);
 assert.match(sample,/disabled=""/);
 reviews.push({name:'Test review fixture',text:{en:'A sourced review fixture',nl:'Een beoordelingsfixture'},rating:4,sourceUrl:'https://example.test/review',verified:false});
 try{const real=renderToStaticMarkup(React.createElement(Testimonials,{locale:'en',googleReviewUrl:'https://g.page/r/test/review'}));
 assert.equal((real.match(/class="bx-testimonial-card"/g)||[]).length,1);
 assert.doesNotMatch(real,/Illustrative examples|Sample homeowner/);
 assert.match(real,/https:\/\/g.page\/r\/test\/review/);
 }finally{reviews.pop()}
});

test('Minimal SMTP configuration defaults correctly and preserves explicit routing overrides',()=>{
 const keys=['SMTP_HOST','SMTP_USER','SMTP_PASS','SMTP_PORT','SMTP_SECURE','MAIL_FROM','MAIL_TO','ADMIN_EMAIL','NEXT_PUBLIC_SUPPORT_EMAIL'];
 const saved=Object.fromEntries(keys.map(k=>[k,process.env[k]]));
 try{
  keys.forEach(k=>delete process.env[k]);
  Object.assign(process.env,{SMTP_HOST:'smtp.example.test',SMTP_USER:'login@example.test',SMTP_PASS:'test-secret',NEXT_PUBLIC_SUPPORT_EMAIL:'contact@example.test'});
  let cfg=actualGetSmtpConfig();
  assert.equal(cfg.mailFrom,'contact@example.test');assert.equal(cfg.mailTo,'contact@example.test');
  assert.equal(cfg.port,587);assert.equal(cfg.secure,false);
  Object.assign(process.env,{MAIL_FROM:'sender@example.test',MAIL_TO:'office@example.test',SMTP_PORT:'465'});
  cfg=actualGetSmtpConfig();assert.equal(cfg.mailFrom,'sender@example.test');assert.equal(cfg.mailTo,'office@example.test');assert.equal(cfg.secure,true);
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
