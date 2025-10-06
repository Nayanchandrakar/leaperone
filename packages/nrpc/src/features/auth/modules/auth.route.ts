import {
  emailSchema,
  loginFormSchema,
  registerFormSchema,
  resetPasswordSchema,
  restrictUserSchema,
  userNameSchema,
  verifyEmailSchema,
} from "@app/zod/schema/auth"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import {
  isAuthenticated,
  verifyToken,
} from "../../../middlewares/auth-middleware"
import {
  hasActiveSubscription,
  hasWorkspace,
} from "../../../middlewares/subscription-middleware"
import type { HonoEnv } from "../../../types"
import { authController } from "./auth.module"

const app = new Hono<HonoEnv>()
  .post(
    "/register",
    zValidator("json", registerFormSchema),
    authController.register,
  )
  .post("/login", zValidator("json", loginFormSchema), authController.login)
  .get("/logout", authController.logout)
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
    verifyToken,
    authController.verifyEmail,
  )
  .post(
    "/restrict-user",
    zValidator("json", restrictUserSchema),
    isAuthenticated,
    hasWorkspace,
    hasActiveSubscription,
  )
  .post(
    "/unrestrict-user",
    zValidator("json", restrictUserSchema),
    isAuthenticated,
    hasWorkspace,
    hasActiveSubscription,
  )

export default app
