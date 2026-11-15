import {createHash} from 'node:crypto';
import {isIP} from 'node:net';
import {MAIL_ATTACHMENT_LIMITS} from './smtp-config';
import {resolvePublicOrigin} from '@/config/bulex/origin';
export class BodyLimitError extends Error{}
const windows=new Map<string,{count:number;expires:number}>();
export function consumeMailLimit(key:string,limit:number,windowMs:number,now=Date.now()){
 for(const [id,entry] of windows)if(entry.expires<=now)windows.delete(id);
 const id=createHash('sha256').update(key).digest('hex');let entry=windows.get(id);
 if(!entry){if(windows.size>=2000)return false;entry={count:0,expires:now+windowMs};windows.set(id,entry);}
 if(entry.count>=limit)return false;entry.count++;return true;
}
export function resetMailLimits(){windows.clear();}
export function mailClientKey(req:Request){const value=req.headers.get('x-real-ip')||req.headers.get('x-forwarded-for')?.split(',').at(-1)?.trim();return value&&isIP(value)?value:'anonymous';}
export function sameOriginMail(req:Request){
 if(req.headers.get('sec-fetch-site')==='cross-site')return false;
 const origin=req.headers.get('origin');if(!origin)return true;
 try{return new URL(origin).origin===resolvePublicOrigin(req.headers,new URL(req.url).origin);}catch{return false;}
}
export async function boundedFormData(req:Request){
 const length=req.headers.get('content-length');
 if(length&&(!/^\d+$/.test(length)||Number(length)>MAIL_ATTACHMENT_LIMITS.maxRequestBytes))throw new BodyLimitError();
 if(!req.body)throw new Error('Missing body');
 const reader=req.body.getReader(),chunks:Uint8Array[]=[];let size=0,timer:ReturnType<typeof setTimeout>|undefined;
 try{
  const read=async()=>{while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>MAIL_ATTACHMENT_LIMITS.maxRequestBytes)throw new BodyLimitError();chunks.push(value);}return new Response(Buffer.concat(chunks),{headers:{'content-type':req.headers.get('content-type')||''}}).formData();};
  return await Promise.race([read(),new Promise<never>((_,reject)=>{timer=setTimeout(()=>{void reader.cancel().catch(()=>{});reject(new Error('Upload timed out'));},15000);})]);
 }finally{if(timer)clearTimeout(timer);void reader.cancel().catch(()=>{});}
}
export function validMailFields(data:FormData){
 const keys=[...new Set(data.keys())];if(keys.length>30)return false;
 for(const key of keys){if(key==='attachments')continue;const fields=data.getAll(key);if(fields.length!==1||typeof fields[0]!=='string'||fields[0].length>5000||/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(fields[0]))return false;
  if(!['message','beschrijving'].includes(key)&&(fields[0].length>500||/[\r\n]/.test(fields[0])))return false;
 }
 return true;
}
export function safeMailError(error:unknown){const e=error as {code?:unknown;responseCode?:unknown};return{code:typeof e?.code==='string'&&/^[A-Z0-9_]+$/.test(e.code)?e.code:'MAIL_FAILED',...(typeof e?.responseCode==='number'?{responseCode:e.responseCode}:{})};}

// One JSON line is required for Hostinger's runtime-log API to retain these events.
export function logMailEvent(level:'INFO'|'ERROR',requestId:string,stage:string,error?:unknown){
 const details=error===undefined?{}:safeMailError(error);const message=['[api/mail]',stage,`request=${requestId}`,...Object.entries(details).map(([key,value])=>`${key}=${value}`)].join(' ');
 const line=JSON.stringify({timestamp:new Date().toISOString(),level,message});
 if(level==='ERROR')console.error(line);else console.info(line);
}
