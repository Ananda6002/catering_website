"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    step: "01",
    title: "Tasting & Menu Crafting",
    subtitle: "Creating your bespoke menu story",
    desc: "We host an intimate tasting session at our kitchen or your home. Every starter, main course, and sweet finish is tuned to family recipes and corporate expectations.",
    highlights: ["Private tasting for up to 6 guests", "Custom spice level tuning", "Dietary & Jain segregation planning"],
    icon: "📜",
  },
  {
    step: "02",
    title: "Fresh Sourcing & Prep",
    subtitle: "Zero frozen base, 100% fresh batch cooking",
    desc: "Starting at 4:00 AM on event day, our master chefs source fresh produce, stone-grind gravies, and prepare marinades so dishes carry peak aroma.",
    highlights: ["Market-fresh ingredient sourcing", "In-house spice blending", "Hygienic batch preparation"],
    icon: "🌿",
  },
  {
    step: "03",
    title: "Logistics & Tablescapes",
    subtitle: "Transforming the venue before guests arrive",
    desc: "Our logistics team arrives hours prior with insulated hot boxes, brass chafers, linen, and floral accents. We set up an elegant dining space matching your theme.",
    highlights: ["Temperature-controlled transport", "Custom linen & brassware", "Designated live-station zoning"],
    icon: "🎪",
  },
  {
    step: "04",
    title: "Live Counters & Service",
    subtitle: "Gracious hospitality on the floor",
    desc: "Hot dosas, charred kebabs, and chilled coolers served live. Uniformed captains ensure zero queue bottlenecks and elders receive priority table service.",
    highlights: ["Chef-attended live stations", "Uniformed, trained serving crew", "Elders-first table hospitality"],
    icon: "🔥",
  },
  {
    step: "05",
    title: "Quiet Cleanup & Wrap-Up",
    subtitle: "You host the guests, we take care of the rest",
    desc: "As the event closes, our crew quietly clears tables, packs excess pristine food into eco-friendly containers for the family, and leaves the venue spotless.",
    highlights: ["Complete venue cleaning", "Food preservation packaging", "Zero hassle for the host"],
    icon: "✨",
  },
];

export function EventStoryTimeline() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="border border-ink/20 bg-cream p-6 md:p-10 shadow-sm">
      <div className="text-center max-w-2xl mx-auto">
        <span className="eyebrow text-saffron">Behind The Scenes</span>
        <h2 className="display mt-1 text-[28px] md:text-[36px] font-semibold text-ink">
          The Journey of an Event
        </h2>
        <p className="mt-2 text-[14px] text-ink-soft leading-relaxed">
          From first tasting to final venue sweep — see how our team executes high-stakes catering seamlessly.
        </p>
      </div>

      {/* Stage Selector Tabs */}
      <div className="mt-8 flex flex-wrap justify-center gap-2 border-b border-ink/15 pb-4">
        {STAGES.map((s, idx) => {
          const isActive = activeStage === idx;
          return (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStage(idx)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 text-[12px] uppercase tracking-wider font-medium transition-all cursor-pointer border",
                isActive
                  ? "border-saffron bg-saffron text-cream"
                  : "border-ink/15 bg-parchment/60 text-ink-soft hover:border-ink/30"
              )}
            >
              <span>{s.step}.</span>
              <span>{s.title.split(" & ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail Showcase */}
      <div className="mt-8 grid gap-8 md:grid-cols-12 items-center">
        {/* Stage Content */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center border border-saffron/40 bg-saffron/10 text-2xl">
              {STAGES[activeStage].icon}
            </span>
            <div>
              <span className="eyebrow text-saffron">Stage {STAGES[activeStage].step} of 05</span>
              <h3 className="display text-[24px] font-medium text-ink">
                {STAGES[activeStage].title}
              </h3>
            </div>
          </div>

          <p className="text-[13px] font-medium italic text-saffron-deep">
            &ldquo;{STAGES[activeStage].subtitle}&rdquo;
          </p>

          <p className="text-[14.5px] leading-relaxed text-ink/80">
            {STAGES[activeStage].desc}
          </p>

          <div className="pt-2 space-y-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-ink-soft">
              Key Service Guarantees:
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] text-ink">
              {STAGES[activeStage].highlights.map((item) => (
                <li key={item} className="flex items-center gap-2 bg-parchment/50 p-2 border border-ink/10">
                  <span className="text-saffron">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Visual Slot Box */}
        <div className="md:col-span-5">
          <div className="relative aspect-4/3 w-full border border-ink/20 bg-parchment p-6 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-ink/15 pb-3">
              <span className="text-[11px] uppercase tracking-widest text-ink/40 font-mono">
                STAGE_{STAGES[activeStage].step}
              </span>
              <span className="text-xs text-saffron font-serif italic">Nandi Caterers Execution</span>
            </div>

            <div className="my-auto text-center space-y-2 py-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream border border-saffron/30 text-3xl shadow-sm">
                {STAGES[activeStage].icon}
              </div>
              <h4 className="display text-[20px] text-ink">{STAGES[activeStage].title}</h4>
              <p className="text-[12px] text-ink-soft max-w-xs mx-auto">
                Step {activeStage + 1} in our 5-phase catering quality checklist.
              </p>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-1.5 border-t border-ink/15 pt-3">
              {STAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveStage(i)}
                  className={cn(
                    "h-2 transition-all cursor-pointer",
                    activeStage === i ? "w-6 bg-saffron" : "w-2 bg-ink/20 hover:bg-ink/40"
                  )}
                  aria-label={`Go to stage ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
