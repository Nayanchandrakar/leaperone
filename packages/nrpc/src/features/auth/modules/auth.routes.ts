import {
  loginFormSchema,
  passwordResetSchema,
  registerFormSchema,
  resetPasswordSchema,
  userNameSchema,
  verifyEmailSchema,
} from "@app/zod/schema/auth"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { authController, authMiddleware } from "./auth.module"

const app = new Hono()
  .post("/register", zValidator("json", registerFormSchema), (opts) => {
    return authController.register(opts)
  })
  .post("/login", zValidator("json", loginFormSchema), (opts) => {
    return authController.login(opts)
  })
  .post("/logout", (opts) => {
    return authController.logout(opts)
  })
  .post(
    "/request-password-reset",
    zValidator("json", passwordResetSchema),
    (opts) => {
      return authController.requestPasswordReset(opts)
    },
  )
  .get(
    "/reset-password/:token",
    zValidator("param", resetPasswordSchema),
    (opts) => {
      return authController.resetPassword(opts)
    },
  )
  .get("/username", zValidator("query", userNameSchema), (opts) => {
    return authController.userName(opts)
  })
  .get("/get-session", (opts) => {
    return authController.getSession(opts)
  })
  .get(
    "/verify-email",
    zValidator("query", verifyEmailSchema),
    authMiddleware.verifyToken,
    (opts) => authController.verifyEmail(opts),
  )

export default app
