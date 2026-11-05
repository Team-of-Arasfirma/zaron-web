"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
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

const timelineData = [
  {
    year: "2011",
    description:
      "Operations started with roofing sheet manufacturing.",
    y: 60,
  },
  {
    year: "2012",
    description: "Company officially registered.",
    y: 142,
  },
  {
    year: "2016",
    description:
      "Manufacturing facility expanded to 15,000 sq.ft. in Avinashi.",
    y: 224,
  },
  {
    year: "2017",
    description:
      "Second manufacturing facility started. Introduced C & Z Purlin.",
    y: 306,
  },
  {
    year: "2019",
    description:
      "Added Decking Sheet and Tile roofing setup.",
    y: 381,
  },
  {
    year: "2021",
    description:
      "Added Standing Seam roofing solutions.",
    y: 448,
  },
  {
    year: "NOW",
    description:
      "2,300+ tons annual production capacity. Presence in Avinashi and Hyderabad. Pan-India supply network.",
    y: 534,
  },
];

const CANVAS_W = 1280;
const CANVAS_H = 610;

const CURVE_CX = 141;
const CURVE_CY = 300;
const CURVE_R = 405;

const BADGE_X = 579;
const BADGE_W = 121;
const CARD_X = 714;
const CARD_W = 502;

const ORANGE = "#FF6500";
const BADGE_ORANGE = "#FF7B25";

function curveX(y: number) {
  const dy = y - CURVE_CY;

  return (
    CURVE_CX +
    Math.sqrt(Math.max(0, CURVE_R * CURVE_R - dy * dy))
  );
}

