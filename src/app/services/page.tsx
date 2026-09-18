import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/collections";
import { PageHeader } from "@/components/layout/PageHeader";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/home/CTA";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Wedding, corporate, birthday, family, housewarming and outdoor catering — full-service event catering across every kind of occasion.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title={
          <>
            Whatever the occasion, <em className="text-saffron-deep">the table is ready.</em>
          </>
        }
        lead="Six services, one standard. Each engagement gets its own menu conversation, tasting and event captain."
      />

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl space-y-20 px-5 sm:px-8 lg:space-y-28">
          {services.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              {/* image */}
              <ImageReveal className={cn(i % 2 === 1 && "lg:order-2")}>
                <ImageSlot label={`${s.title} — photograph goes here`} aspect="16/11" />
              </ImageReveal>

              {/* copy */}
              <Reveal delay={80}>
                <div>
                  <p className="display text-lg text-saffron-deep/80">{s.index}</p>
                  <h2 className="display display-md mt-3 text-ink">{s.title}</h2>
                  <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft">
                    {s.blurb}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-[14px] text-ink/80">
                        <span aria-hidden="true" className="h-1.5 w-1.5 flex-none rotate-45 bg-saffron" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?event=${encodeURIComponent(s.title)}#quote`}
                    className="link-underline mt-7 inline-block text-saffron-deep"
                  >
                    Enquire about {s.title.toLowerCase()}
                  </Link>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
