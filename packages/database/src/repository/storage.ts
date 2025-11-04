import { ApiError } from "@app/error"
import { and, asc, desc, eq, ilike, inArray } from "drizzle-orm"
import { dbHttp } from "../index"
import { file, storage } from "../schema"
import type { GetFilesByStorageId } from "../types"

export async function getStorageByWorkspaceId(workspaceId: string) {
  try {
    const [data] = await dbHttp
      .select()
      .from(storage)
      .where(eq(storage.workspaceId, workspaceId))
      .limit(1)

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function getStorageIdByWorkspaceId(workspaceId: string) {
  try {
    const [data] = await dbHttp
      .select()
      .from(storage)
      .where(eq(storage.workspaceId, workspaceId))
      .limit(1)

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
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
