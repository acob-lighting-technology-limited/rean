import Image from "next/image";
import { cn } from "@/ui/lib/cn";
import { photos } from "@/content/candidate";
// Static import so Next generates a blur preview at build time (placeholder="blur" below).
import portrait from "../../public/images/portrait-hero-crop.png";

/**
 * Hero portrait, big and bold (modelled on large-portrait campaign heroes): a tight head-and-collar
 * crop of the cut-out (studio backdrop removed, public/images/portrait-hero-crop.png), no frame or
 * background, the shoulders running off the crop.
 * - Phones and tablets: above the name; the cut sides and the bottom fade into the page.
 * - From lg: a large figure in the hero's bottom-right corner (positioned by the caller). The right
 *   edge runs off the screen, the left shoulder fades out, and the bottom meets the band below.
 * The crop comes from the 1120px WhatsApp copy, so at this size it is enlarged and slightly soft;
 * the campaign is supplying the original photo (CONTENT-TODO.md).
 * On load it rises into place (.ao-cutout-rise), pure CSS so it runs at first paint with no JS.
 */
export function HeroPortrait({ className }: { className?: string }) {
  return (
    <Image
      src={portrait}
      alt={photos.standing.alt}
      preload
      placeholder="blur"
      sizes="(min-width: 1024px) min(52vw, 880px), min(100vw, 520px)"
      className={cn(
        "ao-cutout-rise ao-portrait-mask h-auto w-full",
        className,
      )}
    />
  );
}
