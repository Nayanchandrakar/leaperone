import { ApiError } from "@app/error"
import { eq, sql } from "drizzle-orm"
import { dbHttp, dbWs } from "../index"
import { file, storage } from "../schema/index"
import type { InsertFile } from "../types"

export async function createFile(params: InsertFile) {
  try {
    await dbHttp.insert(file).values(params)
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function bootStrapFile(params: InsertFile) {
  try {
    await dbWs.transaction(async (tx) => {
      await tx.insert(file).values(params)
      await tx
        .update(storage)
        .set({ usage: sql`${storage.usage} + ${params.size}` })
        .where(eq(storage.id, params.storageId))
    })
  } catch (error) {
    console.error(error)
    throw new Error("Database Error Ocurred")
  }
}
