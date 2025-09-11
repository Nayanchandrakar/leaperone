import { AuthRepository } from "@app/database/repository/auth"
import { Stripe } from "../../subscription/lib/stripe"
import { AuthMiddleware } from "../middlewares"
import { Cookie } from "../utils/cookie"
import { Session } from "../utils/session"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"

const cookie = Cookie.init()
const stripe = Stripe.init()
const session = Session.init(cookie)
const authRepository = AuthRepository.init()
const authMiddleware = AuthMiddleware.init()
const authService = AuthService.init(authRepository, session, cookie, stripe)
const authController = AuthController.init(authService)

export { authService, authController, authMiddleware }
