import { ProjectsHero } from "@/components/sections/projects/projects-hero";
import { ProjectsGallery } from "@/components/sections/projects/projects-gallery";
import { WhyChooseZaron } from "@/components/sections/projects/why-choose-zaron";

export const metadata = {
  title: "Projects | Zaron Industries",
  description: "Explore Zaron roofing, cladding and structural projects across industrial and commercial applications.",
};

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsHero />
      <ProjectsGallery />
      <WhyChooseZaron />
    </main>
  );
}