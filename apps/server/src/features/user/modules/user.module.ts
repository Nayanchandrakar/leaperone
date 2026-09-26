import { sessionService } from "@/features/auth/modules/session.module"
import { UserController } from "@/features/user/controllers/user.controller"
import { UserService } from "@/features/user/services/user.service"

const userService = new UserService(sessionService)
const userController = new UserController(userService)

export { userController, userService }
