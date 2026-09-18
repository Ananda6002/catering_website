import { Reveal } from "@/components/ui/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SectionHeading } from "@/components/ui/primitives";

const reasons = [
  {
    title: "Menus written for you, not from a card",
    text: "Every event gets its own menu conversation — regional roots, family favourites, dietary needs — then a tasting to prove it.",
  },
  {
    title: "A kitchen that travels",
    text: "Lawns, terraces, farmhouses, convention centres. We bring water, power, stoves and crew; you bring the guests.",
  },
  {
    title: "Service that reads the room",
    text: "Uniformed captains and servers who know when to refill, when to pause, and when to simply stay out of the photograph.",
  },
  {
    title: "Numbers you can plan around",
    text: "One transparent quote covering food, staff, setup and rentals. No line-item surprises after the last plate is cleared.",
  },
];

export function WhyUs() {
  return (
    <section className="border-y border-ink/10 bg-parchment py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        {/* sticky intro */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <SectionHeading
                eyebrow="Why Saffron & Sage"
                title={
                  <>
                    Chosen for the food. <br />
                    Rebooked for the <em className="text-saffron-deep">calm.</em>
                  </>
                }
                lead="Anyone can promise a good menu. The difference shows up at 6 a.m. on event day — and it's the reason most of our bookings come from people who have eaten with us before."
              />
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-10 hidden max-w-xs lg:block">
                <ImageSlot label="Event day setup — photograph goes here" aspect="5/4" />
              </div>
            </Reveal>
          </div>
        </div>

        {/* feature rows */}
        <ol className="lg:col-span-7">
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 80}>
              <div className="flex gap-6 border-b border-ink/10 py-8 first:pt-0 sm:gap-10">
                <span className="display pt-1 text-lg text-saffron-deep/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display text-2xl text-ink">{r.title}</h3>
                  <p className="mt-2 max-w-lg text-[14.5px] leading-relaxed text-ink-soft">
                    {r.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
