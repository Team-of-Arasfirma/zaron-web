
"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  FileImage,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { Container } from "@/components/layout/container";
import type {
  Product,
  ProductDetail,
} from "@/data/products";

type ProductRoofingProfilesProps = {
  product: Product;
  detail: ProductDetail;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductRoofingProfiles({
  product,
  detail,
}: ProductRoofingProfilesProps) {
  const reduceMotion = Boolean(useReducedMotion());

  const profiles = detail.profileImages ?? [];

  // Only relevant products should have a profile section.
  // Products without profiles can hide it, or display
  // an unavailable state while drawings are pending.
  const showUnavailableState = profiles.length === 0;

  return (
    <section
      id="roofing-profiles"
      aria-labelledby="roofing-profiles-heading"
      className="
        relative w-full
        overflow-hidden
        bg-white
        py-14
        sm:py-16
        lg:py-20
      "
    >
      <Container>
        {/* SECTION HEADER */}
        <motion.div
          initial={false}
          whileInView={{ opacity: reduceMotion ? 1 : [0.75, 1], y: reduceMotion ? 0 : [20, 0] }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            ease,
          }}
          className="max-w-[850px]"
        >
          {/* SECTION LABEL */}
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="
                h-[3px] w-[55px]
                shrink-0 bg-[#FF6500]
              "
            />

            <span
              className="
                font-serif
                text-[18px]
                text-[#282828]
                sm:text-[20px]
              "
            >
              Roofing Profiles
            </span>
          </div>

          {/* HEADING */}
          <h2
            id="roofing-profiles-heading"
            className="
              mt-5
              text-[clamp(1.8rem,3.5vw,3.1rem)]
              font-extrabold
              uppercase
              leading-[1.12]
              tracking-[-0.035em]
              text-[#686868]
            "
          >
            ENGINEERED FOR{" "}
            <span className="text-[#FF6500]">
              PRECISION.
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-4
              max-w-[700px]
              text-[14px]
              leading-[1.7]
              text-[#626262]
              sm:text-[16px]
            "
          >
            Explore the available roofing profiles
            and technical drawings for{" "}
            <span className="font-medium text-[#282828]">
              {product.name}
            </span>
            .
          </p>
        </motion.div>

        {/* PROFILE IMAGES */}
        {!showUnavailableState ? (
          <div
            className="
              mt-9
              grid grid-cols-1
              gap-5
              sm:grid-cols-2
              sm:gap-6
              lg:mt-11
              lg:gap-8
            "
          >
            {profiles.map((profile, index) => (
              <motion.article
                key={`${profile.src}-${index}`}
                initial={false}
                whileInView={{ opacity: reduceMotion ? 1 : [0.75, 1], y: reduceMotion ? 0 : [20, 0] }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  delay: reduceMotion
                    ? 0
                    : Math.min(index * 0.1, 0.3),
                  ease,
                }}
                className="
                  group
                  flex min-w-0
                  flex-col
                  overflow-hidden
                  rounded-[16px]
                  border border-[#E4E4E4]
                  bg-[#F8F8F8]
                  p-4
                  transition-[border-color,box-shadow]
                  duration-300
                  hover:border-[#FF6500]/50
                  hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                  sm:p-6
                  lg:p-7
                "
              >
                {/* PROFILE NUMBER */}
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="
                      text-[12px]
                      font-semibold
                      tracking-[0.12em]
                      text-[#777777]
                    "
                  >
                    PROFILE{" "}
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    aria-hidden="true"
                    className="
                      h-[2px] w-[55px]
                      bg-[#FF6500]
                    "
                  />
                </div>

                {/* TECHNICAL PROFILE IMAGE */}
                <div
                  className="
                    relative
                    mt-5
                    flex min-h-[180px]
                    w-full
                    items-center justify-center
                    overflow-hidden
                    rounded-[10px]
                    bg-white
                    sm:min-h-[210px]
                    lg:min-h-[240px]
                  "
                >
                  <Image
                    src={profile.src}
                    alt={profile.alt}
                    fill
                    quality={85}
                    sizes="
                      (max-width: 639px) 90vw,
                      (max-width: 1023px) 45vw,
                      40vw
                    "
                    className="
                      object-contain
                      p-4
                      transition-transform duration-500
                      group-hover:scale-[1.025]
                      motion-reduce:transform-none
                      sm:p-6
                    "
                  />
                </div>

                {/* PROFILE CAPTION */}
                <p
                  className="
                    mt-5
                    text-[14px]
                    font-medium
                    leading-[1.5]
                    text-[#282828]
                    sm:text-[15px]
                  "
                >
                  {profile.alt}
                </p>
              </motion.article>
            ))}
          </div>
        ) : (
          /* NO APPROVED PROFILE DRAWINGS */
          <motion.div
            initial={false}
            whileInView={{ opacity: reduceMotion ? 1 : [0.75, 1], y: reduceMotion ? 0 : [20, 0] }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              ease,
            }}
            className="
              mt-9
              flex flex-col
              items-start gap-5
              rounded-[16px]
              border border-[#E4E4E4]
              bg-[#F8F8F8]
              px-6 py-8
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:p-9
            "
          >
            <div className="flex min-w-0 items-start gap-4">
              <div
                className="
                  flex h-14 w-14
                  shrink-0
                  items-center justify-center
                  rounded-[12px]
                  bg-[#FFF0E6]
                "
              >
                <FileImage
                  size={27}
                  strokeWidth={1.6}
                  aria-hidden="true"
                  className="text-[#FF6500]"
                />
              </div>

              <div>
                <h3
                  className="
                    text-[17px]
                    font-semibold
                    text-[#282828]
                  "
                >
                  Roofing profile drawings
                </h3>

                <p
                  className="
                    mt-2
                    max-w-[560px]
                    text-[13px]
                    leading-[1.6]
                    text-[#686868]
                    sm:text-[14px]
                  "
                >
                  Technical profile drawings are not
                  available online yet. Please contact
                  our team for approved profile details
                  suitable for your project.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="
                group/link
                inline-flex min-h-11
                shrink-0
                items-center justify-center
                gap-2
                rounded-full
                bg-[#FF6500]
                px-6 py-3
                text-[13px]
                font-semibold
                text-white
                transition-colors duration-300
                hover:bg-[#E85B00]
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#FF6500]
              "
            >
              Contact Our Team

              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="
                  transition-transform duration-300
                  group-hover/link:translate-x-0.5
                  group-hover/link:-translate-y-0.5
                  motion-reduce:transform-none
                "
              />
            </Link>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
