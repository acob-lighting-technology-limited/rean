import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "7 pillars. Concrete actions.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "The plan", title: "7 pillars. Concrete actions." });
}
