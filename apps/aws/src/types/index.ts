import type { InsertFile } from "@app/database/types"
import type { HeadObjectCommandOutput } from "@aws-sdk/client-s3"

export type Stage = "dev" | "prod" | "staging"
export type Environments = Record<Stage, EnvConfig>
export type ObjectMetadataReturnType = HeadObjectCommandOutput & {
  Metadata: Pick<InsertFile, "ext" | "name" | "storageId" | "mime">
}

export type EnvConfig = {
  account: string
  region: string
}

export type StagingEnv = {
  stage: Stage
  env: EnvConfig
}
