import { userNameSchema } from "@myleaper/zod/common/index"
import { redis } from "../../../lib/redis"
import { baseProcedure } from "../../../utils/init"

export const username = baseProcedure
  .input(userNameSchema)
  .query(async ({ input }) => {
    const { username } = input

    const exists = await redis.hexists("username_records", username)
    return { query: username, exists: Boolean(exists) }
  })
