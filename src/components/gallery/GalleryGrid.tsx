"use client";

import { useMemo, useState } from "react";
import { galleryCategories, galleryItems, type GalleryCategory } from "@/content/collections";
import { cn } from "@/lib/utils";
import { Lightbox } from "@/components/gallery/Lightbox";

export function GalleryGrid({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const items = useMemo(() => {
    const filtered =
      filter === "all" ? galleryItems : galleryItems.filter((g) => g.category === filter);
    return limit ? filtered.slice(0, limit) : filtered;
  }, [filter, limit]);

  const showFilters = !limit;

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap gap-2.5">
          {galleryCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              aria-pressed={filter === c.id}
              className={cn(
                "cursor-pointer border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300",
                filter === c.id
                  ? "border-ink bg-ink text-cream"
                  : "border-ink/25 text-ink/70 hover:border-ink/60 hover:text-ink"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {/* masonry via CSS columns — organic, non-uniform rhythm */}
      <div className={cn("columns-1 gap-5 sm:columns-2 lg:columns-3", showFilters && "mt-10")}>
        {items.map((g, i) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setLightboxIdx(i)}
            aria-label={`View ${g.title}`}
            className="group mb-5 block w-full cursor-pointer break-inside-avoid text-left"
          >
            <div
              className={cn(
                "relative overflow-hidden",
                g.span === 2 ? "border border-ink/20" : "border border-ink/20"
              )}
            >
              {/* aspect reserved per item — real photos drop in without layout shift */}
              <div
                className="bg-parchment transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ aspectRatio: g.aspect === "tall" ? "3/4" : g.aspect === "wide" ? "16/10" : "1/1" }}
              >
                <SlotArt label={g.title} />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-between bg-ink/85 px-4 py-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-[12px] uppercase tracking-[0.18em] text-cream">{g.title}</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-cream/60">{g.category}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {items.length === 0 && (
        <p className="mt-10 text-center text-[14px] text-ink-soft">
          No photographs in this category yet — check back soon.
        </p>
      )}

      <Lightbox
        items={items}
        index={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onNavigate={setLightboxIdx}
      />
    </div>
  );
}

/** Decorative placeholder art (not a broken image) until real photos arrive. */
function SlotArt({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7 text-ink/30"
        aria-hidden="true"
      >
        <rect x="3.5" y="5" width="17" height="14" />
        <path d="M3.5 15.5 9 10l4 4 3-3 4.5 4.5" />
        <circle cx="9.5" cy="9" r="1.2" />
      </svg>
      <span className="eyebrow text-[9px] text-ink/40">{label}</span>
    </div>
  );
}
