import { SIGNED_URL_EXPIRY } from "@app/core/constants"
import { ENV } from "@app/env/server"
import { ApiError } from "@app/error"
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { s3Client } from "@/config/s3"
import type { GeneratePreSignedUrl } from "@/types/asset.types"

export class StorageService {
  private static instance: StorageService
  private constructor() {}

  static init() {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService()
    }
    return StorageService.instance
  }

  async generatePreSignedUrl({ storageKey, contentType, metadata }: GeneratePreSignedUrl) {
    try {
      const command = new PutObjectCommand({
        Key: storageKey,
        Metadata: metadata,
        ContentType: contentType,
        Bucket: ENV.S3_UPLOAD_BUCKET,
      })

      return await getSignedUrl(s3Client, command, {
        expiresIn: SIGNED_URL_EXPIRY,
      })
    } catch {
      throw ApiError.badRequest("AWS S3 presigned URL generation failed")
    }
  }

  async deleteObject(key: string) {
    try {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: ENV.S3_UPLOAD_BUCKET,
          Key: key,
        }),
      )
    } catch {
      throw ApiError.badRequest("AWS S3 object deletion failed")
    }
  }
}
