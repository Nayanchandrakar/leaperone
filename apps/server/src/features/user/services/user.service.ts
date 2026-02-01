import { db } from "@app/database"
import { doesUserExistByUsername, updateUserById } from "@app/database/repository/user"
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
    const body = c.req.valid("json")

    const promises: Promise<unknown>[] = []

    if (body?.username !== user.username) {
      const existingUser = await doesUserExistByUsername(db, body.username)

      if (existingUser) {
        throw ApiError.conflict(MSG.USER.USERNAME_EXISTS)
      }

      const pipeline = redis.pipeline()
      pipeline.hset("username_records", { [body.username]: 1 })
      pipeline.hdel("username_records", user.username)
      promises.push(pipeline.exec())
    }

    const updatedUser = await updateUserById(db, user.id, body)

    if (!updatedUser) {
      throw ApiError.badRequest(MSG.USER.FAILED_TO_UPDATE)
    }

    promises.push(this.sessionService.refresh({ id: updatedUser.id, ...body }))
    await Promise.all(promises)

    return c.json({ message: MSG.GENERAL.SUCCESS })
  }
}
