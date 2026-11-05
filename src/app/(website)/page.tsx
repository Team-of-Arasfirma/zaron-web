
import { HeroSection } from "@/components/sections/home/hero-section";
import { StatsSection } from "@/components/sections/home/stats-section";
import { AboutSection } from "@/components/sections/home/about-section";
import { ProductsSection } from "@/components/sections/home/products-section";
import { ServicesSection } from "@/components/sections/home/services-section";
import { AccomplishmentsSection } from "@/components/sections/home/accomplishments-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ProductsSection />
      <ServicesSection />
      <AccomplishmentsSection />
    </main>
  );
}
