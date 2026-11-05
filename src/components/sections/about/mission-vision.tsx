
"use client";

import { motion, useReducedMotion } from "motion/react";
import { Stick_No_Bills } from "next/font/google";

import { Container } from "@/components/layout/container";

/* -----------------------------------------
   NUMBER FONT - STICK NO BILLS
----------------------------------------- */

const stickNoBills = Stick_No_Bills({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/* -----------------------------------------
   MISSION AND VISION DATA
----------------------------------------- */

const cards = [
  {
    number: "01",
    label: "OUR",
    title: "MISSION",
    description:
      "To manufacture and deliver high-quality roofing, cladding and structural solutions that create stronger, safer and more sustainable spaces for industries and communities across India.",
    dark: true,
  },
  {
    number: "02",
    label: "OUR",
    title: "VISION",
    description:
      "To be a trusted manufacturer of roofing and structural solutions, with a strong presence across India and future growth opportunities in global markets.",
    dark: false,
  },
];

type CardData = (typeof cards)[number];

/* -----------------------------------------
   SLANTED CARD COMPONENT
----------------------------------------- */

function ShapeCard({
  card,
  index,
  reduceMotion,
}: {
  card: CardData;
  index: number;
  reduceMotion: boolean;
}) {
  const isDark = card.dark;

  const shapePath = `
    M 48 2
    H 542
    Q 558 2 554 18
    L 512 212
    Q 509 228 493 228
    H 18
    Q 2 228 6 212
    L 32 18
    Q 35 2 48 2
    Z
  `;

  return (
    <motion.article
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
        amount: 0.25,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        delay: reduceMotion ? 0 : index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -6,
            }
      }
      className="
        relative isolate
        min-h-[245px] w-full
        sm:h-[235px]
        lg:h-[250px]
      "
    >
      {/* FIGMA EVEN SLANTED CARD SHAPE */}
      <svg
        aria-hidden="true"
        viewBox="0 0 560 230"
        preserveAspectRatio="none"
        className="
          pointer-events-none
          absolute inset-0
          h-full w-full
          overflow-visible
        "
      >
        <defs>
          {/* CARD SHADOW */}
          <filter
            id={`mv-shadow-${index}`}
            x="-20%"
            y="-20%"
            width="150%"
            height="160%"
          >
            <feDropShadow
              dx="4"
              dy="6"
              stdDeviation="3"
              floodColor="#000000"
              floodOpacity="0.16"
            />
          </filter>

          {/* CARD CLIP FOR DIAGONAL OVERLAY */}
          <clipPath id={`mv-clip-${index}`}>
            <path d={shapePath} />
          </clipPath>
        </defs>

        {/* CARD BACKGROUND AND BORDER */}
        <path
          d={shapePath}
          fill={isDark ? "#181C1F" : "#FFFFFF"}
          stroke={isDark ? "#F0F0F0" : "#FF6500"}
          strokeWidth={isDark ? 1.5 : 2}
          filter={`url(#mv-shadow-${index})`}
        />

        {/* TOP RIGHT DIAGONAL OVERLAY */}
        <g clipPath={`url(#mv-clip-${index})`}>
          <path
            d="
              M 420 2
              H 560
              L 512 188
              Z
            "
            fill={isDark ? "#FFFFFF" : "#DADADA"}
            opacity={isDark ? 0.055 : 0.28}
          />
        </g>
      </svg>

      {/* CARD CONTENT */}
      <div
        className="
          relative z-10
          flex flex-col
          pl-[16%] pr-[22%]
          pt-[36px] pb-8
          sm:pt-[38px]
          lg:pt-[40px]
        "
      >
        {/* OUR LABEL */}
        <span
          className={`
            text-[11px] font-normal
            uppercase leading-[1.3]
            ${
              isDark
                ? "text-white/80"
                : "text-[#626262]"
            }
          `}
        >
          {card.label}
        </span>

        {/* MISSION / VISION TITLE */}
        <h3
          className={`
            mt-0.5
            text-[20px]
            font-semibold
            leading-[1.1]
            sm:text-[22px]
            ${
              isDark
                ? "text-white"
                : "text-[#555555]"
            }
          `}
        >
          {card.title}
        </h3>

        {/* ORANGE UNDERLINE */}
        <span
          aria-hidden="true"
          className="
            mt-2 block h-[2px]
            w-[35px] shrink-0
            bg-[#FF6500]
          "
        />

        {/* CARD DESCRIPTION */}
        <p
          className={`
            mt-4
            max-w-[365px]
            text-[16px]
            leading-[1.55]
            sm:text-[12px]
            lg:text-[14px]
            ${
              isDark
                ? "text-white/85"
                : "text-[#737373]"
            }
          `}
        >
          {card.description}
        </p>
      </div>

      {/* CARD NUMBER - STICK NO BILLS 48PX */}
      <span
        aria-hidden="true"
        className={`
          ${stickNoBills.className}
          pointer-events-none
          absolute right-[8%]
          top-[35px] z-20
          text-[48px] font-normal
          leading-none
          ${
            isDark
              ? "text-[#8A8A8A]"
              : "text-[#999999]"
          }
        `}
      >
        {card.number}
      </span>
    </motion.article>
  );
}

/* -----------------------------------------
   MAIN MISSION & VISION SECTION
----------------------------------------- */

export function MissionVisionSection() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section
      id="mission-vision"
      aria-labelledby="mission-vision-heading"
      className="
        w-full bg-[#F4F4F4]
        py-16 md:py-24
      "
    >
      <Container>
        {/* SECTION LABEL */}
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="
              h-[2px] w-12
              bg-[#FF6500]
            "
          />

          <span className="text-sm font-medium text-[#282828]">
            Mission &amp; Vision
          </span>
        </div>

        {/* SECTION HEADING */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
          }}
          className="mt-7"
        >
          <h2
            id="mission-vision-heading"
            className="
              text-[28px] font-extrabold
              leading-[1.12]
              tracking-[-0.035em]
              sm:text-[36px]
              md:text-[48px]
            "
          >
            <span className="block text-[#6E6E6E]">
              BUILT WITH PURPOSE.
            </span>

            <span className="block text-[#FF6500]">
              GUIDED BY EXPERIENCE.
            </span>
          </h2>

          {/* SECTION DESCRIPTION */}
          <p
            className="
              mt-3 max-w-[660px]
              text-sm leading-relaxed
              text-[#858585]
              sm:text-base
            "
          >
            Our mission and vision drive everything
            we do, from the materials we manufacture
            to the relationships we build with our
            customers and partners.
          </p>
        </motion.div>

        {/* MISSION & VISION CARDS */}
        <div
          className="
            mt-12 grid
            grid-cols-1 gap-7
            md:grid-cols-2
            md:gap-8
            lg:gap-12
          "
        >
          {cards.map((card, index) => (
            <ShapeCard
              key={card.number}
              card={card}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
