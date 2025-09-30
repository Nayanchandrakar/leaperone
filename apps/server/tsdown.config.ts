import "dotenv/config"

import { defineConfig, type Options } from "tsdown"

const isProduction = process?.env?.NODE_ENV === "production"

export default defineConfig(
  (options: Options) =>
    ({
      target: "es2022",
      platform: "node",
      entry: ["src/**/*"],
      tsconfig: "./tsconfig.json",
      clean: true,
      treeshake: true,
      format: "esm",
      minify: isProduction,
      unbundle: !isProduction,
      skipNodeModulesBundle: isProduction,
      noExternal: [
        "@app/nrpc",
        "@app/error",
        "@app/logger",
        "@app/database",
        "@app/env/server",
        "@app/database/types",
        "@app/database/schema",
        "@app/database/repository/file",
        "@app/database/repository/user",
        "@app/database/repository/storage",
        "@app/database/repository/support",
        "@app/database/repository/workspace",
        "@app/database/repository/contact-us",
        "@app/database/repository/subscription",
        "@app/database/repository/verification",
        "@app/database/repository/role-permission",
      ],
      ...options,
    }) as Options,
)
