import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "A plan members can hold to account.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "REAN President 2026–2028", title: "A plan members can hold to account." });
}
