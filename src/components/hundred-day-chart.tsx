"use client";

import { m } from "motion/react";
import { cn } from "@/ui/lib/cn";
import { easeSun } from "@/ui/motion/easing";
import type { Priority } from "@/content/plan";

const TICKS = [1, 25, 50, 75, 100];
const pct = (day: number) => ((day - 1) / 99) * 100;

/**
 * The 100-day plan as a timeline: one row per priority, bar from its first to its last day.
 * Bars draw left to right as the chart enters view, so the sequencing reads at a glance.
 * The bars are decoration for sighted users; the day range is always in the text.
 */
export function HundredDayChart({ items, detailed = false }: { items: Priority[]; detailed?: boolean }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-4 sm:p-6">
      <div aria-hidden className="relative mb-2 hidden h-5 text-[13px] text-muted tabular-nums sm:ml-[42%] sm:block">
        {TICKS.map((t) => (
          <span key={t} className="absolute -translate-x-1/2 whitespace-nowrap first:translate-x-0 last:-translate-x-full" style={{ left: `${pct(t)}%` }}>
            Day {t}
          </span>
        ))}
      </div>

      <m.ol initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="divide-y divide-line">
        {items.map((p, i) => {
          const milestone = p.start === p.end;
          return (
            <li key={p.number} className="grid gap-x-6 gap-y-2 py-4 sm:grid-cols-[42%_1fr] sm:items-center">
              <div className="flex min-w-0 gap-3">
                <span className="font-display w-6 shrink-0 text-lg font-bold text-accent-text tabular-nums">{p.number}</span>
                <div className="min-w-0">
                  <h3 className="leading-snug font-semibold">{p.title}</h3>
                  <p className="text-[15px] text-muted tabular-nums">{milestone ? `Day ${p.start}` : `Days ${p.start}–${p.end}`}</p>
                  {detailed && <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-muted">{p.detail}</p>}
                </div>
              </div>

              <div aria-hidden className={cn("relative h-3 rounded-full bg-surface-2", detailed && "sm:self-start sm:mt-2")}>
                {[25, 50, 75].map((t) => (
                  <span key={t} className="absolute inset-y-0 w-px bg-line-strong" style={{ left: `${pct(t)}%` }} />
                ))}
                {milestone ? (
                  <m.span
                    data-reveal
                    className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[3px] bg-accent"
                    style={{ left: `${pct(p.start)}%` }}
                    variants={{ hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeSun, delay: 0.15 + i * 0.09 } } }}
                  />
                ) : (
                  <m.span
                    data-reveal
                    className="absolute inset-y-0 origin-left rounded-full bg-gold"
                    style={{ left: `${pct(p.start)}%`, width: `${pct(p.end) - pct(p.start)}%` }}
                    variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease: easeSun, delay: 0.15 + i * 0.09 } } }}
                  />
                )}
              </div>
            </li>
          );
        })}
      </m.ol>
    </div>
  );
}
