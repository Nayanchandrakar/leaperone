import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  transpilePackages: ["@app/database", "@app/error", "@app/env", "@app/ui", "@app/zod"],

  images: {
    domains: ["ui.shadcn.com", "d3h5nh9ihnfcrz.cloudfront.net"],
  },

  // cacheComponents: true,
}

export default nextConfig
