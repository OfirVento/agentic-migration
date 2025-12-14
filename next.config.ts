import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/agentic-migration',
  assetPrefix: '/agentic-migration/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
