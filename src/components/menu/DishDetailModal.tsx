"use client";

import { useEffect } from "react";
import { MenuItem, menuCategories } from "@/content/menu";
import { DietDot } from "@/components/menu/DietDot";
import { cn } from "@/lib/utils";

type DishDetailModalProps = {
  dish: MenuItem | null;
  onClose: () => void;
  onSelectDishForQuote?: (dishName: string) => void;
};

export function DishDetailModal({ dish, onClose, onSelectDishForQuote }: DishDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (dish) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dish, onClose]);

  if (!dish) return null;

  const category = menuCategories.find((c) => c.id === dish.category);

  // Derive suitable event context based on diet & category
  const suitableEvents =
    dish.category === "starters" || dish.category === "beverages"
      ? ["Cocktail Nights & Sangeet", "Corporate Galas", "Reception Counters"]
      : dish.category === "breakfast"
      ? ["Morning Rituals & Puja", "Corporate Breakfasts", "Brunch Gatherings"]
      : dish.category === "desserts"
      ? ["Wedding Dinners", "Birthday Parties", "Anniversary Feasts"]
      : ["Grand Wedding Feasts", "Family Lunches", "Corporate Banquets"];

  const servingStyle =
    dish.signature || dish.category === "starters"
      ? "Live Chef Counter or Passed Service"
      : dish.category === "beverages"
      ? "Brewhouse Cart & Passed Glasses"
      : "Temperature-Controlled Buffet Spread";

  return (
    <div
      className="fixed inset-0 z-modal flex items-center justify-center bg-ink/70 p-4 backdrop-blur-xs transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
    >
      <div
        className="relative w-full max-w-lg border border-ink/20 bg-cream p-6 sm:p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center border border-ink/15 text-ink/60 transition-colors hover:border-ink hover:text-ink cursor-pointer"
          aria-label="Close dialog"
        >
          ✕
        </button>

        {/* Category & Diet badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow text-saffron">{category?.label ?? dish.category}</span>
          <span className="text-ink/30">•</span>
          <div className="flex items-center gap-1.5 text-[12px] uppercase tracking-wider font-medium text-ink-soft">
            <DietDot diet={dish.diet} />
            {dish.diet === "veg" ? "Vegetarian" : dish.diet === "non-veg" ? "Non-Vegetarian" : "Vegan"}
          </div>
          {dish.signature && (
            <span className="ml-auto inline-flex items-center gap-1 border border-saffron/40 bg-saffron/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-saffron-deep">
              <DietDot diet="signature" /> Chef Signature
            </span>
          )}
        </div>

        {/* Title */}
        <h3 id="dish-modal-title" className="display mt-3 text-[26px] font-medium text-ink">
          {dish.name}
        </h3>

        {/* Price / Quote Note */}
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-[15px] italic text-ink-soft font-serif">
            {dish.price ? `₹${dish.price} per portion` : "Included in customized event packages"}
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 text-[14.5px] leading-relaxed text-ink/80">{dish.description}</p>

        {/* Additional Details Grid */}
        <div className="mt-6 border-t border-b border-ink/10 py-4 space-y-3 text-[13px]">
          <div>
            <span className="font-medium text-ink">Serving Recommendation:</span>
            <p className="text-ink-soft mt-0.5">{servingStyle}</p>
          </div>

          <div>
            <span className="font-medium text-ink">Best Suited For:</span>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {suitableEvents.map((evt) => (
                <span
                  key={evt}
                  className="bg-parchment px-2.5 py-1 text-[11px] text-ink-soft border border-ink/10"
                >
                  {evt}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {onSelectDishForQuote && (
            <button
              type="button"
              onClick={() => {
                onSelectDishForQuote(dish.name);
                onClose();
              }}
              className="btn btn-solid flex-1 justify-center"
            >
              <span>Ask About This Dish</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "btn btn-outline justify-center",
              !onSelectDishForQuote && "w-full"
            )}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
