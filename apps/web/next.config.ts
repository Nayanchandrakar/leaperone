import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  transpilePackages: ["@app/database", "@app/error", "@app/env", "@app/ui", "@app/zod"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui.shadcn.com",
      },
      {
        protocol: "https",
        hostname: "d3h5nh9ihnfcrz.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },

  reactCompiler: true,
  // cacheComponents: true,
}

export default nextConfig
