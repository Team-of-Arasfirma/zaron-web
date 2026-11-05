
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="
        relative isolate w-full overflow-hidden
        min-h-[760px]
        md:min-h-[800px]
        lg:min-h-[850px]
      "
    >
      {/* BACKGROUND IMAGE */}
      <Image
        src="/Banner/hero banner.png"
        alt=""
        fill
        preload
        sizes="100vw"
        quality={85}
        className="-z-20 object-cover object-center"
      />

      {/* DARK GRADIENT OVERLAY */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-gradient-to-r
          from-black/55 via-black/25 to-black/5
        "
      />

      {/* FULL-WIDTH RESPONSIVE CONTAINER */}
      <Container
        className="
          relative flex min-h-[760px]
          flex-col justify-center
          pt-[170px] pb-20
          md:min-h-[800px]
          lg:min-h-[850px]
        "
      >
        {/* RIGHT GLASS LABEL */}
        <div
          className="
            relative mb-10 flex justify-end
            lg:absolute lg:top-[205px]
            lg:right-[70px] lg:mb-0
            xl:right-[90px]
          "
        >
          <div
            className="
              relative rounded-[10px]
              border border-white/40
              bg-white/10
              px-5 py-3
              text-right
              shadow-[0_8px_24px_rgba(0,0,0,0.12)]
              backdrop-blur-md
              [-webkit-backdrop-filter:blur(12px)]
            "
          >
            {/* ORANGE VERTICAL LINE */}
            <span
              aria-hidden="true"
              className="
                absolute top-2 right-1 bottom-2
                w-[4px] rounded-full
                bg-[#FF6500]
              "
            />

            <p
              className="
                pr-2
                text-[11px] leading-7
                font-semibold tracking-wide
                text-white uppercase
                sm:text-xs
              "
            >
              Indian
              <br />
              Manufacturer
              <br />
              Global Standards
            </p>
          </div>
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-[650px]">
          {/* MAIN HEADING */}
          <h1
            id="hero-heading"
            className="
              text-[clamp(3rem,5.2vw,5rem)]
              leading-[1.12]
              font-extrabold
              tracking-[-0.035em]
              uppercase
            "
          >
            <span className="block text-white">
              Stronger
            </span>

            <span className="block text-white">
              Buildings
            </span>

            <span className="mt-3 block text-[#FF6500]">
              Brighter
            </span>

            <span className="block text-[#FF6500]">
              Tomorrow
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              mt-4 max-w-[440px]
              text-sm leading-[1.5]
              font-normal text-white
              sm:text-base
            "
          >
            High-performance roofing and building solutions
            for a stronger, more sustainable tomorrow.
          </p>

          {/* CTA BUTTONS */}
          <div
            className="
              mt-10 flex flex-wrap
              items-center gap-4
            "
          >
            {/* PRIMARY CTA */}
            <Link
              href="/products"
              className="
                inline-flex min-h-[52px]
                items-center justify-center
                rounded-[5px]
                bg-[#FF6500]
                px-7
                text-sm font-semibold text-white
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-[#E85C00]
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-white
                motion-reduce:transform-none
              "
            >
              Explore Products
            </Link>

            {/* SECONDARY CTA */}
            <Link
              href="/contact"
              className="
                inline-flex min-h-[52px]
                items-center justify-center
                rounded-[5px]
                border-2 border-white
                bg-black/10
                px-7
                text-sm font-medium text-white
                backdrop-blur-sm
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-white/15
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-white
                motion-reduce:transform-none
              "
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
