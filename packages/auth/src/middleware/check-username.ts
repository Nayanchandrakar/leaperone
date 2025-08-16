import { isUserNameTaken } from "@myleaper/database/services/users"
import { userNameSchema } from "@myleaper/zod/utils"
import { APIError, createAuthMiddleware } from "better-auth/api"

export const beforeRequestHook = createAuthMiddleware(async (ctx) => {
  if (ctx.path !== "/sign-up/email") return

  const { success, data } = userNameSchema.safeParse(
    ctx.body.username as string,
  )

  if (!success) {
    throw new APIError("EXPECTATION_FAILED", {
      message: "Invalid username format",
    })
  }
  const exists = await isUserNameTaken(data.username)

  if (exists) {
    throw new APIError("BAD_REQUEST", {
      message: "Username already in use",
    })
  }
})
