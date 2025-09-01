import { createId } from "@paralleldrive/cuid2"
import type { Context } from "hono"
import { SESSION_EXPIRATION_SECONDS } from "../../../constants/session"
import { redis } from "../../../lib/redis"
import { getDate } from "../../../utils/date"
import { getRequestIp } from "../../../utils/get-request-ip"
import type { ActiveSession, ParsedSession, Session } from "../types/index"

export async function createSession(userId: string, ctx: Context) {
  const ipAddress = getRequestIp(ctx)
  const userAgent = ctx.req.header("User-Agent")
  const expiresAt = getDate(SESSION_EXPIRATION_SECONDS, "sec")

  const data: Session = {
    userId,
    ipAddress,
    userAgent,
    expiresAt,
    token: createId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const currentList = (await redis.get(
    `active-sessions-${userId}`,
  )) as ActiveSession[]

  const now = Date.now()
  let list: ActiveSession[] = []

  if (currentList) {
    list = currentList || []
    list = list.filter((session) => session.expiresAt > now)
  }

  list.push({
    token: data.token,
    expiresAt: now + SESSION_EXPIRATION_SECONDS * 1000,
  })

  await redis.set(`active-sessions-${userId}`, list, {
    ex: SESSION_EXPIRATION_SECONDS,
  })

  return data
}

export async function getSession(token: string): Promise<ParsedSession | null> {
  return await redis.get(token)
}

export async function deteteSession(token: string): Promise<void> {
  const session = await getSession(token)

  if (session?.session) {
    const userId = session.user.id
    const currentList = (await redis.get(
      `active-sessions-${userId}`,
    )) as ActiveSession[]

    if (currentList) {
      const list: ActiveSession[] = currentList.filter((s) => s.token !== token)

      if (list.length > 0) {
        await redis.set(`active-sessions-${userId}`, list, {
          ex: SESSION_EXPIRATION_SECONDS,
        })
      } else {
        await redis.del(`active-sessions-${userId}`)
      }
    }
  }

  await redis.del(token)
}
