import type { AuthService } from "../services/auth-service"
import type {
  GetSessionController,
  LoginController,
  LogoutController,
  PasswordResetController,
  RegisterController,
  ResetPasswordController,
  RestrictUserController,
  UserNameController,
  VerifyEmailController,
} from "../types/auth"

export class AuthController {
  private static instance: AuthController | null = null
  private authService: AuthService

  constructor(authService: AuthService) {
    this.authService = authService
  }

  public static init(authService: AuthService) {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController(authService)
    }
    return AuthController.instance
  }

  userName = async (c: UserNameController) => {
    return await this.authService.findUserName(c)
  }

  register = async (c: RegisterController) => {
    return await this.authService.register(c)
  }

  login = async (c: LoginController) => {
    return await this.authService.login(c)
  }

  getSession = async (c: GetSessionController) => {
    const session = await this.authService.getSession(c)
    return c.json(session)
  }

  logout = async (c: LogoutController) => {
    await this.authService.logout(c)
    return c.json({ message: "Logout successfully" })
  }

  verifyEmail = async (c: VerifyEmailController) => {
    return await this.authService.verifyEmail(c)
  }

  requestPasswordReset = async (c: PasswordResetController) => {
    return await this.authService.requestPasswordReset(c)
  }

  resetPassword = async (c: ResetPasswordController) => {
    return await this.authService.resetPassword(c)
  }

  restrictUser = async (c: RestrictUserController) => {
    return await this.authService.restrictUser(c)
  }

  unRestrictUser = async (c: RestrictUserController) => {
    return await this.authService.unRestrictUser(c)
  }
}
