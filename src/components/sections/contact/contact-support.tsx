
"use client";

import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  MessageCircle,
} from "lucide-react";

import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa6";

import { motion, useReducedMotion } from "motion/react";

const contactDetails = [
  {
    title: "Hotline",
    value: "+91 73737 48338",
    description: "Mon - Fri, 9:00 AM - 6:00 PM",
    href: "tel:+917373748338",
    icon: Phone,
  },
  {
    title: "WhatsApp",
    value: "+91 73737 48338",
    description: "Mon - Fri, 9:00 AM - 6:00 PM",
    href: "https://wa.me/917373748338",
    icon: MessageCircle,
  },
  {
    title: "Email",
    value: "sales@zaron.in",
    secondaryValue: "info@zaron.in",
    description: "We typically reply within 24 hours",
    href: "mailto:sales@zaron.in",
    icon: Mail,
  },
  {
    title: "Head Office",
    value:
      "All 5/112, Tirupur Main Rd, Kaikattipudhur post, Palangarai, Tamil Nadu - 641654",
    href: "https://www.google.com/maps/search/?api=1&query=Zaron+Industries+Palangarai",
    icon: MapPin,
  },
  {
    title: "Office Hours",
    value: "+91 73737 48338",
    description: "Mon - Fri, 9:00 AM - 6:00 PM",
    href: "tel:+917373748338",
    icon: Clock3,
  },
];

const socialLinks = [
  {
    label: "WhatsApp",
    href: "https://wa.me/917373748338",
    icon: FaWhatsapp,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/rajalakshmi_roofing?igsh=dGJzZWxhbXZkeHU5",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Rajalakshmi-Roofings/pfbid0271v2sesEJopdRAq6iHLfyBEX2C3C7iKASRsQb1BQ1EoPKdL7fAawpfNJPS6T2tyFl/?rdid=qCt123OppOGV1yLz&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18U7y9aXzH%2F",
    icon: FaFacebook,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@rajalakshmiroofing3035",
    icon: FaYoutube,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function ContactSupport() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.aside
      aria-labelledby="contact-support-heading"
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x: 35,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        ease,
      }}
      className="
        flex h-full min-w-0
        flex-col
        rounded-[28px]
        bg-[#262626]
        px-6 py-8
        text-white
        sm:px-8 sm:py-9
        lg:px-9 lg:py-8
      "
    >
      {/* SUPPORT LABEL */}
      <div className="flex items-center gap-5">
        <span
          aria-hidden="true"
          className="
            h-[5px] w-[56px]
            rounded-full
            bg-[#FF6500]
          "
        />

        <span
          className="
            font-serif text-[20px]
            text-[#E5E5E5]
          "
        >
          Support
        </span>
      </div>

      {/* SUPPORT HEADING */}
      <h2
        id="contact-support-heading"
        className="
          mt-6
          font-serif
          text-[26px]
          leading-tight
          text-[#EAEAEA]
          sm:text-[30px]
        "
      >
        We&apos;re here to help.
      </h2>

      {/* DESCRIPTION */}
      <p
        className="
          mt-2 max-w-[390px]
          text-[14px]
          leading-[1.4]
          text-[#AAAAAA]
          sm:text-[16px]
        "
      >
        Talk to our experts for product information,
        technical support or project enquiries.
      </p>

      {/* CONTACT INFORMATION */}
      <div className="mt-8 flex flex-col gap-6">
        {contactDetails.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                flex min-w-0
                items-start gap-5
              "
            >
              {/* ICON BOX */}
              <div
                className="
                  flex h-[62px] w-[62px]
                  shrink-0 items-center
                  justify-center
                  rounded-[12px]
                  border border-[#666666]
                  bg-[#2E2E2E]
                "
              >
                <Icon
                  aria-hidden="true"
                  size={35}
                  strokeWidth={2}
                  className="text-[#FF6500]"
                />
              </div>

              {/* DETAILS */}
              <div className="min-w-0 flex-1">
                <h3
                  className="
                    text-[15px] font-semibold
                    text-white
                    sm:text-[17px]
                  "
                >
                  {item.title}
                </h3>

                <a
                  href={item.href}
                  target={
                    item.href.startsWith("https://")
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    item.href.startsWith("https://")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="
                    mt-1 block
                    break-words
                    text-[14px]
                    leading-[1.35]
                    text-[#C7C7C7]
                    transition-colors
                    hover:text-[#FF6500]
                    sm:text-[16px]
                  "
                >
                  {item.value}
                </a>

                {"secondaryValue" in item &&
                  item.secondaryValue && (
                    <a
                      href={`mailto:${item.secondaryValue}`}
                      className="
                        mt-1 block
                        text-[14px]
                        text-[#C7C7C7]
                        transition-colors
                        hover:text-[#FF6500]
                        sm:text-[16px]
                      "
                    >
                      {item.secondaryValue}
                    </a>
                  )}

                {"description" in item &&
                  item.description && (
                    <p
                      className="
                        mt-2
                        text-[11px]
                        leading-[1.45]
                        text-[#C5C5C5]
                        sm:text-[12px]
                      "
                    >
                      {item.description}
                    </p>
                  )}
              </div>
            </div>
          );
        })}
      </div>

      {/* SOCIAL LINKS */}
      <div className="mt-auto pt-8">
        {/* DIVIDER */}
        <div
          aria-hidden="true"
          className="h-px w-full bg-[#888888]"
        />

        <p
          className="
            mt-4
            text-[16px]
            text-[#EAEAEA]
          "
        >
          Connect with us
        </p>

        {/* SOCIAL MEDIA ICONS */}
        <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-7">
          {socialLinks.map((social) => {
            const SocialIcon = social.icon;

            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="
                  inline-flex size-10
                  items-center justify-center
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:text-[#FF6500]
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#FF6500]
                  motion-reduce:transform-none
                "
              >
                <SocialIcon
                  aria-hidden="true"
                  size={27}
                />
              </a>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
}
