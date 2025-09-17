import { ApiError } from "@app/error/index"
import { dbHttp } from "../index"
import { file } from "../schema/index"
import type { InsertFile } from "../types"

export async function createFile(params: InsertFile) {
  try {
    await dbHttp.insert(file).values(params)
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
