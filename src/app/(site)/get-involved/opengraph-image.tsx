import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Back the plan. Ask the hard questions.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Get involved", title: "Back the plan. Ask the hard questions." });
}
