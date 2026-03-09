import { ApiError } from "@app/error"
import { and, asc, desc, eq, ilike, inArray, sql } from "drizzle-orm"
import { file, storage } from "../schema/index"
import type { DatabaseClient, GetFilesByUserIdAndWorkspaceId, InsertFile } from "../types"

export async function createFile(db: DatabaseClient, values: InsertFile) {
  try {
    await db.insert(file).values(values)
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function bootStrapFile(db: DatabaseClient, values: InsertFile[]) {
  try {
    await db.transaction(async (tx) => {
      await tx.insert(file).values(values)

      const storageUpdates = new Map<string, number>()

      for (const { storageId, size } of values) {
        storageUpdates.set(storageId, (storageUpdates.get(storageId) ?? 0) + size!)
      }

      for (const [storageId, totalSize] of storageUpdates) {
        await tx
          .update(storage)
          .set({ usage: sql`${storage.usage} + ${totalSize}` })
          .where(eq(storage.id, storageId))
      }
    })
  } catch (error) {
    console.error(error)
    throw new Error("Database Error Ocurred")
  }
}

export async function getFilesByUserIdAndWorkspaceId(
  db: DatabaseClient,
  {
    sortBy,
    types,
    offset,
    pageSize,
    uploadedBy,
    workspaceId,
    searchQuery,
  }: GetFilesByUserIdAndWorkspaceId,
) {
  try {
    const whereConditions = [eq(file.uploadedBy, uploadedBy), eq(file.workspaceId, workspaceId)]

    if (types.length) {
      whereConditions.push(inArray(file.mime, types))
    }

    if (searchQuery) {
      whereConditions.push(ilike(file.name, `%${searchQuery}%`))
    }

    const query = db
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

export async function deleteFilesByIds(
  db: DatabaseClient,
  userId: string,
  workspaceId: string,
  ids: string[],
) {
  try {
    const result = await db
      .delete(file)
      .where(
        and(eq(file.uploadedBy, userId), eq(file.workspaceId, workspaceId), inArray(file.id, ids)),
      )
      .returning({ key: file.key })
    return result
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
