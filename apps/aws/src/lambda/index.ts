import { dbHttp } from "@app/database"
import { users } from "@app/database/schema/users"

export const handler = async () => {
  const team = await dbHttp.select().from(users)
  return { message: "Sample app using tsdown", team }
}

handler()
