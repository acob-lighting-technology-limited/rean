"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Thin bar across the top while moving between pages, so a tap on a slow connection is always
 * acknowledged. A click on an internal link starts it; it finishes when the path changes.
 * State is the path the navigation started from, so "done" is derived, not set in an effect.
 */
export function NavProgress() {
  const pathname = usePathname();
  const [startedOn, setStartedOn] = useState<string | null>(null);
  const state = startedOn === null ? "idle" : startedOn === pathname ? "loading" : "done";

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement) || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      setStartedOn(location.pathname);
    }
    // Capture phase: next/link calls preventDefault on its own click handler, before a bubbling listener runs.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Reset once the finish fade (0.55s in globals.css) is over. A timer rather than transitionend,
  // which never fires in a background tab and would leave the next visit to this path "loading".
  useEffect(() => {
    if (state !== "done") return;
    const t = setTimeout(() => setStartedOn(null), 600);
    return () => clearTimeout(t);
  }, [state]);

  return <div aria-hidden data-state={state} className="ao-progress fixed inset-x-0 top-0 z-[70] h-[3px] bg-accent" />;
}
