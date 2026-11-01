import type { MetadataRoute } from "next";
import { updates } from "@/content/updates";
import { site } from "@/lib/site";

const pages = ["", "/plan", "/first-100-days", "/accountability", "/about", "/get-involved", ...(updates.length ? ["/updates"] : []), "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly", priority: p === "" ? 1 : p === "/privacy" ? 0.2 : 0.8 }));
}
