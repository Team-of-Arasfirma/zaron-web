
import { CtaImage } from "./cta-image";
import Link from "next/link";
import {
  Headset,
  Wrench,
  Truck,
  Play,
} from "lucide-react";

import { Container } from "@/components/layout/container";

const highlights = [
  {
    icon: Headset,
    title: "Expert",
    subtitle: "Consultation",
  },
  {
    icon: Wrench,
    title: "Customized",
    subtitle: "Solutions",
  },
  {
    icon: Truck,
    title: "On-Time",
    subtitle: "Delivery",
  },
];

export function CtaSection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="w-full bg-[#F4F4F4] py-10 md:py-14"
    >
      <Container>
        <div
          className="
            relative isolate
            mx-auto w-full max-w-[1600px]
            overflow-hidden
            rounded-[21px]
            bg-[#181C20]
            text-white
            lg:min-h-[343px]
    "
        >
          {/* TOP DECORATIVE CIRCLE */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -top-[219px] left-[32.5%]
              hidden size-[314px]
              rounded-full
              border border-[#BABABA]/30
              lg:block
            "
          />

          {/* BOTTOM LEFT DECORATIVE CIRCLE */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-[87px] -left-[156px]
              hidden size-[222px]
              rounded-full
              border border-[#BABABA]/30
              lg:block
            "
          />

          {/* FACTORY IMAGE WITH TWO CURVED EDGES */}
          <div
            className="
              relative h-[230px] w-full
              overflow-hidden
              sm:h-[300px]
              lg:absolute
              lg:inset-y-0
              lg:right-0
              lg:h-full
              lg:w-[48%]
            "
          >
            <svg
              aria-hidden="true"
              focusable="false"
              width="0"
              height="0"
              className="absolute"
            >
              <defs>
                <clipPath
                  id="zaron-cta-image-clip"
                  clipPathUnits="objectBoundingBox"
                >
                  <path
                    d="
                      M 0.49 0
                      H 1
                      V 1
                      H 0.49
                      Q 0.47 1 0.45 0.98
                      L 0.025 0.55
                      Q -0.015 0.50 0.025 0.45
                      L 0.45 0.02
                      Q 0.47 0 0.49 0
                      Z
                    "
                  />
                </clipPath>
              </defs>
            </svg>

            <div
              className="
                absolute inset-0
                overflow-hidden
                rounded-t-[21px]
                lg:rounded-none
                lg:[clip-path:url(#zaron-cta-image-clip)]
              "
            >
              <CtaImage />

              {/* IMAGE OVERLAY */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/10"
              />
            </div>

            {/* PLAY ICON */}
            <div
              aria-hidden="true"
              className="
                absolute top-1/2 left-[70%]
                flex size-[100px]
                -translate-x-1/2 -translate-y-1/2
                items-center justify-center
                rounded-full bg-[#FF6500]/25
                lg:left-[60%]
              "
            >
              <div
                className="
                  flex size-[70px]
                  items-center justify-center
                  rounded-full bg-[#FF6500]/40
                "
              >
                <div
                  className="
                    flex size-[48px]
                    items-center justify-center
                    rounded-full bg-[#FF6500]
                    shadow-lg
                  "
                >
                  <Play
                    size={26}
                    fill="white"
                    strokeWidth={1.5}
                    className="ml-1 text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* LEFT CONTENT */}
          <div
            className="
              relative z-10
              px-6 py-9
              sm:px-9
              lg:w-[59%]
              lg:px-7 lg:py-8
              xl:px-8
            "
          >
            {/* EYEBROW */}
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="
                  h-[4px] w-[56px]
                  rounded-full bg-[#FC6708]
                "
              />

              <p
                className="
                  font-serif text-[16px]
                  font-medium uppercase
                  sm:text-[18px]
                "
              >
                LET&apos;S WORK TOGETHER
              </p>
            </div>

            {/* MAIN HEADING */}
            <h2
              id="cta-heading"
              className="
                mt-5 text-[29px]
                leading-[1.18] font-medium
                uppercase
                sm:text-[34px]
                lg:text-[30px]
                xl:text-[34px]
              "
            >
              READY TO
              <span className="mt-1 block text-[#FF6500]">
                BUILD STRONGER?
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                mt-4 max-w-[370px]
                text-[12px] leading-[1.45]
                text-white/85
                sm:text-[13px]
              "
            >
              Tell Us About Your Roofing Requirement And Our Team
              Will Help You Choose The Right Solution.
            </p>

            {/* CTA BUTTONS */}
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="
                  inline-flex min-h-[44px]
                  min-w-[180px]
                  items-center justify-center
                  rounded-full bg-[#FF6500]
                  px-6 text-[14px] font-semibold
                  text-white
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#E85C00]
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-white
                  motion-reduce:transform-none
                "
              >
                Get a Quote
              </Link>

              <Link
                href="/products"
                className="
                  inline-flex min-h-[44px]
                  min-w-[180px]
                  items-center justify-center
                  rounded-full border border-white
                  px-6 text-[14px] font-medium
                  text-white
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-white/10
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-white
                  motion-reduce:transform-none
                "
              >
                Explore Products
              </Link>
            </div>

            {/* SERVICE HIGHLIGHTS */}
            <div
              className="
                mt-7 grid grid-cols-1
                gap-5 sm:grid-cols-3 sm:gap-4
                lg:mt-6
              "
            >
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-3"
                  >
                    <Icon
                      size={39}
                      strokeWidth={1.8}
                      className="shrink-0 text-[#FF6500]"
                      aria-hidden="true"
                    />

                    <p
                      className="
                        text-[13px] leading-[1.4]
                        text-white/85
                        sm:text-[12px]
                        xl:text-[14px]
                      "
                    >
                      {item.title}
                      <span className="block">
                        {item.subtitle}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
