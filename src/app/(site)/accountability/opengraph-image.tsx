import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Measured, published, reviewed.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Accountability", title: "Measured, published, reviewed." });
}
