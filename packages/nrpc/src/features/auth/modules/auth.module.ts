import { Cookie } from "../utils/cookie"
import { Session } from "../utils/session"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"

const cookie = Cookie.init()
const session = Session.init(cookie)
const authService = AuthService.init(session, cookie)
const authController = AuthController.init(authService)

export { authService, authController, session }
