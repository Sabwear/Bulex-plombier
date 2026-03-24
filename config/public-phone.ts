/**
 * Single env: NEXT_PUBLIC_PHONE_NUMBER
 * Human-readable (e.g. "02 345 67 89") or digits; drives header display, tel: links, and WhatsApp.
 */

const DEFAULT_DISPLAY = "02 345 67 89";

export function getPublicPhoneDisplay(): string {
  return process.env.NEXT_PUBLIC_PHONE_NUMBER?.trim() || DEFAULT_DISPLAY;
}

/** E.164 digits without leading + (e.g. 3223456789). */
export function getPublicPhoneE164Digits(): string {
  const raw = getPublicPhoneDisplay();
  const cleaned = raw.replace(/\D/g, "");
  if (!cleaned) return "3223456789";
  if (cleaned.startsWith("32")) return cleaned;
  if (cleaned.startsWith("0")) return `32${cleaned.slice(1)}`;
  return cleaned;
}

export function getPublicPhoneTelHref(): string {
  return `tel:+${getPublicPhoneE164Digits()}`;
}
