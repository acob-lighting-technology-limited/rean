import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Built in the sector he wants to serve.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "About Alexander", title: "Built in the sector he wants to serve." });
}
