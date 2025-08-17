import { isUserNameTaken } from "@myleaper/database/services/users"
import { userNameSchema } from "@myleaper/zod/common/index"
import { APIError, createAuthMiddleware } from "better-auth/api"

export const beforeRequestMiddleware = createAuthMiddleware(async (ctx) => {
  if (ctx.path !== "/sign-up/email") return

  const { success, data } = userNameSchema.safeParse({
    username: ctx.body.username,
  })

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
