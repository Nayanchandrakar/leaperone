import "dotenv/config"

import { defineConfig, type Options } from "tsdown"

const isProduction = process?.env?.NODE_ENV === "production"

export default defineConfig(
  (options: Options) =>
    ({
      clean: true,
      format: "esm",
      treeshake: true,
      target: "es2022",
      platform: "node",
      entry: ["src/**/*"],
      minify: isProduction,
      unbundle: !isProduction,
      tsconfig: "./tsconfig.json",
      skipNodeModulesBundle: isProduction,
      noExternal: [
        "@app/nrpc",
        "@app/types",
        "@app/error",
        "@app/logger",
        "@app/database",
        "@app/core/utils",
        "@app/env/server",
        "@app/core/constants",
        "@app/database/types",
        "@app/database/schema",
        "@app/zod/schema/asset",
        "@app/zod/schema/auth",
        "@app/zod/schema/marketing",
        "@app/zod/schema/subscription",
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
