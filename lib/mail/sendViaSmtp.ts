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

  // Ensure business contact mailbox receives the form submissions too.
  // If `MAIL_TO` is an admin inbox, we still include `MAIL_FROM` (e.g. contact@...) as recipient.
  const recipients = Array.from(
    new Set([config.mailTo, config.mailFrom].map((v) => v.trim()).filter(Boolean))
  );

  await transporter.sendMail({
    from: `"Vaillant Loodgieter" <${config.mailFrom}>`,
    to: recipients.join(", "),
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
