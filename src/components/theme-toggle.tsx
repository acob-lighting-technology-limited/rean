"use client";

import { Moon, Sun } from "lucide-react";
import { THEME_COLOR, THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Light/dark switch. The site opens in light for everyone; a click switches theme and the choice
 * is saved (localStorage), so it sticks on every page and on later visits. The browser bar colour
 * follows. Icons swap in CSS (globals.css), so the server and client render the same markup.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[next]);
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
