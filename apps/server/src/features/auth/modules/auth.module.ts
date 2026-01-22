import { AuthController } from "@/features/auth/controllers/auth.controller"
import { AuthService } from "@/features/auth/services/auth.service"
import { storageAdapter } from "@/features/shared/adapters/redis.adapter"

const authService = new AuthService(storageAdapter)
const authController = new AuthController(authService)

export { authService, authController }
