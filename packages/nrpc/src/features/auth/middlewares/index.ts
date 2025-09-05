import type { Next } from "hono"
import { JwtTokenExpired } from "hono/utils/jwt/types"
import { createRoute } from "../../../utils/urls"
import type { VerifyEmailController } from "../types"
import { verifyJwt } from "../utils/jwt"

export class AuthMiddleware {
  private static instance: AuthMiddleware | null = null

  private constructor() {}

  public static init() {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware()
    }
    return AuthMiddleware.instance
  }

  public async verifyToken(c: VerifyEmailController, next: Next) {
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
  }
}
