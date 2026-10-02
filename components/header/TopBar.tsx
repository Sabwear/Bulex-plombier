'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { SITE_NAVIGATION, SITE_PHONE } from '@/config/site-navigation';
import type { Locale } from '@/config/locale-routes';
import { getWhatsAppE164Digits } from '@/config/public-phone';
import { trackWhatsAppClickConversion } from '@/lib/gtagConversions';

interface TopBarProps {
  lang: Locale;
}

export default function TopBar({ lang }: TopBarProps) {
  const data = SITE_NAVIGATION[lang];

  return (
    <div className="hidden lg:block w-full bg-[#00adab] border-b border-[#009190]/50">
      <div className="container">
        <div className="h-10 flex items-center justify-between gap-4">
          <p className="text-xs font-medium text-[#ffffff] truncate inline-flex items-center gap-2">
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>
            {data.topBar.urgencyText}
          </p>

          <div className="flex items-center gap-2 xl:gap-3">
            <a
              href={`https://wa.me/${getWhatsAppE164Digits()}`}
              onClick={trackWhatsAppClickConversion}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ffffff] hover:opacity-90 transition-opacity rounded px-1 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Image
                src="/icons/plumbing-elements/whatsapp.svg"
                alt=""
                width={14}
                height={14}
                className="h-3.5 w-3.5"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              {SITE_PHONE.display}
            </a>

            <span className="w-px h-3 bg-white/50" aria-hidden="true" />

            <Link
              href={data.topBar.interventionHref}
              className="text-xs font-semibold text-[#ffffff] hover:opacity-90 transition-opacity rounded px-1 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {data.topBar.interventionLabel}
            </Link>

            <span className="w-px h-3 bg-white/30" aria-hidden="true" />

            <div className="[&_a]:!text-white [&_a:hover]:!text-white/90 [&_span]:!text-white">
              <Suspense fallback={null}>
                <LanguageSwitcher theme="dark" />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

