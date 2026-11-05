
"use client";

import Image from "next/image";

import {
  Award,
  DraftingCompass,
  Factory,
  UsersRound,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { Container } from "@/components/layout/container";

const accomplishments = [
  {
    id: "experience",
    icon: Award,
    value: "15+",
    title: "Year of Experience",
    description:
      "Delivering reliable roofing and structural solutions with industry expertise.",
  },
  {
    id: "projects",
    icon: DraftingCompass,
    value: "4,10,000+",
    title: "Projects Completed",
    description:
      "Successfully delivered projects across industrial and commercial sectors.",
  },
  {
    id: "manufacturing",
    icon: Factory,
    value: "50,000+",
    title: "Manufacturing Capacity",
    description:
      "High-quality, precision manufacturing to meet diverse project needs.",
  },
  {
    id: "clients",
    icon: UsersRound,
    value: "3,15,000+",
    title: "Clients Served",
    description:
      "Trusted by businesses across industries for consistent quality and support.",
  },
  {
    id: "presence",
    icon: null,
    value: "Pan-India",
    title: "Presence",
    description:
      "Supplying and supporting projects across key regions in India.",
  },
];

export function AccomplishmentsSection() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section
      id="accomplishments"
      aria-labelledby="accomplishments-heading"
      className="w-full bg-white py-14 md:py-20"
    >
      <Container>
        {/* SECTION HEADER */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 28 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            ease: "easeOut",
          }}
          className="mb-10 text-center"
        >
          {/* SECTION LABEL */}
          <div className="flex items-center justify-center gap-5">
            <span
              aria-hidden="true"
              className="h-[3px] w-[54px] rounded-full bg-[#FF6500]"
            />

            <p className="font-serif text-[17px] text-[#222222] sm:text-[20px]">
              Our Accomplishments
            </p>

            <span
              aria-hidden="true"
              className="h-[3px] w-[54px] rounded-full bg-[#FF6500]"
            />
          </div>

          {/* HEADING */}
          <h2
            id="accomplishments-heading"
            className="
              mt-7
              text-[clamp(1.8rem,3vw,2.75rem)]
              leading-[1.2]
              font-extrabold uppercase
              tracking-[-0.035em]
              text-[#292929]
            "
          >
            MILESTONES THAT{" "}
            <span className="text-[#FF6500]">
              BUILD STRONGER
            </span>{" "}
            TOMORROW.
          </h2>
        </motion.div>

        {/* ACCOMPLISHMENT CARDS */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 lg:gap-5">
          {accomplishments.map((item, index) => {
            const Icon = item.icon;

            return (
              
<motion.article
  key={item.id}
  initial={
    reduceMotion
      ? false
      : { opacity: 0, y: 35 }
  }
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.15 }}
  transition={{
    duration: reduceMotion ? 0 : 0.55,
    delay: reduceMotion ? 0 : index * 0.06,
  }}
  className="
    group relative flex min-h-[225px]
    min-w-0 flex-col items-center
    rounded-[18px]
    border border-[#E1E1E1]
    bg-white px-3 py-6 text-center
    shadow-[0_2px_12px_rgba(0,0,0,0.02)]
    transition-[background-color,border-color,box-shadow]
    duration-500 ease-in-out

    hover:border-[#FF6500]
    hover:bg-[#FF6500]
    hover:shadow-[0_12px_30px_rgba(255,101,0,0.18)]

    motion-reduce:transition-none
  "
>
  {/* ICON */}
  <div className="flex h-[65px] w-[65px] shrink-0 items-center justify-center">
    {item.id === "presence" ? (
      <Image
        src="/icons/india-map.svg"
        alt=""
        width={58}
        height={58}
        className="
          h-[58px] w-[58px] object-contain
          transition-[filter] duration-500
          group-hover:brightness-0
          group-hover:invert
        "
      />
    ) : (
      Icon && (
        <Icon
          size={57}
          strokeWidth={1.4}
          aria-hidden="true"
          className="
            text-[#FF6500]
            transition-colors duration-500
            group-hover:text-white
          "
        />
      )
    )}
  </div>

  {/* VALUE */}
  <p
    className="
      mt-2 font-bold text-[#FF6500]
      transition-colors duration-500
      group-hover:text-white
    "
  >
    {item.value}
  </p>

  {/* TITLE */}
  <h3
    className="
      mt-3 text-[14px] font-semibold
      text-[#161616]
      transition-colors duration-500
      group-hover:text-white
    "
  >
    {item.title}
  </h3>

  {/* DESCRIPTION */}
  <p
    className="
      mt-3 max-w-[215px]
      text-[11px] leading-[1.55]
      text-[#999999]
      transition-colors duration-500
      group-hover:text-white/90
    "
  >
    {item.description}
  </p>
</motion.article>

            );
          })}
        </div>
      </Container>
    </section>
  );
}
