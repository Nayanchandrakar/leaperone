import type { CookieOptions } from "hono/utils/cookie"
import { getDate } from "../../../utils/date"

export const SESSION_EXPIRY = 60 * 60 * 24 * 7
export const SESSION_COOKIE_NAME = "__Secure.leaper.session_token"
export const SESSSION_UPDATE_AGE = 60 * 60 * 24

export const PASSWORD_RESET_EXPIRY = 60 * 60 * 1

export const COOKIE_OPTIONS: CookieOptions = {
  domain: "localhost",
  httpOnly: true,
  path: "/",
  sameSite: "Lax",
  secure: true,
  expires: getDate(SESSION_EXPIRY, "sec"),
} as const
