import {
  emailSchema,
  loginFormSchema,
  registerFormSchema,
  resetPasswordSchema,
  restrictUserSchema,
  userNameSchema,
  verifyEmailSchema,
} from "@app/zod/schema/auth"
import type { AuthService } from "@/features/auth/services/auth.service"
import { HttpController } from "@/features/shared/controllers/http.controller"
import { isAuth, verifyToken } from "@/middlewares/auth.middleware"
import { hasActiveSubscription, hasWorkspace } from "@/middlewares/subscription.middleware"
import { zodValidator } from "@/middlewares/validation.middleware"
import type {
  GetSessionContext,
  LoginContext,
  LogoutContext,
  PasswordResetContext,
  RegisterContext,
  ResetPasswordContext,
  RestrictUserContext,
  UserNameContext,
  VerifyEmailContext,
} from "@/types/auth.types"

export class AuthController extends HttpController {
  constructor(private readonly authService: AuthService) {
    super("/auth")
  }

  protected override initializeRoutes() {
    this.router.post("/register", zodValidator("json", registerFormSchema), this.register)
    this.router.post("/login", zodValidator("json", loginFormSchema), this.login)
    this.router.get("/logout", this.logout)
    this.router.post(
      "/request-password-reset",
      zodValidator("json", emailSchema),
      this.requestPasswordReset,
    )
    this.router.post(
      "/reset-password",
      zodValidator("json", resetPasswordSchema),
      this.resetPassword,
    )
    this.router.get("/username", zodValidator("query", userNameSchema), this.userName)
    this.router.get("/get-session", this.getSession)
    this.router.get(
      "/verify-email",
      zodValidator("query", verifyEmailSchema),
      verifyToken,
      this.verifyEmail,
    )
    this.router.post(
      "/restrict-user",
      zodValidator("json", restrictUserSchema),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
    )
    this.router.post(
      "/unrestrict-user",
      zodValidator("json", restrictUserSchema),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
    )
  }

  userName = async (c: UserNameContext) => {
    return await this.authService.findUserName(c)
  }

  register = async (c: RegisterContext) => {
    return await this.authService.register(c)
  }

  login = async (c: LoginContext) => {
    return await this.authService.login(c)
  }

  getSession = async (c: GetSessionContext) => {
    const session = await this.authService.getSession(c)
    return c.json(session)
  }

  logout = async (c: LogoutContext) => {
    await this.authService.logout(c)
    return c.json({ message: "Logout successfully" })
  }

  verifyEmail = async (c: VerifyEmailContext) => {
    return await this.authService.verifyEmail(c)
  }

  requestPasswordReset = async (c: PasswordResetContext) => {
    return await this.authService.requestPasswordReset(c)
  }

  resetPassword = async (c: ResetPasswordContext) => {
    return await this.authService.resetPassword(c)
  }

  restrictUser = async (c: RestrictUserContext) => {
    return await this.authService.restrictUser(c)
  }

  unRestrictUser = async (c: RestrictUserContext) => {
    return await this.authService.unRestrictUser(c)
  }
}
