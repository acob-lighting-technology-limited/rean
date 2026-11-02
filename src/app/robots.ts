import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Open to search engines since 2 Nov 2026, at the campaign's request. To hide the site again, set
// `disallow: "/"` here and `robots: { index: false, follow: false }` in app/layout.tsx.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${site.url}/sitemap.xml` };
}
