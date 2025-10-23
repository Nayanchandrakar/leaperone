import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const CLIENT_ENV = createEnv({
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000"),

    NEXT_PUBLIC_SERVER_URL: z.string().default("http://localhost:8080"),

    NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID: z.string({
      error: "NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID is required in environment variables",
    }),

    NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID: z.string({
      error: "NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID is required in environment variables",
    }),
  },

  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID,
    NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
  },
})
