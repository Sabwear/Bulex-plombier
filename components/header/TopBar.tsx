'use client';

import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { SITE_NAVIGATION, SITE_PHONE } from '@/config/site-navigation';
import type { Locale } from '@/config/locale-routes';

interface TopBarProps {
  lang: Locale;
}

export default function TopBar({ lang }: TopBarProps) {
  const data = SITE_NAVIGATION[lang];

  return (
    <div className="hidden lg:block w-full bg-gray-900 border-b border-gray-800">
      <div className="container">
        <div className="h-10 flex items-center justify-between gap-4">
          <p className="text-xs text-gray-300 truncate inline-flex items-center gap-2">
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>
            {data.topBar.urgencyText}
          </p>

          <div className="flex items-center gap-2 xl:gap-3">
            <a
              href={SITE_PHONE.href}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-primary transition-colors rounded px-1 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#25D366]">
                <Image
                  src="/icons/plumbing-elements/whatsapp.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="h-2.5 w-2.5"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </span>
              {SITE_PHONE.display}
            </a>

            <span className="w-px h-3 bg-gray-700" aria-hidden="true" />

            <Link
              href={data.topBar.interventionHref}
              className="text-xs text-gray-300 hover:text-white transition-colors rounded px-1 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {data.topBar.interventionLabel}
            </Link>

            <span className="w-px h-3 bg-gray-700" aria-hidden="true" />

            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}

