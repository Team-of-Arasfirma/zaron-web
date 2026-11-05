import type { Metadata } from "next";
import { CareerHero } from "@/components/sections/careers/career-hero";
import { CurrentOpenings } from "@/components/sections/careers/current-openings";
import { WhyWorkWithZaron } from "@/components/sections/careers/why-work-with-zaron";

export const metadata: Metadata = {
  title: "Careers | ZARON",
  description: "Build your future with Zaron. Explore careers in engineering, manufacturing, quality, sales and operations.",
};

export default function CareersPage() {
  return (
    <main>
      <CareerHero />
      <CurrentOpenings />
      <WhyWorkWithZaron />
    </main>
  );
}
