import { HeadObjectCommand } from "@aws-sdk/client-s3"
import type { App } from "aws-cdk-lib"
import { envConfig } from "@/config/env"
import { s3Client } from "@/config/s3"
import type { Stage, StagingEnv } from "@/types"

export function getStagingEnv(app: App): StagingEnv {
  const stage: Stage =
    app.node.tryGetContext("stage") ?? process?.env?.STAGE ?? "dev"
  const env = envConfig[stage]

  if (!env) {
    throw new Error(`No env configuration found for stage ${stage}`)
  }

  return { stage, env }
}

export async function getObjectMetadata(bucketName: string, objectKey: string) {
  const command = new HeadObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  })

  return await s3Client.send(command)
}
