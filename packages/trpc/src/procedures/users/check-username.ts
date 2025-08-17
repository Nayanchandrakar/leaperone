import { USERNAME_HASH } from "@myleaper/constants/server"
import { redis } from "@myleaper/redis"
import { userNameSchema } from "@myleaper/zod/common/index"
import { baseProcedure } from "../../utils/init"

export const checkUserName = baseProcedure
  .input(userNameSchema)
  .mutation(async ({ input }) => {
    const { username } = input
    // TODO: add ratelimiting here
    const exists = await redis.hexists(USERNAME_HASH, username)
    return { query: username, exists: Boolean(exists) }
  })
