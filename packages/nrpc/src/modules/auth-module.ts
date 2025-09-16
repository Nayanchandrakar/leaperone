import { AuthController } from "../controllers/auth-controller"
import { AuthService } from "../services/auth-service"
import { Cookie } from "../utils/cookie"
import { Session } from "../utils/session"

const cookie = Cookie.init()
const session = Session.init(cookie)
const authService = AuthService.init(session, cookie)
const authController = AuthController.init(authService)

export { authService, authController, session }
