import { defineConfig, type Options } from "tsdown"

export default defineConfig(
  (options: Options) =>
    ({
      clean: true,
      format: "esm",
      minify: true,
      treeshake: true,
      unbundle: false,
      platform: "node",
      entry: ["src/index.ts"],
      tsconfig: "./tsconfig.json",
      ...options,
    }) as Options,
)
