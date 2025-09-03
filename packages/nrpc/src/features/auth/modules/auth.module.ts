import { UserRepository } from "@app/database/repository/user"
import { CookieManager } from "../utils/cookie"
import { SessionManager } from "../utils/session"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"

const userRepository = UserRepository.init()
const cookieManager = CookieManager.init()
const sessionManager = SessionManager.init()
const authService = AuthService.init(
  userRepository,
  sessionManager,
  cookieManager,
)
const authController = AuthController.init(authService)

export { authService, authController }
