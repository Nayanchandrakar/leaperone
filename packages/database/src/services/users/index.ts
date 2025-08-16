import { eq } from "drizzle-orm"
import { dbHttp } from "src"
import { users } from "../../schema/users"

export const isUserNameTaken = async (username: string) => {
  const [data] = await dbHttp
    .select({ id: users.id })
    .from(users)
    .where(eq(users.username, username))
    .limit(1)

  return Boolean(data?.id)
}
