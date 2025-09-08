import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const SERVER_ENV = createEnv({
  server: {
    DATABASE_URL: z.string({
      error: "DATABASE_URL is required in environment variables",
    }),

    UPSTASH_REDIS_REST_URL: z.string({
      error: "UPSTASH_REDIS_REST_URL is required in environment variables",
    }),

    UPSTASH_REDIS_REST_TOKEN: z.string({
      error: "UPSTASH_REDIS_REST_TOKEN is required in environment variables",
    }),
  },

  runtimeEnv: process.env,
})
