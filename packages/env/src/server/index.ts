// import 'dotenv/config'
import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const serverEnv = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),

    LOG_LEVEL: z
      .enum(["info", "error", "fatal", "warn", "debug", "trace", "silent"])
      .default("info"),

    PORT: z.coerce.number().default(8080),

    HOST: z.string().default("localhost"),

    DATABASE_URL: z.string({
      error: "DATABASE_URL is required in environment variables",
    }),

    BETTER_AUTH_URL: z.string().default("http://localhost:3000"),

    BETTER_AUTH_SECRET: z.string({
      error: "BETTER_AUTH_SECRET is required in environment variables",
    }),

    AWS_ACCESS_KEY_ID: z.string({
      error: "AWS_ACCESS_KEY_ID is required in environment variables",
    }),

    AWS_SECRET_ACCESS_KEY: z.string({
      error: "AWS_SECRET_ACCESS_KEY is required in environment variables",
    }),

    AWS_REGION: z.string({
      error: "AWS_REGION is required in environment variables",
    }),

    S3_UPLOAD_BUCKET: z.string({
      error: "S3_UPLOAD_BUCKET is required in environment variables",
    }),

    UPSTASH_REDIS_REST_URL: z.string({
      error: "UPSTASH_REDIS_REST_URL is required in environment variables",
    }),

    UPSTASH_REDIS_REST_TOKEN: z.string({
      error: "UPSTASH_REDIS_REST_TOKEN is required in environment variables",
    }),

    STRIPE_SECRET_KEY: z.string({
      error: "STRIPE_SECRET_KEY is required in environment variables",
    }),

    STRIPE_WEBHOOK: z.string({
      error: "STRIPE_WEBHOOK is required in environment variables",
    }),
  },

  runtimeEnv: process.env,
})
