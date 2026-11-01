import { candidate } from "@/content/candidate";
import { site, socials } from "@/lib/site";

/** schema.org Person, so search engines connect the site to the candidate. Only verified facts. */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: candidate.fullName,
    alternateName: candidate.name,
    jobTitle: "Founder & CEO",
    worksFor: { "@type": "Organization", name: "ACOB Lighting Technology Limited", url: "https://www.acoblighting.com" },
    image: `${site.url}/images/portrait-standing.jpg`,
    url: site.url,
    ...(socials.length ? { sameAs: socials.map((s) => s.href) } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
