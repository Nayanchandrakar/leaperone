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

  const totalFileSize = file.reduce((acc, file) => acc + (file.size || 0), 0)
  const hasEnoughSpace = totalFileSize <= storage.quota

  if (!hasEnoughSpace) {
    const shortFall = totalFileSize - storage.quota
    const moreSpace = SystemFormatter.formatBytes(shortFall)
    throw ApiError.badRequest(`Insufficient storage. You need ${moreSpace} more space to upload`)
  }

  c.set("storage", storage)
  await next()
}
