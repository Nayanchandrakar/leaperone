import { ApiError } from "@app/error/index"
import type { Context, Next } from "hono"
import { createMiddleware } from "hono/factory"
import { JwtTokenExpired } from "hono/utils/jwt/types"
import { createRoute } from "../../../utils/urls"
import type { VerifyEmailController } from "../types"
import { verifyJwt } from "../utils/jwt"
import type { Session } from "../utils/session"

export class AuthMiddleware {
  private static instance: AuthMiddleware | null = null
  private session: Session

  private constructor(session: Session) {
    this.session = session
  }

  static init(session: Session) {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware(session)
    }
    return AuthMiddleware.instance
  }

  verifyToken = createMiddleware(async (c: VerifyEmailController, next) => {
    const input = c.req.valid("query")
    const endpoint = createRoute(input.callbackUrl)

    try {
      const payload = await verifyJwt(input.token)
      c.set("jwtPayload", payload)
      await next()
      return c.json(200)
    } catch (error) {
      if (error instanceof JwtTokenExpired) {
        endpoint.searchParams.set("error", "token_expired")
        return c.redirect(endpoint.href)
      }
      endpoint.searchParams.set("error", "invalid_token")
      return c.redirect(endpoint.href)
    }
  })

  isAuthenticated = createMiddleware(async (c: Context, next: Next) => {
    const session = await this.session.ctx(c)
    if (!session) throw ApiError.unauthorized()
    c.set("session", session)
    await next()
  })
}
