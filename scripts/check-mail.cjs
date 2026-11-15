// Read-only SMTP diagnostics. Never sends a message or prints authentication secrets.
require('@next/env').loadEnvConfig(process.cwd(),true,{info:()=>{},error:()=>{}});
const fs=require('node:fs'),ts=require('typescript');
require.extensions['.ts']=(mod,file)=>mod._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText,file);
const {getSmtpConfig}=require('../lib/mail/smtp-config.ts');
const {createSmtpTransport}=require('../lib/mail/sendViaSmtp.ts');
(async()=>{
 const config=getSmtpConfig();if(!config){console.error('SMTP configuration is incomplete or invalid. Check SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and MAIL_FROM.');process.exitCode=1;return;}
 console.log(JSON.stringify({host:config.host,port:config.port,tlsRequired:true,implicitTLS:config.secure,senderMatchesLogin:config.mailFrom===config.user,recipientCount:1}));
 const transport=createSmtpTransport(config);
 try{await transport.verify();console.log('PASS: SMTP connection, TLS and authentication succeeded. No email was sent. Inbox delivery still requires a real submission and checking the recipient mailbox.');}
 catch(error){console.error(JSON.stringify({status:'SMTP verification failed',code:error.code||'UNKNOWN',responseCode:error.responseCode,stage:error.command}));process.exitCode=1;}
 finally{transport.close();}
})();
