import Link from "next/link";
import { galleryItems } from "@/content/collections";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";

export function GalleryPreview() {
  const [a, b, c, d] = galleryItems;

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <div className="max-w-xl">
              <p className="eyebrow mb-4 text-saffron-deep">The Gallery</p>
              <h2 className="display display-lg text-ink">
                Proof, <em className="text-saffron-deep">plated.</em>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Link href="/gallery" className="link-underline text-ink">
              View Full Gallery
            </Link>
          </Reveal>
        </div>

        {/* asymmetric editorial collage — 12-col grid, varied spans */}
        <div className="mt-14 grid grid-cols-12 gap-5">
          <Reveal className="col-span-12 sm:col-span-7">
            <ImageReveal>
              <ImageSlot label={a.title} aspect="16/10" />
            </ImageReveal>
            <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-ink/50">
              {a.category} — {a.title}
            </p>
          </Reveal>

          <Reveal delay={100} className="col-span-6 sm:col-span-5">
            <ImageReveal>
              <ImageSlot label={b.title} aspect="4/5" />
            </ImageReveal>
            <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-ink/50">
              {b.category} — {b.title}
            </p>
          </Reveal>

          <Reveal delay={80} className="col-span-6 sm:col-span-4">
            <ImageReveal>
              <ImageSlot label={c.title} aspect="1/1" />
            </ImageReveal>
          </Reveal>

          <Reveal delay={160} className="col-span-6 sm:col-span-4">
            <ImageReveal>
              <ImageSlot label={d.title} aspect="1/1" />
            </ImageReveal>
          </Reveal>

          {/* quote tile instead of a fifth image — breaks the pattern */}
          <Reveal delay={220} className="col-span-12 sm:col-span-4">
            <div className="grain flex h-full min-h-44 flex-col justify-between bg-espresso p-6 text-cream">
              <span aria-hidden="true" className="display text-5xl leading-none text-saffron">&ldquo;</span>
              <p className="display text-xl italic leading-snug">
                The table looked like a celebration before the first guest arrived.
              </p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-cream/50">
                From our gallery notes
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
