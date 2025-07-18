import { defineConfig, type Options } from "tsdown"

export default defineConfig((options: Options) => ({
  platform: "node",
  target: "es2022",
  entry: ["src/**/*"],
  tsconfig: "./tsconfig.json",
  clean: true,
  format: "esm",
  unbundle: true,
  noExternal: [
    "@leapercrm/env/server",
    "@leapercrm/trpc/server",
    "@leapercrm/logger",
    "@leapercrm/database",
    "@leapercrm/auth",
  ],
  ...options,
}))
