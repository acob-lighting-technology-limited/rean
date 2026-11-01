import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/jpeg";

/**
 * Link-preview card (WhatsApp, LinkedIn, X). For most members this card is the first impression,
 * so it carries the name, the page's point and the portrait, and stays legible as a phone thumbnail.
 * Same look as the home hero: the head-and-collar cut-out (public/images/portrait-hero-crop.png), no
 * frame or backdrop, filling the right side to the bottom edge and fading out on its left.
 * Served as JPEG: the PNG that ImageResponse draws is about 330 KB, and WhatsApp only shows the large
 * preview for images under about 300 KB (above that it falls back to a small cropped thumbnail).
 */
export async function renderOg({ eyebrow, title }: { eyebrow: string; title: string }) {
  const portrait = await readFile(path.join(process.cwd(), "public/images/portrait-hero-crop.png"));
  const src = `data:image/png;base64,${portrait.toString("base64")}`;

  const png = new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: "#09090b", color: "#f4f4f5" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
        <img src={src} width={630} height={630} alt="" style={{ position: "absolute", right: -40, bottom: 0 }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 530, width: 220, display: "flex", backgroundImage: "linear-gradient(to right, #09090b, rgba(9,9,11,0))" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 0 56px 72px", width: 680 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#39d057", letterSpacing: 2, textTransform: "uppercase" }}>
            <div style={{ width: 40, height: 4, background: "#39d057", borderRadius: 4 }} />
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: title.length > 34 ? 64 : 76, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>{title}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 34, fontWeight: 700 }}>Alexander Obiechina</div>
            <div style={{ fontSize: 24, color: "#a1a1aa" }}>Candidate for President · Renewable Energy Association of Nigeria</div>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
  const jpeg = await sharp(Buffer.from(await png.arrayBuffer())).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpeg), { headers: { "Content-Type": ogContentType } });
}
