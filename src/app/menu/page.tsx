import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse our catering menu by course — breakfast, starters, mains, rice, breads, desserts and beverages. Final menus are designed with you at the tasting.",
};

const steps = [
  {
    n: "01",
    title: "Tell us the occasion",
    text: "Guest count, venue, date and the mood — we start from your event, not a fixed list.",
  },
  {
    n: "02",
    title: "We draft the menu",
    text: "A proposed menu arrives within a day, tuned to regional tastes and dietary needs.",
  },
  {
    n: "03",
    title: "You taste it",
    text: "Come to a tasting. Adjust anything — heat, sweetness, portions, plating.",
  },
  {
    n: "04",
    title: "We serve it hot",
    text: "On the day, our travelling kitchen and crew take over completely.",
  },
];

export default function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Menu Book"
        title={
          <>
            Courses with <em className="text-saffron-deep">character.</em>
          </>
        }
        lead="Forty dishes across seven courses — every one cooked to order on event day. Browse by course, then tell us what your table needs."
      />

      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <MenuBrowser />
          </Reveal>
        </div>
      </section>

      {/* how it works */}
      <section className="border-y border-ink/10 bg-parchment py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-saffron-deep">From Enquiry to Table</p>
            <h2 className="display display-lg mt-4 text-ink">
              How a menu <em className="text-saffron-deep">comes together.</em>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="border-t-2 border-ink/70 pt-6">
                  <span className="display text-lg text-saffron-deep">{s.n}</span>
                  <h3 className="display mt-2 text-xl text-ink">{s.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">{s.text}</p>
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
