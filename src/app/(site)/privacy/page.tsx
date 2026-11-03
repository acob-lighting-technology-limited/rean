import type { Metadata } from "next";
import { Container } from "@/ui/primitives/container";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How Alexander Obiechina’s REAN campaign handles the details you share through this website.",
  alternates: { canonical: "/privacy" },
};

/**
 * Draft notice written for the Nigeria Data Protection Act 2023.
 * UNVERIFIED: controller name (site.publishedBy default) and the 60-day retention period are
 * defaults, not campaign decisions. Have the notice reviewed before launch.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Your details, handled plainly." />
      <Container className="py-16 sm:py-20">
        <div className="max-w-2xl space-y-8 text-lg leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold">
          <section>
            <h2>Who is responsible</h2>
            <p className="mt-3">
              The data controller is {site.publishedBy}
              {site.email ? (
                <>
                  , reachable at{" "}
                  <a href={`mailto:${site.email}`} className="text-accent-text underline underline-offset-4">
                    {site.email}
                  </a>
                </>
              ) : null}
              .
            </p>
          </section>

          <section>
            <h2>What we collect, and why</h2>
            <p className="mt-3">
              What you type into the form on the Get involved page: your name, email, your connection to REAN, and optionally your organisation, phone number and message. We use it to count
              your pledge of support and to reply to your question. The lawful basis is your consent, which you give by ticking the box on the form.
            </p>
            <p className="mt-3">
              We also count visits with Vercel Web Analytics, to see which pages people read. It uses no cookies and records only anonymous totals: the page, the site you came from, and your
              country, device type and browser. It can&rsquo;t identify you or follow you to other sites.
            </p>
            <p className="mt-3">
              The site is hosted by Vercel, and form messages reach the campaign by email through Resend; both handle the data only to provide those services.
            </p>
          </section>

          <section>
            <h2>What we don&rsquo;t do</h2>
            <p className="mt-3">We don&rsquo;t sell or share your details, add you to mailing lists you didn&rsquo;t ask for, or use advertising trackers on this site.</p>
          </section>

          <section>
            <h2>How long we keep it</h2>
            <p className="mt-3">
              We delete pledges and questions within 60 days after the election.
            </p>
          </section>

          <section>
            <h2>Your rights</h2>
            <p className="mt-3">
              Under the Nigeria Data Protection Act 2023 you can ask to see, correct or delete the details you gave us, and withdraw your consent at any time, by contacting the controller above. You can
              also complain to the Nigeria Data Protection Commission.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
