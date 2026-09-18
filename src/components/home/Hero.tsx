import Link from "next/link";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ImageReveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/primitives";

export function Hero() {
  return (
    <section className="blueprint relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* faint oversized ornament letter anchoring the composition */}
      <span
        aria-hidden="true"
        className="display pointer-events-none absolute -right-6 top-24 hidden select-none text-[19rem] leading-none text-ink/[0.045] xl:block"
      >
        S
      </span>

      <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:pb-28">
        {/* ---- copy ---- */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="hero-rise eyebrow text-saffron-deep" style={{ animationDelay: "80ms" }}>
            Catering &amp; Event Craft — Bengaluru
          </p>

          <h1
            className="hero-rise display display-2xl mt-6 max-w-xl text-ink"
            style={{ animationDelay: "200ms" }}
          >
            Good food is remembered.{" "}
            <em className="text-saffron-deep">Great hospitality</em> is felt.
          </h1>

          <p
            className="hero-rise mt-7 max-w-md text-[15.5px] leading-relaxed text-ink-soft"
            style={{ animationDelay: "340ms" }}
          >
            We design, cook and serve complete catering for weddings, corporate
            gatherings and family celebrations — menus built around your people,
            service that disappears into the moment.
          </p>

          <div
            className="hero-rise mt-10 flex flex-wrap items-center gap-6"
            style={{ animationDelay: "480ms" }}
          >
            <Button href="/contact#quote" withArrow>
              Plan Your Event
            </Button>
            <Link href="/menu" className="link-underline text-ink">
              Explore Our Menu
            </Link>
          </div>

          {/* trust strip */}
          <div
            className="hero-rise mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/10 pt-6 text-[12px] uppercase tracking-[0.22em] text-ink/55"
            style={{ animationDelay: "620ms" }}
          >
            <span>500+ events served</span>
            <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-saffron" />
            <span>120,000+ guests</span>
            <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-saffron" />
            <span>Family run since 2014</span>
          </div>
        </div>

        {/* ---- visual composition ---- */}
        <div className="relative lg:col-span-5">
          <div className="hero-rise relative" style={{ animationDelay: "360ms" }}>
            {/* offset frame behind the image slot */}
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 h-full w-full border border-saffron/50 sm:-left-6 sm:-top-6"
            />

            <ImageReveal>
              <ImageSlot
                label="Signature spread — real photograph goes here"
                aspect="4/5"
                className="w-full"
              />
            </ImageReveal>

            {/* rotating stamp */}
            <div className="absolute -left-8 -top-10 hidden sm:block" aria-hidden="true">
              <div className="spin-slow relative h-28 w-28">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <defs>
                    <path id="stamp-circle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                  </defs>
                  <text className="fill-ink text-[8.2px] uppercase" style={{ letterSpacing: "0.24em" }}>
                    <textPath href="#stamp-circle">
                      Saffron &amp; Sage · Catering · Est. 2014 ·
                    </textPath>
                  </text>
                </svg>
                <span className="absolute inset-0 m-auto h-1.5 w-1.5 rotate-45 bg-saffron" />
              </div>
            </div>

            {/* small overlapping note card */}
            <div className="absolute -bottom-6 -left-4 border border-ink/10 bg-cream px-5 py-4 shadow-[0_18px_40px_-18px_rgba(35,24,15,0.35)] sm:-left-10">
              <p className="display text-2xl text-ink">3–1,000</p>
              <p className="eyebrow mt-1 text-[9px] text-ink-soft">Guests, any table, any lawn</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
