'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getAlternateLocalePath } from '@/config/locale-routes';

const BASE_URL = 'https://vaillant-loodgieter.com';

function upsertAlternateLink(hrefLang: string, href: string) {
  const selector = `link[data-hreflang="${hrefLang}"]`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!el) {
    el = document.createElement('link');
    el.rel = 'alternate';
    el.dataset.hreflang = hrefLang;
    el.setAttribute('hreflang', hrefLang);
    document.head.appendChild(el);
  }

  el.setAttribute('hreflang', hrefLang);
  el.href = href;
}

export default function HreflangLinks() {
  const pathname = usePathname() || '/';

  useEffect(() => {
    const nlPath = getAlternateLocalePath(pathname, 'nl');
    const frPath = getAlternateLocalePath(pathname, 'fr');

    upsertAlternateLink('nl-BE', `${BASE_URL}${nlPath}`);
    upsertAlternateLink('fr-BE', `${BASE_URL}${frPath}`);

    // Default locale preference (x-default).
    upsertAlternateLink('x-default', `${BASE_URL}${frPath}`);
  }, [pathname]);

  return null;
}

