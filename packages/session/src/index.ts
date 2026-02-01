import { SESSION_COOKIE_OPTIONS } from "@app/core/config/cookie"
import { SESSION_COOKIE_NAME, SESSION_EXPIRY, SESSSION_UPDATE_AGE } from "@app/core/constants"
import { ApiError } from "@app/error"
import type { ActiveSession, FullSession, Session } from "@app/types"
import type { Redis } from "@upstash/redis"
import type { CookieAdapter, CreateSessionParams } from "./types"
import { getDate } from "./utils/date"

export class SessionService<T> {
  constructor(
    private readonly storageAdapter: Redis,
    private readonly cookieAdapter: CookieAdapter<T>,
  ) {}

  async create({ token, ipAddress, userAgent, user, overrides }: CreateSessionParams) {
    const now = new Date()
    const ttl = overrides?.ttl ?? SESSION_EXPIRY
    const expiresAt = getDate(ttl, "sec")

    // Create session object
    const session: Session = {
      token,
      ipAddress,
      userAgent,
      userId: user.id,
      impersonatedBy: overrides?.impersonatedBy ?? null,
      expiresAt,
      createdAt: now,
      updatedAt: now,
    }

    const fullSession: FullSession = { user, session }

    // Build active session tracking entry
    const activeSession: ActiveSession = {
      token,
      expiresAt: session.expiresAt.valueOf(),
    }

    // Get user's active sessions list
    const sessionsKey = `active_sessions_${user.id}`
    const activeSessions = await this.storageAdapter.get<ActiveSession[]>(sessionsKey)

    // Remove expired sessions and add the new one
    const timestamp = Date.now()
    const validSessions = activeSessions
      ? activeSessions.filter((s) => s.expiresAt > timestamp)
      : []

    validSessions.push(activeSession)

    const pipeline = this.storageAdapter.pipeline()
    pipeline.set(sessionsKey, validSessions, { ex: ttl })
    pipeline.set(token, fullSession, { ex: ttl })

    // Save both the session data and active sessions list using Redis pipeline
    await pipeline.exec()

    return fullSession
  }

  async get(ctx: T) {
    const token = this.cookieAdapter.get(ctx, SESSION_COOKIE_NAME)

    if (!token) {
      throw ApiError.unauthorized()
    }

    const session = await this.storageAdapter.get<FullSession>(token)

    if (!session) {
      this.cookieAdapter.delete(ctx, SESSION_COOKIE_NAME)
      throw ApiError.unauthorized("No session found with this token")
    }

    if (session.session.expiresAt < new Date()) {
      this.cookieAdapter.delete(ctx, SESSION_COOKIE_NAME)
      await this.delete(token)
      throw ApiError.unauthorized("Your session has been expired")
    }

    const sessionIsDueToBeUpdatedDate = (session.session.expiresAt.valueOf() -
      SESSION_EXPIRY * 1000 +
      SESSSION_UPDATE_AGE * 1000) as number

    const shouldBeUpdated = sessionIsDueToBeUpdatedDate <= Date.now()

    if (shouldBeUpdated) {
      const updatedSession = await this.update(token, {
        updatedAt: new Date(),
        expiresAt: getDate(SESSION_EXPIRY, "sec"),
      })

      if (!updatedSession) {
        this.cookieAdapter.delete(ctx, SESSION_COOKIE_NAME)
        throw ApiError.unauthorized("Session update failed.")
      }

      const maxAge = (updatedSession.expiresAt.valueOf() - Date.now()) / 1000
      const data: FullSession = {
        session: updatedSession,
        user: session.user,
      }

      await this.storageAdapter.set(token, data, {
        ex: SESSION_EXPIRY,
      })

      this.cookieAdapter.set(ctx, SESSION_COOKIE_NAME, session.session.token, {
        ...SESSION_COOKIE_OPTIONS,
        maxAge,
      })

      return data
    }

    return session
  }

  async update(token: string, overrides: Partial<Session>) {
    // Refetch Session to prevent race conditions
    const fullSession = await this.storageAdapter.get<FullSession>(token)
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
    const session = await this.storageAdapter.get<FullSession>(token)

    if (session) {
      const userId = session.user.id
      const sessionKey = `active_sessions_${userId}`
      let currentSessions = await this.storageAdapter.get<ActiveSession[]>(sessionKey)

      // Remove the token from the active sessions
      if (currentSessions && currentSessions.length > 0) {
        currentSessions = currentSessions.filter((s) => s.token !== token)
        if (currentSessions.length > 0) {
          requests.push(
            this.storageAdapter.set(sessionKey, currentSessions, {
              ex: SESSION_EXPIRY,
            }),
          )
        } else {
          requests.push(this.storageAdapter.del(sessionKey))
        }
      }
    }

    requests.push(this.storageAdapter.del(token))
    await Promise.all(requests)
  }

  async revoke(userId: string) {
    const sessionsKey = `active_sessions_${userId}`
    const currentSessions = await this.storageAdapter.get<ActiveSession[]>(sessionsKey)

    if (!currentSessions) return null

    const pipeline = this.storageAdapter.pipeline()

    for (const session of currentSessions) {
      pipeline.del(session.token)
    }

    pipeline.del(sessionsKey)
    await pipeline.exec()
    return null
  }

  async refresh(user: Partial<FullSession["user"]>) {
    const sessionsKey = `active_sessions_${user.id}`
    const activeSessions = await this.storageAdapter.get<ActiveSession[]>(sessionsKey)

    if (!activeSessions?.length) {
      return null
    }

    const timestamp = Date.now()
    const validSessions = activeSessions.filter((s) => s.expiresAt > timestamp)

    if (!validSessions.length) {
      await this.storageAdapter.del(sessionsKey)
      return null
    }

    const fullSessions = await this.storageAdapter.mget<FullSession[]>(
      validSessions.map((s) => s.token),
    )

    const pipeline = this.storageAdapter.pipeline()
    const updatedValidSessions: ActiveSession[] = []

    for (let i = 0; i < fullSessions.length; i++) {
      const fullSession = fullSessions[i]
      const activeSession = validSessions[i]

      if (fullSession && activeSession) {
        const remainingTtl = Math.floor(
          (new Date(fullSession.session.expiresAt).valueOf() - timestamp) / 1000,
        )

        if (remainingTtl > 0) {
          pipeline.set(
            fullSession.session.token,
            {
              user: { ...fullSession.user, ...user },
              session: fullSession.session,
            },
            { ex: remainingTtl },
          )
          updatedValidSessions.push(activeSession)
        }
      }
    }

    if (updatedValidSessions.length) {
      pipeline.set(sessionsKey, updatedValidSessions, { ex: SESSION_EXPIRY })
    } else {
      pipeline.del(sessionsKey)
    }

    await pipeline.exec()
    return user
  }

  async fromCtx(ctx: T) {
    try {
      return await this.get(ctx)
    } catch {
      return null
    }
  }
}
