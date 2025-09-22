import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /**
   * Disables ESLint checks during production builds.
   * Linting is handled separately in the CI pipeline to speed up the build process.
   */
  eslint: {
    ignoreDuringBuilds: true,
  },

  /**
   * Disables TypeScript type checking during production builds.
   * Type checks are assumed to be handled externally (e.g., in CI),
   * which can improve build times locally and in production pipelines.
   */
  typescript: {
    ignoreBuildErrors: true,
  },

  transpilePackages: [
    "@app/database",
    "@app/error",
    "@app/env",
    "@app/ui",
    "@app/zod",
  ],
}

export default nextConfig
