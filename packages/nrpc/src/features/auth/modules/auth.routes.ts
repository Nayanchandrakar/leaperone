import {
  emailSchema,
  loginFormSchema,
  registerFormSchema,
  resetPasswordSchema,
  userNameSchema,
  verifyEmailSchema,
} from "@app/zod/schema/auth"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { middleware } from "../../../middleware"
import type { HonoEnv } from "../../../types/index"
import { authController } from "./auth.module"

const app = new Hono<HonoEnv>()
  .post(
    "/register",
    zValidator("json", registerFormSchema),
    authController.register,
  )
  .post("/login", zValidator("json", loginFormSchema), authController.login)
  .post("/logout", authController.logout)
  .post(
    "/request-password-reset",
    zValidator("json", emailSchema),
    authController.requestPasswordReset,
  )
  .post(
    "/reset-password",
    zValidator("json", resetPasswordSchema),
    authController.resetPassword,
  )
  .get(
    "/username",
    zValidator("query", userNameSchema),
    authController.userName,
  )
  .get("/get-session", authController.getSession)
  .get(
    "/verify-email",
    zValidator("query", verifyEmailSchema),
    middleware.verifyToken,
    authController.verifyEmail,
  )

export default app
