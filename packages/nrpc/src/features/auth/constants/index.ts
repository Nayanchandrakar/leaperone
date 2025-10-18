import { SESSION_EXPIRY } from "@app/core/constants"
import type { CookieOptions } from "hono/utils/cookie"
import { getDate } from "../../../utils/date"

export const COOKIE_OPTIONS: CookieOptions = {
  path: "/",
  secure: true,
  httpOnly: true,
  sameSite: "Lax",
  expires: getDate(SESSION_EXPIRY, "sec"),
} as const
