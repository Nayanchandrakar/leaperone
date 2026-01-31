import { basename, extname } from "node:path"
import { db } from "@app/database"
import { deleteFilesByStorageIdAndIds, getFilesByStorageId } from "@app/database/repository/file"
import { getStorageByWorkspaceIdAndUserId } from "@app/database/repository/storage"
import { ApiError } from "@app/error/index"
import type { PreSignedUrlSchema } from "@app/zod/types"
import { v4 as uuidv4 } from "uuid"
import { MSG } from "@/constants/message"
import type { StorageService } from "@/features/shared/services/storage.service"
import type { DeleteFilesContext, GetFileContext, PreSignedUrlContext } from "@/types/asset.types"
import { sanitizeString } from "@/utils/string"

export class AssetService {
  constructor(private readonly storageService: StorageService) {}

  async deleteFiles(c: DeleteFilesContext) {
    const ids = c.req.valid("json")
    const session = c.get("session")
    const workspace = c.get("workspace")

    const storage = await getStorageByWorkspaceIdAndUserId(db, workspace.id, session.user.id)

    if (!storage) {
      throw ApiError.notFound(MSG.STORAGE.NOT_FOUND)
    }

    let count = 0
    const results = await Promise.allSettled(
      (await deleteFilesByStorageIdAndIds(db, storage.id, ids)).map(({ key }) =>
        this.storageService.deleteObject(key),
      ),
    )

    for (const result of results) {
      if (result.status === "fulfilled") {
        count++
      }
    }

    return { count }
  }

  async getFiles(c: GetFileContext) {
    const session = c.get("session")
    const workspace = c.get("workspace")
    const { page, pageSize, sortBy, types, query } = c.req.valid("json")

    const storage = await getStorageByWorkspaceIdAndUserId(db, workspace.id, session.user.id)

    if (!storage) {
      throw ApiError.notFound(MSG.STORAGE.NOT_FOUND)
    }

    const offset = (page - 1) * pageSize

    const results = await getFilesByStorageId(db, {
      offset,
      sortBy,
      types,
      pageSize,
      searchQuery: query,
      storageId: storage.id,
    })

    const nextPage = results.length === pageSize ? page + 1 : undefined
    return { results, nextPage }
  }

  async generateSignedUrls(c: PreSignedUrlContext) {
    const storage = c.get("storage")
    const params = c.req.valid("json")

    const response = []
    const results = await Promise.allSettled(
      this.createBatchPreSignedUrls(storage.id, storage.workspaceId, params),
    )

    for (const result of results) {
      if (result.status === "fulfilled") {
        response.push(result.value)
      }
    }

    return response
  }

  private createStorageKey(name: string, workspaceId: string) {
    const ext = extname(name)
    const baseName = basename(name, ext)
    const cleanName = sanitizeString(baseName).substring(0, 64)
    return `asset-manager/${workspaceId}/${uuidv4()}-${cleanName}${ext}`
  }

  private createBatchPreSignedUrls(
    storageId: string,
    workspaceId: string,
    params: PreSignedUrlSchema,
  ) {
    return params.map(async ({ name, type, id }) => ({
      id,
      url: await this.storageService.generatePreSignedUrl({
        contentType: type,
        metadata: { storageid: storageId, name, type },
        storageKey: this.createStorageKey(name, workspaceId),
      }),
    }))
  }
}
