import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "outlineLight";
  className?: string;
  withArrow?: boolean;
};

const variantClass = {
  solid: "btn-solid",
  outline: "btn-outline",
  outlineLight: "btn-outline-light",
} as const;

export function Button({
  href,
  children,
  variant = "solid",
  className,
  withArrow = false,
}: ButtonProps) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const cls = cn(variantClass[variant], "group", className);

  if (external) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
        {children}
        {withArrow && <Arrow />}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {withArrow && <Arrow />}
    </Link>
  );
}

function Arrow() {
  return (
    <svg className="btn-icon h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

/** Small ornament: hairline rules meeting a rotated square. */
export function OrnamentRule({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("flex items-center gap-3", className)}>
      <span className="h-px flex-1 bg-current opacity-35" />
      <span className="h-1.5 w-1.5 rotate-45 border border-current opacity-70" />
      <span className="h-px flex-1 bg-current opacity-35" />
    </span>
  );
}

/** Section eyebrow + heading block with consistent rhythm. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("eyebrow mb-4", dark ? "text-saffron" : "text-saffron-deep")}>{eyebrow}</p>
      <h2 className={cn("display display-lg", dark ? "text-cream" : "text-ink")}>{title}</h2>
      {lead && (
        <p className={cn("mt-5 text-[15px] leading-relaxed", dark ? "text-cream/70" : "text-ink-soft")}>
          {lead}
        </p>
      )}
    </div>
  );
}
