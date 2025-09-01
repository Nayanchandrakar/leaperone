import { SERVER_ENV } from "@myleaper/env/server"
import type { Context } from "hono"
import { getSignedCookie, setSignedCookie } from "hono/cookie"
import { SESSION_EXPIRATION_SECONDS } from "../constants/session"

export async function setCookie(
  ctx: Context,
  name: string,
  value: string,
  maxAge: number = SESSION_EXPIRATION_SECONDS,
) {
  await setSignedCookie(ctx, name, value, SERVER_ENV.AUTH_SECRET, {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "Lax",
    domain: "localhost",
    maxAge,
  })
}

export async function getCookie(ctx: Context, name: string) {
  return await getSignedCookie(ctx, SERVER_ENV.AUTH_SECRET, name)
}
