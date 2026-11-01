import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "8 priorities, each with a date.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "First 100 days", title: "8 priorities, each with a date." });
}
