import path from "node:path"
import { createFile } from "@app/database/repository/file"
import { ENV } from "@app/env/server"
import { v4 as uuidv4 } from "uuid"
import { isProduction } from "../../../config/env"
import { sanitize } from "../../../utils/sanitize"
import type { PreSignedUrlController } from "../types/asset"
import { createPreSignedUrl } from "../utils/create-pre-signed-url"

export class AssetService {
  private static instance: AssetService | null = null
  private constructor() {}

  static init() {
    if (!AssetService.instance) {
      AssetService.instance = new AssetService()
    }
    return AssetService.instance
  }

  async preSignedUrl(c: PreSignedUrlController) {
    const storage = c.get("storage")
    const { name, type } = c.req.valid("json")
    const workspace = c.get("workspace")

    const ext = path.extname(name)
    const baseName = path.basename(name, ext)
    const cleanName = sanitize(baseName).substring(0, 64)

    const key = `asset-manager/${workspace.id}/${uuidv4()}-${cleanName}${ext}`
    const url = await createPreSignedUrl({
      key,
      contentType: type,
      bucket: ENV.S3_UPLOAD_BUCKET,
      metadata: { storageId: storage.id },
    })

    // Only for local development and testing
    if (!isProduction) {
      await createFile({
        ext,
        key,
        name,
        mime: type,
        storageId: storage.id,
      })
    }

    return c.json({ url })
  }
}
