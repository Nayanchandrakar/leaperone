import { STORAGE_QUOTA } from "@app/core/constants"
import { db } from "@app/database"
import { getStorageByWorkspaceIdAndUserId } from "@app/database/repository/storage"
import { ApiError } from "@app/error"
import type { Next } from "hono"
import type { PreSignedUrlContext } from "@/types/asset.types"
import { SystemFormatter } from "@/utils/format.utils"

export const checkStorageQuota = async (c: PreSignedUrlContext, next: Next) => {
  const { user } = c.get("session")
  const file = c.req.valid("json")
  const workspace = c.get("workspace")

  const storage = await getStorageByWorkspaceIdAndUserId(db, workspace.id, user.id)
  if (!storage) throw ApiError.notFound()

  const totalFileSize = file.reduce((acc, { size }) => acc + size, 0)
  const hasEnoughSpace = totalFileSize <= STORAGE_QUOTA

  if (!hasEnoughSpace) {
    const shortFall = totalFileSize - STORAGE_QUOTA
    const moreSpace = SystemFormatter.formatBytes(shortFall)
    throw ApiError.badRequest(`Insufficient storage. You need ${moreSpace} more space to upload`)
  }

  c.set("storage", storage)
  return await next()
}
