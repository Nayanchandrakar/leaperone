import type { App } from "aws-cdk-lib"
import { envConfig } from "@/config/env"
import type { Stage } from "@/types"

const fallbackStage = process?.env?.STAGE ?? "dev"

export function getStagingEnv(app: App) {
  const stage: Stage = app.node.tryGetContext("stage") ?? fallbackStage
  const env = envConfig[stage]

  if (!env) {
    throw new Error(`No env configuration found for stage ${stage}`)
  }

  return { stage, env }
}
