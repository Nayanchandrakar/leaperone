import type {
  GetSessionController,
  LoginController,
  LogoutController,
  RegisterController,
  UserNameController,
  VerifyEmailController,
} from "../types"
import type { AuthService } from "./auth.service"

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

  async userName(c: UserNameController) {
    const exists = await this.authService.findUserName(c)
    return c.json({ exists })
  }

  async register(c: RegisterController) {
    await this.authService.register(c)
    return c.json({ message: "Account created Successfully" })
  }

  async login(c: LoginController) {
    const session = await this.authService.login(c)
    return c.json({
      message: "Login Successfully",
      data: { user: session.user },
    })
  }

  async getSession(c: GetSessionController) {
    const session = await this.authService.getSession(c)
    return c.json(session)
  }

  async logout(c: LogoutController) {
    await this.authService.logout(c)
    return c.json({ message: "Logout successfully" })
  }

  async verifyEmail(c: VerifyEmailController) {
    return await this.authService.verifyEmail(c)
  }
}
