export type SmtpEnv = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  mailFrom: string;
  mailTo: string;
};

export function getSmtpConfig(): SmtpEnv | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!host || !user || !pass) return null;

  const portRaw = process.env.SMTP_PORT?.trim();
  const port = portRaw ? Number(portRaw) : 587;
  if (!Number.isInteger(port) || port < 1 || port > 65535) return null;

  const secure =
    process.env.SMTP_SECURE === "true" ||
    process.env.SMTP_SECURE === "1" ||
    port === 465;

  const mailFrom =
    process.env.MAIL_FROM?.trim() ||
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() ||
    user;
  const mailTo =
    process.env.MAIL_TO?.trim() ||
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() ||
    mailFrom;
  if (!mailFrom || !mailTo) return null;

  return { host, port, secure, user, pass, mailFrom, mailTo };
}

export const MAIL_ATTACHMENT_LIMITS = {
  maxFiles: 5,
  maxBytesPerFile: 5 * 1024 * 1024,
  allowedMimeTypes: new Set([
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
  ]),
};
