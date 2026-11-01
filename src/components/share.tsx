"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/ui/lib/cn";
import { buttonClasses } from "@/ui/primitives/button";
import { shareMessage, site, whatsappShareHref } from "@/lib/site";

const noop = () => () => {};

/**
 * WhatsApp share link for a page. In the browser it uses the address the site is actually
 * served from, so a shared link is never a stale or unset NEXT_PUBLIC_SITE_URL.
 */
function useShareHref(path: string) {
  const origin = useSyncExternalStore(noop, () => window.location.origin, () => site.url);
  return whatsappShareHref(shareMessage(path, origin));
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-5", className)} fill="currentColor">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.1-1.3A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .8.8-2.95-.2-.31a8.2 8.2 0 1 1 6.9 3.79Zm4.5-6.15c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.43l-.76-1.83c-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31 2.76 2.76 0 0 0-.86 2.05 4.8 4.8 0 0 0 1 2.54 11 11 0 0 0 4.2 3.71c1.57.68 2.18.73 2.97.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

/** Inline "Share on WhatsApp" button: a plain link, so it works without JavaScript and needs no campaign number. */
export function ShareOnWhatsApp({ path, variant = "outline", className }: { path?: string; variant?: "primary" | "outline" | "glow"; className?: string }) {
  const pathname = usePathname();
  const href = useShareHref(path ?? pathname);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn(buttonClasses({ variant }), className)}>
      <WhatsAppIcon />
      Share on WhatsApp
      <span className="sr-only">(opens WhatsApp)</span>
    </a>
  );
}

/**
 * Floating share shortcut on phones — WhatsApp is how most members will pass the link on.
 * Appears once the first screen has scrolled away, so it never covers the hero's own calls to
 * action. Visibility comes from an observer on a sentinel and the motion is a CSS transition:
 * no scroll listener and no animation library on every page.
 */
export function ShareFab() {
  const pathname = usePathname();
  const href = useShareHref(pathname);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("share-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(sentinel);
    return () => io.disconnect();
  }, [pathname]);

  if (pathname === "/get-involved") return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share this page on WhatsApp (opens WhatsApp)"
      aria-hidden={!show}
      tabIndex={show ? undefined : -1}
      data-print-hide
      className={cn(
        "fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-semibold text-[#06281a] shadow-[0_8px_30px_-6px_rgb(0_0_0/0.45)] transition-[opacity,transform] duration-(--dur) ease-sun md:hidden motion-reduce:transition-none",
        show ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-90 opacity-0",
      )}
    >
      <WhatsAppIcon />
      Share
    </a>
  );
}
