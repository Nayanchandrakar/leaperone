import { SIGNED_URL_EXPIRY } from "@app/core/constants"
import { ApiError } from "@app/error"
import { logger } from "@app/logger"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { s3Client } from "../../../config/s3"
import type { CreatePreSignedUrl } from "../types/asset"

export async function createPreSignedUrl({
  bucket,
  key,
  metadata,
  contentType,
  expiresIn = SIGNED_URL_EXPIRY,
}: CreatePreSignedUrl) {
  try {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
      ...(metadata && { Metadata: metadata }),
    })

    return await getSignedUrl(s3Client, command, { expiresIn })
  } catch (error) {
    logger.error(error)
    throw ApiError.badRequest("AWS S3 presigned URL generation failed")
  }
}
