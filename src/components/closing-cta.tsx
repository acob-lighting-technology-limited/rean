import { Container } from "@/ui/primitives/container";
import { ButtonLink } from "@/ui/primitives/button";
import { Reveal } from "@/ui/motion/reveal";
import { ShareOnWhatsApp } from "./share";

/** Shared closing band: share the plan, or pledge support. */
export function ClosingCta() {
  return (
    <section aria-labelledby="closing" className="relative overflow-hidden bg-band text-on-band">
      <svg aria-hidden viewBox="0 0 400 200" className="pointer-events-none absolute -right-24 -bottom-10 w-[640px] max-w-none opacity-25">
        <path d="M20 200 A180 180 0 0 1 380 200" fill="none" stroke="var(--ao-gold-bright)" strokeWidth="6" />
        <path d="M70 200 A130 130 0 0 1 330 200" fill="none" stroke="var(--ao-glow)" strokeWidth="2" strokeDasharray="2 10" />
      </svg>
      <Container className="relative py-20 sm:py-28">
        <Reveal className="max-w-3xl">
          <h2 id="closing" className="font-display text-4xl leading-[1.02] font-bold tracking-tight sm:text-6xl">
            Read it. Question it. <span className="text-gold-bright">Pass it on.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-on-band-muted">
            Most members will see this plan because someone they trust shared it. If it&rsquo;s worth a conversation, send it to a colleague.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ShareOnWhatsApp variant="glow" />
            <ButtonLink href="/get-involved" variant="outline" className="border-on-band/35 text-on-band hover:border-on-band">
              Pledge your support
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
