import { basename, extname } from "node:path"
import { db } from "@app/database"
import { deleteFilesByIds, getFilesByUserIdAndWorkspaceId } from "@app/database/repository/file"
import type { PreSignedUrlSchema } from "@app/zod/types"
import { v4 as uuidv4 } from "uuid"
import type { StorageService } from "@/features/shared/services/storage.service"
import type { DeleteFilesContext, GetFileContext, PreSignedUrlContext } from "@/types/asset.types"
import { sanitizeString } from "@/utils/string"

export class AssetService {
  constructor(private readonly storageService: StorageService) {}

  async deleteFiles(c: DeleteFilesContext) {
    const ids = c.req.valid("json")
    const { user } = c.get("session")
    const workspace = c.get("workspace")

    let count = 0

    // delete files from database
    const deletedKeys = await deleteFilesByIds(db, user.id, workspace.id, ids)

    // delete objects from S3
    const results = await Promise.allSettled(
      deletedKeys.map(({ key }) => this.storageService.deleteObject(key)),
    )

    for (const result of results) {
      if (result.status === "fulfilled") {
        count++
      }
    }

    return { count }
  }

  async getFiles(c: GetFileContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const { page, pageSize, sortBy, types, query } = c.req.valid("json")

    const offset = (page - 1) * pageSize

    const results = await getFilesByUserIdAndWorkspaceId(db, {
      offset,
      sortBy,
      types,
      pageSize,
      searchQuery: query,
      uploadedBy: user.id,
      workspaceId: workspace.id,
    })

    const nextPage = results.length === pageSize ? page + 1 : undefined
    return { results, nextPage }
  }

  async generateSignedUrls(c: PreSignedUrlContext) {
    const storage = c.get("storage")
    const { user } = c.get("session")
    const params = c.req.valid("json")

    const response = []
    const results = await Promise.allSettled(
      this.createBatchPreSignedUrls(storage.id, storage.workspaceId, user.id, params),
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
    uploadedBy: string,
    params: PreSignedUrlSchema,
  ) {
    return params.map(async ({ name, type, id }) => ({
      id,
      url: await this.storageService.generatePreSignedUrl({
        contentType: type,
        metadata: {
          "file-name": name,
          "file-type": type,
          "storage-id": storageId,
          "uploaded-by": uploadedBy,
          "workspace-id": workspaceId,
        },
        storageKey: this.createStorageKey(name, workspaceId),
      }),
    }))
  }
}
