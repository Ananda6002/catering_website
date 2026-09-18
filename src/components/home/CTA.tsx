import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* oversized ghost word as decoration */}
      <span
        aria-hidden="true"
        className="display pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[22vw] leading-none text-ink/[0.04]"
      >
        celebrate
      </span>

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow text-saffron-deep">Let&apos;s Plan It</p>
          <h2 className="display display-xl mt-5 text-ink">
            Your guests are <em className="text-saffron-deep">already hungry.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
            Tell us the date, the headcount and the occasion — we&apos;ll come
            back within a day with a menu worth the table.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <Link href="/contact#quote" className="btn-solid">
              Request a Quote
            </Link>
            <Link href="/menu" className="link-underline self-center text-ink">
              Browse the Menu First
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
