import { ApiError } from "@app/error"
import type { Context, Next } from "hono"
import { createMiddleware } from "hono/factory"
import { JwtTokenExpired } from "hono/utils/jwt/types"
import { session } from "../features/auth/modules/auth.module"
import type { VerifyEmailController } from "../features/auth/types/auth"
import { verifyJwt } from "../features/auth/utils/jwt"
import { createRoute } from "../utils/urls"

export const verifyToken = createMiddleware(
  async (c: VerifyEmailController, next) => {
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
  },
)

export const isAuthenticated = createMiddleware(
  async (c: Context, next: Next) => {
    const userSession = await session.ctx(c)
    if (!userSession) throw ApiError.unauthorized()
    c.set("session", userSession)
    await next()
  },
)
