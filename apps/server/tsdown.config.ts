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
    "@leapercrm/lib/env/server",
    "@leapercrm/trpc/server",
    "@leapercrm/lib/logger",
    "@leapercrm/database",
    "@leapercrm/auth",
  ],
  ...options,
}))
