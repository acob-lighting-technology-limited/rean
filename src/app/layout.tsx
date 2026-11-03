import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { site } from "@/lib/site";
import { THEME_COLOR, themeInitScript } from "@/lib/theme";
import { splashResetScript } from "@/lib/splash";
import { Splash } from "@/components/splash";
import "./globals.css";

// One variable family for everything (~88KB): Archivo at normal width for body text, and set
// semi-condensed via its width axis for headlines and big numbers. A second body family cost
// another ~47KB, a real price on Nigerian mobile data for little visible gain.
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { type: "website", locale: "en_NG", siteName: site.name },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Light by default; lib/theme.ts switches it when the visitor picks dark.
  themeColor: THEME_COLOR.light,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the head script sets data-theme and --splash-delay on <html> outside React.
    <html lang="en-NG" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `${themeInitScript};${splashResetScript}` }} />
      </head>
      <body className="min-h-dvh">
        <Splash />
        {children}
        {/* Vercel Web Analytics: cookieless, anonymous page-view counts (see the privacy notice). */}
        <Analytics />
      </body>
    </html>
  );
}
