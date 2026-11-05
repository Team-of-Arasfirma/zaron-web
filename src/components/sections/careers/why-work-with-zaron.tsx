
"use client";

import {
  ArrowRight,
  ChartNoAxesCombined,
  Factory,
  HardHat,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { Stick_No_Bills } from "next/font/google";
import { motion } from "motion/react";

import { useCareerReducedMotion } from "@/hooks/use-career-reduced-motion";
import { Container } from "@/components/layout/container";

// Number font: Stick No Bills Regular
const numbers = Stick_No_Bills({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

type Feature = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const features: Feature[] = [
  {
    number: "01",
    title: "Hands-On Manufacturing Experience",
    description:
      "Work closely with production, quality and shop-floor teams to understand real manufacturing processes.",
    icon: Factory,
  },
  {
    number: "02",
    title: "Engineering & Project Exposure",
    description:
      "Contribute to roofing, structural and industrial projects from planning through execution.",
    icon: HardHat,
  },
  {
    number: "03",
    title: "Office & Operations Collaboration",
    description:
      "Work across design, sales, procurement, HR and operations teams in a collaborative environment.",
    icon: UsersRound,
  },
  {
    number: "04",
    title: "Career Growth Across Functions",
    description:
      "Build practical expertise and grow across manufacturing, engineering, project and corporate roles.",
    icon: ChartNoAxesCombined,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

// Replace this component when your local SVG icons are ready.
function FeatureIcon({
  icon: Icon,
}: {
  icon: LucideIcon;
}) {
  return (
    <div
      className="
        flex h-[58px] w-[58px]
        shrink-0 items-center justify-center
        sm:h-[72px] sm:w-[72px]
      "
    >
      <Icon
        aria-hidden="true"
        strokeWidth={1.5}
        className="
          h-[48px] w-[48px]
          text-[#FF6500]
          sm:h-[62px] sm:w-[62px]
        "
      />
    </div>
  );
}

export function WhyWorkWithZaron() {
  const reduced = useCareerReducedMotion();

  const scrollToOpenings = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    const section = document.getElementById(
      "current-openings"
    );

    section?.scrollIntoView({
      behavior: reduced ? "instant" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="why-work-with-zaron"
      aria-labelledby="why-work-heading"
      className="
        relative w-full
        overflow-hidden bg-white
        py-16 sm:py-20
        lg:py-24
      "
    >
      <Container
        className="
          mx-auto grid
          max-w-[1920px]
          grid-cols-1 gap-12
          lg:grid-cols-[0.95fr_1.15fr]
          lg:items-center
          lg:gap-14
          xl:gap-20
        "
      >
        {/* LEFT CONTENT */}
        <motion.div
          initial={
            reduced
              ? false
              : {
                  opacity: 0,
                  y: 24,
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
            duration: reduced ? 0 : 0.65,
            ease,
          }}
          className="min-w-0"
        >
          {/* SECTION LABEL */}
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="
                h-[4px] w-[52px]
                shrink-0 rounded-full
                bg-[#FF6500]
              "
            />

            <p
              className="
                font-serif
                text-[18px]
                text-[#222D32]
                sm:text-[22px]
              "
            >
              Why Work With Zaron
            </p>
          </div>

          {/* MAIN HEADING */}
          <h2
            id="why-work-heading"
            className="
              mt-9
              text-[clamp(1.875rem,3vw,3.25rem)]
              font-extrabold
              leading-[1.12]
              tracking-[-0.035em]
            "
          >
            <span className="block text-[#707070]">
              GROW WITH A TEAM
            </span>

            <span className="mt-2 block text-[#FF6500]">
              THAT BUILDS FOR THE FUTURE.
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-5 max-w-[620px]
              text-[15px] leading-[1.6]
              text-[#777777]
              sm:text-[17px]
              lg:text-[18px]
            "
          >
            At Zaron, you&apos;ll work on real
            industrial projects, learn from experienced
            professionals and build practical expertise
            across engineering, manufacturing and
            roofing solutions.
          </p>

          {/* CTA BUTTON */}
          <a
            href="#current-openings"
            onClick={scrollToOpenings}
            className="
              group mt-8
              inline-flex min-h-[48px]
              items-center justify-center
              gap-5 rounded-full
              bg-[#FF6500]
              px-7 py-3
              text-[14px] font-semibold
              text-white
              transition-all duration-300
              hover:bg-[#E85B00]
              hover:shadow-[0_8px_20px_rgba(255,101,0,0.25)]
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#FF6500]
              sm:text-[16px]
            "
          >
            Join Our Team

            <ArrowRight
              aria-hidden="true"
              size={20}
              className="
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </a>
        </motion.div>

        {/* RIGHT FEATURE CARDS */}
        <div
          className="
            grid min-w-0
            grid-cols-1
            gap-4
            sm:gap-5
          "
        >
          {features.map((feature, index) => (
            <motion.article
              key={feature.number}
              initial={
                reduced
                  ? false
                  : {
                      opacity: 0,
                      y: 25,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: reduced ? 0 : 0.6,
                delay: reduced ? 0 : index * 0.1,
                ease,
              }}
              whileHover={
                reduced
                  ? undefined
                  : {
                      y: -4,
                    }
              }
              className="
                group relative flex
                min-h-[120px]
                w-full min-w-0
                items-center
                gap-3
                rounded-[14px]
                bg-[#F4F4F4]
                px-4 py-5
                transition-colors duration-300
                hover:bg-[#F0F0F0]
                sm:min-h-[135px]
                sm:gap-5
                sm:px-6 sm:py-5
                lg:min-h-[140px]
                xl:px-7
              "
            >
              {/* FEATURE ICON */}
              <FeatureIcon icon={feature.icon} />

              {/* FEATURE TEXT */}
              <div
                className="
                  relative z-10
                  min-w-0 flex-1
                "
              >
                <h3
                  className="
                    text-[15px]
                    font-bold
                    leading-[1.3]
                    text-[#454545]
                    transition-colors
                    duration-300
                    group-hover:text-[#FF6500]
                    sm:text-[18px]
                    xl:text-[20px]
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                    mt-1.5
                    text-[12px]
                    leading-[1.45]
                    text-[#777777]
                    sm:text-[14px]
                    xl:text-[15px]
                  "
                >
                  {feature.description}
                </p>
              </div>

              {/* STICK NO BILLS NUMBER */}
              <span
                aria-hidden="true"
                className={`
                  ${numbers.className}
                  shrink-0
                  self-center
                  text-[48px]
                  font-normal leading-none
                  text-[#929292]
                  sm:text-[62px]
                  xl:text-[72px]
                `}
              >
                {feature.number}
              </span>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
