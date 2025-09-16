// import path from "node:path"
import { SIGNED_URL_EXPIRY } from "@app/constants/file"
import { ENV } from "@app/env/server"
import { ApiError } from "@app/error/index"
import { logger } from "@app/logger/index"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { s3 } from "src/lib/s3"
// import { v4 as uuidv4 } from "uuid"
import type { PreSignedUrlController } from "../types/asset"
// import { sanitizeFilename } from "../utils/sanitize"

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
    // const file = c.req.valid("json")
    // const workspace = c.get("workspace")

    // const ext = path.extname(file.name)
    // const baseName = path.basename(file.name, ext)
    // const cleanName = sanitizeFilename(baseName)

    // const key = `asset-manager/${workspace.id}/${uuidv4()}-${cleanName}${ext}`

    try {
      const command = new PutObjectCommand({
        Bucket: ENV.S3_UPLOAD_BUCKET,
        Key: "",
        ContentType: "",
      })

      return getSignedUrl(s3, command, {
        expiresIn: SIGNED_URL_EXPIRY,
      })
    } catch (error) {
      logger.error(error)
      throw ApiError.badRequest("Failed to generate pre-signed-url")
    }
  }
}
