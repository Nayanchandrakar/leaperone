import { TRPCError } from "@trpc/server"
import MESSAGES from "src/constants/messages"
import { SESSION_KEY } from "../../../constants/session"
import { getCookie } from "../../../utils/cookie"
import { baseProcedure } from "../../../utils/init"
import { deleteSessionCookie } from "../services/cookie"
import { deteteSession, getSession } from "../services/session"

export const authProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const token = await getCookie(ctx.hono, SESSION_KEY)

  if (!token) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated",
    })
  }

  const session = await getSession(token)

  if (!session || session.session.expiresAt < new Date()) {
    deleteSessionCookie(ctx.hono)

    if (session) {
      await deteteSession(session.session.token)
    }

    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: MESSAGES.SESSION.EXPIRED,
    })
  }

  return next()
})
