import { getStorageByWorkspaceId } from "@app/database/repository/storage"
import { ApiError } from "@app/error"
import type { Next } from "hono"
import { createMiddleware } from "hono/factory"
import { MSG } from "../constants/message"
import type { PreSignedUrlController } from "../features/asset/types/asset"
import { formatBytes } from "../utils/format"

export const checkStorageAvailability = createMiddleware(
  async (c: PreSignedUrlController, next: Next) => {
    const file = c.req.valid("json")
    const workspace = c.get("workspace")

    const storage = await getStorageByWorkspaceId(workspace.id)
    if (!storage) {
      throw ApiError.notFound(MSG.STORAGE.NOT_FOUND)
    }

    const totalFileSize = storage.usage + file.size
    const hasSpace = totalFileSize <= storage.quota

    if (!hasSpace) {
      const shortFall = totalFileSize - storage.quota
      throw ApiError.badRequest(`Insufficient storage. ${formatBytes(shortFall)} needed`)
    }

    c.set("storage", storage)
    await next()
  },
)
