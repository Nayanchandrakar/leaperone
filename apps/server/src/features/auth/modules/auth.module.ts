import { AuthController } from "@/features/auth/controllers/auth.controller"
import { SessionRepository } from "@/features/auth/repositories/sesion.repository"
import { AuthService } from "@/features/auth/services/auth.service"
import { SessionService } from "@/features/auth/services/session.service"

const sessionRepository = new SessionRepository()
const sessionService = new SessionService(sessionRepository)
const authService = new AuthService(sessionService)
const authController = new AuthController(authService)

export { sessionRepository, sessionService, authService, authController }
