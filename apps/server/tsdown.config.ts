import "dotenv/config"

import { defineConfig, type Options } from "tsdown"

const isProduction = process?.env?.NODE_ENV === "production"

export default defineConfig((options: Options) => ({
  target: "es2022",
  platform: "node",
  entry: ["src/**/*"],
  tsconfig: "./tsconfig.json",
  clean: true,
  format: "esm",
  unbundle: !isProduction,
  skipNodeModulesBundle: isProduction,
  minify: isProduction,
  noExternal: [
    "@myleaper/lib/env/server",
    "@myleaper/trpc/server",
    "@myleaper/lib/logger",
    "@myleaper/database",
    "@myleaper/auth",
  ],
  ...options,
}))
