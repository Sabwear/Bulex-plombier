'use client';

import { Phone } from 'lucide-react';
import { getPublicPhoneTelHref } from '@/config/public-phone';

type MobileCallBarProps = {
  lang: 'fr' | 'nl';
  telHref?: string;
};

export default function MobileCallBar({ lang, telHref = getPublicPhoneTelHref() }: MobileCallBarProps) {
  const label = lang === 'nl' ? 'Bel ons' : 'Appelez-nous';

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href={telHref}
        target="_blank"
        rel="noreferrer"
        className="mobile-call-cta btn btn-primary w-full flex items-center justify-center gap-3 rounded-none"
        style={{
          paddingTop: '1.05rem',
          paddingBottom: '1.05rem',
          fontSize: '1.08rem',
          boxShadow: '0 -10px 30px rgba(15,23,42,0.14)',
        }}
      >
        <Phone size={20} />
        {label}
      </a>
    </div>
  );
}

