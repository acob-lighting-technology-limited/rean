import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * Link-preview card (WhatsApp, LinkedIn, X). For most members this card is the first impression,
 * so it carries the name, the page's point and the portrait, and stays legible as a phone thumbnail.
 */
export async function renderOg({ eyebrow, title }: { eyebrow: string; title: string }) {
  const portrait = await readFile(path.join(process.cwd(), "public/images/portrait-standing.jpg"));
  const src = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#09090b", color: "#f4f4f5" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 56px 56px 72px", width: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#39d057", letterSpacing: 2, textTransform: "uppercase" }}>
            <div style={{ width: 40, height: 4, background: "#39d057", borderRadius: 4 }} />
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: title.length > 40 ? 64 : 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>{title}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 34, fontWeight: 700 }}>Alexander Obiechina</div>
            <div style={{ fontSize: 26, color: "#a1a1aa" }}>Candidate for President · Renewable Energy Association of Nigeria</div>
          </div>
        </div>
        <div style={{ display: "flex", position: "relative", width: 440, height: "100%", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ position: "absolute", top: 70, left: 20, width: 400, height: 400, borderRadius: 400, border: "10px solid #f2c230" }} />
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
          <img src={src} width={400} height={500} alt="" style={{ objectFit: "cover", borderTopLeftRadius: 200, borderTopRightRadius: 200 }} />
        </div>
      </div>
    ),
    ogSize,
  );
}
