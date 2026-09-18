import { site } from "@/content/site";

/**
 * Logo placeholder — NO invented branding. When the real logo arrives:
 *   1. drop the file into /public
 *   2. update `logoAssets.src` in src/content/site.ts
 * Until then this renders a dignified typographic mark with a reserved
 * aspect-ratio slot that keeps the layout stable for the real artwork.
 */
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      {/* reserved square slot for the real mark — swap for <img src={logoAssets.src}> */}
      <span
        aria-hidden="true"
        className={`grid h-9 w-9 flex-none place-items-center rounded-full border ${
          dark ? "border-cream/40" : "border-ink/40"
        }`}
      >
        <svg viewBox="0 0 24 24" className={`h-4.5 w-4.5 ${dark ? "text-cream/80" : "text-ink/70"}`} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M12 3v13" />
          <path d="M8 8c0 2.2 1.8 4 4 4s4-1.8 4-4" />
          <path d="M8.5 16.5h7" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`display block text-[1.35rem] tracking-wide ${dark ? "text-cream" : "text-ink"}`}>
          {site.name}
        </span>
        <span className={`block text-[9px] uppercase tracking-[0.34em] ${dark ? "text-cream/60" : "text-ink-soft"}`}>
          {site.tagline}
        </span>
      </span>
    </span>
  );
}
