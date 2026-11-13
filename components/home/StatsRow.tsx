'use client';

import { useEffect, useRef, useState } from 'react';

interface StatConfig {
  label: string;
  value: number;
  suffix?: string;
}

const STATS_FR: StatConfig[] = [
  { label: "d'expérience", value: 10, suffix: '+ ans' },
  { label: 'satisfaction clients', value: 4.8, suffix: ' / 5' },
  { label: "délai d'intervention", value: 30, suffix: ' min' },
];

const STATS_NL: StatConfig[] = [
  { label: 'ervaring', value: 10, suffix: '+ jaar' },
  { label: 'klanttevredenheid', value: 4.8, suffix: ' / 5' },
  { label: 'interventietijd', value: 30, suffix: ' min' },
];

function useCountUp(target: number, duration = 1000) {
  const [current, setCurrent] = useState(0);
  const startedRef = useRef(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || startedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();

            const animate = (time: number) => {
              const progress = Math.min((time - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
              setCurrent(target * eased);
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, current };
}

function formatValue(value: number, original: number) {
  if (Number.isInteger(original)) {
    return Math.round(value).toString();
  }
  return value.toFixed(1);
}

function StatCell({ stat }: { stat: StatConfig }) {
  const { ref, current } = useCountUp(stat.value);
  return (
    <div ref={ref}>
      <div className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">
        {formatValue(current, stat.value)}
        {stat.suffix}
      </div>
      <div className="mt-1 text-xs md:text-sm text-slate-600">{stat.label}</div>
    </div>
  );
}

export default function StatsRow({ locale = 'fr' }: { locale?: 'fr' | 'nl' }) {
  const stats = locale === 'nl' ? STATS_NL : STATS_FR;
  return (
    <div className="mt-6 grid grid-cols-3 gap-4 text-center rounded-xl border border-slate-200 bg-white/70 px-4 py-4 shadow-sm backdrop-blur-sm">
      {stats.map((stat) => (
        <StatCell key={stat.label} stat={stat} />
      ))}
    </div>
  );
}

