"use client";

import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Light/dark switch. With no saved choice the site follows the device setting; the first click
 * pins the opposite of whatever is showing. Icons swap in CSS (globals.css), so the server and
 * client render the same markup.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const current = root.dataset.theme ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable: the choice lasts for this page only */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className="theme-toggle relative inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-fg transition-colors duration-(--dur) hover:border-fg"
    >
      <Sun aria-hidden className="theme-icon-sun absolute size-[18px]" />
      <Moon aria-hidden className="theme-icon-moon absolute size-[18px]" />
    </button>
  );
}
