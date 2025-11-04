import { ApiError } from "@app/error"
import { and, asc, desc, eq, ilike, inArray, sql } from "drizzle-orm"
import { dbHttp, dbWs } from "../index"
import { file, storage } from "../schema/index"
import type { GetFilesByStorageId, InsertFile } from "../types"

export async function createFile(params: InsertFile) {
  try {
    await dbHttp.insert(file).values(params)
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function bootStrapFile(params: InsertFile[]) {
  try {
    await dbWs.transaction(async (tx) => {
      // create a new file entry
      await tx.insert(file).values(params)

      // update the storage usage
      for (const { storageId, size } of params) {
        await tx
          .update(storage)
          .set({ usage: sql`${storage.usage} + ${size}` })
          .where(eq(storage.id, storageId))
      }
    })
  } catch (error) {
    console.error(error)
    throw new Error("Database Error Ocurred")
  }
}

export async function getFilesByStorageId({
  sortBy,
  types,
  offset,
  pageSize,
  storageId,
  searchQuery,
}: GetFilesByStorageId) {
  try {
    const whereConditions = [eq(file.storageId, storageId)]

    if (types.length) {
      whereConditions.push(inArray(file.mime, types))
    }

    if (searchQuery) {
      whereConditions.push(ilike(file.name, `%${searchQuery}%`))
    }

    const query = dbHttp
      .select({
        id: file.id,
        ext: file.ext,
        key: file.key,
        name: file.name,
        mime: file.mime,
        size: file.size,
        createdAt: file.createdAt,
        updatedAt: file.updatedAt,
      })
      .from(file)
      .where(and(...whereConditions))
      .limit(pageSize)
      .offset(offset)

    const dynamicQuery = query.$dynamic()

    switch (sortBy) {
      case "a-to-z":
        dynamicQuery.orderBy(asc(file.name))
        break
      case "z-to-a":
        dynamicQuery.orderBy(desc(file.name))
        break
      case "newest":
        dynamicQuery.orderBy(desc(file.createdAt))
        break
      case "oldest":
        dynamicQuery.orderBy(asc(file.createdAt))
        break
      default:
        dynamicQuery.orderBy(desc(file.createdAt))
        break
    }

    return await dynamicQuery
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function deleteFilesByStorageIdAndIds(storageId: string, ids: string[]) {
  try {
    const result = await dbHttp
      .delete(file)
      .where(and(eq(file.storageId, storageId), inArray(file.id, ids)))
      .returning({ key: file.key })
    return result
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
