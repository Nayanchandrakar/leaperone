import { ApiError } from "@app/error"
import { eq } from "drizzle-orm"
import { accounts } from "../schema"
import type { DatabaseClient } from "../types"

export async function updateAccountPassword(
  db: DatabaseClient,
  accountId: string,
  password: string,
) {
  try {
    const [result] = await db
      .update(accounts)
      .set({ password })
      .where(eq(accounts.id, accountId))
      .returning({ id: accounts.id })

    return result
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
