import type { ReactNode } from "react";
import { cn } from "@/ui/lib/cn";

/**
 * Visible marker for content the campaign hasn't supplied yet. Deliberately loud so nothing
 * launches with a gap unnoticed: before launch, `grep -r "<Placeholder" src` should return nothing.
 */
export function Placeholder({ children, block = false, tone = "page", className }: { children: ReactNode; block?: boolean; tone?: "page" | "band"; className?: string }) {
  const Comp = block ? "div" : "span";
  return (
    <Comp
      className={cn(
        "rounded-md border border-dashed px-2 py-1 text-[13px] font-medium",
        tone === "page" ? "border-accent-text text-accent-text" : "border-glow/70 text-glow",
        block ? "block p-5 text-[15px] leading-relaxed" : "inline-block",
        className,
      )}
    >
      <span className="font-semibold">To come: </span>
      {children}
    </Comp>
  );
}
