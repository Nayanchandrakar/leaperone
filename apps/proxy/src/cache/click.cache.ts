import { CLICK_CACHE_TTL } from "@app/core/constants"
import type { Redis } from "@upstash/redis/cloudflare"

export class ClickCache {
  private prefix = "click:"
  constructor(private readonly redis: Redis) {}

  private getKey(identifier: string, identityHash: string): string {
    return `${this.prefix}${identifier}:${identityHash}`
  }

  async get(identifier: string, identityHash: string) {
    return await this.redis.get<string>(this.getKey(identifier, identityHash))
  }

  async set(identifier: string, identityHash: string, clickId: string) {
    return await this.redis.set(this.getKey(identifier, identityHash), clickId, {
      ex: CLICK_CACHE_TTL,
    })
  }
}
