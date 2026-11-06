import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

import { Container } from "@/components/layout/container";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Career", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const products = [
  "PGL Coils",
  "Purlin",
  "Decking Sheet",
  "Standing Seam",
  "Air Ventilator",
  "Multiwall Sheet",
];

const socialLinks = [
  {
    label: "WhatsApp",
    icon: FaWhatsapp,
    href: "https://wa.me/917373748338",
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/rajalakshmi_roofing?igsh=dGJzZWxhbXZkeHU5",
  },
  {
    label: "Facebook",
    icon: FaFacebookF,
    href: "https://www.facebook.com/people/Rajalakshmi-Roofings/pfbid0271v2sesEJopdRAq6iHLfyBEX2C3C7iKASRsQb1BQ1EoPKdL7fAawpfNJPS6T2tyFl/?rdid=qCt123OppOGV1yLz&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18U7y9aXzH%2F",
  },
  {
    label: "YouTube",
    icon: FaYoutube,
    href: "https://www.youtube.com/@rajalakshmiroofing3035",
  },
];

function FooterHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-[19px] font-medium text-white">
        {children}
      </h3>

      <span
        aria-hidden="true"
        className="
          mt-2 block h-[3px] w-[60px]
          rounded-full bg-[#FF6500]
        "
      />
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        group flex w-fit items-start gap-4
        text-[15px] leading-6 text-white/90
        transition-colors duration-200
        hover:text-[#FF6500]
        focus-visible:rounded-sm
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-[#FF6500]
      "
    >
      <ChevronRight
        size={18}
        strokeWidth={2.5}
        aria-hidden="true"
        className="
          mt-[3px] shrink-0 text-[#FF6500]
          transition-transform duration-200
          group-hover:translate-x-1
          motion-reduce:transform-none
        "
      />

      <span>{children}</span>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-[#0D1519] text-white">
      <Container>
        {/* MAIN FOOTER */}
        <div
          className="
            grid grid-cols-1
            gap-x-7 gap-y-12
            py-14
            sm:grid-cols-2
            md:py-16
            lg:grid-cols-12
            lg:gap-x-5
            xl:gap-x-7
          "
        >
          {/* COLUMN 1 - COMPANY */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              aria-label="Zaron Industries Home"
              className="inline-flex"
            >
              <Image
                src="/logo/zaron-w.png"
                alt="Zaron Industries"
                width={608}
                height={520}
                sizes="150px"
                className="h-auto w-[150px] object-contain"
              />
            </Link>

            <p
              className="
                mt-3 text-[13px]
                tracking-wide text-white/85
              "
            >
              ROOFING | CLADDING | STRUCTURES
            </p>

            <p
              className="
                mt-2 max-w-[350px]
                text-[15px] leading-[1.55]
                text-white/95
              "
            >
              Delivering High-Performance Roofing,
              Cladding And Structural Solutions
              For Industrial And Commercial
              Projects Across India.
            </p>

            {/* SOCIAL ICONS */}
            <div
              className="mt-7 flex items-center gap-5"
              aria-label="Social media"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return social.href ? (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="
                      text-white
                      transition-all duration-200
                      hover:-translate-y-1
                      hover:text-[#FF6500]
                      focus-visible:rounded
                      focus-visible:outline-2
                      focus-visible:outline-[#FF6500]
                      motion-reduce:transform-none
                    "
                  >
                    <Icon size={24} aria-hidden="true" />
                  </a>
                ) : (
                  <span
                    key={social.label}
                    title={`${social.label} link coming soon`}
                    className="cursor-default text-white/70"
                  >
                    <Icon size={24} aria-hidden="true" />
                  </span>
                );
              })}
            </div>
          </div>

          {/* COLUMN 2 - QUICK LINKS */}
          <div className="lg:col-span-2">
            <FooterHeading>Quick Links</FooterHeading>

            <nav aria-label="Footer quick links">
              <ul className="space-y-3">
                {quickLinks.map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>
                      {item.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* COLUMN 3 - PRODUCTS */}
          <div className="lg:col-span-2">
            <FooterHeading>Our Products</FooterHeading>

            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product}>
                  <FooterLink href="/products">
                    {product}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4 - LEGAL */}
          <div className="lg:col-span-2">
            <FooterHeading>Legal</FooterHeading>

            <ul className="space-y-3">
              <li>
                <div
                  className="
                    flex items-start gap-4
                    text-[15px] leading-6
                    text-white/90
                  "
                >
                  <ChevronRight
                    size={18}
                    strokeWidth={2.5}
                    className="
                      mt-[3px] shrink-0
                      text-[#FF6500]
                    "
                    aria-hidden="true"
                  />
                  <span>Terms &amp; Conditions</span>
                </div>
              </li>

              <li>
                <div
                  className="
                    flex items-start gap-4
                    text-[15px] leading-6
                    text-white/90
                  "
                >
                  <ChevronRight
                    size={18}
                    strokeWidth={2.5}
                    className="
                      mt-[3px] shrink-0
                      text-[#FF6500]
                    "
                    aria-hidden="true"
                  />
                  <span>Privacy Policy</span>
                </div>
              </li>
            </ul>
          </div>

          {/* COLUMN 5 - CONTACT */}
          <div className="sm:col-span-2 lg:col-span-2">
            <FooterHeading>Get In Touch</FooterHeading>

            <div className="space-y-6">
              {/* PHONE */}
              <div className="flex items-start gap-3">
                <div
                  className="
                    flex size-9 shrink-0
                    items-center justify-center
                    rounded-full bg-white/15
                    text-[#FF6500]
                  "
                >
                  <Phone size={18} aria-hidden="true" />
                </div>

                <div
                  className="
                    min-w-0 text-[14px]
                    leading-6 text-white/90
                  "
                >
                  <a
                    href="tel:+917373748338"
                    className="
                      block transition-colors
                      hover:text-[#FF6500]
                    "
                  >
                    +91 73737 48338
                  </a>

                  <a
                    href="tel:+917373778338"
                    className="
                      block transition-colors
                      hover:text-[#FF6500]
                    "
                  >
                    +91 73737 78338
                  </a>

                  <p className="mt-1 text-[13px]">
                    Mon – Sat
                     <br/>
                     9:00AM – 6:00PM
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-3">
                <div
                  className="
                    flex size-9 shrink-0
                    items-center justify-center
                    rounded-full bg-white/15
                    text-[#FF6500]
                  "
                >
                  <Mail size={18} aria-hidden="true" />
                </div>

                <div
                  className="
                    min-w-0 space-y-1
                    text-[14px] leading-6
                    text-white/90
                  "
                >
                  <a
                    href="mailto:sales@zaron.in"
                    className="
                      block break-all
                      transition-colors
                      hover:text-[#FF6500]
                    "
                  >
                    sales@zaron.in
                  </a>

                  <a
                    href="mailto:info@zaron.in"
                    className="
                      block break-all
                      transition-colors
                      hover:text-[#FF6500]
                    "
                  >
                    info@zaron.in
                  </a>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="flex items-start gap-3">
                <div
                  className="
                    flex size-9 shrink-0
                    items-center justify-center
                    rounded-full bg-white/15
                    text-[#FF6500]
                  "
                >
                  <MapPin size={19} aria-hidden="true" />
                </div>

                <address
                  className="
                    text-[14px] leading-[1.55]
                    text-white/90 not-italic
                  "
                >
                  All 5/112, Tirupur Main Rd,
                  <br />
                  Kaikattipudhur Post,
                  <br />
                  Palangarai,
                  <br />
                  Tamil Nadu - 641654
                </address>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* COPYRIGHT BAR */}
      <div
        className="
          bg-[#FF8533]
          py-5 text-center
        "
      >
        <Container>
          <p
            className="
              text-[14px] font-medium
              text-white sm:text-base
            "
          >
            © {new Date().getFullYear()} Zaron.
            {" "}All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}