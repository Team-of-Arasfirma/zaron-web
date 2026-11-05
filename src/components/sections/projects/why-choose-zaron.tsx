
"use client";

import Image from "next/image";
import { Stick_No_Bills } from "next/font/google";
import { motion, useReducedMotion } from "motion/react";

const stickNoBills = Stick_No_Bills({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

type Feature = {
  number: string;
  title: string;
  description: string;
  iconSrc: string;
};

const features: Feature[] = [
  {
    number: "01",
    title: "Quality Materials",
    description:
      "High-performance steel and roofing solutions.",
    iconSrc: "/icons/projects/Quality Materials.svg",
  },
  {
    number: "02",
    title: "Industry Expertise",
    description:
      "15+ years of experience in roofing and steel structures.",
    iconSrc: "/icons/projects/Industry Expertise.svg",
  },
  {
    number: "03",
    title: "On-Time Execution",
    description:
      "Committed to timely project delivery.",
    iconSrc: "/icons/projects/On-Time Execution.svg",
  },
  {
    number: "04",
    title: "Pan-India Presence",
    description:
      "Projects across multiple states.",
    iconSrc: "/icons/projects/Pan-India Presence.svg",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function WhyChooseZaron() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section
      aria-labelledby="why-choose-heading"
      className="relative w-full overflow-hidden bg-white"
    >
      <div
        className="
          mx-auto grid w-full max-w-[2048px]
          grid-cols-1 gap-10
          px-5 pt-16
          sm:px-8
          lg:grid-cols-[0.95fr_1.15fr]
          lg:gap-10 lg:px-[4%] lg:pt-14
          xl:grid-cols-[1fr_1.2fr]
          xl:gap-12
        "
      >
        {/* LEFT SIDE */}
        <div
          className="
            relative flex min-h-[550px]
            min-w-0 flex-col
            lg:min-h-[720px]
            xl:min-h-[740px]
          "
        >
          {/* SECTION LABEL */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 20 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              ease,
            }}
            className="flex items-center gap-7"
          >
            <span
              className="
                h-[6px] w-[90px] shrink-0
                rounded-full bg-[#FF6500]
              "
            />

            <span
              className="
                font-serif text-[26px]
                text-black sm:text-[32px]
              "
            >
              Why Choose Zaron
            </span>
          </motion.div>

          {/* HEADING */}
          <motion.h2
            id="why-choose-heading"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 30 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.75,
              delay: reduceMotion ? 0 : 0.1,
              ease,
            }}
            className="
              mt-12 text-[36px]
              font-extrabold leading-[1.12]
              tracking-[-0.035em]
              sm:text-[48px]
              lg:text-[43px]
              xl:text-[54px]
              2xl:text-[58px]
            "
          >
            <span className="block text-[#707070]">
              TRUSTED FOR
            </span>

            <span className="mt-2 block text-[#FF6500]">
              REAL-WORLD PROJECTS.
            </span>
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 20 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : 0.2,
              ease,
            }}
            className="
              mt-4 max-w-[1030px]
              text-[17px] leading-[1.4]
              text-[#747474]
              sm:text-[22px]
              lg:text-[20px]
              xl:text-[24px]
              2xl:text-[26px]
            "
          >
            Our solutions are engineered to meet the demands
            of modern industries, ensuring strength,
            durability and long-lasting performance.
          </motion.p>

          {/* FACTORY IMAGE */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: -50 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: reduceMotion ? 0 : 0.25,
              ease,
            }}
            className="
              relative mt-auto
              h-[260px] w-full
              sm:h-[350px]
              lg:h-[405px]
              xl:h-[450px]
            "
          >
            <Image
              src="/projects/why-choose-zaron-factory.png"
              alt="Industrial steel roofing and manufacturing building"
              fill
              quality={85}
              sizes="(max-width: 1023px) 100vw, 45vw"
              className="object-contain object-left-bottom"
            />
          </motion.div>
        </div>

        {/* RIGHT SIDE: FEATURE CARDS */}
        <div
          className="
            grid min-w-0
            grid-cols-1
            gap-5 pb-12
            sm:grid-cols-2
            lg:gap-5 lg:pb-14
            xl:gap-6
          "
        >
          {features.map((feature, index) => {
            return (
              <motion.article
                key={feature.number}
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
                  amount: 0.15,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.6,
                  delay: reduceMotion ? 0 : index * 0.1,
                  ease,
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -6 }
                }
                className="
                  relative flex
                  min-h-[300px]
                  min-w-0 flex-col
                  rounded-[10px]
                  border border-[#D5D5D5]
                  bg-white
                  px-7 py-8
                  shadow-[2px_3px_5px_rgba(0,0,0,0.18)]
                  transition-shadow duration-300
                  hover:shadow-[4px_10px_25px_rgba(0,0,0,0.14)]
                  sm:min-h-[320px]
                  sm:px-8
                  lg:min-h-[340px]
                  lg:px-8 lg:py-8
                  xl:min-h-[350px]
                  xl:px-[38px] xl:py-[34px]
                "
              >
                {/* LOCAL SVG / PNG ICON */}
                <div
                  className="
                    relative z-10
                    h-[100px] w-[100px]
                    shrink-0
                  "
                >
                  <Image
                    src={feature.iconSrc}
                    alt=""
                    aria-hidden="true"
                    width={100}
                    height={100}
                    className="
                      h-[100px] w-[100px]
                      object-contain
                    "
                  />
                </div>

                {/* CARD NUMBER - STICK NO BILLS REGULAR */}
                <span
                  aria-hidden="true"
                  className={`
                    ${stickNoBills.className}
                    absolute right-7 top-8
                    text-[64px]
                    font-normal leading-none
                    text-[#929292]
                    xl:right-8
                    xl:text-[72px]
                  `}
                >
                  {feature.number}
                </span>

                {/* CARD CONTENT */}
                <div className="mt-auto pt-5">
                  <h3
                    className="
                      text-[21px]
                      font-semibold
                      leading-tight
                      text-black
                      xl:text-[24px]
                    "
                  >
                    {feature.title}
                  </h3>

                  {/* ORANGE UNDERLINE */}
                  <div
                    className="
                      mt-2 h-[6px]
                      w-[90px]
                      rounded-full
                      bg-[#FF6500]
                    "
                  />

                  <p
                    className="
                      mt-3 text-[17px]
                      leading-[1.3]
                      text-[#454545]
                      xl:text-[20px]
                    "
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
