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
        hostname: "dqlyqqdp5e43g.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "static.leaperone.com",
      },
    ],
  },

  reactCompiler: true,
  // cacheComponents: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts", "date-fns"],
    turbopackFileSystemCacheForBuild: true,
  },
}

export default nextConfig
