/**
 * Single env: NEXT_PUBLIC_PHONE_NUMBER
 * NEXT_PUBLIC_PHONE_NUMBER can be human-readable (e.g. "02 588 02 48"), digits, or include "+".
 * This module normalizes it for:
 * - frontend display: "+324..." (no spaces)
 * - tel: links: tel:+324...
 * - WhatsApp links (wa.me): digits only (no "+", no spaces)
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
