/**
 * Single env: NEXT_PUBLIC_PHONE_NUMBER
 * NEXT_PUBLIC_PHONE_NUMBER can be human-readable (e.g. "02 588 02 48"), digits, or include "+".
 * This module normalizes it for:
 * - frontend display: "+324..." (no spaces)
 * - tel: links: tel:+324...
 * (WhatsApp links use a separate number: see getWhatsAppE164Digits below)
 */

const DEFAULT_DISPLAY = "02 588 02 48";

function getPublicPhoneRaw(): string {
  return process.env.NEXT_PUBLIC_PHONE_NUMBER?.trim() || DEFAULT_DISPLAY;
}

export function getPublicPhoneDisplay(): string {
  return `+${getPublicPhoneE164Digits()}`;
}

/** E.164 digits without leading + (e.g. 3225880248). */
export function getPublicPhoneE164Digits(): string {
  const raw = getPublicPhoneRaw();
  const cleaned = raw.replace(/\D/g, "");
  if (!cleaned) return "3225880248";
  if (cleaned.startsWith("32")) return cleaned;
  if (cleaned.startsWith("0")) return `32${cleaned.slice(1)}`;
  return cleaned;
}

export function getPublicPhoneTelHref(): string {
  return `tel:+${getPublicPhoneE164Digits()}`;
}

const DEFAULT_WHATSAPP_DISPLAY = "0467 80 20 90";

/**
 * WhatsApp uses its own number (NEXT_PUBLIC_WHATSAPP_NUMBER), separate from the call number.
 * E.164 digits without leading + (e.g. 32467802090), ready for wa.me links.
 */
export function getWhatsAppE164Digits(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || DEFAULT_WHATSAPP_DISPLAY;
  const cleaned = raw.replace(/\D/g, "");
  if (cleaned.startsWith("32")) return cleaned;
  if (cleaned.startsWith("0")) return `32${cleaned.slice(1)}`;
  return cleaned;
}
