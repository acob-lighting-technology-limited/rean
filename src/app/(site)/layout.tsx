import { MotionProvider } from "@/ui/motion/motion-provider";
import { ShareFab } from "@/components/share";
import { CountdownBadge } from "@/components/countdown-badge";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PersonJsonLd } from "@/components/json-ld";
import { NavProgress } from "@/components/nav-progress";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <MotionProvider>
      <NavProgress />
      {/* Once this scrolls above the viewport, the floating share button appears. */}
      <div id="share-sentinel" aria-hidden className="pointer-events-none absolute top-[80vh] left-0 h-px w-px" />
      <div className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-action focus:px-5 focus:py-3 focus:text-on-action"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1 pt-16">
          {children}
        </main>
        <ShareFab />
        <CountdownBadge />
        <SiteFooter />
      </div>
      <PersonJsonLd />
    </MotionProvider>
  );
}
