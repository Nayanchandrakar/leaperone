import { HTTPSTATUS } from "../../../config/http.config"
import type {
  LoginController,
  RegisterController,
  UserNameController,
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
    const input = c.req.valid("param")
    const exists = await this.authService.findUserName(input.username)
    return c.json({ exists }, HTTPSTATUS.OK)
  }

  async register(c: RegisterController) {
    await this.authService.register(c)
    return c.json({ message: "Account created successfully" })
  }

  async login(c: LoginController) {
    return c.json({ message: "Hello world program" })
  }
}
