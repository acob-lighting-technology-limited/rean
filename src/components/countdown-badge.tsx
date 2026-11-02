"use client";

import { cn } from "@/ui/lib/cn";
import { useDaysLeft } from "./election-date";

/**
 * Small election countdown pinned to the bottom-right corner of every page (mounted once in the
 * site layout): a calendar icon with a live dot and "24 days to go". Bottom right from md; on phones
 * bottom left, so the floating WhatsApp share button (components/share.tsx) keeps the right corner
 * and the two never stack.
 * Rendered in the browser only (the count is never prerendered, so it is never stale), and gone
 * once election day has passed.
 */
export function CountdownBadge({ className }: { className?: string }) {
  const days = useDaysLeft();
  if (days === null || days < 0) return null;
  const today = days === 0;

  return (
    <div
      role="timer"
      aria-label={today ? "Election day is today" : `${days} ${days === 1 ? "day" : "days"} to election day`}
      data-print-hide
      style={{ "--d": "520ms" } as React.CSSProperties}
      className={cn(
        "ao-lift pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 flex items-center gap-2 rounded-full border border-line bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] py-1.5 pr-3.5 pl-1.5 text-sm shadow-[0_0.5rem_1.5rem_-0.5rem_rgb(0_0_0/0.35)] backdrop-blur-xl md:right-6 md:bottom-6 md:left-auto",
        className,
      )}
    >
      <span className="relative grid size-7 shrink-0 place-items-center rounded-full bg-action text-on-action">
        <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4.5" width="18" height="16.5" rx="2.5" />
          <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
        </svg>
        <span aria-hidden className="absolute -top-0.5 -right-0.5 flex size-2.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-gold opacity-75 motion-reduce:hidden" />
          <span className="relative size-2.5 rounded-full border-2 border-surface bg-gold" />
        </span>
      </span>
      <span aria-hidden className="leading-none whitespace-nowrap">
        {today ? (
          <span className="font-semibold">Election day is today</span>
        ) : (
          <>
            <span className="font-display font-bold tabular-nums">{days}</span> <span className="text-muted">{days === 1 ? "day" : "days"} to go</span>
          </>
        )}
      </span>
    </div>
  );
}
