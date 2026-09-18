import { cn } from "@/lib/utils";

/**
 * Image placeholder for future real photography.
 * - `aspect` controls the reserved box; `label` shows what photo belongs here.
 * - When real images arrive, pass `src` and the placeholder art disappears.
 */
export function ImageSlot({
  label,
  aspect = "4/3",
  className,
  tone = "paper",
}: {
  label: string;
  aspect?: string;
  className?: string;
  tone?: "paper" | "ink";
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        tone === "paper" ? "bg-parchment" : "bg-espresso",
        className
      )}
      style={{ aspectRatio: aspect }}
      role="img"
      aria-label={`Placeholder for: ${label}`}
    >
      {/* subtle diagonal texture so the slot reads as intentional, not broken */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 opacity-[0.5]",
          tone === "paper" ? "text-ink" : "text-cream"
        )}
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 12px)",
          opacity: 0.05,
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("h-6 w-6", tone === "paper" ? "text-ink/35" : "text-cream/35")}
          aria-hidden="true"
        >
          <rect x="3.5" y="5" width="17" height="14" />
          <path d="M3.5 15.5 9 10l4 4 3-3 4.5 4.5" />
          <circle cx="9.5" cy="9" r="1.2" />
        </svg>
        <span className={cn("eyebrow text-[9px]", tone === "paper" ? "text-ink/40" : "text-cream/40")}>
          {label}
        </span>
      </div>
      {/* corner ticks — the slot feels "marked up" for the real photo */}
      <span aria-hidden="true" className={cn("absolute left-3 top-3 h-3 w-3 border-l border-t", tone === "paper" ? "border-ink/25" : "border-cream/25")} />
      <span aria-hidden="true" className={cn("absolute right-3 top-3 h-3 w-3 border-r border-t", tone === "paper" ? "border-ink/25" : "border-cream/25")} />
      <span aria-hidden="true" className={cn("absolute bottom-3 left-3 h-3 w-3 border-b border-l", tone === "paper" ? "border-ink/25" : "border-cream/25")} />
      <span aria-hidden="true" className={cn("absolute bottom-3 right-3 h-3 w-3 border-b border-r", tone === "paper" ? "border-ink/25" : "border-cream/25")} />
    </div>
  );
}
