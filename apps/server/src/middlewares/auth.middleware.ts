import { ApiError } from "@app/error"
import type { Context, Next } from "hono"
import { JwtTokenExpired } from "hono/utils/jwt/types"
import { sessionService } from "@/features/auth/modules/session.module"
import type { VerifyEmailContext } from "@/types/auth.types"
import { RouteUtils } from "@/utils/route.utils"
import { TokenUtils } from "@/utils/token.utils"

export const verifyToken = async (c: VerifyEmailContext, next: Next): Promise<any> => {
  const input = c.req.valid("query")
  const endpoint = RouteUtils.createRoute(input.callbackUrl)

  try {
    const payload = await TokenUtils.verifyJwt(input.token)
    c.set("jwtPayload", payload)
    await next()
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
  const userSession = await sessionService.fromCtx(c)
  if (!userSession) throw ApiError.unauthorized()

  // Session already contains impersonation metadata if it exists
  // (stored when impersonation was initiated)
  c.set("session", userSession)

  await next()
}
