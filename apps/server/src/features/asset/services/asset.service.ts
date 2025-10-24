import { basename, extname } from "node:path"
import { sanitizeString } from "@app/core/utils"
import type { Storage } from "@app/database/types"
import type { PreSignedUrlSchema } from "@app/zod/types"
import { v4 as uuidv4 } from "uuid"
import type { StorageService } from "@/features/shared/services/storage.service"

export class AssetService {
  constructor(private readonly storageService: StorageService) {}

  async generateSignedUrl(storage: Storage, params: PreSignedUrlSchema) {
    const storageKey = this.createStorageKey(params.name, storage.workspaceId)
    return await this.storageService.generatePreSignedUrl({
      storageKey,
      contentType: params.type,
      metadata: { storageid: storage.id },
    })
  }

  private createStorageKey(name: string, workspaceId: string) {
    const ext = extname(name)
    const baseName = basename(name, ext)
    const cleanName = sanitizeString(baseName).substring(0, 64)
    return `asset-manager/${workspaceId}/${uuidv4()}-${cleanName}${ext}`
  }
}
