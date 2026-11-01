import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: { formats: ["image/avif", "image/webp"] },
  // Links to the previous site's routes may already be circulating in WhatsApp groups.
  async redirects() {
    return [
      { source: "/manifesto", destination: "/plan", permanent: true },
      { source: "/pillars", destination: "/plan", permanent: true },
      { source: "/commitment", destination: "/accountability", permanent: true },
      { source: "/newsletter", destination: "/updates", permanent: true },
      { source: "/story", destination: "/about", permanent: true },
      { source: "/prototypes", destination: "/", permanent: false },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
