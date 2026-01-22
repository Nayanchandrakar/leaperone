import { ApiError } from "@app/error"
import { SessionManager } from "@app/session"
import type { Context, Next } from "hono"
import { JwtTokenExpired } from "hono/utils/jwt/types"
import { HonoCookieAdapter } from "@/features/shared/adapters/cookie.adapter"
import { storageAdapter } from "@/features/shared/adapters/redis.adapter"
import type { VerifyEmailContext } from "@/types/auth.types"
import { RouteUtils } from "@/utils/route.utils"
import { TokenUtils } from "@/utils/token.utils"

export const verifyToken = async (c: VerifyEmailContext, next: Next): Promise<any> => {
  const input = c.req.valid("query")
  const endpoint = RouteUtils.createRoute(input.callbackUrl)

  try {
    const payload = await TokenUtils.verifyJwt(input.token)
    c.set("jwtPayload", payload)
    return await next()
  } catch (error) {
    if (error instanceof JwtTokenExpired) {
      endpoint.searchParams.set("error", "token_expired")
      return c.redirect(endpoint.href)
    }
    endpoint.searchParams.set("error", "invalid_token")
    return c.redirect(endpoint.href)
  }
}

export const isAuth = async (c: Context, next: Next) => {
  const cookieAdapter = new HonoCookieAdapter(c)
  const sessionManager = new SessionManager({
    cookieAdapter,
    storageAdapter,
  })

  const userSession = await sessionManager.fromCtx()
  if (!userSession) throw ApiError.unauthorized()

  c.set("session", userSession)
  return await next()
}
