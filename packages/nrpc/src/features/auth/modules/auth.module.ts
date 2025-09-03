import { UserRepository } from "@app/database/repository/user"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"

const userRepository = UserRepository.init()
const authService = AuthService.init(userRepository)
const authController = AuthController.init(authService)

export { authService, authController }
