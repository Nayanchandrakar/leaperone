import { ENV } from "@app/env/server"
import type { Context } from "hono"
import { deleteCookie, getSignedCookie, setSignedCookie } from "hono/cookie"
import type { CookieOptions } from "hono/utils/cookie"
import { COOKIE_OPTIONS } from "../constants"

export class Cookie {
  private static instance: Cookie | null = null

  private constructor() {}

  static init() {
    if (!Cookie.instance) {
      Cookie.instance = new Cookie()
    }
    return Cookie.instance
  }

  async set(
    c: Context,
    name: string,
    value: string,
    overrides?: Partial<CookieOptions>,
  ) {
    await setSignedCookie(c, name, value, ENV.AUTH_SECRET, {
      ...COOKIE_OPTIONS,
      ...overrides,
    })
  }

  async get(c: Context, key: string) {
    return await getSignedCookie(c, ENV.AUTH_SECRET, key)
  }

  delete(c: Context, key: string) {
    deleteCookie(c, key)
  }
}
