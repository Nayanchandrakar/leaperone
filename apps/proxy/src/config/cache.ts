import { Redis } from "@upstash/redis/cloudflare"
import type { Bindings } from "@/types/global.types"

export function getCacheClient(env: Bindings) {
  return Redis.fromEnv(env)
}
