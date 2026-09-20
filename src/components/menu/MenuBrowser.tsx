"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { menuCategories, menuItems, MenuItem } from "@/content/menu";
import { cn } from "@/lib/utils";
import { DietDot } from "@/components/menu/DietDot";
import { DishDetailModal } from "@/components/menu/DishDetailModal";

export function MenuBrowser() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [dietFilter, setDietFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const filteredDishes = useMemo(() => {
    return menuItems.filter((item) => {
      // Category check
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }
      // Diet check
      if (dietFilter === "veg" && item.diet !== "veg" && item.diet !== "vegan") {
        return false;
      }
      if (dietFilter === "non-veg" && item.diet !== "non-veg") {
        return false;
      }
      if (dietFilter === "vegan" && item.diet !== "vegan") {
        return false;
      }
      if (dietFilter === "signature" && !item.signature) {
        return false;
      }
      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        if (!matchName && !matchDesc) return false;
      }
      return true;
    });
  }, [activeCategory, dietFilter, searchQuery]);

  const handleSelectDishForQuote = (dishName: string) => {
    router.push(`/contact?details=${encodeURIComponent(`Enquiring about dish: ${dishName}`)}`);
  };

  return (
    <div>
      {/* Search & Filter Bar */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g., Biryani, Paneer, Dahi...)"
              className="w-full border border-ink/20 bg-parchment/60 py-2.5 pl-9 pr-4 text-[13.5px] text-ink placeholder:text-ink/40 focus:border-saffron focus:bg-cream focus:outline-none transition-colors"
            />
            <svg
              className="absolute left-3 top-3 h-4 w-4 text-ink/40"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-ink/40 hover:text-ink cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Diet Quick Filters */}
          <div className="flex flex-wrap items-center gap-1.5 text-[12px]">
            {[
              { id: "all", label: "All Diets" },
              { id: "veg", label: "Veg Only" },
              { id: "non-veg", label: "Non-Veg" },
              { id: "vegan", label: "Vegan" },
              { id: "signature", label: "★ Signatures" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setDietFilter(f.id)}
                className={cn(
                  "px-3 py-1.5 font-medium transition-colors border cursor-pointer",
                  dietFilter === f.id
                    ? "border-saffron bg-saffron text-cream"
                    : "border-ink/15 bg-parchment/60 text-ink-soft hover:border-ink/30"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div
        className="flex gap-x-6 gap-y-3 overflow-x-auto border-b border-ink/15 pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Menu categories"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
          className={cn(
            "relative shrink-0 cursor-pointer pb-4 text-[12px] uppercase tracking-[0.2em] transition-colors duration-300",
            activeCategory === "all" ? "text-ink font-semibold" : "text-ink/45 hover:text-ink/75"
          )}
        >
          All Courses
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-saffron transition-transform duration-300",
              activeCategory === "all" ? "scale-x-100" : "scale-x-0"
            )}
          />
        </button>

        {menuCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={activeCategory === c.id}
            onClick={() => setActiveCategory(c.id)}
            className={cn(
              "relative shrink-0 cursor-pointer pb-4 text-[12px] uppercase tracking-[0.2em] transition-colors duration-300",
              activeCategory === c.id ? "text-ink font-semibold" : "text-ink/45 hover:text-ink/75"
            )}
          >
            {c.label}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-saffron transition-transform duration-300",
                activeCategory === c.id ? "scale-x-100" : "scale-x-0"
              )}
            />
          </button>
        ))}
      </div>

      {/* Results Count & Active Note */}
      <div className="mt-4 flex items-center justify-between text-[12px] text-ink-soft">
        <span>
          Showing <strong>{filteredDishes.length}</strong> items
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        <span className="italic">Click any dish for details</span>
      </div>

      {/* Dishes Grid */}
      <ul className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-2">
        {filteredDishes.map((d) => (
          <li key={d.name}>
            <button
              type="button"
              onClick={() => setSelectedDish(d)}
              className="group flex w-full text-left gap-4 p-3.5 border border-ink/10 bg-parchment/30 hover:border-saffron/60 hover:bg-cream transition-all duration-300 cursor-pointer"
            >
              {/* Dish Icon Box */}
              <div className="hidden h-16 w-16 flex-none sm:flex items-center justify-center border border-ink/15 bg-parchment group-hover:border-saffron/40 transition-colors">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-ink/30 group-hover:text-saffron transition-colors" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M8 13.5c1 1.2 2.5 2 4 2s3-.8 4-2" />
                  <circle cx="9.5" cy="10" r="0.4" />
                  <circle cx="14.5" cy="10" r="0.4" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="flex items-center gap-2 text-[15px] font-medium text-ink group-hover:text-saffron-deep transition-colors">
                    {d.name}
                    {d.signature && <DietDot diet="signature" />}
                    <DietDot diet={d.diet} />
                  </span>
                  <span className="text-[12.5px] italic text-ink/60 flex-none">
                    {d.price ? `₹${d.price}` : "on request"}
                  </span>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-soft line-clamp-2">
                  {d.description}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-saffron group-hover:underline">
                  View details &rarr;
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {filteredDishes.length === 0 && (
        <div className="mt-12 text-center p-8 border border-dashed border-ink/20">
          <p className="text-[14px] text-ink-soft">
            No dishes found matching your selected filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("all");
              setDietFilter("all");
              setSearchQuery("");
            }}
            className="mt-3 text-[12px] uppercase tracking-wider text-saffron font-medium hover:underline cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      )}

      {/* Legend */}
      <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink/10 pt-6 text-[11px] uppercase tracking-[0.18em] text-ink/55">
        <span className="flex items-center gap-2"><DietDot diet="veg" /> Vegetarian</span>
        <span className="flex items-center gap-2"><DietDot diet="non-veg" /> Non-vegetarian</span>
        <span className="flex items-center gap-2"><DietDot diet="vegan" /> Vegan</span>
        <span className="flex items-center gap-2"><DietDot diet="signature" /> Chef Signature</span>
      </div>

      {/* Dish Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onSelectDishForQuote={handleSelectDishForQuote}
      />
    </div>
  );
}
