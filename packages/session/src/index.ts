import { SESSION_COOKIE_OPTIONS } from "@app/core/config/cookie"
import { SESSION_COOKIE_NAME, SESSION_EXPIRY, SESSSION_UPDATE_AGE } from "@app/core/constants"
import { ApiError } from "@app/error"
import type { ActiveSession, FullSession, Session } from "@app/types"
import type { Context } from "hono"
import type {
  CookieAdapter,
  CreateSessionParams,
  SessionServiceConfig,
  StorageAdapter,
} from "./types"
import { getDate } from "./utils/date"

export class SessionService {
  private readonly cookieAdapter: CookieAdapter
  private readonly storageAdapter: StorageAdapter

  constructor(config: SessionServiceConfig) {
    this.cookieAdapter = config.cookieAdapter
    this.storageAdapter = config.storageAdapter
  }

  async create({ token, ipAddress, userAgent, user }: CreateSessionParams) {
    const expiresAt = getDate(SESSION_EXPIRY, "sec")

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
    let currentSessions = await this.storageAdapter.get<ActiveSession[]>(sessionKey)

    if (currentSessions && currentSessions.length > 0) {
      currentSessions = currentSessions.filter((s) => s.expiresAt > Date.now())
    }

    currentSessions?.push({
      token,
      expiresAt: expiresAt.valueOf(),
    })

    const fullSession: FullSession = { user, session }

    await Promise.all([
      this.storageAdapter.set(sessionKey, currentSessions, { ex: SESSION_EXPIRY }),
      this.storageAdapter.set(token, fullSession, { ex: SESSION_EXPIRY }),
    ])

    return fullSession
  }

  async get(ctx: Context) {
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
      const data = {
        session: updatedSession,
        user: session.user,
        // Preserve impersonation metadata if it exists
        ...(session.impersonatedBy && { impersonatedBy: session.impersonatedBy }),
      }

      await this.storageAdapter.set(token, data, {
        ex: SESSION_EXPIRY,
      })

      this.cookieAdapter.set(ctx, SESSION_COOKIE_NAME, session.session.token, {
        ...SESSION_COOKIE_OPTIONS,
        maxAge,
      })

      return { ...data }
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
    const requests: Array<Promise<unknown>> = []

    const currentSessions = await this.storageAdapter.get<ActiveSession[]>(
      `active_sessions_${userId}`,
    )
    if (!currentSessions) return null

    for (const session of currentSessions) {
      requests.push(this.storageAdapter.del(session.token))
    }

    requests.push(this.storageAdapter.del(`active_sessions_${userId}`))
    await Promise.all(requests)
    return null
  }

  async fromCtx(ctx: Context) {
    try {
      return await this.get(ctx)
    } catch {
      return null
    }
  }
}
