import { db } from "@app/database"
import { doesUserExistByUsername, updateUserById } from "@app/database/repository/user"
import type { User } from "@app/database/types"
import { ApiError } from "@app/error"
import type { SessionService } from "@app/session"
import type { Context } from "hono"
import { redis } from "@/config/redis"
import { MSG } from "@/constants/message"
import type { UpdateUserContext } from "@/types/user.types"

export class UserService {
  constructor(private readonly sessionService: SessionService<Context>) {}
  async updateProfile(c: UpdateUserContext) {
    const { user } = c.get("session")
    const { name, username, image } = c.req.valid("json")

    const promises: Promise<unknown>[] = []

    if (username !== undefined && username !== user.username) {
      const existingUser = await doesUserExistByUsername(db, username)

      if (existingUser) {
        throw ApiError.conflict(MSG.USER.USERNAME_EXISTS)
      }

      const pipeline = redis.pipeline()
      pipeline.hset("username_records", { [username]: 1 })
      pipeline.hdel("username_records", user.username)
      promises.push(pipeline.exec())
    }

    const updates: Partial<User> = {
      ...(name !== undefined && { name }),
      ...(image !== undefined && { image }),
      ...(username !== undefined && { username }),
    }

    const updatedUser = await updateUserById(db, user.id, updates)

    if (!updatedUser) {
      throw ApiError.badRequest(MSG.USER.FAILED_TO_UPDATE)
    }

    promises.push(
      this.sessionService.refresh({
        id: updatedUser.id,
        updatedAt: new Date(),
        ...updates,
      }),
    )
    await Promise.all(promises)

    return c.json({ message: MSG.GENERAL.SUCCESS })
  }
}
