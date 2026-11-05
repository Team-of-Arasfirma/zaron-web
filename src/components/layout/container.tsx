import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full px-5 sm:px-8 lg:px-[70px] xl:px-[190px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}