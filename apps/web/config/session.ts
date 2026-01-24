import { SESSION_COOKIE_OPTIONS } from "@app/core/config/cookie"
import { SessionService } from "@app/session"
import { redis } from "@/config/redis"
import type { NextContext } from "@/types"

// Next.js session adapter
export const sessionService = new SessionService(redis, {
  delete: (ctx: NextContext, name) => ctx.response.cookies.delete(name),
  get: (ctx: NextContext, name) => ctx.request.cookies.get(name)?.value,
  set: (ctx: NextContext, name, value, overrides) =>
    ctx.response.cookies.set(name, value, {
      ...SESSION_COOKIE_OPTIONS,
      ...overrides,
    }),
})
