import { basename, extname } from "node:path"
import { sanitizeString } from "@app/core/utils"
import { v4 as uuidv4 } from "uuid"
import type { PreSignedUrlController } from "../types/asset"
import { generatePreSignedUrl } from "../utils"

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

    const ext = extname(name)
    const baseName = basename(name, ext)
    const cleanName = sanitizeString(baseName).substring(0, 64)
    const storageKey = `asset-manager/${storage.workspaceId}/${uuidv4()}-${cleanName}${ext}`

    const url = await generatePreSignedUrl({
      storageKey,
      contentType: type,
      metadata: {
        ext,
        name,
        mime: type,
        storageId: storage.id,
      },
    })

    return c.json({ url })
  }
}
