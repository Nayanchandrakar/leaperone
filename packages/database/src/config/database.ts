import type { DrizzleConfig } from "drizzle-orm"
import { upstashCache } from "drizzle-orm/cache/upstash"

export const defaultDbConfig: DrizzleConfig = {
  casing: "snake_case",
  cache: upstashCache({
    global: true,
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  }),
}
