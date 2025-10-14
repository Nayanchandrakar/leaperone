import { dbHttp } from "@app/database"
import { users } from "@app/database/schema/users"
import type { S3Event } from "aws-lambda"

export const handler = async (event: S3Event) => {
  const team = await dbHttp.select().from(users)
  console.log(event)
  return { message: "Sample app using tsdown", team, event }
}
