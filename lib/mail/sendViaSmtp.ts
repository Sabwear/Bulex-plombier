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
    /** HTML body (multipart/alternative with text). */
    html?: string;
    replyTo?: string;
    attachments?: MailAttachment[];
    /** When set, sends only to these addresses (e.g. customer confirmation). Otherwise admin + from. */
    to?: string[];
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

  const recipients = options.to?.length
    ? options.to.map((v) => v.trim()).filter(Boolean)
    : Array.from(
        new Set([config.mailTo, config.mailFrom].map((v) => v.trim()).filter(Boolean))
      );

  await transporter.sendMail({
    from: `"Vaillant Loodgieter" <${config.mailFrom}>`,
    to: recipients.join(", "),
    replyTo: options.replyTo || config.mailFrom,
    subject: options.subject,
    text: options.text,
    ...(options.html ? { html: options.html } : {}),
    attachments: options.attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
      contentType: a.contentType,
    })),
  });
}
