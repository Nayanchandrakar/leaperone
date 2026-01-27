import { LINK_CACHE_TTL } from "@app/core/constants"
import type { Redis } from "@upstash/redis/cloudflare"
import type { CachedLink } from "@/types/global.types"

export class LinkCache {
  private readonly prefix = "link:"

  constructor(private readonly redis: Redis) {}

  private getKey(identifier: string) {
    return `${this.prefix}${identifier}`
  }

  async get(identifier: string) {
    return await this.redis.get<CachedLink>(this.getKey(identifier))
  }

  async set(identifier: string, data: CachedLink) {
    return await this.redis.set(this.getKey(identifier), data, {
      ex: LINK_CACHE_TTL,
    })
  }

  async delete(identifier: string) {
    return await this.redis.del(this.getKey(identifier))
  }
}
