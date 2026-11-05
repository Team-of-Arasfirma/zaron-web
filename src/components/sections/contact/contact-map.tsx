
"use client";

import {
  MapPin,
  Navigation,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/layout/container";

const OFFICE_ADDRESS =
  "All 5/112, Tirupur Main Rd, Kaikattipudhur Post, Palangarai, Tamil Nadu 641654";

const MAP_LINK =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent(`Zaron Industries, ${OFFICE_ADDRESS}`);

const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=" +
  encodeURIComponent(
    `Zaron Industries, ${OFFICE_ADDRESS}`
  ) +
  "&z=16&output=embed";

const ease = [0.22, 1, 0.36, 1] as const;

export function ContactMap() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section
      id="contact-location"
      aria-labelledby="contact-map-heading"
      className="
        relative w-full
        bg-[#F0F0F0]
        pb-16
        md:pb-20
        lg:pb-24
      "
    >
      <Container>
        {/* MAP WRAPPER */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 35,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            ease,
          }}
          className="
            relative w-full
            overflow-hidden
            rounded-[14px]
            border border-[#D8D8D8]
            bg-[#EAEAEA]
            shadow-[0_8px_30px_rgba(0,0,0,0.08)]
          "
        >
          {/* LIVE GOOGLE MAP */}
          <div className="relative w-full">
            <iframe
              title="Zaron Industries Head Office Location"
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="
                block w-full
                border-0
                h-[360px]
                sm:h-[420px]
                md:h-[480px]
                lg:h-[530px]
                xl:h-[560px]
              "
            />

            {/* SMALL GOOGLE MAP LINK */}
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="
                absolute right-4 top-4
                z-10
                inline-flex items-center gap-2
                rounded-[8px]
                border border-[#E5E5E5]
                bg-white
                px-3 py-2.5
                text-[12px] font-semibold
                text-[#333333]
                shadow-[0_4px_15px_rgba(0,0,0,0.1)]
                transition-colors duration-300
                hover:text-[#FF6500]
                focus-visible:outline-2
                focus-visible:outline-[#FF6500]
                sm:right-5 sm:top-5
                sm:text-[13px]
              "
            >
              <ExternalLink
                size={16}
                className="text-[#FF6500]"
                aria-hidden="true"
              />
              <span>Open in Google Maps</span>
            </a>
          </div>

          {/* LOCATION DETAILS FOOTER */}
          <div
            className="
              flex flex-col
              gap-5
              border-t border-[#E5E5E5]
              bg-white
              px-5 py-5
              sm:px-7 sm:py-6
              lg:flex-row
              lg:items-center
              lg:justify-between
              lg:gap-8
            "
          >
            {/* LOCATION INFORMATION */}
            <div className="flex min-w-0 items-start gap-4">
              {/* LOCATION ICON */}
              <div
                className="
                  flex h-[52px] w-[52px]
                  shrink-0
                  items-center justify-center
                  rounded-[12px]
                  bg-[#FFF0E6]
                "
              >
                <MapPin
                  size={26}
                  strokeWidth={2}
                  className="text-[#FF6500]"
                  aria-hidden="true"
                />
              </div>

              {/* ADDRESS */}
              <div className="min-w-0">
                <h2
                  id="contact-map-heading"
                  className="
                    text-[18px]
                    font-bold
                    text-[#282828]
                    sm:text-[21px]
                  "
                >
                  Zaron Industries
                </h2>

                <p
                  className="
                    mt-1
                    max-w-[650px]
                    text-[13px]
                    leading-[1.6]
                    text-[#777777]
                    sm:text-[15px]
                  "
                >
                  {OFFICE_ADDRESS}
                </p>
              </div>
            </div>

            {/* DIRECTIONS BUTTON */}
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions to Zaron Industries"
              className="
                group inline-flex
                min-h-[48px]
                shrink-0
                items-center justify-center
                gap-3
                rounded-full
                bg-[#FF6500]
                px-6 py-3
                text-[14px]
                font-semibold
                text-white
                transition-all duration-300
                hover:bg-[#E85B00]
                hover:shadow-[0_8px_22px_rgba(255,101,0,0.22)]
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#FF6500]
                sm:text-[15px]
              "
            >
              <Navigation
                size={18}
                aria-hidden="true"
              />

              Get Directions

              <ArrowUpRight
                size={17}
                aria-hidden="true"
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                  motion-reduce:transform-none
                "
              />
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
