
import { AboutHero } from "@/components/sections/about/about-hero";
import { WhoWeAre } from "@/components/sections/about/who-we-are";
import { OurJourneySection } from "@/components/sections/about/our-journey";
import { MissionVisionSection } from "@/components/sections/about/mission-vision";
import { ManufacturingCapabilitySection } from "@/components/sections/about/manufacturing-capability";

export const metadata = {
  title: "About Us | Zaron Industries",
  description:
    "Learn about Zaron Industries, our manufacturing journey, company values and roofing solutions.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <WhoWeAre />
      <OurJourneySection />
      <MissionVisionSection />
      <ManufacturingCapabilitySection />
      
    </main>
  );
}
