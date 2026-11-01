"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { easeSun } from "./easing";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Starting vertical offset in px. */
  y?: number;
  /** Fraction of the element that must be visible before it plays. */
  amount?: number;
  as?: "div" | "section" | "li" | "header";
};

/** Rises, sharpens and fades in the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 40, amount = 0.25, as = "div" }: RevealProps) {
  const Comp = m[as];
  return (
    <Comp
      data-reveal
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease: easeSun, delay }}
    >
      {children}
    </Comp>
  );
}

const container: Variants = {
  hidden: {},
  show: (stagger: number = 0.1) => ({ transition: { staggerChildren: stagger, delayChildren: 0.05 } }),
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: easeSun } },
};

/** Parent that reveals its <StaggerItem> children one after another. */
export function Stagger({
  children,
  className,
  stagger = 0.1,
  amount = 0.15,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Comp = m[as];
  return (
    <Comp className={className} variants={container} custom={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount }}>
      {children}
    </Comp>
  );
}

export function StaggerItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" }) {
  const Comp = m[as];
  return (
    <Comp data-reveal className={className} variants={staggerItem}>
      {children}
    </Comp>
  );
}

const frame: Variants = {
  hidden: { clipPath: "inset(28% 0% 0% 0%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: easeSun } },
};
const picture: Variants = {
  hidden: { scale: 1.15 },
  show: { scale: 1, transition: { duration: 1.4, ease: easeSun } },
};

/**
 * Photo entrance: the frame wipes open from the bottom while the picture settles from a slight zoom.
 * The wrapper keeps the caller's frame classes (radius, background, overflow). Reduced motion gets a
 * plain frame, since MotionConfig only strips transforms and the clip-path wipe would still play.
 */
export function ImageReveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <m.div data-reveal className={className} variants={frame} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
      <m.div className="size-full" variants={picture}>
        {children}
      </m.div>
    </m.div>
  );
}
