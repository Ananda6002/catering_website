import Link from "next/link";
import { site, whatsappLink } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { OrnamentRule } from "@/components/ui/primitives";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        {/* top: brand + CTA */}
        <div className="flex flex-col gap-10 border-b border-cream/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Logo dark />
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-cream/65">
              Feeding celebrations across {site.city} — one thoughtful table at a time.
              Tell us about your event and we&apos;ll take it from there.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link href="/contact#quote" className="btn bg-saffron text-espresso hover:bg-cream">
              Get a Quote
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-light"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* middle: link columns */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Footer">
            <h3 className="eyebrow mb-5 text-cream/45">Explore</h3>
            <ul className="space-y-2.5 text-[14px] text-cream/75">
              {[
                ["About", "/about"],
                ["Services", "/services"],
                ["Menu", "/menu"],
                ["Gallery", "/gallery"],
                ["Packages", "/packages"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-saffron">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="eyebrow mb-5 text-cream/45">Services</h3>
            <ul className="space-y-2.5 text-[14px] text-cream/75">
              {[
                "Wedding Catering",
                "Corporate Events",
                "Birthday Events",
                "Family Functions",
                "Housewarming",
                "Outdoor Catering",
              ].map((s) => (
                <li key={s}>
                  <Link href="/services" className="transition-colors hover:text-saffron">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-5 text-cream/45">Reach Us</h3>
            <ul className="space-y-2.5 text-[14px] text-cream/75">
              <li>
                <a href={site.phoneHref} className="transition-colors hover:text-saffron">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-saffron">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-saffron"
                >
                  {site.addressLine}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-5 text-cream/45">Kitchen Hours</h3>
            <ul className="space-y-2.5 text-[14px] text-cream/75">
              {site.hours.map((h) => (
                <li key={h.days} className="flex flex-col">
                  <span>{h.days}</span>
                  <span className="text-cream/50">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <OrnamentRule className="text-cream/30" />

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-[12px] uppercase tracking-[0.2em] text-cream/45 sm:flex-row">
          <p>
            © {year} {site.legalName}
          </p>
          <div className="flex gap-6">
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-saffron"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
