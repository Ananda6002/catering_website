"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export type EventConfig = {
  eventType: string;
  guests: number;
  foodPref: string;
  serviceLevel: string;
  addOns: string[];
};

const EVENT_TYPES = [
  { id: "Wedding", label: "Wedding", icon: "💍", desc: "Multi-day feasts & grand receptions" },
  { id: "Birthday", label: "Birthday", icon: "🎂", desc: "Cake tables & live food counters" },
  { id: "Corporate", label: "Corporate", icon: "🏢", desc: "Boardroom lunches & galas" },
  { id: "Housewarming", label: "Housewarming", icon: "🏡", desc: "Warm spreads for a new home" },
  { id: "Family Function", label: "Family Function", icon: "🪔", desc: "Traditional ceremonial feasts" },
  { id: "Outdoor / Other", label: "Outdoor / Other", icon: "🌴", desc: "Lawn & farmhouse gatherings" },
];

const GUEST_PRESETS = [50, 100, 250, 500, 1000];

const FOOD_PREFS = [
  { id: "Pure Vegetarian", label: "Pure Vegetarian", note: "Authentic & satvik options available" },
  { id: "Vegetarian + Non-Vegetarian", label: "Veg + Non-Veg", note: "Dual kitchens & separate serving" },
  { id: "Vegan Options Included", label: "Vegan Friendly", note: "Plant-based delicacies" },
  { id: "Jain / No Onion-Garlic", label: "Jain Special", note: "Strict dietary preparation" },
];

const SERVICE_LEVELS = [
  {
    id: "Food Only (Buffet Trays)",
    title: "Food Only",
    badge: "Delivery",
    desc: "Freshly cooked, temperature-sealed hot trays delivered to your venue.",
  },
  {
    id: "Food + Serving Staff",
    title: "Food + Staff",
    badge: "Popular",
    desc: "Delicious spread with uniformed captains & serving crew for smooth flow.",
  },
  {
    id: "Full Catering Service",
    title: "Full Catering",
    badge: "End-to-End",
    desc: "Complete setup: live counters, tableware, linen, serving staff & cleanup.",
  },
];

const ADD_ONS = [
  { id: "Welcome Drinks", label: "Welcome Drinks & Coolers" },
  { id: "Live Chaat Counter", label: "Live Chaat / Street Food Counter" },
  { id: "Starters & Canapés", label: "Passed Starters & Canapés" },
  { id: "Dessert Bar", label: "Dessert Bar & Sweets" },
  { id: "Mocktail Bar", label: "Artisanal Mocktail Counter" },
  { id: "Table & Floral Setup", label: "Linen, Tableware & Floral Accents" },
];

