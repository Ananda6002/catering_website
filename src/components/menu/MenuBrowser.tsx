"use client";

import { useMemo, useState } from "react";
import { menuCategories, menuItems } from "@/content/menu";
import { cn } from "@/lib/utils";
import { DietDot } from "@/components/menu/DietDot";

export function MenuBrowser() {
  const [active, setActive] = useState(menuCategories[0].id);

  const dishes = useMemo(
    () => menuItems.filter((m) => m.category === active),
    [active]
  );
  const category = menuCategories.find((c) => c.id === active)!;

  return (
    <div>
      {/* category tabs — underline style, not pill buttons */}
      <div
        className="flex gap-x-7 gap-y-3 overflow-x-auto border-b border-ink/15 pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Menu categories"
      >
        {menuCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={active === c.id}
            onClick={() => setActive(c.id)}
            className={cn(
              "relative shrink-0 cursor-pointer pb-4 text-[12px] uppercase tracking-[0.2em] transition-colors duration-300",
              active === c.id ? "text-ink" : "text-ink/45 hover:text-ink/75"
            )}
          >
            {c.label}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-saffron transition-transform duration-400",
                active === c.id ? "scale-x-100" : "scale-x-0"
              )}
            />
          </button>
        ))}
      </div>

      {/* category note */}
      <p className="mt-6 text-[13px] italic text-ink-soft">{category.note}</p>

      {/* dishes */}
      <ul key={active} className="mt-8 grid gap-x-14 gap-y-9 md:grid-cols-2">
        {dishes.map((d) => (
          <li key={d.name} className="flex gap-5">
            {/* small square image slot per dish */}
            <div className="hidden h-20 w-20 flex-none sm:block">
              <div className="flex h-full w-full items-center justify-center border border-ink/15 bg-parchment">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink/25" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M8 13.5c1 1.2 2.5 2 4 2s3-.8 4-2" />
                  <circle cx="9.5" cy="10" r="0.4" />
                  <circle cx="14.5" cy="10" r="0.4" />
                </svg>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <span className="flex items-center gap-2 text-[15.5px] font-medium text-ink">
                  {d.name}
                  {d.signature && <DietDot diet="signature" />}
                  <DietDot diet={d.diet} />
                </span>
                <span className="hidden flex-1 border-b border-dotted border-ink/25 sm:block" aria-hidden="true" />
                <span className="text-[13px] italic text-ink/60">
                  {d.price ? `₹${d.price}` : "on request"}
                </span>
              </div>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">{d.description}</p>
            </div>
          </li>
        ))}
      </ul>

      {dishes.length === 0 && (
        <p className="mt-12 text-center text-[14px] text-ink-soft">
          Dishes for this course are being finalised — ask us for the current menu.
        </p>
      )}

      {/* legend */}
      <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink/10 pt-6 text-[11px] uppercase tracking-[0.18em] text-ink/55">
        <span className="flex items-center gap-2"><DietDot diet="veg" /> Vegetarian</span>
        <span className="flex items-center gap-2"><DietDot diet="non-veg" /> Non-vegetarian</span>
        <span className="flex items-center gap-2"><DietDot diet="vegan" /> Vegan</span>
        <span className="flex items-center gap-2"><DietDot diet="signature" /> Chef&apos;s signature</span>
        <span className="ml-auto normal-case tracking-normal text-ink/40">
          Sample menu — final dishes &amp; pricing confirmed at tasting
        </span>
      </div>
    </div>
  );
}
