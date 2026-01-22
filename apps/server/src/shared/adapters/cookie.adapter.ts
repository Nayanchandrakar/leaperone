import type { CookieAdapter } from "@app/session/types"
import type { Context } from "hono"
import { deleteCookie, getCookie, setCookie } from "hono/cookie"
import type { CookieOptions } from "hono/utils/cookie"

export class HonoCookieAdapter implements CookieAdapter {
  constructor(private context: Context) {}

  delete(name: string): void {
    deleteCookie(this.context, name)
  }

  get(name: string): string | undefined {
    return getCookie(this.context, name)
  }

  set(name: string, value: string, overrides?: CookieOptions): void {
    setCookie(this.context, name, value, overrides)
  }
}
