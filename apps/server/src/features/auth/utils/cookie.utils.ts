import { SESSION_EXPIRY } from "@app/core/constants"
import { ENV } from "@app/env/server"
import type { Context } from "hono"
import { deleteCookie, getSignedCookie, setSignedCookie } from "hono/cookie"
import type { CookieOptions } from "hono/utils/cookie"
import { getDate } from "@/utils/date"
import { StringUtils } from "@/utils/string.utils"

export class Cookie {
  private constructor() {}

  static createCookieOptions(): CookieOptions {
    const domain = StringUtils.getRootDomain(ENV.FRONTEND_URL)

    return {
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "Lax",
      expires: getDate(SESSION_EXPIRY, "sec"),
      ...(domain && { domain }),
    }
  }

  static async set(c: Context, name: string, value: string, overrides?: Partial<CookieOptions>) {
    await setSignedCookie(c, name, value, ENV.AUTH_SECRET, {
      ...Cookie.createCookieOptions(),
      ...overrides,
    })
  }

  static async get(c: Context, name: string) {
    return await getSignedCookie(c, ENV.AUTH_SECRET, name)
  }

  static delete(c: Context, name: string) {
    deleteCookie(c, name)
  }
}
