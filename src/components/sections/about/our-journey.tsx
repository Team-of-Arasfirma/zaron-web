
"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

import { Container } from "@/components/layout/container";

/* -----------------------------------------
   TIMELINE DATA
   Figma canvas: 1129 x 536
----------------------------------------- */

const timelineData = [
  {
    year: "2011",
    description:
      "Operations started with roofing sheet manufacturing.",
    y: 54,
    badgeX: 483,
    cardX: 623,
  },
  {
    year: "2012",
    description: "Company officially registered.",
    y: 128,
    badgeX: 492,
    cardX: 633,
  },
  {
    year: "2016",
    description:
      "Manufacturing facility expanded to 15,000 sq.ft. in Avinashi.",
    y: 202,
    badgeX: 509,
    cardX: 633,
  },
  {
    year: "2017",
    description:
      "Second manufacturing facility started. Introduced C & Z Purlin.",
    y: 282,
    badgeX: 512,
    cardX: 636,
  },
  {
    year: "2019",
    description:
      "Added Decking Sheet and Tile roofing setup.",
    y: 342,
    badgeX: 508,
    cardX: 638,
  },
  {
    year: "2021",
    description:
      "Added Standing Seam roofing solutions.",
    y: 404,
    badgeX: 503,
    cardX: 633,
  },
  {
    year: "NOW",
    description:
      "2,300+ tons annual production capacity. Presence in Avinashi and Hyderabad. Pan-India supply network.",
    y: 474,
    badgeX: 442,
    cardX: 635,
  },
];

/* -----------------------------------------
   FIGMA CANVAS + CURVE
----------------------------------------- */

const CANVAS_W = 1129;
const CANVAS_H = 536;

const CURVE_CX = 141;
const CURVE_CY = 268;
const CURVE_R = 342;

const ORANGE = "#FF6A0F";
const BADGE_ORANGE = "#FF7B25";

function curveX(y: number) {
  const dy = y - CURVE_CY;

  return (
    CURVE_CX +
    Math.sqrt(
      Math.max(
        0,
        CURVE_R * CURVE_R - dy * dy
      )
    )
  );
}

const CURVE_PATH = `
  M ${curveX(0)} 0
  A ${CURVE_R} ${CURVE_R}
  0 0 1
  ${curveX(CANVAS_H)} ${CANVAS_H}
`;

/* -----------------------------------------
   RESPONSIVE FIT BOX
----------------------------------------- */

