import { basename, extname } from "node:path"
import { sanitizeString } from "@app/core/utils"
import { db } from "@app/database"
import { deleteFilesByStorageIdAndIds, getFilesByStorageId } from "@app/database/repository/file"
import { getStorageIdByWorkspaceId } from "@app/database/repository/storage"
import type { Storage, Workspace } from "@app/database/types"
import { ApiError } from "@app/error/index"
import type { DeleteFilesSchema, GetFileSchema, PreSignedUrlSchema } from "@app/zod/types"
import { v4 as uuidv4 } from "uuid"
import { MSG } from "@/constants/message"
import type { StorageService } from "@/features/shared/services/storage.service"

export class AssetService {
  constructor(private readonly storageService: StorageService) {}

  async deleteFiles(workspace: Workspace, ids: DeleteFilesSchema) {
    const storage = await getStorageIdByWorkspaceId(db, workspace.id)
    if (!storage) throw ApiError.notFound(MSG.STORAGE.NOT_FOUND)

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

  async getFiles(workspace: Workspace, { page, pageSize, sortBy, types, query }: GetFileSchema) {
    const storage = await getStorageIdByWorkspaceId(db, workspace.id)

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

  async generateSignedUrls(storage: Storage, params: PreSignedUrlSchema) {
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
