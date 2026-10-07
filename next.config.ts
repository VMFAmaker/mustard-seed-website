import type { NextConfig } from "next";

// GitHub Pages serves the site from https://vmfamaker.github.io/mustard-seed-website/
// so the published build (npm run deploy) is exported as static files under that path.
const forPages = process.env.PAGES === "1";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(forPages && { basePath: "/mustard-seed-website" }),
};

export default nextConfig;
