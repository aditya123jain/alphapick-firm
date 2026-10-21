import type { NextConfig } from "next";

// Pure static export: `next build` writes the whole site to ./out (no server, no API routes).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
