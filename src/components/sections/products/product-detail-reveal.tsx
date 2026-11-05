"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

// Server-rendered content stays visible even if hydration or animation fails.
export function ProductDetailReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div initial={false} whileInView={reduced ? { opacity: 1, y: 0 } : { opacity: [0.75, 1], y: [12, 0] }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}
