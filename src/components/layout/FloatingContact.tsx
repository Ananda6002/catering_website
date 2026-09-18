"use client";

import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Subtle fixed contact actions (mobile-first). Appears after the visitor
 * scrolls past the hero so it never fights the primary CTAs.
 */
export function FloatingContact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-40 flex flex-col gap-2.5 transition-all duration-500",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#1faa59] text-cream shadow-lg shadow-ink/25 transition-transform duration-300 hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="h-5.5 w-5.5" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.2L2 22l4.94-1.58A9.9 9.9 0 1 0 12.04 2Zm5.77 14.06c-.24.68-1.4 1.3-1.93 1.35-.5.05-.98.24-3.27-.68-2.75-1.08-4.5-3.85-4.63-4.03-.14-.18-1.1-1.47-1.1-2.8 0-1.34.7-2 .95-2.27.24-.27.53-.34.7-.34h.51c.16 0 .38-.06.6.45.24.55.8 1.93.86 2.07.07.13.11.29.02.47-.09.18-.13.29-.27.45-.13.15-.29.34-.41.46-.14.13-.28.28-.12.55.16.27.72 1.18 1.54 1.91 1.06.94 1.95 1.24 2.22 1.37.27.14.43.12.59-.07.16-.2.68-.8.86-1.07.18-.27.36-.22.6-.13.25.09 1.55.73 1.82.86.27.14.45.2.51.31.07.12.07.68-.17 1.36Z" />
        </svg>
      </a>
      <a
        href={site.phoneHref}
        aria-label={`Call us at ${site.phone}`}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-cream shadow-lg shadow-ink/25 transition-transform duration-300 hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
        </svg>
      </a>
    </div>
  );
}
