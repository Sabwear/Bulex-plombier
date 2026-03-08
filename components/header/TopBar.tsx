'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, CalendarClock } from 'lucide-react';
import { SITE_CONFIG } from '@/config/navigation';
import { getAlternateRoute } from '@/config/routes';

interface TopBarProps {
  lang: 'fr' | 'nl';
}

export default function TopBar({ lang }: TopBarProps) {
  const pathname = usePathname() ?? '/';
  const isFr = lang === 'fr';

  // Textes traduits
  const urgentText = isFr
    ? 'Urgence plomberie & chauffage à Bruxelles'
    : 'Dringende loodgieter & verwarming in Brussel';
  const contactLink = isFr ? '/fr/contact' : '/nl/contact';
  const planIntervention = isFr ? 'Planifier une intervention' : 'Interventie plannen';

  // Liens du sélecteur de langue — pointe vers la page équivalente
  const frHref = isFr ? pathname : getAlternateRoute(pathname, 'fr');
  const nlHref = isFr ? getAlternateRoute(pathname, 'nl') : pathname;

  return (
    <div className="hidden lg:block w-full bg-gray-900 border-b border-gray-800">
      <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
        <div className="flex items-center justify-between h-10">

          {/* Left — signal d'urgence */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
            </span>
            <span className="text-[12px] font-medium text-gray-300 tracking-wide">
              {urgentText}
            </span>
          </div>

          {/* Right — liens utilitaires */}
          <div className="flex items-center">

            {/* Téléphone */}
            <a
              href={SITE_CONFIG.phone.href}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-white hover:text-primary transition-colors"
            >
              <Phone size={11} className="text-primary shrink-0" />
              {SITE_CONFIG.phone.display}
            </a>

            <span className="w-px h-3 bg-gray-700 mx-0.5" aria-hidden="true" />

            {/* Lien de planification */}
            <Link
              href={contactLink}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-gray-400 hover:text-white transition-colors"
            >
              <CalendarClock size={11} className="text-gray-500 shrink-0" />
              {planIntervention}
            </Link>

            <span className="w-px h-3 bg-gray-700 mx-0.5" aria-hidden="true" />

            {/* Sélecteur de langue — redirige vers la page équivalente */}
            <div className="flex items-center gap-0.5 px-3 py-1.5">
              <Link
                href={frHref}
                className={`text-[12px] font-bold tracking-wider transition-colors hover:text-white ${isFr ? 'text-primary' : 'text-gray-500'}`}
                aria-label="Français"
                aria-current={isFr ? 'true' : undefined}
              >
                FR
              </Link>
              <span className="text-gray-700 mx-1 text-[10px]" aria-hidden="true">|</span>
              <Link
                href={nlHref}
                className={`text-[12px] font-bold tracking-wider transition-colors hover:text-white ${!isFr ? 'text-primary' : 'text-gray-500'}`}
                aria-label="Nederlands"
                aria-current={!isFr ? 'true' : undefined}
              >
                NL
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
