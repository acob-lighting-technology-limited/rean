import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

/**
 * primary — white on brand green (5.1:1); ink on glow green in dark mode (9.8:1).
 * outline — hairline border, text in the current colour.
 * glow    — glow-green fill with ink text (9.8:1); for the always-dark band.
 */
type Variant = "primary" | "outline" | "glow";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-(--dur) ease-sun active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-action text-on-action hover:bg-action-hover hover:shadow-[0_10px_30px_-10px_rgb(9_9_11/0.55)]",
  outline: "border border-line-strong text-current hover:border-current hover:bg-[color-mix(in_srgb,currentColor_6%,transparent)]",
  glow: "bg-glow text-ink hover:bg-[#5ddc75] hover:shadow-[0_10px_34px_-10px_rgb(57_208_87/0.6)]",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-13 px-7 text-base",
};

type Common = { variant?: Variant; size?: Size };

export function buttonClasses({ variant = "primary", size = "md" }: Common = {}) {
  return cn(base, variants[variant], sizes[size]);
}

export function Button({ variant, size, className, ...props }: Common & ComponentProps<"button">) {
  return <button className={cn(buttonClasses({ variant, size }), className)} {...props} />;
}

export function ButtonLink({ variant, size, className, ...props }: Common & ComponentProps<typeof Link>) {
  return <Link className={cn(buttonClasses({ variant, size }), className)} {...props} />;
}

/** Arrow that nudges forward on hover of its parent button or link. */
export function Arrow() {
  return (
    <span aria-hidden className="inline-block transition-transform duration-(--dur) ease-sun group-hover/btn:translate-x-0.5 group-hover/link:translate-x-0.5">
      →
    </span>
  );
}
