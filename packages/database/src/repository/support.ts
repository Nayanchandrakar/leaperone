import { ApiError } from "@app/error"
import { support } from "../schema/support"
import type { DatabaseClient, InsertSupport } from "../types"

export async function createSupport(db: DatabaseClient, values: InsertSupport) {
  try {
    await db.insert(support).values(values)
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
