import { cn } from "@/lib/utils";

export function DietDot({ diet }: { diet: "veg" | "non-veg" | "vegan" | "signature" }) {
  const styles: Record<string, string> = {
    veg: "border-green-700 text-green-700",
    nonveg: "border-red-800 text-red-800",
    vegan: "border-teal-700 text-teal-700",
    signature: "border-saffron-deep text-saffron-deep",
  };

  return (
    <span
      className={cn(
        "inline-grid h-3.5 w-3.5 flex-none place-items-center rounded-full border",
        styles[diet]
      )}
      role="img"
      aria-label={diet === "non-veg" ? "Non-vegetarian" : diet === "signature" ? "Chef's signature dish" : diet}
    >
      {diet === "non-veg" ? (
        <span className="h-1.5 w-1.5 rounded-full bg-red-800" />
      ) : diet === "signature" ? (
        <span className="h-1 w-1 rotate-45 bg-saffron-deep" />
      ) : diet === "vegan" ? (
        <span className="h-1.5 w-1.5 rounded-full border border-teal-700" />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-green-700" />
      )}
    </span>
  );
}
