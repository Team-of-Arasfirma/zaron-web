
"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Goldman } from "next/font/google";
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  Layers3,
  Shield,
  Settings,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/container";

/* -----------------------------------------
   GOLDMAN FONT - ALL STATISTICS
----------------------------------------- */

const goldman = Goldman({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/* -----------------------------------------
   CAPABILITY DATA
----------------------------------------- */

const capabilities: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Advanced Production",
    description:
      "Modern manufacturing processes for consistent quality and high performance.",
    icon: Layers3,
  },
  {
    title: "Quality Control",
    description:
      "Strict quality checks at every stage to ensure durability, reliability and compliance.",
    icon: Shield,
  },
  {
    title: "Engineering Expertise",
    description:
      "Technical capability to develop efficient and reliable roofing and structural solutions.",
    icon: Settings,
  },
  {
    title: "Dependable Supply",
    description:
      "Streamlined production and supply systems to meet project requirements on time.",
    icon: Truck,
  },
];

/* -----------------------------------------
   STATIC STATISTICS DATA
----------------------------------------- */

const statistics = [
  {
    value: "57",
    label: "Roofing Machines",
  },
  {
    value: "15",
    label: "Purlin Machines",
  },
  {
    value: "19",
    label: "Accessories Machines",
  },
  {
    value: "2,300+",
    label: "Tons Annual Capacity",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

/* -----------------------------------------
   ANIMATED CAPABILITY CARD
----------------------------------------- */

function CapabilityCard({
  item,
  index,
  reduceMotion,
}: {
  item: (typeof capabilities)[number];
  index: number;
  reduceMotion: boolean;
}) {
  const Icon = item.icon;

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 45,
              scale: 0.96,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        delay: reduceMotion ? 0 : index * 0.12,
        ease,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -6,
              boxShadow: "0 16px 32px rgba(0,0,0,0.08)",
              borderColor: "#FF6500",
            }
      }
      className="
        group relative flex
        min-h-[158px] items-center
        gap-6 overflow-hidden
        rounded-[24px] border
        border-[#D2D2D2] bg-white
        px-7 py-7
        transition-colors duration-300
        sm:gap-7 sm:px-9
        lg:min-h-[170px]
      "
    >
      {/* ORANGE ICON */}
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                scale: 0.7,
              }
        }
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{ once: true }}
        transition={{
          duration: reduceMotion ? 0 : 0.5,
          delay: reduceMotion
            ? 0
            : 0.2 + index * 0.12,
        }}
        whileHover={
          reduceMotion
            ? undefined
            : {
                scale: 1.12,
                rotate: -6,
              }
        }
        className="
          flex size-[60px] shrink-0
          items-center justify-center
          text-[#FF6500]
          sm:size-[70px]
        "
      >
        <Icon
          size={62}
          strokeWidth={1.9}
          className="
            h-[54px] w-[54px]
            sm:h-[62px] sm:w-[62px]
          "
          aria-hidden="true"
        />
      </motion.div>

      {/* CARD TEXT CONTENT */}
      <div className="min-w-0 flex-1">
        <motion.h3
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 12,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            delay: reduceMotion
              ? 0
              : 0.25 + index * 0.12,
          }}
          className="
            text-[20px] font-bold
            leading-[1.2] text-[#383838]
            transition-colors duration-300
            group-hover:text-[#FF6500]
            sm:text-[23px]
            lg:text-[26px]
          "
        >
          {item.title}
        </motion.h3>

        <motion.p
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 10,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            delay: reduceMotion
              ? 0
              : 0.33 + index * 0.12,
          }}
          className="
            mt-3 max-w-[510px]
            text-[14px] leading-[1.5]
            text-[#777777]
            sm:text-[17px]
            lg:text-[19px]
          "
        >
          {item.description}
        </motion.p>
      </div>
    </motion.article>
  );
}

/* -----------------------------------------
   COUNT-UP: ONLY THE NUMBERS ANIMATE
   GOLDMAN FONT - ALL FOUR STATISTICS
----------------------------------------- */

const subscribeToHydration = () => () => {};
const clientHydrationSnapshot = () => true;
const serverHydrationSnapshot = () => false;

function AnimatedStatisticNumber({
  value,
  start,
  reduceMotion,
}: {
  value: string;
  start: boolean;
  reduceMotion: boolean;
}) {
  const hydrated = useSyncExternalStore(subscribeToHydration, clientHydrationSnapshot, serverHydrationSnapshot);
  const showFinalValue = hydrated && reduceMotion;
  const target = Number(value.replace(/[^0-9]/g, ""));
  const suffix = value.endsWith("+") ? "+" : "";
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start || reduceMotion) return;

    let animationFrame = 0;
    let startTime: number | null = null;
    const duration = 1700;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, start, reduceMotion]);

  return (
    <span className="tabular-nums">
      {(showFinalValue ? target : count).toLocaleString("en-IN")}
      {(showFinalValue || count === target) && suffix}
    </span>
  );
}

