import { SESSION_EXPIRY } from "../constants"

export const SESSION_COOKIE_OPTIONS = {
  path: "/",
  secure: true,
  httpOnly: true,
  sameSite: "Lax",
  domain: ".leaperone.com",
  expires: new Date(Date.now() + SESSION_EXPIRY * 1000),
}
