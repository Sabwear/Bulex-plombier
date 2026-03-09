import type { Locale } from '@/config/locale-routes';
import TopBar from './TopBar';
import MainHeader from './MainHeader';

interface SiteHeaderProps {
  lang: Locale;
}

export default function SiteHeader({ lang }: SiteHeaderProps) {
  return (
    <div className="w-full">
      <TopBar lang={lang} />
      <MainHeader lang={lang} />
    </div>
  );
}