function ManufacturingStatistics() {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useInView(statsRef, { once: true, amount: 0.25 });
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div ref={statsRef} className="w-full bg-[#EAEAEA] py-9 md:py-10">
      <Container>
        <div
          className="
            grid grid-cols-2
            gap-y-10
            md:grid-cols-4
            md:gap-y-0
          "
        >
          {statistics.map((stat, index) => (
            <div
              key={stat.label}
              className={`
                ${goldman.className}
                relative flex flex-col
                items-center justify-center
                gap-4 px-3 text-center
                md:px-5
              `}
            >
              {/* COUNT-UP NUMBER - GOLDMAN */}
              <div
                className="
                  text-[35px] font-normal
                  leading-none tracking-[0.02em]
                  text-[#F05A00]
                  sm:text-[40px]
                  lg:text-[46px]
                "
              >
                <AnimatedStatisticNumber
                  value={stat.value}
                  start={isVisible}
                  reduceMotion={reduceMotion}
                />
              </div>

              {/* STATIC LABEL - GOLDMAN */}
              <p
                className="
                  text-[14px] font-normal
                  leading-[1.4] text-[#F05A00]
                  sm:text-[17px]
                  lg:text-[20px]
                "
              >
                {stat.label}
              </p>

              {/* STATIC VERTICAL DIVIDER */}
              {index < statistics.length - 1 && (
                <span
                  aria-hidden="true"
                  className="
                    absolute right-0 top-1/2
                    hidden h-[52px] w-[3px]
                    -translate-y-1/2
                    rounded-full bg-[#919191]
                    md:block
                  "
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

/* -----------------------------------------
   MAIN MANUFACTURING CAPABILITY SECTION
----------------------------------------- */

export function ManufacturingCapabilitySection() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section
      id="manufacturing-capability"
      aria-labelledby="manufacturing-heading"
      className="w-full bg-white"
    >
      <div className="py-16 md:py-20 lg:py-24">
        <Container>
          {/* SECTION LABEL */}
          <div className="flex items-center gap-5">
            <motion.span
              aria-hidden="true"
              initial={
                reduceMotion
                  ? false
                  : { scaleX: 0 }
              }
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: reduceMotion ? 0 : 0.65,
              }}
              className="
                h-[3px] w-[70px]
                origin-left rounded-full
                bg-[#FF6500]
              "
            />

            <motion.span
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: -15,
                    }
              }
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                delay: reduceMotion ? 0 : 0.15,
              }}
              className="
                text-[16px] font-medium
                text-[#242424]
                sm:text-[20px]
              "
            >
              Manufacturing Capability
            </motion.span>
          </div>

          {/* MAIN HEADING */}
          <div className="mt-9">
            {[
              {
                text: "BUILT WITH",
                color: "#6E6E6E",
              },
              {
                text: "PRECISION.",
                color: "#F05A00",
              },
              {
                text: "MADE TO PERFORM.",
                color: "#6E6E6E",
              },
            ].map((line, index) => (
              <motion.div
                key={line.text}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 28,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: reduceMotion ? 0 : 0.65,
                  delay: reduceMotion
                    ? 0
                    : index * 0.12,
                  ease,
                }}
              >
                <h2
                  id={
                    index === 0
                      ? "manufacturing-heading"
                      : undefined
                  }
                  className="
                    text-[32px] font-extrabold
                    leading-[1.08]
                    tracking-[-0.035em]
                    sm:text-[42px]
                    md:text-[52px]
                    lg:text-[56px]
                  "
                  style={{
                    color: line.color,
                  }}
                >
                  {line.text}
                </h2>
              </motion.div>
            ))}
          </div>

          {/* INTRODUCTION DESCRIPTION */}
          <motion.p
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
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              delay: reduceMotion ? 0 : 0.3,
              ease,
            }}
            className="
              mt-5 max-w-[850px]
              text-[15px] leading-[1.45]
              text-[#818181]
              sm:text-[19px]
              lg:text-[21px]
            "
          >
            Zaron combines advanced manufacturing processes,
            quality-controlled production and dependable
            material systems to deliver roofing, cladding
            and structural solutions with consistent performance.
          </motion.p>

          {/* FOUR CAPABILITY CARDS */}
          <div
            className="
              mt-10 grid grid-cols-1
              gap-6 md:grid-cols-2
              md:gap-8 lg:gap-9
            "
          >
            {capabilities.map((item, index) => (
              <CapabilityCard
                key={item.title}
                item={item}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </Container>
      </div>

      {/* GOLDMAN STATISTICS - NUMBERS COUNT UP, LABELS STATIC */}
      <ManufacturingStatistics />
    </section>
  );
}

