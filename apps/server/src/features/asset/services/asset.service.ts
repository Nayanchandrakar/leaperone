import { basename, extname } from "node:path"
import { sanitizeString } from "@app/core/utils"
import type { Storage } from "@app/database/types"
import type { PreSignedUrlSchema } from "@app/zod/types"
import { v4 as uuidv4 } from "uuid"
import type { StorageService } from "@/features/shared/services/storage.service"

export class AssetService {
  constructor(private readonly storageService: StorageService) {}

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
    return params.map(async ({ name, fileId, type }) => ({
      fileId,
      url: await this.storageService.generatePreSignedUrl({
        contentType: type,
        metadata: { storageid: storageId, name },
        storageKey: this.createStorageKey(name, workspaceId),
      }),
    }))
  }
}