export function EventBuilder({ className }: { className?: string }) {
  const router = useRouter();

  const [eventType, setEventType] = useState("Wedding");
  const [guests, setGuests] = useState(150);
  const [foodPref, setFoodPref] = useState("Vegetarian + Non-Vegetarian");
  const [serviceLevel, setServiceLevel] = useState("Full Catering Service");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([
    "Live Chaat Counter",
    "Welcome Drinks",
  ]);

  const toggleAddOn = (item: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleRequestQuote = () => {
    const params = new URLSearchParams({
      eventType,
      guests: guests.toString(),
      foodPreference: foodPref,
      serviceLevel,
      services: selectedAddOns.join(","),
    });
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <div className={cn("grid gap-8 lg:grid-cols-12", className)}>
      {/* Interactive Options Column */}
      <div className="space-y-8 lg:col-span-7 xl:col-span-8">
        {/* Step 1: Event Type */}
        <div>
          <div className="flex items-center justify-between">
            <span className="eyebrow text-saffron">Step 01</span>
            <span className="text-[12px] italic text-ink-soft">Select your occasion</span>
          </div>
          <h3 className="display mt-1 text-[22px] font-medium text-ink">What event are you hosting?</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {EVENT_TYPES.map((type) => {
              const isSelected = eventType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setEventType(type.id)}
                  className={cn(
                    "flex flex-col items-start p-4 text-left transition-all duration-300 border cursor-pointer",
                    isSelected
                      ? "border-saffron bg-cream shadow-sm ring-1 ring-saffron/40"
                      : "border-ink/15 bg-parchment/60 hover:border-ink/40 hover:bg-parchment"
                  )}
                >
                  <span className="text-2xl" role="img" aria-hidden="true">
                    {type.icon}
                  </span>
                  <span className="mt-2 text-[14px] font-medium text-ink">{type.label}</span>
                  <span className="mt-0.5 text-[11px] leading-tight text-ink-soft">{type.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Guest Count */}
        <div className="border-t border-ink/10 pt-6">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-saffron">Step 02</span>
            <span className="text-[12px] italic text-ink-soft">Approximate count</span>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <h3 className="display text-[22px] font-medium text-ink">Number of expected guests</h3>
            <span className="text-[20px] font-semibold text-saffron-deep">{guests} guests</span>
          </div>

          {/* Quick presets */}
          <div className="mt-4 flex flex-wrap gap-2">
            {GUEST_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setGuests(preset)}
                className={cn(
                  "px-4 py-2 text-[12px] font-medium transition-colors border cursor-pointer",
                  guests === preset
                    ? "border-saffron bg-saffron text-cream"
                    : "border-ink/20 bg-parchment/70 text-ink hover:border-ink/40"
                )}
              >
                {preset} Guests
              </button>
            ))}
          </div>

          {/* Slider input */}
          <div className="mt-4 flex items-center gap-4">
            <span className="text-[12px] text-ink-soft">25</span>
            <input
              type="range"
              min={25}
              max={1500}
              step={25}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="h-2 flex-1 cursor-pointer appearance-none bg-ink/15 accent-saffron"
              aria-label="Guest count slider"
            />
            <span className="text-[12px] text-ink-soft">1500+</span>
          </div>
        </div>

        {/* Step 3: Food Preference */}
        <div className="border-t border-ink/10 pt-6">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-saffron">Step 03</span>
            <span className="text-[12px] italic text-ink-soft">Dietary focus</span>
          </div>
          <h3 className="display mt-1 text-[22px] font-medium text-ink">Food Preference</h3>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FOOD_PREFS.map((pref) => {
              const isSelected = foodPref === pref.id;
              return (
                <button
                  key={pref.id}
                  type="button"
                  onClick={() => setFoodPref(pref.id)}
                  className={cn(
                    "flex flex-col text-left p-4 border transition-all duration-300 cursor-pointer",
                    isSelected
                      ? "border-saffron bg-cream ring-1 ring-saffron/40"
                      : "border-ink/15 bg-parchment/60 hover:border-ink/40"
                  )}
                >
                  <span className="text-[14.5px] font-medium text-ink">{pref.label}</span>
                  <span className="mt-1 text-[12px] text-ink-soft">{pref.note}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 4: Service Required */}
        <div className="border-t border-ink/10 pt-6">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-saffron">Step 04</span>
            <span className="text-[12px] italic text-ink-soft">Service depth</span>
          </div>
          <h3 className="display mt-1 text-[22px] font-medium text-ink">Service Level Needed</h3>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {SERVICE_LEVELS.map((svc) => {
              const isSelected = serviceLevel === svc.id;
              return (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => setServiceLevel(svc.id)}
                  className={cn(
                    "flex flex-col justify-between p-4 text-left border transition-all duration-300 cursor-pointer",
                    isSelected
                      ? "border-saffron bg-cream ring-1 ring-saffron/40"
                      : "border-ink/15 bg-parchment/60 hover:border-ink/40"
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[14.5px] font-medium text-ink">{svc.title}</span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-saffron-deep bg-saffron/10 px-2 py-0.5 border border-saffron/30">
                        {svc.badge}
                      </span>
                    </div>
                    <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{svc.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 5: Course & Add-on Selection */}
        <div className="border-t border-ink/10 pt-6">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-saffron">Step 05</span>
            <span className="text-[12px] italic text-ink-soft">Optional enhancements</span>
          </div>
          <h3 className="display mt-1 text-[22px] font-medium text-ink">Add-ons &amp; Live Stations</h3>
          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {ADD_ONS.map((addon) => {
              const isChecked = selectedAddOns.includes(addon.id);
              return (
                <button
                  key={addon.id}
                  type="button"
                  onClick={() => toggleAddOn(addon.id)}
                  className={cn(
                    "flex items-center gap-3 p-3.5 text-left border transition-all duration-200 cursor-pointer",
                    isChecked
                      ? "border-saffron/70 bg-cream text-ink"
                      : "border-ink/15 bg-parchment/60 text-ink/70 hover:border-ink/30"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-5 w-5 flex-none items-center justify-center border transition-colors",
                      isChecked ? "border-saffron bg-saffron text-cream" : "border-ink/30 bg-transparent"
                    )}
                  >
                    {isChecked && (
                      <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3.5 8.5L6.5 11.5L12.5 4.5" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[13.5px] font-medium">{addon.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Sidebar Column */}
      <div className="lg:col-span-5 xl:col-span-4">
        <div className="sticky top-24 border border-ink/20 bg-cream p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-ink/15 pb-4">
            <div>
              <span className="eyebrow text-saffron">Live Summary</span>
              <h4 className="display text-[24px] font-semibold text-ink">Your Event Plan</h4>
            </div>
            <span className="text-[11px] uppercase tracking-wider text-ink/50 bg-parchment px-2.5 py-1 border border-ink/10">
              Custom Spec
            </span>
          </div>

          <div className="mt-5 space-y-4 text-[14px]">
            <div className="flex justify-between border-b border-dotted border-ink/15 pb-2.5">
              <span className="text-ink-soft">Event Type</span>
              <span className="font-medium text-ink">{eventType}</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-ink/15 pb-2.5">
              <span className="text-ink-soft">Guest Count</span>
              <span className="font-semibold text-saffron-deep">{guests} Guests</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-ink/15 pb-2.5">
              <span className="text-ink-soft">Food Preference</span>
              <span className="font-medium text-ink">{foodPref}</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-ink/15 pb-2.5">
              <span className="text-ink-soft">Service Level</span>
              <span className="font-medium text-ink">{serviceLevel.split(" (")[0]}</span>
            </div>

            {selectedAddOns.length > 0 && (
              <div className="pt-1">
                <span className="text-[12px] uppercase tracking-wider text-ink-soft font-medium">Selected Add-ons ({selectedAddOns.length}):</span>
                <ul className="mt-2 space-y-1.5 pl-1">
                  {selectedAddOns.map((addon) => (
                    <li key={addon} className="flex items-center gap-2 text-[13px] text-ink">
                      <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
                      {addon}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-ink/15 pt-5">
            <p className="text-[12px] italic leading-relaxed text-ink-soft">
              Your choices are recorded. Click below to request a tailored quote with these exact specifications.
            </p>
            <button
              type="button"
              onClick={handleRequestQuote}
              className="btn btn-solid mt-4 w-full justify-center"
            >
              <span>Request This Quote</span>
              <svg className="btn-icon h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
