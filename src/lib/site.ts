import { updates } from "@/content/updates";

/**
 * Site-wide facts and contact channels.
 * Env values override the defaults below; a channel with no value is simply hidden.
 * The phone/WhatsApp, Facebook and Instagram defaults were supplied by the campaign on 1 Nov 2026.
 */
export const site = {
  name: "Alexander Obiechina for REAN President",
  shortName: "Alexander Obiechina",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  description:
    "Alexander Obiechina’s plan for the Renewable Energy Association of Nigeria: 7 strategic pillars, a 100-day plan with dates, and targets members can hold him to.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  /** Same number as the phone; the campaign confirmed it takes WhatsApp (1 Nov 2026). */
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+2348032902825").replace(/\D/g, ""),
  phone: process.env.NEXT_PUBLIC_PHONE || "+2348032902825",
  /** UNVERIFIED: profile URL found in public search results, not supplied by the campaign. */
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/alexander-obiechina-505455a6",
  /** The share link the campaign sent resolves to this profile; the tracking parameters are dropped. */
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/profile.php?id=1099600711",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/alexobiechina",
  /** UNVERIFIED: default wording until the campaign names the publisher. */
  publishedBy: process.env.NEXT_PUBLIC_PUBLISHED_BY || "the Alexander Obiechina campaign",
  /** UNVERIFIED: slogan carried over from the previous site; approval not confirmed. */
  slogan: "Powering the industry. Empowering our members.",
};

/**
 * Election details.
 * UNVERIFIED: the date comes from another candidate's public announcement, not from REAN.
 * The campaign chose to show it as confirmed (decision A1, 1 Nov 2026); check it with the
 * REAN Secretariat before launch. Set `confirmed: false` to label it "to be confirmed" again.
 */
export const election = {
  office: "President",
  organisation: "Renewable Energy Association of Nigeria",
  short: "REAN",
  term: "2026–2028",
  date: "2026-11-25",
  confirmed: true,
};

export const electionDateLabel = new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" }).format(
  new Date(`${election.date}T09:00:00+01:00`),
);

/** Alexander's social profiles, in display order; any without a URL is left out. */
export const socials = [
  { label: "LinkedIn", href: site.linkedin },
  { label: "Facebook", href: site.facebook },
  { label: "Instagram", href: site.instagram },
].filter((s) => s.href);

/** Updates joins the navigation once there is at least one real post. */
export const nav: readonly { href: string; label: string }[] = [
  { href: "/plan", label: "The plan" },
  { href: "/first-100-days", label: "First 100 days" },
  { href: "/accountability", label: "Accountability" },
  { href: "/about", label: "About" },
  ...(updates.length ? [{ href: "/updates", label: "Updates" }] : []),
];

/** "+2348012345678" -> "+234 801 234 5678" for display; links keep the raw number. */
export function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "");
  return d.startsWith("234") && d.length === 13 ? `+234 ${d.slice(3, 6)} ${d.slice(6, 9)} ${d.slice(9)}` : raw;
}

/** Share link that opens WhatsApp with a prefilled message. Needs no campaign number. */
export function whatsappShareHref(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/** Direct chat with the campaign, when a number is configured. */
export function whatsappChatHref(text: string) {
  if (!site.whatsapp) return undefined;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** `origin` defaults to the configured site URL; in the browser, pass the real one (see useShareHref). */
export const shareMessage = (path = "", origin = site.url) =>
  `Alexander Obiechina is standing for President of REAN. Read his plan for members — 7 pillars, a dated 100-day plan and published targets: ${origin}${path}`;
