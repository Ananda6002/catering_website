import type { Metadata } from "next";
import { Suspense } from "react";
import { site, whatsappLink } from "@/content/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { Reveal } from "@/components/ui/Reveal";
import { OrnamentRule } from "@/components/ui/primitives";
import { searchParamsToPrefill } from "@/lib/prefill";

export const metadata: Metadata = {
  title: "Contact & Quote",
  description:
    "Request a catering quote or reach us directly — phone, WhatsApp, email or visit. We reply within one working day.",
};

const channels = [
  {
    label: "Call Us",
    value: site.phone,
    href: site.phoneHref,
    note: "Mon–Sat, 9 am – 7 pm",
    external: false,
  },
  {
    label: "WhatsApp",
    value: "Chat with the event desk",
    href: whatsappLink(),
    note: "Fastest response",
    external: true,
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Quotes & menus in writing",
    external: false,
  },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const prefill = searchParamsToPrefill(await searchParams);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Tell us about <em className="text-saffron-deep">the table.</em>
          </>
        }
        lead="Share a few details below and we'll come back within a working day — or reach out directly through any of these."
      />

      {/* quick channels */}
      <section className="pb-14">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:grid-cols-3 sm:px-8">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <a
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noreferrer" : undefined}
                className="group flex h-full flex-col border border-ink/15 bg-cream p-7 transition-colors duration-300 hover:border-saffron/60"
              >
                <span className="eyebrow text-ink/45">{c.label}</span>
                <span className="display mt-3 text-2xl text-ink transition-colors group-hover:text-saffron-deep">
                  {c.value}
                </span>
                <span className="mt-auto pt-4 text-[12px] uppercase tracking-[0.18em] text-ink/45">
                  {c.note}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* quote form */}
      <section id="quote" className="scroll-mt-24 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* aside */}
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow text-saffron-deep">Request a Quote</p>
                <h2 className="display display-md mt-4 text-ink">
                  A few details, <em className="text-saffron-deep">a full menu back.</em>
                </h2>
                <p className="mt-5 text-[14.5px] leading-relaxed text-ink-soft">
                  The more we know — guest count, venue, the occasion&apos;s
                  mood — the sharper our first proposal lands.
                </p>
              </Reveal>

              <Reveal delay={120}>
                <div className="mt-10 space-y-8 border-t border-ink/10 pt-8">
                  <div>
                    <h3 className="eyebrow text-ink/45">Visit</h3>
                    <p className="mt-2 text-[14.5px] text-ink/80">{site.addressLine}</p>
                    <a
                      href={site.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline mt-2 inline-block text-saffron-deep"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                  <div>
                    <h3 className="eyebrow text-ink/45">Kitchen Hours</h3>
                    <ul className="mt-2 space-y-1.5 text-[14px] text-ink/80">
                      {site.hours.map((h) => (
                        <li key={h.days} className="flex justify-between gap-6">
                          <span>{h.days}</span>
                          <span className="text-ink/55">{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="eyebrow text-ink/45">Follow</h3>
                    <div className="mt-2 flex gap-5">
                      {site.social.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[13px] uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-saffron-deep"
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* form */}
            <div className="lg:col-span-8">
              <QuoteForm
                prefillPackage={prefill.prefillPackage}
                prefillEvent={prefill.prefillEvent}
              />
            </div>
          </div>

          <OrnamentRule className="mt-20 text-ink/25" />
        </div>
      </section>
    </>
  );
}
