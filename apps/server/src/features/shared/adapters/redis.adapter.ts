import type { StorageAdapter } from "@app/session/types"
import { redis } from "@/config/redis"

export class RedisStorageAdapter implements StorageAdapter {
  async del(...keys: string[]) {
    await redis.del(...keys)
  }

  async get<T>(key: string): Promise<T | null> {
    const result = await redis.get(key)
    return result as T | null
  }

  async set<T>(key: string, value: T, options: { ex: number }) {
    await redis.set(key, value, options)
  }
}

export const storageAdapter = new RedisStorageAdapter()
