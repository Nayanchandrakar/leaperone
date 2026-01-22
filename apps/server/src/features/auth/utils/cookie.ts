import { SESSION_COOKIE_OPTIONS } from "@app/core/config/cookie"
import type { Context } from "hono"
import { setCookie } from "hono/cookie"
import type { CookieOptions } from "hono/utils/cookie"

export function setSessionCookie(c: Context, name: string, value: string, options?: CookieOptions) {
  return setCookie(c, name, value, {
    ...(SESSION_COOKIE_OPTIONS as CookieOptions),
    ...options,
  })
}
