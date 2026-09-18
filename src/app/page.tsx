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

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValuesMarquee />
      <Story />
      <ServicesIndex />
      <MenuPreview />
      <WhyUs />
      <PackagesTeaser />
      <EventTypes />
      <GalleryPreview />
      <Testimonials />
      <CTA />
    </>
  );
}
