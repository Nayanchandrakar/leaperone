import { AuthController } from "@/features/auth/controllers/auth.controller"
import { AuthService } from "@/features/auth/services/auth.service"
import { sessionService } from "./session.module"

const authService = new AuthService(sessionService)
const authController = new AuthController(authService)

export { authService, authController }
