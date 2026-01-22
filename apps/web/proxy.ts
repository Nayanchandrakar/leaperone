import { SESSION_COOKIE_NAME, SESSION_EXPIRY, SESSSION_UPDATE_AGE } from "@app/core/constants"
import { ENV } from "@app/env/web/server"
import { SessionManager, signCookie, verifyCookie } from "@app/session"
import type { CookieAdapter, CookieSetOptions, StorageAdapter } from "@app/session/types"
import { Redis } from "@upstash/redis"
import { type NextRequest, NextResponse } from "next/server"

/**
 * Next.js middleware cookie adapter with signing support
 */
class NextMiddlewareCookieAdapter implements CookieAdapter {
  private pendingCookies: Array<{ name: string; value: string; options?: CookieSetOptions }> = []
  private deletedCookies: string[] = []

  constructor(
    private request: NextRequest,
    private secret: string,
  ) {}

  async get(name: string): Promise<string | undefined> {
    const signedValue = this.request.cookies.get(name)?.value
    if (!signedValue) return undefined

    return await verifyCookie(signedValue, this.secret)
  }

  async set(name: string, value: string, options?: CookieSetOptions): Promise<void> {
    const signedValue = await signCookie(value, this.secret)
    this.pendingCookies.push({ name, value: signedValue, options })
  }

  delete(name: string): void {
    this.deletedCookies.push(name)
  }

  /**
   * Apply pending cookie changes to the response
   */
  apply(response: NextResponse): void {
    for (const { name, value, options } of this.pendingCookies) {
      response.cookies.set(name, value, {
        path: options?.path ?? "/",
        secure: options?.secure ?? true,
        httpOnly: options?.httpOnly ?? true,
        sameSite: (options?.sameSite?.toLowerCase() as "lax" | "strict" | "none") ?? "lax",
        ...(options?.expires && { expires: options.expires }),
        ...(options?.maxAge && { maxAge: options.maxAge }),
        ...(options?.domain && { domain: options.domain }),
      })
    }

    for (const name of this.deletedCookies) {
      response.cookies.delete(name)
    }
  }
}

/**
 * Redis storage adapter for Next.js middleware
 */
class NextRedisStorageAdapter implements StorageAdapter {
  private redis: Redis

  constructor() {
    this.redis = Redis.fromEnv()
  }

  async get<T>(key: string): Promise<T | null> {
    return await this.redis.get<T>(key)
  }

  async set<T>(key: string, value: T, options: { ex: number }): Promise<void> {
    await this.redis.set(key, value, { ex: options.ex })
  }

  async del(keys: string[]): Promise<void> {
    await this.redis.del(keys)
  }
}

export default async function proxy(request: NextRequest) {
  const cookieAdapter = new NextMiddlewareCookieAdapter(request, ENV.AUTH_SECRET)
  const storageAdapter = new NextRedisStorageAdapter()

  const sessionManager = new SessionManager({
    cookieAdapter,
    storageAdapter,
    cookieName: SESSION_COOKIE_NAME,
    sessionExpiry: SESSION_EXPIRY,
    sessionUpdateAge: SESSSION_UPDATE_AGE,
  })

  let session = null
  try {
    session = await sessionManager.get()
  } catch {
    // Session validation failed, continue without session
  }

  const response = NextResponse.next()

  // Apply any cookie changes (rotation, deletion) to the response
  cookieAdapter.apply(response)

  if (session) {
    // Optional: Pass user ID to downstream via headers
    response.headers.set("x-user-id", session.user.id)
  }

  return response
}
