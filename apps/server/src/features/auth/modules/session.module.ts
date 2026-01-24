import { SessionService } from "@app/session"
import { deleteCookie, getCookie, setCookie } from "hono/cookie"
import { redis } from "@/config/redis"

export const sessionService = new SessionService(redis, {
  get: getCookie,
  set: setCookie,
  delete: deleteCookie,
})
