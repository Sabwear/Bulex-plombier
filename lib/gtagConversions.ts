import {hasMarketingConsent} from '@/config/bulex/consent';
/**
 * Google Ads conversion helpers (gtag).
 *
 * The shared layout loads one Google tag after explicit, unexpired
 * marketing consent. Conversion events use the same consent gate.
 * These helpers fire individual conversion events at the right moments:
 * - Lead form successfully submitted (contact + request-quote pages)
 * - WhatsApp button clicked (wa.me links)
 *
 * Each call is a no-op during SSR or when gtag hasn't loaded yet (e.g. an ad
 * blocker), so it is always safe to call from client components.
 */

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

/** Conversion action: lead form submission. */
export const FORM_SUBMIT_SEND_TO = "AW-11417443258/IMM4CN_KgbocELq3ocQq";

/** Conversion action: WhatsApp button click. */
export const WHATSAPP_CLICK_SEND_TO = "AW-11417443258/zlYWCMzh-bkcELq3ocQq";

function fireConversion(sendTo: string): void {
  if (typeof window === "undefined" || !hasMarketingConsent()) return;
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;
  gtag("event", "conversion", { send_to: sendTo });
}

/** Fire on successful submission of a lead form. */
export function trackFormSubmitConversion(): void {
  fireConversion(FORM_SUBMIT_SEND_TO);
}

/** Fire when a user clicks a WhatsApp (wa.me) button/link. */
export function trackWhatsAppClickConversion(): void {
  fireConversion(WHATSAPP_CLICK_SEND_TO);
}
