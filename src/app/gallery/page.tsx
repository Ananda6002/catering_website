import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { EventStoryTimeline } from "@/components/gallery/EventStoryTimeline";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Gallery & Behind the Scenes",
  description:
    "Explore our event story execution, food photographs, wedding receptions, buffet arrangements, and live catering setups.",
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
        lead="Discover how our catering execution comes to life from kitchen prep to live serving stations, alongside event photography."
      />

      <section className="pb-16 pt-4">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <EventStoryTimeline />
          </Reveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal delay={100}>
            <div className="mb-8">
              <span className="eyebrow text-saffron">Visual Archive</span>
              <h2 className="display mt-1 text-[28px] font-semibold text-ink">Event Photographs</h2>
            </div>
            <GalleryGrid />
          </Reveal>
          <Reveal delay={150}>
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
