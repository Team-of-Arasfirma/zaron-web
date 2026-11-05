
"use client";

import Image from "next/image";

import {
  Award,
  Factory,
  MapPinned,
  Settings,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { Container } from "@/components/layout/container";

const highlights = [
  {
    icon: Award,
    value: "15+",
    label: "Years of Experience",
  },
  {
    icon: Factory,
    value: "100,000+",
    label: "Tons Annual Capacity",
  },
  {
    icon: MapPinned,
    value: "Pan-India",
    label: "Supply Network",
  },
  {
    icon: Settings,
    value: "Advanced",
    label: "Manufacturing",
  },
];

const heroImages = [
  {
    src: "/about/about-hero-01.png",
    alt: "Zaron roofing manufacturing machinery",
  },
  {
    src: "/about/about-hero-02.png",
    alt: "Industrial roofing production facility",
  },
  {
    src: "/about/about-hero-03.png",
    alt: "Metal roofing sheet roll forming equipment",
  },
];

export function AboutHero() {
  const reduceMotion = Boolean(useReducedMotion());

  const reveal = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      aria-labelledby="about-hero-heading"
      className="
        relative w-full overflow-hidden
        bg-[#A7A7A7]
        pt-[145px] pb-12
        md:pt-[160px] md:pb-16
        lg:pt-[155px] lg:pb-12
      "
    >
      <Container>
        <div
          className="
            grid grid-cols-1
            items-center gap-10
            lg:grid-cols-[1.08fr_0.92fr]
            lg:gap-8
            xl:gap-12
          "
        >
          {/* LEFT CONTENT */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: -45 }
            }
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 min-w-0"
          >
            {/* EYEBROW */}
            <p
              className="
                font-serif text-[17px]
                text-white/90
                sm:text-[19px]
              "
            >
              About Zaron
            </p>

            {/* HERO HEADING */}
            <h1
              id="about-hero-heading"
              className="
                mt-3 max-w-[720px]
                text-[clamp(2.3rem,4.1vw,4.5rem)]
                leading-[1.12]
                font-extrabold
                tracking-[-0.045em]
                uppercase
              "
            >
              <span className="block text-white">
                SHAPING STRONGER
              </span>

              <span className="mt-2 block text-[#FF6500]">
                STRUCTURES FOR
              </span>

              <span className="block text-[#FF6500]">
                TOMORROW.
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p
              className="
                mt-5 max-w-[620px]
                text-[14px] leading-[1.75]
                text-white/90
                sm:text-[16px]
              "
            >
              With over 15 years of experience in the
              manufacturing industry, Zaron Industries
              delivers high-performance roofing,
              pre-engineered building and structural
              solutions designed for strength, reliability
              and long-term performance.
            </p>

            {/* HIGHLIGHT STATS */}
            <div
              className="
                mt-9 grid grid-cols-2
                gap-x-5 gap-y-6
                sm:grid-cols-4
                sm:gap-4
                lg:mt-10
              "
            >
              {highlights.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    variants={reveal}
                    initial={
                      reduceMotion ? false : "hidden"
                    }
                    animate="visible"
                    transition={{
                      duration: reduceMotion ? 0 : 0.55,
                      delay: reduceMotion
                        ? 0
                        : 0.2 + index * 0.1,
                    }}
                    className="
                      flex min-w-0
                      items-start gap-2.5
                    "
                  >
                    <Icon
                      size={32}
                      strokeWidth={1.6}
                      aria-hidden="true"
                      className="
                        mt-0.5 shrink-0
                        text-[#FF6500]
                        sm:size-[36px]
                      "
                    />

                    <div className="min-w-0">
                      <p
                        className="
                          text-[18px]
                          leading-tight font-bold
                          text-white
                          sm:text-[19px]
                        "
                      >
                        {item.value}
                      </p>

                      <p
                        className="
                          mt-1 text-[10px]
                          leading-[1.4]
                          text-white/85
                          sm:text-[11px]
                        "
                      >
                        {item.label}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT IMAGE COLLAGE */}
          <div
            className="
              relative mx-auto
              w-full max-w-[650px]
              lg:ml-auto
            "
          >
            <div
              className="
                grid grid-cols-[0.8fr_1.2fr]
                grid-rows-[150px_170px]
                gap-3
                sm:grid-rows-[210px_225px]
                lg:grid-rows-[170px_195px]
                xl:grid-rows-[200px_225px]
              "
            >
              {/* IMAGE 01 - TOP LEFT */}
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: -30,
                        y: -15,
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.7,
                  delay: reduceMotion ? 0 : 0.15,
                }}
                className="
                  group relative
                  row-start-1 col-start-1
                  overflow-hidden
                  rounded-[14px]
                  border-2 border-white
                  shadow-[0_10px_25px_rgba(0,0,0,0.12)]
                "
              >
                <Image
                  src={heroImages[0].src}
                  alt={heroImages[0].alt}
                  fill
                  loading="eager"
                  sizes="(max-width: 1023px) 40vw, 18vw"
                  className="
                    object-cover
                    transition-transform duration-700
                    ease-out
                    group-hover:scale-110
                    motion-reduce:transition-none
                  "
                />
              </motion.div>

              {/* IMAGE 02 - TOP RIGHT */}
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: 35,
                        y: -20,
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.75,
                  delay: reduceMotion ? 0 : 0.25,
                }}
                className="
                  group relative
                  row-start-1 col-start-2
                  translate-y-[-8px]
                  overflow-hidden
                  rounded-[14px]
                  border-2 border-white
                  shadow-[0_10px_25px_rgba(0,0,0,0.12)]
                "
              >
                <Image
                  src={heroImages[1].src}
                  alt={heroImages[1].alt}
                  fill
                  loading="eager"
                  sizes="(max-width: 1023px) 60vw, 28vw"
                  className="
                    object-cover
                    transition-transform duration-700
                    ease-out
                    group-hover:scale-110
                    motion-reduce:transition-none
                  "
                />
              </motion.div>

              {/* IMAGE 03 - LOWER CENTER */}
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 40,
                        scale: 0.96,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.8,
                  delay: reduceMotion ? 0 : 0.4,
                }}
                className="
                  group relative
                  row-start-2 col-start-1
                  col-span-2
                  mx-auto
                  w-[72%]
                  overflow-hidden
                  rounded-[14px]
                  border-2 border-white
                  shadow-[0_10px_25px_rgba(0,0,0,0.12)]
                "
              >
                <Image
                  src={heroImages[2].src}
                  alt={heroImages[2].alt}
                  fill
                  loading="eager"
                  sizes="(max-width: 1023px) 72vw, 36vw"
                  className="
                    object-cover
                    transition-transform duration-700
                    ease-out
                    group-hover:scale-110
                    motion-reduce:transition-none
                  "
                />
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
