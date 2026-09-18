import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Food photographs, wedding receptions, buffet arrangements, corporate events, decor and catering setups from recent events.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Gallery"
        title={
          <>
            Recent tables, <em className="text-saffron-deep">recent joy.</em>
          </>
        }
        lead="Photographs from weddings, corporate gatherings, buffets and the small details in between. Placeholder frames are ready for the real photos."
      />

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <GalleryGrid />
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-12 text-center text-[11px] uppercase tracking-[0.24em] text-ink/40">
              Placeholder frames shown — real event photography will fill these slots
            </p>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
