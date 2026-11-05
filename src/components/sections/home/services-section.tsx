"use client";

import { useState } from "react";
import {
  ShieldCheck,
  ReceiptIndianRupee,
  UsersRound,
  TruckElectric,
  Cog,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/layout/container";

const services = [
  {
    id: "quality",
    title: "Quality",
    icon: ShieldCheck,
    description:
      "High-quality materials and strict quality control for long-lasting performance.",
  },
  {
    id: "pricing",
    title: "Pricing",
    icon: ReceiptIndianRupee,
    description:
      "Competitive pricing with transparent quotations and dependable value.",
  },
  {
    id: "customer",
    title: "Customer Centric",
    icon: UsersRound,
    description:
      "Customer-focused support and solutions tailored to project requirements.",
  },
  {
    id: "delivery",
    title: "Delivery Time",
    icon: TruckElectric,
    description:
      "Reliable logistics and timely delivery to keep projects on schedule.",
  },
  {
    id: "manufacturing",
    title: "Manufacturing Excellence",
    icon: Cog,
    description:
      "Precision manufacturing processes built for consistent performance.",
  },
];

const revealTransition = {
  duration: 0.55,
  ease: "easeOut" as const,
};

function ServiceCard({
  service,
  index,
  reduceMotion,
  tapToToggle = false,
}: {
  service: (typeof services)[number];
  index: number;
  reduceMotion: boolean;
  tapToToggle?: boolean;
}) {
  const Icon = service.icon;
  const [isExpanded, setIsExpanded] = useState(false);

  const triangleHidden = tapToToggle
    ? isExpanded
      ? "opacity-0"
      : "opacity-100"
    : "group-hover:opacity-0 group-focus-visible:opacity-0";

  const triangleVisible = tapToToggle
    ? isExpanded
      ? "opacity-100"
      : "opacity-0"
    : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100";

  const normalContentState = tapToToggle
    ? isExpanded
      ? "translate-y-3 opacity-0"
      : "translate-y-0 opacity-100"
    : `
        group-hover:translate-y-3
        group-hover:opacity-0
        group-focus-visible:translate-y-3
        group-focus-visible:opacity-0
      `;

  const descriptionState = tapToToggle
    ? isExpanded
      ? "translate-y-0 opacity-100"
      : "-translate-y-3 opacity-0"
    : `
        -translate-y-3 opacity-0
        group-hover:translate-y-0
        group-hover:opacity-100
        group-focus-visible:translate-y-0
        group-focus-visible:opacity-100
      `;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        ...revealTransition,
        duration: reduceMotion ? 0 : 0.55,
        delay: reduceMotion ? 0 : index * 0.08,
      }}
      className="w-full"
    >
      <div
        tabIndex={0}
        role={tapToToggle ? "button" : undefined}
        aria-label={tapToToggle ? service.title : undefined}
        aria-expanded={tapToToggle ? isExpanded : undefined}
        onClick={
          tapToToggle
            ? () => setIsExpanded((previous) => !previous)
            : undefined
        }
        onKeyDown={
          tapToToggle
            ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setIsExpanded((previous) => !previous);
                }
              }
            : undefined
        }
        className={`
          group relative mx-auto
          h-[200px] w-full max-w-[206px]
          overflow-hidden
          rounded-[11px]
          border
          text-white
          transition-[background-color,border-color,box-shadow]
          duration-500 ease-in-out

          focus-visible:border-[#FF6500]
          focus-visible:outline-2
          focus-visible:outline-offset-2
          focus-visible:outline-[#FF6500]

          motion-reduce:transition-none

          ${
            tapToToggle
              ? `
                cursor-pointer touch-manipulation
                ${
                  isExpanded
                    ? "border-[#E2E2E2] bg-white shadow-[0_10px_28px_rgba(0,0,0,0.08)]"
                    : "border-[#D0D0D0] bg-[#858585]"
                }
              `
              : `
                cursor-default
                border-[#D0D0D0] bg-[#858585]
                hover:border-[#E2E2E2]
                hover:bg-white
                hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)]
                focus-visible:bg-white
              `
          }
        `}
      >
        {/* BOTTOM LEFT ORANGE TRIANGLE */}
        <div
          aria-hidden="true"
          className={`
            pointer-events-none
            absolute bottom-0 left-0
            h-[52px] w-[52px]
            bg-[#FF6500]
            [clip-path:polygon(0_0,0_100%,100%_100%)]
            transition-opacity duration-300
            motion-reduce:transition-none
            ${triangleHidden}
          `}
        />

        {/* TOP RIGHT DARK TRIANGLE */}
        <div
          aria-hidden="true"
          className={`
            pointer-events-none
            absolute right-0 top-0
            h-[62px] w-[62px]
            bg-[#424242]
            [clip-path:polygon(0_0,100%_0,100%_100%)]
            transition-opacity duration-300
            motion-reduce:transition-none
            ${triangleVisible}
          `}
        />

        {/* NORMAL CONTENT */}
        <div
          aria-hidden={tapToToggle ? isExpanded : undefined}
          className={`
            absolute inset-0
            flex flex-col items-center justify-center
            gap-2 px-3 text-center
            transition-all duration-300 ease-in-out
            motion-reduce:transition-none
            ${normalContentState}
          `}
        >
          <Icon
            size={64}
            strokeWidth={1.25}
            className="shrink-0 text-white"
            aria-hidden="true"
          />

          <h3
            className="
              text-[16px] leading-[1.3]
              font-semibold text-white
              sm:text-[17px]
            "
          >
            {service.title}
          </h3>
        </div>

        {/* DESCRIPTION CONTENT */}
        <div
          aria-hidden={tapToToggle ? !isExpanded : undefined}
          className={`
            absolute inset-0
            flex flex-col items-start
            px-3 py-3 text-left
            transition-all duration-300 ease-in-out
            motion-reduce:transition-none
            ${descriptionState}
          `}
        >
          <Icon
            size={46}
            strokeWidth={1.5}
            className="shrink-0 text-[#FF6500]"
            aria-hidden="true"
          />

          <h3
            className="
              mt-1 text-[18px] leading-tight
              font-semibold text-[#FF6500]
            "
          >
            {service.title}
          </h3>

          <p
            className="
              mt-1.5 line-clamp-3
              text-[14px] leading-[1.45]
              text-[#777777]
            "
          >
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="w-full bg-[#F4F4F4] py-14 md:py-20"
    >
      <Container>
        <div
          className="
            grid grid-cols-1
            items-center gap-12
            lg:grid-cols-[0.85fr_1.15fr]
            lg:gap-8 xl:gap-12
          "
        >
          {/* LEFT CONTENT */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              ease: "easeOut",
            }}
          >
            {/* SECTION LABEL */}
            <div className="flex items-center gap-5">
              <span
                aria-hidden="true"
                className="h-[3px] w-[54px] rounded-full bg-[#FF6500]"
              />

              <p className="whitespace-nowrap font-serif text-[18px] text-[#171717] sm:text-[20px]">
                Our Services
              </p>

              <span
                aria-hidden="true"
                className="h-[3px] w-[54px] rounded-full bg-[#FF6500]"
              />
            </div>

            {/* HEADING */}
            <h2
              id="services-heading"
              className="
                mt-8
                text-[clamp(2rem,3vw,3rem)]
                leading-[1.2]
                font-extrabold uppercase
                tracking-[-0.035em]
                text-[#282828]
              "
            >
              <span className="block">BUILT AROUND</span>

              <span className="mt-3 block text-[#FF6500]">
                YOUR ROOFING NEEDS.
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                mt-6 max-w-[550px]
                text-[16px] leading-[1.8]
                text-[#555555]
                sm:text-[17px]
              "
            >
              From quality-driven manufacturing to reliable delivery and
              customer-focused support, we provide complete roofing solutions
              built for long-term performance.
            </p>
          </motion.div>

          {/* RIGHT SERVICE CARDS */}
          <div className="w-full">
            {/* MOBILE / TABLET: TAP TO TOGGLE */}
            <div className="grid grid-cols-2 gap-3 lg:hidden">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  reduceMotion={reduceMotion}
                  tapToToggle
                />
              ))}
            </div>

            {/* DESKTOP: 2 TOP + 3 BOTTOM */}
            <div className="hidden space-y-5 lg:block">
              <div className="grid grid-cols-6 gap-3">
                <div className="col-start-2 col-span-2">
                  <ServiceCard
                    service={services[0]}
                    index={0}
                    reduceMotion={reduceMotion}
                  />
                </div>

                <div className="col-span-2">
                  <ServiceCard
                    service={services[1]}
                    index={1}
                    reduceMotion={reduceMotion}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {services.slice(2).map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    index={index + 2}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}