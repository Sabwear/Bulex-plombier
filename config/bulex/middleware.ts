import {NextResponse,type NextRequest} from 'next/server';
import {getAlternateLocalePath} from '../locale-routes';
import {adviceAlternate} from './advice-routes';
import {alternatePath} from './routes';
import {preferredLocale,localeCookie} from './language';
export function bulexMiddleware(request:NextRequest){const path=request.nextUrl.pathname;
 if(path==='/sitemap'){const headers=new Headers(request.headers);headers.set('x-bulex-locale','en');return NextResponse.next({request:{headers}});}
 if(path==='/llms.txt'){const url=request.nextUrl.clone();url.pathname='/bulex-meta';return NextResponse.rewrite(url);}
 if(path.startsWith('/api/')||path.startsWith('/_next/')||/\.[a-zA-Z0-9]+$/.test(path))return NextResponse.next();
 if(path.startsWith('/bulex/'))return new NextResponse('Not found',{status:404});
 const url=request.nextUrl.clone();const parts=path.split('/').filter(Boolean);
 if(path==='/'&&preferredLocale(request.headers.get('accept-language'),request.cookies.get(localeCookie)?.value)==='en'){url.pathname='/en';const response=NextResponse.redirect(url,307);response.headers.set('Vary','Accept-Language, Cookie');response.headers.set('Cache-Control','private, no-store');return response;}
 if(parts[0]==='fr'){let target=getAlternateLocalePath(path,'nl');target=target.replace('vaillant-herstelling-belgie','bulex-herstelling-belgie').replace('vaillant-onderhoudscontract','bulex-onderhoudscontract');if(parts[1]==='blog'&&parts[2]){const slug=adviceAlternate(parts[2],'nl');if(slug)target='/nl/blog/'+slug;}if(target==='/nl/brussel')target='/nl/loodgieter/brussel';url.pathname=alternatePath(target,'en');return NextResponse.redirect(url,308);}
 if(parts[0]==='nl'){
  let target=path.replace(/^\/nl(?=\/|$)/,'')||'/';
  target=target.replace('vaillant-herstelling-belgie','bulex-herstelling-belgie').replace('vaillant-onderhoudscontract','bulex-onderhoudscontract');
  if(target==='/brussel')target='/loodgieter/brussel';
  target=target.replace(/^\/loodgieter-([^/]+)$/,'/loodgieter/$1');
  if(parts[1]==='blog'&&parts[2]){const slug=adviceAlternate(parts[2],'nl');if(slug)target='/blog/'+slug;}
  url.pathname=target;const response=NextResponse.redirect(url,308);response.cookies.set(localeCookie,'nl',{path:'/',maxAge:15552000,sameSite:'lax',secure:request.nextUrl.protocol==='https:'});return response;
 }
 const locale=parts[0]==='en'?'en':'nl';
 url.pathname=locale==='en'?'/bulex'+path:'/bulex/nl'+(path==='/'?'':path);
 const headers=new Headers(request.headers);headers.set('x-bulex-locale',locale);
 const response=NextResponse.rewrite(url,{request:{headers}});if(path==='/'){response.headers.set('Vary','Accept-Language, Cookie');response.headers.set('Cache-Control','private, no-store');}return response;
}
