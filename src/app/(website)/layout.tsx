import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CtaSection } from "@/components/sections/home/cta-section";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <Navbar />
      {children}
      <CtaSection />
      <Footer />
    </div>
  );
}