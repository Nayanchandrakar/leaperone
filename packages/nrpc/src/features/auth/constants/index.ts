import { SESSION_EXPIRY } from "@app/core/constants"
import { ENV } from "@app/env/server"
import type { CookieOptions } from "hono/utils/cookie"
import { getDate } from "../../../utils/date"
import { getRootDomain } from "../../../utils/domain"

const domain = getRootDomain(ENV.FRONTEND_URL)

export const COOKIE_OPTIONS: CookieOptions = {
  path: "/",
  secure: true,
  httpOnly: true,
  sameSite: "Lax",
  expires: getDate(SESSION_EXPIRY, "sec"),
  ...(domain && { domain }),
} as const
