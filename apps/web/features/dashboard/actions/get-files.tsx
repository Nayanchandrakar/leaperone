"use server"

import { dbHttp } from "@app/database/index"
import { file, storage } from "@app/database/schema"
import { and, asc, desc, eq, ilike, inArray } from "drizzle-orm"
import type { SortBy } from "../types"

// async function block() {
// const delay = Math.floor(Math.random() * 700) + 300
//   const delay = 6000
//   return new Promise((resolve) => setTimeout(resolve, delay))
// }

export const getFiles = async (
  workspaceId: string,
  page: number,
  pageSize: number,
  types: string[],
  sortBy: SortBy,
  searchQuery?: string,
) => {
  // await block()
  const offset = (page - 1) * pageSize

  const [data] = await dbHttp
    .select()
    .from(storage)
    .where(eq(storage.workspaceId, workspaceId))
    .limit(1)

  const whereConditions = [eq(file.storageId, data!.id)]

  if (types.length) {
    whereConditions.push(inArray(file.mime, types))
  }

  if (searchQuery?.trim()) {
    whereConditions.push(ilike(file.name, `%${searchQuery}%`))
  }

  const query = dbHttp
    .select()
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

  const results = await dynamicQuery

  return {
    results,
    nextPage: results.length === pageSize ? page + 1 : undefined,
  }
}
