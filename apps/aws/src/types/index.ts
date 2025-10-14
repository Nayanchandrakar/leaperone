export type Stage = "dev" | "prod" | "staging"

export type EnvConfig = {
  account: string
  region: string
}

export type Environments = Record<Stage, EnvConfig>

export type StagingEnv = {
  stage: Stage
  env: EnvConfig
}
