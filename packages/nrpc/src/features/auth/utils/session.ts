import type { User } from "@app/database/types"
import { createId } from "@paralleldrive/cuid2"
import type { Context } from "hono"
import { redis } from "../../../lib/redis"
import type {
  ActiveSession,
  Session as SessionType,
} from "../../../types/index"
import { getDate } from "../../../utils/date"
import { getRequestIp } from "../../../utils/request-ip"
import { SESSION_EXPIRY } from "../constants"

export class SessionManager {
  private static instance: SessionManager | null = null

  private constructor() {}

  public static init() {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager()
    }
    return SessionManager.instance
  }

  async getActiveSessions(userId: string): Promise<ActiveSession[]> {
    const sessions = await redis.get(`active_sessions_${userId}`)
    return (sessions ?? []) as ActiveSession[]
  }

  public async create(
    c: Context,
    user: User,
  ): Promise<{ user: User; session: SessionType }> {
    const token = createId()
    const ipAddress = getRequestIp(c)
    const userAgent = c.req.header("User-Agent")
    const expiresAt = getDate(SESSION_EXPIRY, "sec")

    const session: SessionType = {
      token,
      ipAddress,
      userAgent,
      expiresAt,
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    let currentSessions = await this.getActiveSessions(user.id)

    if (currentSessions.length > 0) {
      currentSessions = currentSessions.filter((s) => s.expiresAt > Date.now())
    }

    currentSessions.push({
      token,
      expiresAt: expiresAt.valueOf(),
    })

    const fullSession = { user, session }

    await Promise.all([
      redis.set(`active_sessions_${user.id}`, currentSessions, {
        ex: SESSION_EXPIRY,
      }),

      redis.set(token, fullSession, {
        ex: SESSION_EXPIRY,
      }),
    ])

    return fullSession
  }

  public async update() {}

  public async delete() {}

  public async get() {}
}
