import Link from "next/link";
import { Container } from "@/ui/primitives/container";
import { election, formatPhone, nav, site, socials } from "@/lib/site";
import { BrandMark } from "./brand-mark";
import { Placeholder } from "./placeholder";

export function SiteFooter() {
  return (
    <footer className="border-t border-band-line bg-band text-on-band">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <BrandMark />
            <p className="font-display text-xl font-bold tracking-tight">Alexander Obiechina</p>
          </div>
          <p className="mt-4 max-w-sm text-on-band-muted">
            Candidate for {election.office} of the {election.organisation}, {election.term}.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-[13px] font-semibold tracking-[0.12em] text-on-band-muted uppercase">Explore</p>
          <ul className="mt-4 space-y-2">
            {[...nav, { href: "/get-involved", label: "Get involved" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-glow">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[13px] font-semibold tracking-[0.12em] text-on-band-muted uppercase">Contact</p>
          <ul className="mt-4 space-y-2 break-words">
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-glow">
                  {site.email}
                </a>
              </li>
            )}
            {site.phone && (
              <li>
                <a href={`tel:${site.phone}`} className="tabular-nums hover:text-glow">
                  {formatPhone(site.phone)}
                </a>
              </li>
            )}
            {site.whatsapp && (
              <li>
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-glow">
                  WhatsApp
                </a>
              </li>
            )}
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-glow">
                  {s.label}
                </a>
              </li>
            ))}
            {!site.email && !site.phone && !socials.length && (
              <li>
                <Placeholder tone="band">Campaign email, phone and LinkedIn</Placeholder>
              </li>
            )}
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-3 border-t border-band-line py-6 text-[13px] text-on-band-muted md:flex-row md:items-center md:justify-between">
        <p>
          Campaign website of Alexander Obiechina. <span className="text-on-band">Not an official REAN website.</span>
        </p>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {site.publishedBy ? <span>Published by {site.publishedBy}</span> : <Placeholder tone="band">“Published by” line</Placeholder>}
          <Link href="/privacy" className="hover:text-glow">
            Privacy
          </Link>
          <span>
            © {election.date.slice(0, 4)}
          </span>
        </p>
      </Container>
    </footer>
  );
}
