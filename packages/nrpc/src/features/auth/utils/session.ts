import type { User } from "@app/database/types"
import { ApiError } from "@app/error/index"
import { createId } from "@paralleldrive/cuid2"
import type { Context } from "hono"
import { redis } from "../../../lib/redis"
import type { FullSession } from "../../../types/index"
import { getDate } from "../../../utils/date"
import { getRequestIp } from "../../../utils/request-ip"
import {
  SESSION_COOKIE_NAME,
  SESSION_EXPIRY,
  SESSSION_UPDATE_AGE,
} from "../constants"
import { getActiveSessions, getSessionByToken } from "../helpers"
import type { Cookie } from "./cookie"

export class Session {
  private static instance: Session | null = null
  private cookie: Cookie

  private constructor(cookie: Cookie) {
    this.cookie = cookie
  }

  public static init(cookie: Cookie) {
    if (!Session.instance) {
      Session.instance = new Session(cookie)
    }
    return Session.instance
  }

  public async create(c: Context, user: User): Promise<FullSession> {
    const token = createId()
    const ipAddress = getRequestIp(c)
    const userAgent = c.req.header("User-Agent")
    const expiresAt = getDate(SESSION_EXPIRY, "sec")

    const session: FullSession["session"] = {
      token,
      ipAddress,
      userAgent,
      expiresAt,
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const sessionKey = `active_sessions_${user.id}`
    let currentSessions = await getActiveSessions(user.id)

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

  public async get(c: Context) {
    const token = await this.cookie.get(c, SESSION_COOKIE_NAME)

    if (!token) {
      throw ApiError.unauthorized()
    }

    const session = await getSessionByToken(token)

    if (!session) {
      this.cookie.delete(c, SESSION_COOKIE_NAME)
      throw ApiError.unauthorized("No session found with this token")
    }

    if (session.session.expiresAt < new Date()) {
      this.cookie.delete(c, SESSION_COOKIE_NAME)
      await this.delete(token)
      throw ApiError.unauthorized("Your session has been expired")
    }

    const sessionIsDueToBeUpdatedDate = (session.session.expiresAt.valueOf() -
      SESSION_EXPIRY * 1000 +
      SESSSION_UPDATE_AGE * 1000) as number

    const shouldBeUpdated = sessionIsDueToBeUpdatedDate <= Date.now()

    if (shouldBeUpdated) {
      const updatedSession = await this.update(token, {
        expiresAt: getDate(SESSION_EXPIRY, "sec"),
        updatedAt: new Date(),
      })

      if (!updatedSession) {
        this.cookie.delete(c, SESSION_COOKIE_NAME)
        throw ApiError.unauthorized("Session update failed.")
      }

      const maxAge = (updatedSession.expiresAt.valueOf() - Date.now()) / 1000
      const data = { session: updatedSession, user: session.user }

      await redis.set(token, data, {
        ex: SESSION_EXPIRY,
      })

      await this.cookie.set(c, SESSION_COOKIE_NAME, session.session.token, {
        maxAge,
      })

      return data
    }

    return session
  }

  public async update(
    token: string,
    overrides: Partial<FullSession["session"]>,
  ): Promise<FullSession["session"] | null> {
    // Refetch Session to prevent race conditions
    const fullSession = await getSessionByToken(token)

    if (!fullSession) return null

    const updatedSession: FullSession["session"] = {
      ...fullSession.session,
      ...overrides,
    }

    return updatedSession
  }

  public async delete(token: string) {
    // network requests
    const requests: Array<Promise<unknown>> = []
    const session = await getSessionByToken(token)

    if (session) {
      const userId = session.user.id
      const sessionKey = `active_sessions_${userId}`
      let currentSessions = await getActiveSessions(userId)

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
}