function FitBox({
  width,
  height,
  maxScale = 1,
  children,
}: {
  width: number;
  height: number;
  maxScale?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const update = () => {
      const availableWidth = element.clientWidth;

      if (availableWidth > 0) {
        setScale(
          Math.min(
            maxScale,
            availableWidth / width
          )
        );

        setReady(true);
      }
    };

    update();

    const observer = new ResizeObserver(update);

    observer.observe(element);

    return () => observer.disconnect();
  }, [width, maxScale]);

  return (
    <div ref={ref} className="w-full">
      <div
        className="mx-auto transition-opacity duration-300"
        style={{
          width: width * scale,
          height: height * scale,
          opacity: ready ? 1 : 0,
        }}
      >
        <div
          className="relative"
          style={{
            width,
            height,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------
   LEFT GRAPHIC
   2ND CODE DESIGN:
   ROTATING RING + STATIC CENTER LOGO
----------------------------------------- */

function JourneyGraphic({
  inView,
  reduceMotion,
}: {
  inView: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div
      className="
        relative flex h-[360px] w-[360px]
        items-center justify-center
      "
    >
      {/* ROTATING BLACK + ORANGE RING */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={
          reduceMotion || !inView
            ? undefined
            : { rotate: [0, 360] }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 16,
                repeat: Infinity,
                ease: "linear",
              }
        }
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 190deg, #262429 0deg 150deg, #F36A05 150deg 310deg, transparent 310deg 360deg)",
        }}
      >
        {/* WHITE RING CUTOUT */}
        <div
          className="
            absolute inset-[52px]
            rounded-full bg-white
          "
        />
      </motion.div>

      {/* STATIC CENTER CIRCLE WITH FLOAT ANIMATION */}
      <motion.div
        initial={false}
        animate={
          reduceMotion || !inView
            ? undefined
            : {
                y: [0, -8, 0],
                scale: [1, 1.015, 1],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="
          relative z-10 flex
          h-[250px] w-[250px]
          flex-col items-center justify-center
          rounded-full bg-white
          shadow-[0_12px_30px_rgba(0,0,0,0.12)]
        "
      >
        {/* OUR JOURNEY TEXT */}
        <p
          className="
            absolute top-[34px]
            text-[12px] font-semibold
            tracking-[0.55em]
            text-[#F36A05]
          "
        >
          OUR JOURNEY
        </p>

        {/* STATIC ZARON LOGO */}
        <Image
          src="/logo/zaron-b.png"
          alt="Zaron Industries"
          width={220}
          height={160}
          className="
            h-auto w-[150px]
            object-contain
          "
        />
      </motion.div>
    </div>
  );
}

/* -----------------------------------------
   DESKTOP FIGMA TIMELINE
----------------------------------------- */

function DesktopTimeline({
  inView,
  reduceMotion,
}: {
  inView: boolean;
  reduceMotion: boolean;
}) {
  const [activeDot, setActiveDot] = useState<number | null>(null);

  return (
    <div className="hidden lg:block">
      <FitBox
        width={CANVAS_W}
        height={CANVAS_H}
        maxScale={1.6}
      >
        {/* LEFT LOGO GRAPHIC */}
        <div
          className="absolute"
          style={{
            left: 52,
            top: 88,
          }}
        >
          <JourneyGraphic
            inView={inView}
            reduceMotion={reduceMotion}
          />
        </div>

        {/* LARGE DASHED CURVE */}
        <svg
          aria-hidden="true"
          width={CANVAS_W}
          height={CANVAS_H}
          viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          className="
            pointer-events-none
            absolute left-0 top-0
            overflow-visible
          "
        >
          <defs>
            <mask id="journey-curve-mask">
              <motion.path
                d={CURVE_PATH}
                fill="none"
                stroke="white"
                strokeWidth="6"
                initial={
                  reduceMotion
                    ? false
                    : { pathLength: 0 }
                }
                animate={
                  inView
                    ? { pathLength: 1 }
                    : undefined
                }
                transition={{
                  duration: reduceMotion ? 0 : 2,
                  ease: "easeInOut",
                }}
              />
            </mask>
          </defs>

          {/* DASHED CIRCULAR TRACK */}
          <path
            d={CURVE_PATH}
            fill="none"
            stroke="#8E8E8E"
            strokeWidth="1.2"
            strokeDasharray="7 7"
            mask="url(#journey-curve-mask)"
          />

          {/* FLOWING DOT ALONG THE CIRCULAR TRACK */}
          {!reduceMotion && inView && (
            <g>
              {/* MOVING ORANGE GLOW */}
              <circle
                r="14"
                fill={ORANGE}
                opacity="0.15"
              >
                <animateMotion
                  dur="7s"
                  repeatCount="indefinite"
                  path={CURVE_PATH}
                />
              </circle>

              {/* MOVING ORANGE POINT */}
              <circle
                r="6"
                fill={ORANGE}
              >
                <animateMotion
                  dur="7s"
                  repeatCount="indefinite"
                  path={CURVE_PATH}
                />
              </circle>
            </g>
          )}
        </svg>

        {/* TIMELINE MILESTONES */}
        {timelineData.map((item, index) => {
          const dotX = curveX(item.y);
          const delay = 0.8 + index * 0.14;

          return (
            <div key={item.year}>
              {/* FIXED POINT: entrance, pulse and hover glow */}
              <motion.div
                className="absolute z-20 size-8 cursor-default"
                style={{ left: dotX - 16, top: item.y - 16 }}
                onMouseEnter={() => setActiveDot(index)}
                onMouseLeave={() => setActiveDot(null)}
                initial={false}
              >
                <motion.span
                  className="pointer-events-none absolute inset-2 rounded-full"
                  style={{ background: ORANGE }}
                  initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
                  animate={inView ? { scale: activeDot === index ? 1.45 : 1, opacity: 1 } : undefined}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: reduceMotion ? 0 : delay }}
                />
                {!reduceMotion && inView && (
                  <motion.span
                    className="pointer-events-none absolute inset-2 rounded-full"
                    style={{ background: ORANGE }}
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: [1, 2.6], opacity: [0.45, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 1.6 + index * 0.3 }}
                  />
                )}
                <motion.span
                  className="pointer-events-none absolute inset-1 rounded-full"
                  style={{ background: ORANGE }}
                  initial={false}
                  animate={{ scale: activeDot === index ? 1.45 : 0.5, opacity: activeDot === index ? 0.18 : 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.25 }}
                />
              </motion.div>

              {/* DOTTED CONNECTOR */}
              <motion.div
                aria-hidden="true"
                className="
                  absolute origin-left
                  border-t border-dotted
                  border-[#7d7d7d]
                "
                style={{
                  left: dotX + 8,
                  top: item.y,
                  width:
                    item.badgeX - dotX - 8,
                }}
                initial={
                  reduceMotion
                    ? false
                    : { scaleX: 0 }
                }
                animate={
                  inView
                    ? { scaleX: 1 }
                    : undefined
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.45,
                  delay: reduceMotion
                    ? 0
                    : delay + 0.1,
                }}
              />

              {/* YEAR BADGE */}
              <motion.div
                className="
                  absolute flex h-[28px] w-[107px]
                  items-center justify-center
                  rounded-full
                  text-[11px] font-semibold
                  tracking-wide text-white
                  shadow-[0_6px_14px_rgba(255,106,0,0.2)]
                "
                style={{
                  left: item.badgeX,
                  top: item.y - 14,
                  background: BADGE_ORANGE,
                }}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: -24,
                        scale: 0.9,
                      }
                }
                animate={
                  inView
                    ? {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                      }
                    : undefined
                }
                whileHover={
                  reduceMotion
                    ? undefined
                    : { scale: 1.06 }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  delay: reduceMotion
                    ? 0
                    : delay + 0.2,
                }}
              >
                {item.year}
              </motion.div>

              {/* DESCRIPTION CARD */}
              <div
                className="absolute -translate-y-1/2"
                style={{
                  left: item.cardX,
                  top: item.y,
                  width: 441,
                }}
              >
                <motion.div
                  className="
                    flex min-h-[41px]
                    items-center rounded-[18px]
                    bg-[#F7F7F7]
                    py-[11px] pl-[65px] pr-8
                    shadow-[0_1px_0_rgba(0,0,0,0.04)]
                    ring-1 ring-[#EEEEEE]
                  "
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: 60,
                        }
                  }
                  animate={
                    inView
                      ? {
                          opacity: 1,
                          x: 0,
                        }
                      : undefined
                  }
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -3,
                          boxShadow:
                            "0 12px 26px rgba(0,0,0,0.08)",
                        }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.55,
                    delay: reduceMotion
                      ? 0
                      : delay + 0.3,
                    ease: "easeOut",
                  }}
                >
                  <p className="text-[14px] leading-[17px] text-[#5A5A5A]">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            </div>
          );
        })}
      </FitBox>
    </div>
  );
}

