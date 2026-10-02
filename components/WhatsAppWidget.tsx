'use client';

import Link from "next/link";
import Image from "next/image";
import { getWhatsAppE164Digits } from "@/config/public-phone";
import { trackWhatsAppClickConversion } from "@/lib/gtagConversions";

export default function WhatsAppWidget() {
  const href = `https://wa.me/${getWhatsAppE164Digits()}`;

  return (
    <div className="pointer-events-none fixed bottom-24 left-4 z-50 md:bottom-8 md:left-6">
      <div className="pointer-events-auto relative h-14 w-14 md:h-16 md:w-16">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#25D366]/40 blur-[1px] animate-ping"
        />
        <Link
          href={href}
          aria-label="Contacter vaillant via WhatsApp"
          className="group relative flex h-full w-full items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/25 transition-transform duration-300 hover:-translate-y-1.5"
          target="_blank"
          onClick={trackWhatsAppClickConversion}
        >
          <span className="sr-only">WhatsApp</span>
          <Image
            src="/icons/plumbing-elements/whatsapp.svg"
            alt=""
            width={36}
            height={36}
            className="h-7 w-7 md:h-9 md:w-9"
            style={{ filter: "brightness(0) invert(1)" }}
            priority
          />
        </Link>
      </div>
    </div>
  );
}

