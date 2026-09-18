"use client";

import { useEffect, useCallback } from "react";
import type { GalleryItem } from "@/content/collections";
import { cn } from "@/lib/utils";

export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const open = index !== null;
  const item = open ? items[index] : null;

  const prev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  const next = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  // keyboard: Esc closes, arrows navigate
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, prev, next]);

  if (!open || !item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 sm:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — image viewer`}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close viewer"
        className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center border border-cream/30 text-cream transition-colors hover:border-cream hover:bg-cream/10 sm:right-8 sm:top-8"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="m4 4 12 12M16 4 4 16" />
        </svg>
      </button>

      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* reserved frame; real photo replaces the placeholder interior */}
        <div
          className={cn("bg-espresso")}
          style={{ aspectRatio: item.aspect === "tall" ? "3/4" : item.aspect === "wide" ? "16/10" : "1/1" }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-cream/30" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
              <rect x="3.5" y="5" width="17" height="14" />
              <path d="M3.5 15.5 9 10l4 4 3-3 4.5 4.5" />
            </svg>
            <p className="eyebrow text-[10px] text-cream/50">
              {item.title} — photograph goes here
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="display text-xl text-cream">{item.title}</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-cream/50">
              {item.category} · {index + 1} / {items.length}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="flex h-10 w-10 cursor-pointer items-center justify-center border border-cream/30 text-cream transition-colors hover:border-cream hover:bg-cream/10"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 8H3m4-4L3 8l4 4" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="flex h-10 w-10 cursor-pointer items-center justify-center border border-cream/30 text-cream transition-colors hover:border-cream hover:bg-cream/10"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 8h11M9 4l4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
