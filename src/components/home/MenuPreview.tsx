import Link from "next/link";
import { menuItems } from "@/content/menu";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/primitives";
import { DietDot } from "@/components/menu/DietDot";

const picks = [
  { title: "To begin", category: "starters" },
  { title: "The mains", category: "main-course" },
  { title: "Sweet finishes", category: "desserts" },
] as const;

export function MenuPreview() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="From the Menu Book"
            title={
              <>
                A table with <em className="text-saffron-deep">many voices.</em>
              </>
            }
            lead="A small taste of our repertoire — the full book runs to forty dishes across seven courses and every kind of gathering."
          />
        </Reveal>

        {/* three editorial columns, like a menu card */}
        <div className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-3">
          {picks.map((pick, colIdx) => {
            const dishes = menuItems
              .filter((m) => m.category === pick.category)
              .slice(0, 3);
            return (
              <Reveal key={pick.category} delay={colIdx * 120}>
                <div>
                  <h3 className="display border-b border-ink/15 pb-4 text-center text-2xl italic text-ink">
                    {pick.title}
                  </h3>
                  <ul className="mt-6 space-y-6">
                    {dishes.map((d) => (
                      <li key={d.name}>
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="flex items-center gap-2 text-[15px] font-medium text-ink">
                            {d.name}
                            {d.signature && (
                              <span aria-label="Chef's signature" title="Chef's signature">
                                <DietDot diet="signature" />
                              </span>
                            )}
                            <DietDot diet={d.diet} />
                          </span>
                          <span className="hidden flex-1 border-b border-dotted border-ink/25 sm:block" aria-hidden="true" />
                          <span className="text-[13px] italic text-ink/60">
                            {d.price ? `₹${d.price}` : "on request"}
                          </span>
                        </div>
                        <p className="mt-1 pr-6 text-[13px] leading-relaxed text-ink-soft">
                          {d.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={150}>
          <div className="mt-16 flex justify-center">
            <Link href="/menu" className="btn-outline">
              View the Full Menu
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
