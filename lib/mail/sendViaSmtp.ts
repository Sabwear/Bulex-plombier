import nodemailer from "nodemailer";
import type { SmtpEnv } from "./smtp-config";

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export async function sendViaSmtp(
  config: SmtpEnv,
  options: {
    subject: string;
    text: string;
    replyTo?: string;
    attachments?: MailAttachment[];
  }
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: `"Vaillant Loodgieter" <${config.mailFrom}>`,
    to: config.mailTo,
    replyTo: options.replyTo || config.mailFrom,
    subject: options.subject,
    text: options.text,
    attachments: options.attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
      contentType: a.contentType,
    })),
  });
}
