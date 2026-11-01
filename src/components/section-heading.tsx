import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/ui/lib/cn";
import { Reveal } from "@/ui/motion/reveal";

export function Eyebrow({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <p style={style} className={cn("flex items-center gap-3 text-[13px] font-semibold tracking-[0.14em] text-accent-text uppercase", className)}>
      <span aria-hidden className="h-0.5 w-6 rounded-full bg-accent" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
  className,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  id?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading id={id} className="font-display mt-4 text-4xl leading-[1.02] font-bold tracking-tight sm:text-5xl">
        {title}
      </Heading>
      {lede && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>}
    </Reveal>
  );
}
