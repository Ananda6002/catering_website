import type { Metadata } from "next";
import { packages } from "@/content/collections";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/home/CTA";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Catering packages for every scale — The Gathering, The Celebration and The Grand Table. All packages are customised to your event.",
};

const faqs = [
  {
    q: "Can we mix dishes from different packages?",
    a: "Absolutely. Packages are a starting point — the final menu is written with you at the tasting.",
  },
  {
    q: "Do you serve outside your city?",
    a: "Yes. Our mobile kitchens travel to farmhouses, resorts and destinations within the region. Travel costs are quoted upfront.",
  },
  {
    q: "How far in advance should we book?",
    a: "For weddings, 2–3 months is comfortable. For everything else, 3–4 weeks usually works — and we always try to fit last-minute dates.",
  },
  {
    q: "Is staffing included in the quote?",
    a: "Every package includes uniformed service staff and an event captain. Rentals and decor are itemised transparently.",
  },
];

export default function PackagesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catering Packages"
        title={
          <>
            Pick a shape. <em className="text-saffron-deep">We&apos;ll fill the table.</em>
          </>
        }
        lead="Three thoughtfully-scoped packages — each one a starting point for a menu built around your occasion."
      />

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <article
                  className={cn(
                    "flex h-full flex-col p-9",
                    p.featured
                      ? "grain relative bg-espresso text-cream lg:-my-4"
                      : "border border-ink/15 bg-cream"
                  )}
                >
                  {p.featured && (
                    <p className="eyebrow mb-4 text-saffron">Most chosen</p>
                  )}
                  <h2 className={cn("display text-3xl", p.featured ? "text-cream" : "text-ink")}>
                    {p.name}
                  </h2>
                  <p className={cn("mt-1 text-[13px] italic", p.featured ? "text-cream/60" : "text-ink-soft")}>
                    {p.tagline}
                  </p>

                  <dl className={cn("mt-6 grid grid-cols-2 gap-4 border-t pt-5 text-[12px]", p.featured ? "border-cream/15" : "border-ink/10")}>
                    <div>
                      <dt className={cn("eyebrow text-[9px]", p.featured ? "text-cream/50" : "text-ink/45")}>Suited for</dt>
                      <dd className={cn("mt-1.5", p.featured ? "text-cream/85" : "text-ink/80")}>{p.suitedFor}</dd>
                    </div>
                    <div>
                      <dt className={cn("eyebrow text-[9px]", p.featured ? "text-cream/50" : "text-ink/45")}>Guests</dt>
                      <dd className={cn("mt-1.5", p.featured ? "text-cream/85" : "text-ink/80")}>{p.guests}</dd>
                    </div>
                  </dl>

                  <ul className="mt-7 flex-1 space-y-3.5">
                    {p.features.map((f) => (
                      <li key={f} className={cn("flex items-start gap-3 text-[13.5px]", p.featured ? "text-cream/80" : "text-ink/80")}>
                        <span aria-hidden="true" className={cn("mt-1.5 h-1.5 w-1.5 flex-none rotate-45", p.featured ? "bg-saffron" : "bg-saffron-deep")} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={cn("mt-8 border-t pt-6", p.featured ? "border-cream/15" : "border-ink/10")}>
                    <p className={cn("display text-2xl", p.featured ? "text-saffron" : "text-ink")}>{p.price}</p>
                    <a
                      href={`/contact?package=${p.id}#quote`}
                      className={cn(
                        "btn mt-6 w-full",
                        p.featured ? "bg-saffron text-espresso hover:bg-cream" : "btn-outline"
                      )}
                    >
                      Enquire
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-ink/10 bg-parchment py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-saffron-deep">Good to Know</p>
            <h2 className="display display-lg mt-4 text-ink">
              Questions we <em className="text-saffron-deep">hear often.</em>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-x-14 gap-y-10 sm:grid-cols-2">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 70}>
                <div className="border-t border-ink/15 pt-6">
                  <h3 className="display text-xl text-ink">{f.q}</h3>
                  <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-ink-soft">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
