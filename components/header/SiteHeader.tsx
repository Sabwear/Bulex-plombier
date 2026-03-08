import React from 'react';
import TopBar from './TopBar';
import MainNav from './MainNav';

interface SiteHeaderProps {
  lang?: 'fr' | 'nl';
}

export default function SiteHeader({ lang = 'fr' }: SiteHeaderProps) {
  return (
    <header className="flex flex-col w-full font-body relative z-50">
      <TopBar lang={lang} />
      <MainNav lang={lang} />
    </header>
  );
}
