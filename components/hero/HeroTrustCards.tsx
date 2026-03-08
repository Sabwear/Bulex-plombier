import React from 'react';
import { Award, Zap, BadgeCheck } from 'lucide-react';

interface HeroTrustCardsProps {
  lang: 'fr' | 'nl';
}

const cards = {
  fr: [
    {
      icon: Award,
      title: 'Partenaire certifié Vaillant',
      desc: 'Officiellement reconnu par Vaillant en Belgique',
    },
    {
      icon: Zap,
      title: 'Intervention rapide à Bruxelles',
      desc: 'Dépannage express dans tout Bruxelles',
    },
    {
      icon: BadgeCheck,
      title: 'Techniciens qualifiés',
      desc: 'Expertise certifiée sur tous les systèmes Vaillant',
    },
  ],
  nl: [
    {
      icon: Award,
      title: 'Gecertificeerde Vaillant partner',
      desc: 'Officieel erkend door Vaillant in België',
    },
    {
      icon: Zap,
      title: 'Snelle interventie in Brussel',
      desc: 'Spoedservice door heel Brussel',
    },
    {
      icon: BadgeCheck,
      title: 'Gekwalificeerde technici',
      desc: 'Gecertificeerde expertise voor alle Vaillant systemen',
    },
  ],
};

export function HeroTrustCards({ lang }: HeroTrustCardsProps) {
  const items = cards[lang];

  return (
    <div className="flex flex-col gap-3 w-full lg:max-w-[280px] xl:max-w-[300px]">
      {items.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="flex items-start gap-3.5 bg-gray-900/40 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-gray-900/60 transition-colors"
          >
            <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/25 flex items-center justify-center">
              <Icon size={17} className="text-primary-300" style={{ color: '#4dd9c8' }} />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white leading-snug">{card.title}</p>
              <p className="text-[11.5px] text-gray-300/80 mt-0.5 leading-snug">{card.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
