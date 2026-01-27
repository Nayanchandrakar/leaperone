import type { NeonQueryFunction } from "@neondatabase/serverless"

export type Database = NeonQueryFunction<false, false>

export type Bindings = {
  DATABASE_URL: string
  FRONTEND_URL: string
  UPSTASH_REDIS_REST_URL: string
  UPSTASH_REDIS_REST_TOKEN: string
}

export type ParsedUA = {
  device: string
  deviceVendor: string
  deviceModel: string

  browser: string
  browserVersion: string
  engine: string
  engineVersion: string

  os: string
  osVersion: string
  cpuArchitecture: string
  ua: string
}

export type CachedLink = {
  id: string
  userId: string
  workspaceId: string
}
