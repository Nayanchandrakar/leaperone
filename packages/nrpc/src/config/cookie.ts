import { SESSION_EXPIRY } from "@app/constants/auth"
import type { CookieOptions } from "hono/utils/cookie"
import { getDate } from "../utils/date"

export const COOKIE_OPTIONS: CookieOptions = {
  domain: "localhost",
  httpOnly: true,
  path: "/",
  sameSite: "Lax",
  secure: true,
  expires: getDate(SESSION_EXPIRY, "sec"),
} as const
