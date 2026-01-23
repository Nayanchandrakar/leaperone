import { SESSION_COOKIE_OPTIONS } from "@app/core/config/cookie"
import type { CookieOptions } from "@app/types"
import type { Context } from "hono"
import { setCookie } from "hono/cookie"

export function setSessionCookie(
  c: Context,
  name: string,
  value: string,
  overrides?: CookieOptions,
) {
  return setCookie(c, name, value, {
    ...SESSION_COOKIE_OPTIONS,
    ...overrides,
  })
}
