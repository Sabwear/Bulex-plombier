/**
 * Social media links pulled from NEXT_PUBLIC_* env vars.
 * Safe to import in client components because NEXT_PUBLIC values are bundled.
 */

export function getTelegramUrl(): string {
  const username = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME?.trim();
  if (!username) return "";
  return `https://t.me/${username.replace(/^@/, "")}`;
}

export const SOCIAL_LINKS = {
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL?.trim() || "",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() || "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || "",
  telegram: getTelegramUrl(),
} as const;

