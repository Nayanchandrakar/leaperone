import { SESSION_EXPIRY } from "@app/core/constants"
import { ENV } from "@app/env/server"
import type { CookieOptions } from "hono/utils/cookie"
import { getDate } from "../../../utils/date"

export const COOKIE_OPTIONS: CookieOptions = {
  path: "/",
  secure: true,
  httpOnly: true,
  sameSite: "Lax",
  expires: getDate(SESSION_EXPIRY, "sec"),
  domain: new URL(ENV.FRONTEND_URL)?.hostname,
} as const
