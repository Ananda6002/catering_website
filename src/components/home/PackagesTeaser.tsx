import Link from "next/link";
import { packages } from "@/content/collections";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/primitives";

export function PackagesTeaser() {
  const [basic, classic, premium] = packages;

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Catering Packages"
            title={
              <>
                Three ways to <em className="text-saffron-deep">set the table.</em>
              </>
            }
            lead="Every package is a starting point — dishes, counts and service styles shift to fit your occasion and your guests."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {/* basic */}
          <Reveal>
            <PackageCard pkg={basic} />
          </Reveal>

          {/* classic — dark featured card, visually taller */}
          <Reveal delay={100}>
            <div className="grain relative flex h-full flex-col bg-espresso p-9 text-cream lg:-my-4 lg:py-13">
              <p className="eyebrow text-saffron">Most chosen</p>
              <h3 className="display mt-3 text-3xl">{classic.name}</h3>
              <p className="mt-1 text-[13px] italic text-cream/60">{classic.tagline}</p>

              <ul className="mt-7 flex-1 space-y-3.5">
                {classic.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[13.5px] text-cream/80">
                    <Diamond />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-cream/15 pt-6">
                <p className="eyebrow text-[9px] text-cream/50">{classic.guests}</p>
                <p className="display mt-1 text-2xl text-saffron">{classic.price}</p>
                <Link
                  href={`/contact?package=${classic.id}#quote`}
                  className="btn mt-6 w-full bg-saffron text-espresso hover:bg-cream"
                >
                  Enquire
                </Link>
              </div>
            </div>
          </Reveal>

          {/* premium */}
          <Reveal delay={200}>
            <PackageCard pkg={premium} />
          </Reveal>
        </div>

        <Reveal delay={150}>
          <p className="mt-10 text-center text-[13px] text-ink-soft">
            Need something different?{" "}
            <Link href="/packages" className="link-underline !normal-case text-saffron-deep">
              Compare all packages
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function PackageCard({ pkg }: { pkg: (typeof packages)[number] }) {
  return (
    <div className="flex h-full flex-col border border-ink/15 bg-cream p-9">
      <p className="eyebrow text-ink/45">{pkg.suitedFor.split(",")[0]}</p>
      <h3 className="display mt-3 text-3xl text-ink">{pkg.name}</h3>
      <p className="mt-1 text-[13px] italic text-ink-soft">{pkg.tagline}</p>

      <ul className="mt-7 flex-1 space-y-3.5">
        {pkg.features.slice(0, 4).map((f) => (
          <li key={f} className="flex items-start gap-3 text-[13.5px] text-ink/80">
            <DiamondLight />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-ink/10 pt-6">
        <p className="eyebrow text-[9px] text-ink/45">{pkg.guests}</p>
        <p className="display mt-1 text-2xl text-ink">{pkg.price}</p>
        <Link
          href={`/contact?package=${pkg.id}#quote`}
          className="btn-outline mt-6 w-full"
        >
          Enquire
        </Link>
      </div>
    </div>
  );
}

function Diamond() {
  return <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-none rotate-45 bg-saffron" />;
}
function DiamondLight() {
  return <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-none rotate-45 bg-saffron-deep" />;
}
