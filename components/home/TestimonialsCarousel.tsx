'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  name: string;
  text: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Thomas V., Ixelles',
    text: "Ma chaudière Vaillant est tombée en panne un matin d'hiver froid. Vaillant a envoyé quelqu'un le jour même, le technicien a rapidement diagnostiqué le problème et remis le système en marche. Un service impressionnant.",
  },
  {
    name: 'Sophie M., Saint-Gilles',
    text: "Ils ont remplacé notre vieille chaudière par une nouvelle Vaillant. Travail soigné, communication très claire et aucun coût caché à la fin. À recommander absolument en Belgique.",
  },
  {
    name: 'Karim L., Anderlecht',
    text: "La fuite d'eau de la salle de bain a été rapidement localisée et réparée. Ils ont expliqué chaque étape et ont laissé l'endroit très propre. Une équipe de pros, ça se remarque.",
  },
  {
    name: 'Julie R., Uccle',
    text: "Entretien annuel de notre chaudière Vaillant réalisé avec beaucoup de sérieux. Le technicien a pris le temps d'expliquer les réglages et de répondre à toutes nos questions.",
  },
  {
    name: 'Marc D., Schaerbeek',
    text: "Intervention rapide un dimanche soir pour une panne totale de chauffage. Nous avons vraiment apprécié la réactivité et le professionnalisme de l'équipe.",
  },
  {
    name: 'Elena P., Woluwe-Saint-Lambert',
    text: "Installation complète d'un nouveau système de chauffage Vaillant. Chantier propre, délais respectés et résultat impeccable. Nous recommandons sans hésiter.",
  },
];

const VISIBLE_COUNT = 3;
const PAGE_COUNT = TESTIMONIALS.length - VISIBLE_COUNT + 1; // 6 - 3 + 1 = 4
const STEP_PERCENT = 100 / VISIBLE_COUNT; // ~33.333%

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0); // index of the first visible card

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % PAGE_COUNT);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + PAGE_COUNT) % PAGE_COUNT);
  };

  const goNext = () => {
    setIndex((prev) => (prev + 1) % PAGE_COUNT);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={goPrev}
        aria-label="Témoignages précédents"
        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:text-primary hover:border-primary/40 transition-colors"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        type="button"
        onClick={goNext}
        aria-label="Témoignages suivants"
        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:text-primary hover:border-primary/40 transition-colors"
      >
        <ChevronRight size={18} />
      </button>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * STEP_PERCENT}%)` }}
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              style={{ flex: `0 0 ${STEP_PERCENT}%` }}
              className="px-1"
            >
              <div className="testimonial-card h-full">
                <div className="stars">★★★★★</div>
                <p
                  style={{
                    fontStyle: 'italic',
                    fontSize: 'var(--text-sm)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  &quot;{t.text}&quot;
                </p>
                <div className="testimonial-author">— {t.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: PAGE_COUNT }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Voir le groupe de témoignages ${i + 1}`}
            className={`h-1.5 w-6 rounded-full transition-colors ${
              i === index ? 'bg-primary' : 'bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}



