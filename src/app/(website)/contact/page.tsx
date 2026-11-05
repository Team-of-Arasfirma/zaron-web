
import type { Metadata } from "next";

import { ContactHero } from "@/components/sections/contact/contact-hero";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { ContactMap } from "@/components/sections/contact/contact-map";

export const metadata: Metadata = {
  title: "Contact Us | Zaron Industries",
  description:
    "Contact Zaron Industries for roofing, cladding and structural solutions. Find our office in Kaikattipudhur, Avinashi, Tamil Nadu.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactForm />
      <ContactMap />
    </main>
  );
}
