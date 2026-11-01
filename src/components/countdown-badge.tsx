"use client";

import { cn } from "@/ui/lib/cn";
import { useDaysLeft } from "./election-date";

/**
 * Floating election countdown for the home hero: a calendar icon with a live dot, a big day count
 * and "days to go". It lifts in after the hero text, then bobs gently (.ao-float in globals.css).
 * Rendered in the browser only (the count is never prerendered, so it is never stale), and gone
 * once election day has passed.
 */
export function CountdownBadge({ className }: { className?: string }) {
  const days = useDaysLeft();
  if (days === null || days < 0) return null;
  const today = days === 0;

  return (
    <div className={cn("ao-lift", className)} style={{ "--d": "520ms" } as React.CSSProperties}>
      <div
        role="timer"
        aria-label={today ? "Election day is today" : `${days} ${days === 1 ? "day" : "days"} to election day`}
        className="ao-float flex items-center gap-3.5 rounded-2xl border border-line bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] py-3 pr-5 pl-3 shadow-[0_1.25rem_3rem_-1rem_rgb(0_0_0/0.45)] backdrop-blur-xl"
      >
        <span className="relative grid size-12 shrink-0 place-items-center rounded-xl bg-action text-on-action">
          <svg aria-hidden viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4.5" width="18" height="16.5" rx="2.5" />
            <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
            <path d="m9 15 2 2 4-4" />
          </svg>
          <span aria-hidden className="absolute -top-1 -right-1 flex size-3">
            <span className="absolute inset-0 animate-ping rounded-full bg-gold opacity-75 motion-reduce:hidden" />
            <span className="relative size-3 rounded-full border-2 border-surface bg-gold" />
          </span>
        </span>
        <span className="flex items-baseline gap-2">
          <span className="font-display text-5xl leading-none font-extrabold tracking-tight tabular-nums">{today ? "Today" : days}</span>
          <span className="text-sm leading-tight font-semibold">
            {today ? (
              "is election day"
            ) : (
              <>
                {days === 1 ? "day" : "days"}
                <br />
                <span className="text-muted font-medium">to go</span>
              </>
            )}
          </span>
        </span>
      </div>
    </div>
  );
}
