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
    return await this.authService.findUserName(c)
  }

  async register(c: RegisterController) {
    return await this.authService.register(c)
  }

  async login(c: LoginController) {
    return await this.authService.login(c)
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
