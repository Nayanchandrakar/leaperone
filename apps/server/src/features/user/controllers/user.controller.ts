import { updateProfileSchema } from "@app/zod/schema/user"
import { HttpController } from "@/features/shared/controllers/http.controller"
import type { UserService } from "@/features/user/services/user.service"
import { isAuth } from "@/middlewares/auth.middleware"
import { zodValidator } from "@/middlewares/validation.middleware"
import type { UpdateUserContext } from "@/types/user.types"

export class UserController extends HttpController {
  constructor(private readonly userService: UserService) {
    super("/user")
    this.initializeRoutes()
  }

  protected override initializeRoutes() {
    this.router.patch(
      "/update-profile",
      isAuth,
      zodValidator("json", updateProfileSchema),
      this.updateProfile,
    )
  }

  updateProfile = async (c: UpdateUserContext) => {
    return await this.userService.updateProfile(c)
  }
}
