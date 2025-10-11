import { defineConfig, type Options } from "tsdown"

export default defineConfig(
  (options: Options) =>
    ({
      clean: true,
      format: "cjs",
      // minify: true,
      // treeshake: true,
      unbundle: false,
      platform: "node",
      entry: ["src/index.ts"],
      tsconfig: "./tsconfig.json",
      noExternal: ["@app/database", "@app/database/schema/users"],
      ...options,
    }) as Options,
)
