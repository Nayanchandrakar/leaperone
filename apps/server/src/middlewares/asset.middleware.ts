import { getStorageByWorkspaceId } from "@app/database/repository/storage"
import { ApiError } from "@app/error"
import type { Next } from "hono"
import type { PreSignedUrlContext } from "@/types/asset.types"
import { SystemFormatter } from "@/utils/format.utils"

export const checkStorageQuota = async (c: PreSignedUrlContext, next: Next) => {
  const file = c.req.valid("json")
  const workspace = c.get("workspace")

  const storage = await getStorageByWorkspaceId(workspace.id)
  if (!storage) throw ApiError.notFound()

  const totalFileSize = storage.usage + file.size
  const hasSpace = totalFileSize <= storage.quota

  if (!hasSpace) {
    const shortFall = totalFileSize - storage.quota
    const moreSpace = SystemFormatter.formatBytes(shortFall)
    throw ApiError.badRequest(`Insufficient storage. ${moreSpace} needed`)
  }

  c.set("storage", storage)
  await next()
}
