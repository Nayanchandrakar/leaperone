import type { CookieOptions } from "@app/types"
import { SESSION_EXPIRY } from "../constants"

export const SESSION_COOKIE_OPTIONS: CookieOptions = {
  path: "/",
  secure: true,
  httpOnly: true,
  sameSite: "lax",
  domain: "localhost",
  expires: new Date(Date.now() + SESSION_EXPIRY * 1000),
}
