export type SmtpEnv = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  mailFrom: string;
};

export function getSmtpConfig(): SmtpEnv | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass?.trim() || /[\s/@?#]/.test(host)) return null;

  const portRaw = process.env.SMTP_PORT?.trim();
  const port = portRaw ? Number(portRaw) : 587;
  if (!Number.isInteger(port) || port < 1 || port > 65535) return null;

  const secure =
    process.env.SMTP_SECURE?.trim().toLowerCase() === "true" ||
    process.env.SMTP_SECURE === "1" ||
    port === 465;

  const mailFrom =
    process.env.MAIL_FROM?.trim() ||
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() ||
    user;
  if (!validMailAddress(mailFrom)) return null;

  return { host, port, secure, user, pass, mailFrom };
}

export function validMailAddress(value:string){return value.length<=254&&/^[^\s@<>,;:\x00-\x1f\x7f]+@[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?\.[a-z]{2,63}$/i.test(value);}

export const MAIL_ATTACHMENT_LIMITS = {
  maxFiles: 5,
  maxTotalBytes: 10 * 1024 * 1024,
  maxRequestBytes: 11 * 1024 * 1024,
  maxBytesPerFile: 5 * 1024 * 1024,
  allowedMimeTypes: new Set([
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
  ]),
};
