"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { useSyncExternalStore, type ReactNode } from "react";

type Connection = { saveData?: boolean; addEventListener?: (t: string, cb: () => void) => void; removeEventListener?: (t: string, cb: () => void) => void };
const connection = () => (navigator as Navigator & { connection?: Connection }).connection;

function subscribe(onChange: () => void) {
  connection()?.addEventListener?.("change", onChange);
  return () => connection()?.removeEventListener?.("change", onChange);
}

/**
 * App-wide motion settings:
 * - LazyMotion + domAnimation: only the animation/in-view/gesture features ship (~15KB, not ~35KB).
 * - reducedMotion: "user" honours the OS setting; Save-Data (common on Nigerian mobile plans)
 *   is treated the same way, so transforms are dropped and only cheap opacity fades remain.
 * - No smooth-scroll library: it costs JS and feels laggy on low-end Android.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const saveData = useSyncExternalStore(subscribe, () => Boolean(connection()?.saveData), () => false);
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion={saveData ? "always" : "user"}>{children}</MotionConfig>
    </LazyMotion>
  );
}
