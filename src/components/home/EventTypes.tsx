import Link from "next/link";
import { eventTypes } from "@/content/collections";
import { Reveal } from "@/components/ui/Reveal";

export function EventTypes() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-24 text-cream lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div className="max-w-xl">
              <p className="eyebrow mb-4 text-saffron">Occasions</p>
              <h2 className="display display-lg text-cream">
                Every table has a <em className="text-saffron">story.</em>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-[220px] text-[12px] uppercase tracking-[0.2em] text-cream/45">
              Scroll sideways — drag, swipe or use the arrows below
            </p>
          </Reveal>
        </div>
      </div>

      {/* horizontal rail bleeding off the right edge */}
      <Reveal delay={120}>
        <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {eventTypes.map((e, i) => (
            <article
              key={e.id}
              className="group w-[280px] flex-none snap-start border border-cream/15 bg-cream/[0.04] p-7 transition-colors duration-300 hover:border-saffron/60 hover:bg-cream/[0.07] sm:w-[320px]"
            >
              <span className="display text-sm text-saffron/70">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-4 text-3xl text-cream">{e.name}</h3>
              <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-saffron/80">{e.caption}</p>
              <p className="mt-4 text-[13.5px] leading-relaxed text-cream/60">{e.detail}</p>
              <Link
                href={`/contact?event=${encodeURIComponent(e.name)}#quote`}
                className="link-underline mt-6 inline-block text-cream/70 transition-colors group-hover:text-saffron"
              >
                Plan this
              </Link>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
