import type { User } from "@myleaper/database/types"
import type { Context } from "hono"
import { deleteCookie } from "hono/cookie"
import { SESSION_KEY } from "src/constants/session"
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
    setCookie(ctx, SESSION_KEY, session.session.token, expiresInSec),

    redis.set(session.session.token, JSON.stringify(session), {
      ex: expiresInSec,
    }),
  ])
}

export async function deleteSessionCookie(ctx: Context): Promise<void> {
  deleteCookie(ctx, SESSION_KEY)
}
