import React from 'react';
import { Award, Zap, BadgeCheck, MapPin } from 'lucide-react';

interface HeroTrustStripProps {
  lang: 'fr' | 'nl';
}

const strips = {
  fr: [
    { icon: Award,      label: 'Partenaire certifié Vaillant',  sub: 'Belgique' },
    { icon: Zap,        label: "Service d'urgence Bruxelles",    sub: 'Intervention rapide' },
    { icon: BadgeCheck, label: 'Techniciens qualifiés',          sub: 'Formation fabricant' },
    { icon: MapPin,     label: '19 communes desservies',         sub: 'Toute la région' },
  ],
  nl: [
    { icon: Award,      label: 'Gecertificeerde Vaillant partner', sub: 'België' },
    { icon: Zap,        label: 'Spoedservice Brussel',             sub: 'Snelle interventie' },
    { icon: BadgeCheck, label: 'Gekwalificeerde technici',         sub: 'Fabrikanttraining' },
    { icon: MapPin,     label: '19 gemeenten bediend',             sub: 'Hele regio' },
  ],
};

export function HeroTrustStrip({ lang }: HeroTrustStripProps) {
  const items = strips[lang];

  return (
    <section className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-6 xl:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 py-5 px-5 hover:bg-gray-50 transition-colors group"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors">
                  <Icon size={18} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-gray-900 leading-tight">{item.label}</p>
                  <p className="text-[11.5px] text-gray-400 mt-0.5">{item.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
