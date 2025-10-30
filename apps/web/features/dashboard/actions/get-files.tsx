"use server"

import { dbHttp } from "@app/database/index"
import { file, storage } from "@app/database/schema"
import { desc, eq } from "drizzle-orm"

async function block() {
  // const delay = Math.floor(Math.random() * 700) + 300
  const delay = 6000
  return new Promise((resolve) => setTimeout(resolve, delay))
}

export const getFiles = async (workspaceId: string, page: number, pageSize: number) => {
  await block()
  const offset = (page - 1) * pageSize

  console.log({ pageSize, offset })

  const [data] = await dbHttp
    .select()
    .from(storage)
    .where(eq(storage.workspaceId, workspaceId))
    .limit(1)

  const results = await dbHttp
    .select()
    .from(file)
    .where(eq(file.storageId, data!.id))
    .orderBy(desc(file.createdAt))
    .limit(pageSize)
    .offset(offset)

  return {
    results,
    nextPage: results.length === pageSize ? page + 1 : undefined,
  }
}
