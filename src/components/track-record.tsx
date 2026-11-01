import { cn } from "@/ui/lib/cn";
import { CountUp } from "@/ui/motion/count-up";
import { Stagger, StaggerItem } from "@/ui/motion/reveal";
import { figures } from "@/content/candidate";

/**
 * Track-record figures. Unconfirmed ones are tagged in content/candidate.ts and listed in CONTENT-TODO.md.
 * Four across only when the row itself is wide enough (container query), two by two otherwise: in the
 * About page's narrow column four across clipped "1,000+".
 */
export function TrackRecord({ tone = "page", className }: { tone?: "page" | "band"; className?: string }) {
  return (
    <div className={cn("@container", className)}>
      <Stagger as="ul" className={cn("grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] @3xl:grid-cols-4", tone === "page" ? "bg-line" : "bg-band-line")}>
        {figures.map((f) => (
          <StaggerItem as="li" key={f.label} className={cn("p-5 sm:p-7", tone === "page" ? "bg-surface" : "bg-band-2")}>
            <p className={cn("font-display text-4xl leading-none font-extrabold sm:text-5xl", tone === "page" ? "text-gold-text" : "text-gold-bright")}>
              <CountUp to={f.value} suffix={f.suffix} />
            </p>
            <p className={cn("mt-3 text-[15px]", tone === "page" ? "text-muted" : "text-on-band-muted")}>{f.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
