import {
  DeleteObjectCommand,
  type PutObjectAclCommandInput,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { serverEnv } from "@leapercrm/env/server"

class S3Service {
  private static instance: S3Service
  private client: S3Client

  private constructor() {
    this.client = new S3Client({
      region: serverEnv.AWS_REGION,
      credentials: {
        accessKeyId: serverEnv.AWS_ACCESS_KEY_ID,
        secretAccessKey: serverEnv.AWS_SECRET_ACCESS_KEY,
      },
    })
  }

  static getInstance(): S3Service {
    if (!S3Service.instance) {
      S3Service.instance = new S3Service()
      return S3Service.instance
    }
    return S3Service.instance
  }

  getClient() {
    return this.client
  }

  async getSignedUrl(params: PutObjectAclCommandInput) {
    return await getSignedUrl(this.client, new PutObjectCommand(params), {
      expiresIn: 60 * 60,
    })
  }

  async deleteObjectCommand(key: string) {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: serverEnv.S3_UPLOAD_BUCKET,
        Key: key,
      }),
    )
  }
}

export const s3Service = S3Service.getInstance()
