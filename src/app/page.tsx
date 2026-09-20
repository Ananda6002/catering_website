import { Hero } from "@/components/home/Hero";
import { ValuesMarquee } from "@/components/home/ValuesMarquee";
import { Story } from "@/components/home/Story";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { MenuPreview } from "@/components/home/MenuPreview";
import { WhyUs } from "@/components/home/WhyUs";
import { PackagesTeaser } from "@/components/home/PackagesTeaser";
import { EventTypes } from "@/components/home/EventTypes";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";
import { EventBuilder } from "@/components/planner/EventBuilder";
import { EventStoryTimeline } from "@/components/gallery/EventStoryTimeline";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValuesMarquee />
      <Story />

      {/* Feature 1 — Interactive Event Builder */}
      <section className="bg-paper py-16 md:py-24 border-t border-b border-ink/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow text-saffron">Interactive Planner</span>
            <h2 className="display mt-1 text-[32px] md:text-[42px] font-semibold text-ink">
              Build Your Custom Catering Plan
            </h2>
            <p className="mt-2 text-[15px] text-ink-soft leading-relaxed">
              Configure your event type, guest count, dietary preferences, and optional live stations to generate an instant quote request.
            </p>
          </div>
          <EventBuilder />
        </div>
      </section>

      <ServicesIndex />
      <MenuPreview />
      <WhyUs />
      <PackagesTeaser />
      <EventTypes />

      {/* Feature 3 — Behind the Scenes Story Timeline */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EventStoryTimeline />
        </div>
      </section>

      <GalleryPreview />
      <Testimonials />
      <CTA />
    </>
  );
}
