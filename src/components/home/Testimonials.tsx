"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/content/collections";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  const [active, setActive] = useState(0);

  // gentle auto-advance; respects reduced motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="grain relative border-y border-cream/10 bg-espresso py-24 text-cream lg:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow text-saffron">Kind Words</p>
            <h2 className="display display-lg mt-4 text-cream">
              What hosts <em className="text-saffron">remember.</em>
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-14 min-h-[240px] sm:min-h-[220px]">
          {testimonials.map((t, i) => (
            <figure
              key={t.author}
              aria-hidden={i !== active}
              className={cn(
                "absolute inset-0 flex flex-col items-center text-center transition-all duration-700",
                i === active
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-3 opacity-0"
              )}
            >
              <span aria-hidden="true" className="display text-6xl leading-none text-saffron">
                &ldquo;
              </span>
              <blockquote className="display mt-4 text-2xl italic leading-snug text-cream/90 sm:text-[1.7rem]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-7">
                <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-cream">
                  {t.author}
                </p>
                <p className="mt-1 text-[12px] text-cream/50">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* controls */}
        <div className="mt-6 flex items-center justify-center gap-3">
          {testimonials.map((t, i) => (
            <button
              key={t.author}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-pressed={i === active}
              className={cn(
                "h-1.5 cursor-pointer transition-all duration-400",
                i === active ? "w-8 bg-saffron" : "w-4 bg-cream/25 hover:bg-cream/50"
              )}
            />
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-10 text-center text-[11px] uppercase tracking-[0.24em] text-cream/35">
            Sample reviews shown — real client testimonials will replace these
          </p>
        </Reveal>
      </div>
    </section>
  );
}
