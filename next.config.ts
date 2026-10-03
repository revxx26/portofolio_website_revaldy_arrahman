import type { NextConfig } from "next";
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Each copy builds from its own source and dependencies, even inside another checkout.
  turbopack: { root: process.cwd() },
};
export default config;