/* -----------------------------------------
   MOBILE + TABLET TIMELINE
----------------------------------------- */

function CompactTimeline({
  inView,
  reduceMotion,
}: {
  inView: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div className="lg:hidden">
      {/* RESPONSIVE LOGO GRAPHIC */}
      <div
        className="
          mx-auto max-w-[300px]
          sm:max-w-[400px]
          md:max-w-[440px]
        "
      >
        <FitBox
          width={360}
          height={360}
          maxScale={1.15}
        >
          <JourneyGraphic
            inView={inView}
            reduceMotion={reduceMotion}
          />
        </FitBox>
      </div>

      {/* VERTICAL TIMELINE */}
      <div
        className="
          relative mx-auto mt-10
          max-w-2xl md:mt-14
        "
      >
        {/* DASHED VERTICAL GUIDE */}
        <div
          aria-hidden="true"
          className="
            absolute bottom-6 left-[7px]
            top-6 border-l
            border-dashed border-[#9B9B9B]
          "
        />

        <div className="space-y-4 pl-8 md:space-y-5 md:pl-10">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.year}
              className="
                relative flex min-w-0
                items-center gap-3 sm:gap-4
              "
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 40,
                    }
              }
              animate={
                inView
                  ? {
                      opacity: 1,
                      x: 0,
                    }
                  : undefined
              }
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion
                  ? 0
                  : 0.3 + index * 0.1,
                ease: "easeOut",
              }}
            >
              {/* MOBILE POINT: perfect circle + pulse */}
              <span
                aria-hidden="true"
                className="absolute left-[-32px] top-1/2 block size-4 -translate-y-1/2 rounded-full md:left-[-40px]"
                style={{ background: ORANGE }}
              >
                {!reduceMotion && inView && (
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ background: ORANGE }}
                    animate={{ scale: [1, 2.4], opacity: [0.4, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: index * 0.25 }}
                  />
                )}
              </span>

              {/* DOTTED CONNECTOR */}
              <span
                aria-hidden="true"
                className="
                  absolute left-[-16px]
                  top-1/2 w-4
                  border-t border-dotted
                  border-[#7d7d7d]
                  md:left-[-24px]
                "
              />

              {/* YEAR BADGE */}
              <div
                className="
                  inline-flex min-h-[34px]
                  w-[68px] shrink-0
                  items-center justify-center
                  rounded-full
                  text-[12px] font-semibold
                  text-white
                  shadow-[0_6px_14px_rgba(255,106,0,0.2)]
                  sm:min-h-[38px]
                  sm:w-[96px] sm:text-sm
                "
                style={{
                  background: BADGE_ORANGE,
                }}
              >
                {item.year}
              </div>

              {/* DESCRIPTION CARD */}
              <div
                className="
                  flex min-w-0 flex-1
                  items-center rounded-[16px]
                  bg-[#F7F7F7]
                  px-4 py-3
                  ring-1 ring-[#EEEEEE]
                  sm:px-5 sm:py-3.5
                "
              >
                <p
                  className="
                    text-[12.5px] leading-[1.5]
                    text-[#5A5A5A]
                    sm:text-[14px]
                    md:text-[15px]
                  "
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------
   MAIN OUR JOURNEY SECTION
----------------------------------------- */

export function OurJourneySection() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });

  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section
      ref={sectionRef}
      id="our-journey"
      aria-labelledby="our-journey-heading"
      className="
        relative w-full overflow-hidden
        bg-white
        py-12 md:py-16 lg:py-20
      "
    >
      <Container>
        <h2
          id="our-journey-heading"
          className="sr-only"
        >
          Our Journey
        </h2>

        <DesktopTimeline
          inView={isInView}
          reduceMotion={reduceMotion}
        />

        <CompactTimeline
          inView={isInView}
          reduceMotion={reduceMotion}
        />
      </Container>
    </section>
  );
}
