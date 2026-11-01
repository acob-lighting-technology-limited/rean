"use client";

import { useSyncExternalStore } from "react";
import { election, electionDateLabel } from "@/lib/site";

const ELECTION = new Date(`${election.date}T00:00:00+01:00`).getTime();
const DAY = 86_400_000;

// Re-check once a minute; the label only changes at midnight Lagos time.
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}
const daysLeft = () => Math.ceil((ELECTION - Date.now()) / DAY);

/**
 * "25 November 2026 · 24 days to go". The countdown is computed in the browser only,
 * so the prerendered page carries just the date and never a stale count.
 */
export function ElectionDate({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const days = useSyncExternalStore(subscribe, daysLeft, () => null);
  const count =
    days === null ? null : days > 1 ? `${days} days to go` : days === 1 ? "Tomorrow" : days === 0 ? "Today" : null;

  return (
    <p className={className} style={style}>
      <span className="font-semibold">Election day: </span>
      <time dateTime={election.date}>{electionDateLabel}</time>
      {!election.confirmed && <span className="text-muted"> (to be confirmed)</span>}
      {count && (
        <>
          <span aria-hidden className="mx-2 text-muted">
            ·
          </span>
          <span className="tabular-nums">{count}</span>
        </>
      )}
    </p>
  );
}
