import { ApiError } from "@app/error/index"
import { dbHttp } from "../index"
import { support } from "../schema/support"
import type { InsertSupport } from "../types"

export async function createSupport(values: InsertSupport) {
  try {
    await dbHttp.insert(support).values(values)
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