const CURVE_PATH = `
  M ${curveX(0)} 0
  A ${CURVE_R} ${CURVE_R}
  0 0 1
  ${curveX(CANVAS_H)} ${CANVAS_H}
`;

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
        setScale(Math.min(maxScale, availableWidth / width));
        setReady(true);
      }
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => observer.disconnect();
  }, [width, maxScale]);

  return (
    <div
      ref={ref}
      className="w-full"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        className="mx-auto transition-opacity duration-300 motion-reduce:transition-none"
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

function JourneyGraphic({
  inView,
  reduceMotion,
}: {
  inView: boolean;
  reduceMotion: boolean;
}) {
  const textPathId = useId();

  return (
    <div className="relative h-[480px] w-[480px]">
      {/* BLACK + ORANGE OUTER ARC */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 480 480"
        className="absolute inset-0 h-full w-full"
        initial={false}
        animate={
          reduceMotion || !inView
            ? { rotate: 0 }
            : { rotate: [0, 360] }
        }
        transition={{
          duration: reduceMotion ? 0 : 16,
          repeat: reduceMotion ? 0 : Infinity,
          ease: "linear",
        }}
      >
        {/* BLACK ARC */}
        <path
          d="
            M 49.5 130
            A 220 220 0 0 1 403.5 92.8
            L 358.9 132.9
            A 160 160 0 0 0 101.4 160
            Z
          "
          fill="#302F2F"
        />

        {/* ORANGE ARC */}
        <path
          d="
            M 403.5 92.8
            A 220 220 0 0 1 297 452.5
            L 281.4 394.5
            A 160 160 0 0 0 358.9 132.9
            Z
          "
          fill="#F56300"
        />
      </motion.svg>

      {/* WHITE CENTER CIRCLE WITH SHADOW */}
      <motion.div
        initial={false}
        animate={
          reduceMotion || !inView
            ? { y: 0, scale: 1 }
            : {
                y: [0, -8, 0],
                scale: [1, 1.015, 1],
              }
        }
        transition={{
          duration: reduceMotion ? 0 : 3.2,
          repeat: reduceMotion ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute left-[76px] top-[76px]
          flex h-[328px] w-[328px]
          items-center justify-center
          rounded-full bg-white
          shadow-[0_14px_32px_rgba(0,0,0,0.18),0_4px_8px_rgba(0,0,0,0.14)]
        "
      >
        {/* CURVED OUR JOURNEY TEXT */}
        <svg
          viewBox="0 0 328 328"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <path
              id={textPathId}
              d="M 39 127 A 143 143 0 0 1 289 127"
            />
          </defs>

          <text
            fill="#F56300"
            fontSize="18"
            fontWeight="500"
            letterSpacing="11"
          >
            <textPath
              href={`#${textPathId}`}
              startOffset="50%"
              textAnchor="middle"
            >
              OUR JOURNEY
            </textPath>
          </text>
        </svg>

        {/* LOGO */}
        <div className="relative mt-4 h-[170px] w-[190px]">
          <Image
            src="/logo/zaron-b.png"
            alt="Zaron Industries"
            fill
            sizes="190px"
            className="object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
}

function DesktopTimeline({
  inView,
  reduceMotion,
}: {
  inView: boolean;
  reduceMotion: boolean;
}) {
  const maskId = useId();
  const [activeDot, setActiveDot] = useState<number | null>(null);

  return (
    <div className="hidden lg:block">
      <FitBox
        width={CANVAS_W}
        height={CANVAS_H}
        maxScale={1.6}
      >
        {/* LEFT GRAPHIC */}
        <div className="absolute left-0 top-[60px]">
          <JourneyGraphic
            inView={inView}
            reduceMotion={reduceMotion}
          />
        </div>

        {/* CURVED TRACK */}
        <svg
          aria-hidden="true"
          width={CANVAS_W}
          height={CANVAS_H}
          viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          className="
            pointer-events-none
            absolute inset-0 overflow-visible
          "
        >
          <defs>
            <mask
              id={maskId}
              maskUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={CANVAS_W}
              height={CANVAS_H}
            >
              <motion.path
                d={CURVE_PATH}
                fill="none"
                stroke="white"
                strokeWidth="6"
                initial={
                  reduceMotion ? false : { pathLength: 0 }
                }
                animate={inView ? { pathLength: 1 } : undefined}
                transition={{
                  duration: reduceMotion ? 0 : 2,
                  ease: "easeInOut",
                }}
              />
            </mask>
          </defs>

          <path
            d={CURVE_PATH}
            fill="none"
            stroke="#8E8E8E"
            strokeWidth="1"
            strokeDasharray="10 8"
            mask={`url(#${maskId})`}
          />

          {!reduceMotion && inView && (
            <g>
              <circle r="14" fill={ORANGE} opacity="0.15">
                <animateMotion
                  dur="7s"
                  repeatCount="indefinite"
                  path={CURVE_PATH}
                />
              </circle>

              <circle r="6" fill={ORANGE}>
                <animateMotion
                  dur="7s"
                  repeatCount="indefinite"
                  path={CURVE_PATH}
                />
              </circle>
            </g>
          )}
        </svg>

        {/* MILESTONES */}
        {timelineData.map((item, index) => {
          const dotX = curveX(item.y);
          const delay = 0.8 + index * 0.14;

          return (
            <div key={item.year}>
              {/* ORANGE DOT */}
              <motion.div
                aria-hidden="true"
                className="absolute z-20 size-8 cursor-default"
                style={{
                  left: dotX - 16,
                  top: item.y - 16,
                }}
                onMouseEnter={() => setActiveDot(index)}
                onMouseLeave={() => setActiveDot(null)}
              >
                <motion.span
                  className="absolute inset-[7px] rounded-full"
                  style={{ background: ORANGE }}
                  initial={
                    reduceMotion
                      ? false
                      : { scale: 0, opacity: 0 }
                  }
                  animate={
                    inView
                      ? {
                          scale: activeDot === index ? 1.3 : 1,
                          opacity: 1,
                        }
                      : undefined
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    delay: reduceMotion ? 0 : delay,
                  }}
                />

                {!reduceMotion && inView && (
                  <motion.span
                    className="absolute inset-[7px] rounded-full"
                    style={{ background: ORANGE }}
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{
                      scale: [1, 2.6],
                      opacity: [0.35, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 1.6 + index * 0.3,
                    }}
                  />
                )}
              </motion.div>

              {/* CONNECTOR */}
              <motion.div
                aria-hidden="true"
                className="
                  absolute origin-left
                  border-t border-dotted border-[#7D7D7D]
                "
                style={{
                  left: dotX + 9,
                  top: item.y,
                  width: BADGE_X - dotX - 9,
                }}
                initial={
                  reduceMotion ? false : { scaleX: 0 }
                }
                animate={inView ? { scaleX: 1 } : undefined}
                transition={{
                  duration: reduceMotion ? 0 : 0.45,
                  delay: reduceMotion ? 0 : delay + 0.1,
                }}
              />

              {/* YEAR BADGE */}
              <motion.div
                className="absolute"
                style={{
                  left: BADGE_X,
                  top: item.y - 16,
                  width: BADGE_W,
                }}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, x: -24 }
                }
                animate={
                  inView ? { opacity: 1, x: 0 } : undefined
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  delay: reduceMotion ? 0 : delay + 0.2,
                }}
              >
                <motion.div
                  whileHover={
                    reduceMotion ? undefined : { scale: 1.06 }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.2,
                  }}
                  className="
                    flex h-[32px] w-full
                    items-center justify-center
                    rounded-full
                    text-[12px] font-semibold
                    tracking-wide text-white
                  "
                  style={{ background: BADGE_ORANGE }}
                >
                  {item.year}
                </motion.div>
              </motion.div>

              {/* DESCRIPTION CARD */}
              <div
                className="absolute -translate-y-1/2"
                style={{
                  left: CARD_X,
                  top: item.y,
                  width: CARD_W,
                }}
              >
                <motion.div
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, x: 60 }
                  }
                  animate={
                    inView ? { opacity: 1, x: 0 } : undefined
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.55,
                    delay: reduceMotion ? 0 : delay + 0.3,
                    ease: "easeOut",
                  }}
                >
                  <motion.div
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
                      duration: reduceMotion ? 0 : 0.2,
                    }}
                    className="
                      flex min-h-[47px]
                      items-center rounded-[17px]
                      bg-[#F8F7F7]
                      py-[13px] pl-[73px] pr-8
                    "
                  >
                    <p className="text-[16px] leading-[19px] text-[#6B6B6B]">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </FitBox>
    </div>
  );
}

function CompactTimeline({
  inView,
  reduceMotion,
}: {
  inView: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div className="lg:hidden">
      {/* LOGO GRAPHIC */}
      <div
        className="
          mx-auto max-w-[300px]
          sm:max-w-[400px]
          md:max-w-[440px]
        "
      >
        <FitBox width={480} height={480} maxScale={1}>
          <JourneyGraphic
            inView={inView}
            reduceMotion={reduceMotion}
          />
        </FitBox>
      </div>

      {/* VERTICAL TIMELINE */}
      <div className="relative mx-auto mt-10 max-w-2xl md:mt-14">
        <div
          aria-hidden="true"
          className="
            absolute bottom-6 left-[7px] top-6
            border-l border-dashed border-[#9B9B9B]
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
                  : { opacity: 0, x: 40 }
              }
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : 0.08,
                ease: "easeOut",
              }}
            >
              {/* POINT */}
              <span
                aria-hidden="true"
                className="
                  absolute left-[-32px] top-1/2
                  block size-4 -translate-y-1/2
                  rounded-full md:left-[-40px]
                "
                style={{ background: ORANGE }}
              >
                {!reduceMotion && inView && (
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ background: ORANGE }}
                    animate={{
                      scale: [1, 2.4],
                      opacity: [0.4, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: index * 0.25,
                    }}
                  />
                )}
              </span>

              {/* CONNECTOR */}
              <span
                aria-hidden="true"
                className="
                  absolute left-[-16px] top-1/2 w-4
                  border-t border-dotted border-[#7D7D7D]
                  md:left-[-24px] md:w-6
                "
              />

              {/* YEAR */}
              <div
                className="
                  inline-flex min-h-[34px]
                  w-[68px] shrink-0
                  items-center justify-center
                  rounded-full
                  text-[12px] font-semibold text-white
                  sm:min-h-[38px]
                  sm:w-[96px] sm:text-sm
                "
                style={{ background: BADGE_ORANGE }}
              >
                {item.year}
              </div>

              {/* DESCRIPTION */}
              <div
                className="
                  flex min-w-0 flex-1
                  items-center rounded-[16px]
                  bg-[#F8F7F7]
                  px-4 py-3
                  sm:px-5 sm:py-3.5
                "
              >
                <p
                  className="
                    text-[12.5px] leading-[1.5]
                    text-[#6B6B6B]
                    sm:text-[14px] md:text-[15px]
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

export function OurJourneySection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const hasEntered = useInView(sectionRef, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });

  const isVisible = useInView(sectionRef, {
    margin: "0px",
  });

  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section
      ref={sectionRef}
      id="our-journey"
      aria-labelledby="our-journey-heading"
      className="
        relative w-full overflow-hidden
        bg-white py-12 md:py-16 lg:py-20
      "
    >
      <Container>
        <h2 id="our-journey-heading" className="sr-only">
          Our Journey
        </h2>

        <DesktopTimeline
          inView={hasEntered}
          reduceMotion={reduceMotion || !isVisible}
        />

        <CompactTimeline
          inView={hasEntered}
          reduceMotion={reduceMotion || !isVisible}
        />
      </Container>
    </section>
  );
}