import { cn } from "@/ui/lib/cn";

/**
 * Campaign monogram: "AO" under a rising arc. A placeholder mark until the campaign
 * supplies a logo; it deliberately borrows nothing from the ACOB or REAN marks.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("size-10 shrink-0", className)}>
      <rect width="40" height="40" rx="20" fill="var(--ao-ink)" />
      <path d="M8 22a12 12 0 0 1 24 0" fill="none" stroke="var(--ao-glow)" strokeWidth="2.5" strokeLinecap="round" />
      <text x="20" y="29" textAnchor="middle" fontFamily="var(--font-archivo), sans-serif" fontWeight="800" fontSize="12" fill="var(--ao-paper)" letterSpacing="-0.4">
        AO
      </text>
    </svg>
  );
}
