import { UserRepository } from "@app/database/repository/user"
import { Cookie } from "../utils/cookie"
import { Session } from "../utils/session"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"

const userRepository = UserRepository.init()
const cookie = Cookie.init()
const session = Session.init(cookie)
const authService = AuthService.init(userRepository, session, cookie)
const authController = AuthController.init(authService)

export { authService, authController }
