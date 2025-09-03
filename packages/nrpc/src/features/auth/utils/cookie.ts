import { SERVER_ENV } from "@app/env/server"
import type { Context } from "hono"
import { setSignedCookie } from "hono/cookie"
import type { CookieOptions } from "hono/utils/cookie"

export class CookieManager {
  private static instance: CookieManager | null = null
  private readonly cookieOptions: CookieOptions = {
    domain: "localhost",
    httpOnly: true,
    path: "/",
    sameSite: "Lax",
    secure: true,
  }

  private constructor() {}

  public static init() {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager()
    }
    return CookieManager.instance
  }

  public async set(
    c: Context,
    name: string,
    value: string,
    options: Partial<CookieOptions>,
  ) {
    await setSignedCookie(c, name, value, SERVER_ENV.AUTH_SECRET, {
      ...this.cookieOptions,
      ...options,
    })
  }
}
