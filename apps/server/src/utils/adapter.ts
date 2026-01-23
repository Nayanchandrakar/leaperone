import type { CookieAdapter, StorageAdapter } from "@app/session/types"
import { deleteCookie, getCookie, setCookie } from "hono/cookie"
import { redis } from "@/config/redis"

// Hono cookie adapter
export const cookieAdapter: CookieAdapter = {
  get: getCookie,
  set: setCookie,
  delete: deleteCookie,
}

// Storage adapter
export const storageAdapter: StorageAdapter = {
  del: redis.del,
  get: redis.get,
  set: redis.set,
}
