/** Resolve the public origin once for all SEO URLs, including reverse-proxy deployments. */
type HeaderSource={get(name:string):string|null};
function authority(value:string|null):string|undefined{
 if(!value||value.length>260||/[\s,/@?#\\]/.test(value))return;
 try{const parsed=new URL('http://'+value);if(parsed.username||parsed.password||parsed.pathname!=='/')return;
  const name=parsed.hostname;if(!/^(?:[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?|\[[a-f0-9:]+\])$/i.test(name))return;
  if(name.split('.').some(part=>!part||part.length>63||part.startsWith('-')||part.endsWith('-')))return;
  return parsed.host;
 }catch{return;}
}
function local(host:string){const name=new URL('http://'+host).hostname;return name==='localhost'||name==='[::1]'||name==='0.0.0.0'||/^127\./.test(name)||/^10\./.test(name)||/^192\.168\./.test(name)||/^172\.(1[6-9]|2\d|3[01])\./.test(name)||!name.includes('.');}
function configuredOrigin(value:string|undefined){
 try{const url=new URL(value||'');return ['http:','https:'].includes(url.protocol)&&!url.username&&!url.password&&authority(url.host)?url.origin:undefined;}catch{return;}
}
export function resolvePublicOrigin(headers:HeaderSource,fallback?:string):string{
 const host=authority(headers.get('host'));
 const forwarded=authority(headers.get('x-forwarded-host'));
 // Prefer the actual public Host. A proxy's forwarded host is used for an internal hop.
 const publicHost=host&&!local(host)?host:forwarded||host;
 const configured=configuredOrigin(fallback);
 if(!publicHost){if(configured)return configured;throw new Error('Cannot resolve the public site origin from this request.');}
 const forwardedProtocol=headers.get('x-forwarded-proto')?.trim().toLowerCase();
 const protocol=forwardedProtocol==='https'||forwardedProtocol==='http'?forwardedProtocol:local(publicHost)?'http':'https';
 return new URL(protocol+'://'+publicHost).origin;
}
