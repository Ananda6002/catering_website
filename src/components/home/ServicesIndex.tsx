import Link from "next/link";
import { services } from "@/content/collections";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/primitives";

export function ServicesIndex() {
  return (
    <section className="grain relative bg-espresso py-24 text-cream lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="What We Do"
              title={
                <>
                  Six ways we take the kitchen <em className="text-saffron">off your hands.</em>
                </>
              }
            />
          </Reveal>
          <Reveal delay={120}>
            <Link href="/services" className="link-underline shrink-0 text-cream/80">
              All Services
            </Link>
          </Reveal>
        </div>

        <ol className="mt-16 border-t border-cream/15">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i * 60}>
              <Link
                href={`/services#${s.id}`}
                className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-3 border-b border-cream/15 py-7 transition-colors duration-300 hover:bg-cream/[0.03] sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-x-10"
              >
                <span className="display text-lg text-saffron/80">{s.index}</span>
                <span>
                  <span className="display block text-2xl transition-colors duration-300 group-hover:text-saffron sm:text-3xl">
                    {s.title}
                  </span>
                  <span className="mt-1 block max-w-xl text-[13.5px] leading-relaxed text-cream/60">
                    {s.blurb}
                  </span>
                </span>
                <span className="col-span-2 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-cream/45 transition-colors duration-300 group-hover:text-saffron sm:col-span-1">
                  <span className="hidden md:inline">Enquire</span>
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2 8h11M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
