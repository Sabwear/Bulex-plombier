import {MAIL_ATTACHMENT_LIMITS} from './smtp-config';
import type {MailAttachment} from './sendViaSmtp';
export class UploadError extends Error{}
const extensions:Record<string,string[]>={'image/jpeg':['jpg','jpeg'],'image/png':['png'],'image/gif':['gif'],'image/webp':['webp'],'application/pdf':['pdf']};
function contentMatches(mime:string,b:Buffer){
 switch(mime){
  case 'image/jpeg':return b.length>=4&&b[0]===255&&b[1]===216&&b[2]===255&&b.subarray(-2).equals(Buffer.from([255,217]));
  case 'image/png':return b.length>=24&&b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))&&b.subarray(12,16).toString('ascii')==='IHDR'&&b.subarray(-8,-4).toString('ascii')==='IEND';
  case 'image/gif':return b.length>=14&&/^GIF8[79]a$/.test(b.subarray(0,6).toString('ascii'))&&b[b.length-1]===59;
  case 'image/webp':return b.length>=20&&b.subarray(0,4).toString('ascii')==='RIFF'&&b.subarray(8,12).toString('ascii')==='WEBP'&&['VP8 ','VP8L','VP8X'].includes(b.subarray(12,16).toString('ascii'))&&b.readUInt32LE(4)+8===b.length;
  case 'application/pdf':return /^%PDF-(?:1\.[0-7]|2\.0)/.test(b.subarray(0,9).toString('ascii'))&&/%%EOF\s*$/.test(b.subarray(-1024).toString('latin1'));
  default:return false;
 }
}
export async function validateAttachments(entries:FormDataEntryValue[]):Promise<MailAttachment[]>{
 const files=entries.filter(entry=>!(entry instanceof File&&entry.size===0&&entry.name===''));
 if(files.length>MAIL_ATTACHMENT_LIMITS.maxFiles)throw new UploadError('Too many files');
 let total=0;const attachments:MailAttachment[]=[];
 for(const entry of files){
  if(!(entry instanceof File)||entry.size===0||entry.size>MAIL_ATTACHMENT_LIMITS.maxBytesPerFile)throw new UploadError('Invalid file size');
  total+=entry.size;if(total>MAIL_ATTACHMENT_LIMITS.maxTotalBytes)throw new UploadError('Total attachment limit exceeded');
  const mime=entry.type.toLowerCase(),name=entry.name;
  if(!extensions[mime]||name.length>180||/[\\/\x00-\x1f\x7f:]/.test(name)||name.startsWith('.'))throw new UploadError('Invalid file');
  const dot=name.lastIndexOf('.'),ext=name.slice(dot+1).toLowerCase();
  if(dot<1||!extensions[mime].includes(ext)||/\.(?:exe|com|bat|cmd|scr|ps1|js|vbs|php|html?|svg|zip|rar|7z)(?:\.|$)/i.test(name))throw new UploadError('Invalid extension');
  const content=Buffer.from(await entry.arrayBuffer());if(!contentMatches(mime,content))throw new UploadError('File content does not match its type');
  const stem=name.slice(0,dot).normalize('NFKD').replace(/[^a-zA-Z0-9_-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,80)||'attachment';
  attachments.push({filename:`${stem}.${ext}`,content,contentType:mime});
 }
 return attachments;
}
