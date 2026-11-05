import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  "aria-labelledby": string;
};

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section
      className={cn("scroll-mt-8 py-16 sm:py-24 lg:py-32", className)}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}
