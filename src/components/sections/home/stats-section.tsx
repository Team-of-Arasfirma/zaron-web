
import Image from "next/image";
import {
  Factory,
  Warehouse,
  ShieldCheck,
} from "lucide-react";

import { Container } from "@/components/layout/container";

const statistics = [
  {
    id: "production",
    icon: Factory,
    value: "100,000+",
    label: "MT / YEAR",
    description: "Total Manufacturing Capacity",
  },
  {
    id: "manufacturing",
    icon: Warehouse,
    value: "3",
    label: "Manufacturing Units",
    description: "Strategically located in India",
  },
  {
    id: "presence",
    icon: null,
    value: "Pan-India",
    label: "Presence",
    description: "Serving Across the Nation",
  },
  {
    id: "clients",
    icon: ShieldCheck,
    value: "3,15,000+",
    label: "Clients",
    description: "Across Diverse Industries",
  },
];

export function StatsSection() {
  return (
    <section
      aria-label="Zaron manufacturing statistics"
      className="w-full bg-[#F4F4F4] py-6"
    >
      <Container>
        <div
          className="
            grid grid-cols-2
            overflow-hidden
            rounded-[12px]
            border border-[#E8E8E8]
            bg-white
            shadow-[0_6px_24px_rgba(0,0,0,0.04)]
            lg:grid-cols-4
          "
        >
          {statistics.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.id}
                className={`
                  group relative
                  flex min-h-[145px]
                  flex-col items-center justify-center
                  gap-1.5 px-3 py-4
                  text-center
                  transition-colors duration-300
                  hover:bg-[#FFF7F2]

                  ${
                    index % 2 === 0
                      ? "border-r border-[#EEEEEE]"
                      : ""
                  }

                  ${
                    index < 2
                      ? "border-b border-[#EEEEEE] lg:border-b-0"
                      : ""
                  }

                  ${
                    index !== 3
                      ? "lg:border-r lg:border-[#EEEEEE]"
                      : "lg:border-r-0"
                  }
                `}
              >
                {/* ICON */}
                <div
                  className="
                    flex size-9
                    items-center justify-center
                    text-[#FF6500]
                    transition-transform duration-300
                    group-hover:-translate-y-0.5
                    motion-reduce:transform-none
                  "
                >
                  {stat.id === "presence" ? (
                    <Image
                      src="/icons/india-map.svg"
                      alt=""
                      width={30}
                      height={30}
                      className="h-[30px] w-[30px] object-contain"
                    />
                  ) : (
                    Icon && (
                      <Icon
                        size={27}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    )
                  )}
                </div>

                {/* VALUE */}
                <p
                  className="
                    text-[clamp(1.1rem,2vw,1.65rem)]
                    leading-tight font-bold
                    tracking-tight text-[#202020]
                  "
                >
                  {stat.value}
                </p>

                {/* LABEL */}
                <p className="text-[11px] font-medium text-[#666666] sm:text-xs">
                  {stat.label}
                </p>

                {/* DESCRIPTION */}
                <p className="text-[9px] leading-[1.4] text-[#777777] sm:text-[10px]">
                  {stat.description}
                </p>

                {/* HOVER INDICATOR */}
                <span
                  aria-hidden="true"
                  className="
                    absolute bottom-0 left-1/2
                    h-[2px] w-0
                    -translate-x-1/2
                    bg-[#FF6500]
                    transition-all duration-300
                    group-hover:w-1/2
                    motion-reduce:transition-none
                  "
                />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
