import { SESSION_COOKIE_NAME, SESSION_EXPIRY, SESSSION_UPDATE_AGE } from "@app/core/constants"
import type { User } from "@app/database/types"
import { ApiError } from "@app/error"
import { createId } from "@paralleldrive/cuid2"
import type { Context } from "hono"
import { redis } from "@/config/redis"
import type { SessionRepository } from "@/features/auth/repositories/sesion.repository"
import { Cookie } from "@/features/auth/utils/cookie.utils"
import type { Session } from "@/types/global.types"
import { DateUtils } from "@/utils/date.utils"
import { StringUtils } from "@/utils/string.utils"

export class SessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async create(c: Context, user: User) {
    const token = createId()
    const ipAddress = StringUtils.getRequestIp(c)
    const userAgent = c.req.header("User-Agent")
    const expiresAt = DateUtils.getDate(SESSION_EXPIRY, "sec")

    const session: Session = {
      token,
      ipAddress,
      userAgent,
      expiresAt,
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const sessionKey = `active_sessions_${user.id}`
    let currentSessions = await this.sessionRepository.getActiveSessions(user.id)

    if (currentSessions.length > 0) {
      currentSessions = currentSessions.filter((s) => s.expiresAt > Date.now())
    }

    currentSessions.push({
      token,
      expiresAt: expiresAt.valueOf(),
    })

    const fullSession = { user, session }

    await Promise.all([
      redis.set(sessionKey, currentSessions, { ex: SESSION_EXPIRY }),
      redis.set(token, fullSession, { ex: SESSION_EXPIRY }),
    ])

    return fullSession
  }

  async get(c: Context) {
    const token = await Cookie.get(c, SESSION_COOKIE_NAME)

    if (!token) {
      throw ApiError.unauthorized()
    }

    const session = await this.sessionRepository.getSessionByToken(token)

    if (!session) {
      Cookie.delete(c, SESSION_COOKIE_NAME)
      throw ApiError.unauthorized("No session found with this token")
    }

    if (session.session.expiresAt < new Date()) {
      Cookie.delete(c, SESSION_COOKIE_NAME)
      await this.delete(token)
      throw ApiError.unauthorized("Your session has been expired")
    }

    const sessionIsDueToBeUpdatedDate = (session.session.expiresAt.valueOf() -
      SESSION_EXPIRY * 1000 +
      SESSSION_UPDATE_AGE * 1000) as number

    const shouldBeUpdated = sessionIsDueToBeUpdatedDate <= Date.now()

    if (shouldBeUpdated) {
      const updatedSession = await this.update(token, {
        expiresAt: DateUtils.getDate(SESSION_EXPIRY, "sec"),
        updatedAt: new Date(),
      })

      if (!updatedSession) {
        Cookie.delete(c, SESSION_COOKIE_NAME)
        throw ApiError.unauthorized("Session update failed.")
      }

      const maxAge = (updatedSession.expiresAt.valueOf() - Date.now()) / 1000
      const data = { session: updatedSession, user: session.user }

      await redis.set(token, data, {
        ex: SESSION_EXPIRY,
      })

      await Cookie.set(c, SESSION_COOKIE_NAME, session.session.token, {
        maxAge,
      })

      return data
    }

    return session
  }

  async update(token: string, overrides: Partial<Session>) {
    // Refetch Session to prevent race conditions
    const fullSession = await this.sessionRepository.getSessionByToken(token)
    if (!fullSession) return null

    const updatedSession: Session = {
      ...fullSession.session,
      ...overrides,
    }

    return updatedSession
  }

  async delete(token: string) {
    // network requests
    const requests: Array<Promise<unknown>> = []
    const session = await this.sessionRepository.getSessionByToken(token)

    if (session) {
      const userId = session.user.id
      const sessionKey = `active_sessions_${userId}`
      let currentSessions = await this.sessionRepository.getActiveSessions(userId)

      // Remove the token from the active sessions
      if (currentSessions.length > 0) {
        currentSessions = currentSessions.filter((s) => s.token !== token)
        if (currentSessions.length > 0) {
          requests.push(
            redis.set(sessionKey, currentSessions, {
              ex: SESSION_EXPIRY,
            }),
          )
        } else {
          requests.push(redis.del(sessionKey))
        }
      }
    }

    requests.push(redis.del(token))
    await Promise.all(requests)
  }

  async revoke(userId: string) {
    const requests: Array<Promise<unknown>> = []

    const currentSessions = await this.sessionRepository.getActiveSessions(userId)
    if (!currentSessions) return null

    for (const session of currentSessions) {
      requests.push(this.sessionRepository.deleteSessionByToken(session.token))
    }

    requests.push(this.sessionRepository.deleteActiveSessions(userId))
    await Promise.all(requests)
    return null
  }

  async fromCtx(c: Context) {
    try {
      return await this.get(c)
    } catch {
      return null
    }
  }
}
