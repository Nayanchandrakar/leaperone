import { basename, extname } from "node:path"
import { sanitizeString } from "@app/core/utils"
import { getFilesByStorageId, getStorageIdByWorkspaceId } from "@app/database/repository/storage"
import type { Storage, Workspace } from "@app/database/types"
import { ApiError } from "@app/error/index"
import type { GetFileSchema, PreSignedUrlSchema } from "@app/zod/types"
import { v4 as uuidv4 } from "uuid"
import { MSG } from "@/constants/message"
import type { StorageService } from "@/features/shared/services/storage.service"

export class AssetService {
  constructor(private readonly storageService: StorageService) {}

  async getFiles(workspace: Workspace, { page, pageSize, sortBy, types, query }: GetFileSchema) {
    const offset = (page - 1) * pageSize

    const storage = await getStorageIdByWorkspaceId(workspace.id)

    if (!storage) throw ApiError.notFound(MSG.STORAGE.NOT_FOUND)

    const results = await getFilesByStorageId({
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
        metadata: { storageid: storageId, name },
        storageKey: this.createStorageKey(name, workspaceId),
      }),
    }))
  }
}
