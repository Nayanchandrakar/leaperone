import path from "path"
import { defineConfig, type Options } from "tsdown"

export default defineConfig((options: Options) => ({
  platform: "node",
  target: "esnext",
  entry: ["src/**/*"],
  alias: {
    "@/*": path.resolve("../../packages/trpc/src/*"),
  },
  tsconfig: "./tsconfig.json",
  clean: true,
  format: "esm",
  noExternal: [
    "@leapercrm/env/server",
    "@leapercrm/trpc/server",
    "@leapercrm/logger",
    "@leapercrm/database",
    "@leapercrm/auth",
  ],
  ...options,
}))
