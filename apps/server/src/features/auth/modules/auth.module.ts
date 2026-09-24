import { AuthController } from "@/features/auth/controllers/auth.controller"
import { sessionService } from "@/features/auth/modules/session.module"
import { AuthService } from "@/features/auth/services/auth.service"

const authService = new AuthService(sessionService)
const authController = new AuthController(authService)

export { authController, authService }
