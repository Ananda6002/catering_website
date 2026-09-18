import { site } from "@/content/site";
import { stats } from "@/content/collections";
import { Counter } from "@/components/ui/Counter";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/primitives";

export function Story() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* image column */}
        <div className="relative order-2 lg:order-1 lg:col-span-5">
          <ImageReveal>
            <ImageSlot label="Our chefs at work — photograph goes here" aspect="4/5" />
          </ImageReveal>
          <div className="absolute -bottom-8 right-4 hidden w-44 sm:block lg:-right-6">
            <ImageReveal className="border-4 border-paper">
              <ImageSlot label="Plating detail" aspect="1/1" />
            </ImageReveal>
          </div>
        </div>

        {/* copy column */}
        <div className="order-1 lg:order-2 lg:col-span-7 lg:pl-8">
          <Reveal>
            <SectionHeading
              eyebrow="Our Story"
              title={
                <>
                  A small kitchen with <em className="text-saffron-deep">very high</em> standards.
                </>
              }
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-7 max-w-xl space-y-5 text-[15px] leading-relaxed text-ink-soft">
              <p>
                {site.legalName} began in 2014 with one van, two cooks and a
                stubborn belief: catering should taste like someone&apos;s best
                home cooking — just for three hundred people.
              </p>
              <p>
                Twelve years and five hundred events later, we still plan every
                menu the same way: around the people at the table. The
                grandmother who wants her filter coffee strong. The cousin
                flying in who asks for a particular biryani. The boardroom that
                needs lunch at 12:45, sharp.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <blockquote className="mt-9 border-l-2 border-saffron pl-6">
              <p className="display text-2xl italic leading-snug text-ink">
                &ldquo;We don&apos;t serve dishes. We serve the moment they
                arrive in.&rdquo;
              </p>
              <cite className="mt-3 block text-[12px] uppercase not-italic tracking-[0.22em] text-ink/55">
                — Chef Proprietor, {site.name}
              </cite>
            </blockquote>
          </Reveal>

          {/* stats */}
          <Reveal delay={240}>
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
  );
}
