import type { User } from "@myleaper/database/types"
import type { Context } from "hono"
import { redis } from "../../../lib/redis"
import { setCookie } from "../../../utils/cookie"
import type { Session } from "../types"

export async function setSessionCookie(
  ctx: Context,
  session: {
    session: Session
    user: User
  },
) {
  const expiresInSec = Math.floor(
    (new Date(session.session.expiresAt).getTime() - Date.now()) / 1000,
  )

  await Promise.all([
    setCookie(
      ctx,
      "__Secure.leaper.session_token",
      session.session.token,
      expiresInSec,
    ),

    redis.set(session.session.token, JSON.stringify(session), {
      ex: expiresInSec,
    }),
  ])
}
