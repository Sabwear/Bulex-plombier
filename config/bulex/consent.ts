export const CONSENT_KEY='bulex-cookie-choice';
export const CONSENT_VERSION=2;
export const CONSENT_MAX_AGE=183*24*60*60*1000;
export type CookieChoice={version:number;necessary:true;analytics:boolean;marketing:boolean;updatedAt:number};
export function parseConsent(value:string|null,now=Date.now()):CookieChoice|null{
 try{const c=JSON.parse(value||'null');return c&&c.version===CONSENT_VERSION&&c.necessary===true&&typeof c.analytics==='boolean'&&typeof c.marketing==='boolean'&&typeof c.updatedAt==='number'&&now>=c.updatedAt&&now-c.updatedAt<CONSENT_MAX_AGE?c:null}catch{return null}
}
let runtimeMarketingDenied=false;
export function denyMarketingForSession(denied:boolean){runtimeMarketingDenied=denied;}
export function hasMarketingConsent(){if(runtimeMarketingDenied)return false;if(typeof window==='undefined')return false;try{return parseConsent(localStorage.getItem(CONSENT_KEY))?.marketing===true}catch{return false}}
