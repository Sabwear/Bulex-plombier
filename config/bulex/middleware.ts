import {NextResponse,type NextRequest} from 'next/server';
import {getAlternateLocalePath} from '../locale-routes';
import {adviceAlternate} from './advice-routes';
import {alternatePath} from './routes';
export function bulexMiddleware(request:NextRequest){const path=request.nextUrl.pathname;
 if(path==='/llms.txt'){const url=request.nextUrl.clone();url.pathname='/bulex-meta';return NextResponse.rewrite(url);}
 if(path.startsWith('/api/')||path.startsWith('/_next/')||/\.[a-zA-Z0-9]+$/.test(path))return NextResponse.next();
 if(path.startsWith('/bulex/'))return new NextResponse('Not found',{status:404});
 const url=request.nextUrl.clone();const parts=path.split('/').filter(Boolean);
 if(!parts.length){url.pathname='/en';return NextResponse.redirect(url,307);}
 if(parts[0]==='fr'){let target=getAlternateLocalePath(path,'nl');target=target.replace('vaillant-herstelling-belgie','bulex-herstelling-belgie').replace('vaillant-onderhoudscontract','bulex-onderhoudscontract');if(parts[1]==='blog'&&parts[2]){const slug=adviceAlternate(parts[2],'nl');if(slug)target='/nl/blog/'+slug;}if(target==='/nl/brussel')target='/nl/loodgieter/brussel';url.pathname=alternatePath(target,'en');return NextResponse.redirect(url,308);}
 if(parts[0]==='nl'){let target=path.replace('vaillant-herstelling-belgie','bulex-herstelling-belgie').replace('vaillant-onderhoudscontract','bulex-onderhoudscontract');if(path==='/nl/brussel')target='/nl/loodgieter/brussel';if(parts[1]==='blog'&&parts[2]){const slug=adviceAlternate(parts[2],'nl');if(slug)target='/nl/blog/'+slug;}if(target!==path){url.pathname=target;return NextResponse.redirect(url,308);}}
 if(!['nl','en'].includes(parts[0])){url.pathname='/en'+path;return NextResponse.redirect(url,307);}
 url.pathname='/bulex'+path;const headers=new Headers(request.headers);headers.set('x-bulex-locale',parts[0]);const response=NextResponse.rewrite(url,{request:{headers}});return response;
}
