"use server"

import { dbHttp } from "@app/database/index"
import { file, storage } from "@app/database/schema"
import { desc, eq } from "drizzle-orm"

// async function block() {
//   return new Promise((resolve) => setTimeout(() => resolve("something"), 6000))
// }

export const getFiles = async (workspaceId: string) => {
  // await block()
  const [data] = await dbHttp
    .select()
    .from(storage)
    .where(eq(storage.workspaceId, workspaceId))
    .limit(1)

  if (!data) return []

  const files = await dbHttp
    .select()
    .from(file)
    .where(eq(file.storageId, data.id))
    .orderBy(desc(file.createdAt))
  return files
}
