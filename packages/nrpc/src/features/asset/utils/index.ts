import { SIGNED_URL_EXPIRY } from "@app/core/constants"
import { ENV } from "@app/env/server"
import { ApiError } from "@app/error/index"
import { logger } from "@app/logger/index"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { s3Client } from "../../../config/s3"
import type { GeneratePreSignedUrl } from "../types/asset"

export async function generatePreSignedUrl({
  storageKey,
  contentType,
  metadata,
}: GeneratePreSignedUrl) {
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
  } catch (error) {
    logger.error(error)
    throw ApiError.badRequest("AWS S3 presigned URL generation failed")
  }
}
