import { getWorkspaceByOwnerId } from "@app/database/repository/workspace"
import { ApiError } from "@app/error/index"
import type { Context, Next } from "hono"
import { createMiddleware } from "hono/factory"
import { JwtTokenExpired } from "hono/utils/jwt/types"
import { MSG } from "src/constants/message"
import type { HonoEnv } from "src/types"
import { session } from "../features/auth/modules/auth.module"
import type { VerifyEmailController } from "../features/auth/types/index"
import { verifyJwt } from "../features/auth/utils/jwt"
import type { Session } from "../features/auth/utils/session"
import { createRoute } from "../utils/urls"

export class Middleware {
  private session: Session

  constructor(session: Session) {
    this.session = session
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

  hasWorkspace = createMiddleware<HonoEnv>(
    async (c: Context<HonoEnv>, next: Next) => {
      const session = c.get("session")
      const workspace = await getWorkspaceByOwnerId(session.user.id)
      if (!workspace) throw ApiError.badRequest(MSG.WORKSPACE.NOT_FOUND)

      c.set("workspace", workspace)
      await next()
    },
  )

  hasActiveSubscription = createMiddleware<HonoEnv>(
    async (c: Context<HonoEnv>, next: Next) => {
      // const session = c.get("session")
      await next()
    },
  )
}

export const middleware = new Middleware(session)
