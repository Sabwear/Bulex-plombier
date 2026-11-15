import nodemailer from "nodemailer";
import {validMailAddress} from "./smtp-config";
import type { SmtpEnv } from "./smtp-config";

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export function createSmtpTransport(config:SmtpEnv){return nodemailer.createTransport({
    host:config.host,port:config.port,secure:config.secure,requireTLS:!config.secure,
    tls:{minVersion:"TLSv1.2",rejectUnauthorized:true},
    dnsTimeout:5000,connectionTimeout:10000,greetingTimeout:8000,socketTimeout:15000,
    disableFileAccess:true,disableUrlAccess:true,auth:{user:config.user,pass:config.pass},
  });}

export async function sendViaSmtp(
  config: SmtpEnv,
  options: {
    senderName?: string;
    subject: string;
    text: string;
    /** HTML body (multipart/alternative with text). */
    html?: string;
    replyTo?: string;
    attachments?: MailAttachment[];
    /** A direct customer confirmation. Enquiries otherwise go to the sending mailbox. */
    to?: string;
  }
): Promise<void> {
  const transporter = createSmtpTransport(config);

  const recipient=options.to?.trim()||config.mailFrom;
  if(!validMailAddress(recipient)||(options.replyTo&&!validMailAddress(options.replyTo)))throw Object.assign(new Error("Invalid email address"),{code:"EADDRESS"});
  const result=await transporter.sendMail({
    from: { name: options.senderName || "Bulex Plombier", address: config.mailFrom },
    to: recipient,
    replyTo: options.replyTo || config.mailFrom,
    subject: options.subject,
    text: options.text,
    ...(options.html ? { html: options.html } : {}),
    disableFileAccess: true,
    disableUrlAccess: true,
    attachments: options.attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
      contentType: a.contentType,
      contentDisposition: "attachment",
    })),
  });
  const accepted=(result.accepted||[]).map((value:string|{address:string})=>typeof value==='string'?value.toLowerCase():value.address.toLowerCase());
  if(!accepted.includes(recipient.toLowerCase()))throw Object.assign(new Error("SMTP did not accept the recipient"),{code:"ERECIPIENT"});
}
