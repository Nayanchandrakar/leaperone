import { extname } from "node:path"
import { HeadObjectCommand } from "@aws-sdk/client-s3"
import type { App } from "aws-cdk-lib"
import { envConfig } from "@/config/env"
import { s3Client } from "@/config/s3"
import type { Stage, StagingEnv } from "@/types"

export function getStagingEnv(app: App): StagingEnv {
  const stage: Stage = app.node.tryGetContext("stage") ?? process?.env?.STAGE ?? "dev"
  const env = envConfig[stage]

  if (!env) {
    throw new Error(`No env configuration found for stage ${stage}`)
  }

  return { stage, env }
}

export async function getEventData(bucket: string, key: string, size: number) {
  const command = new HeadObjectCommand({ Bucket: bucket, Key: key })
  const { ContentType, Metadata } = await s3Client.send(command)

  // Not a user uploaded file
  if (!Metadata?.storageid) return null

  const mime = ContentType ?? "application/octet-stream"
  const ext = extname(key)

  return {
    size,
    mime,
    key,
    ext,
    bucket,
    name: Metadata?.name!,
    storageId: Metadata.storageid,
  }
}
