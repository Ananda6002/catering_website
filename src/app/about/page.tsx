import type { Metadata } from "next";
import { site } from "@/content/site";
import { stats } from "@/content/collections";
import { PageHeader } from "@/components/layout/PageHeader";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story, people and standards behind Saffron & Sage — a catering company built around the people at the table.",
};

const values = [
  {
    title: "Cook like it's family",
    text: "Recipes earn their place on our menu the same way they earn it at home — by being requested again.",
  },
  {
    title: "Guests before theatre",
    text: "We love a beautiful table, but never at the cost of a hot plate in front of a hungry guest.",
  },
  {
    title: "Calm is a feature",
    text: "Events are stressful enough. Our crew arrives early, plans for weather and runs on checklists so you never have to worry.",
  },
  {
    title: "Honest numbers",
    text: "One quote, clearly itemised. If something changes, you hear it from us before it reaches your invoice.",
  },
];

const milestones = [
  { year: "2014", text: "First event — a 40-guest housewarming, one van, two cooks." },
  { year: "2017", text: "First 500-guest wedding; the mobile kitchen programme begins." },
  { year: "2020", text: "Launched corporate & boardroom service alongside celebrations." },
  { year: "2026", text: "500+ events, 40+ dish menu book, the same two founding cooks." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title={
          <>
            Built in a kitchen, <em className="text-saffron-deep">not a boardroom.</em>
          </>
        }
        lead={`${site.legalName} is a chef-led catering company in ${site.city}. We plan, cook and serve celebrations of every size — and we've been trusted to do it for over a decade.`}
      />

      {/* story split */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ImageReveal>
              <ImageSlot label="The founding team — photograph goes here" aspect="4/5" />
            </ImageReveal>
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <Reveal>
              <h2 className="display display-md text-ink">
                From one van to five hundred events — the same stubborn standard.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-7 max-w-xl space-y-5 text-[15px] leading-relaxed text-ink-soft">
                <p>
                  We started in 2014 because we kept hearing the same complaint:
                  caterers delivered food, but not care. Dishes arrived late,
                  lukewarm, or nothing like the tasting. We believed a catering
                  company could run like a good restaurant and a good family
                  kitchen at once.
                </p>
                <p>
                  Today our crews serve weddings, corporate gatherings and
                  family functions across the city — with menus written for
                  each occasion, kitchens that travel anywhere, and a service
                  team trained to read the room. The company has grown. The
                  standard hasn&apos;t moved.
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-ink/10 pt-10 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="display text-4xl text-ink">
                      <Counter value={s.value} suffix={s.suffix} />
                    </dt>
                    <dd className="mt-2 text-[11px] uppercase tracking-[0.2em] text-ink/55">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* values */}
      <section className="grain relative bg-espresso py-20 text-cream lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-saffron">What We Believe</p>
            <h2 className="display display-lg mt-4 max-w-2xl text-cream">
              Four rules we <em className="text-saffron">never bend.</em>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="border-t border-cream/15 pt-7">
                  <h3 className="display text-2xl text-cream">{v.title}</h3>
                  <p className="mt-3 max-w-md text-[14px] leading-relaxed text-cream/65">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-saffron-deep">The Journey</p>
            <h2 className="display display-lg mt-4 text-ink">
              Twelve years, one <em className="text-saffron-deep">appetite.</em>
            </h2>
          </Reveal>
          <ol className="mt-14">
            {milestones.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 70}>
                <div className="grid grid-cols-[80px_1fr] items-baseline gap-6 border-b border-ink/10 py-6 sm:grid-cols-[120px_1fr]">
                  <span className="display text-2xl text-saffron-deep">{m.year}</span>
                  <p className="max-w-2xl text-[15px] text-ink/80">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTA />
    </>
  );
}
