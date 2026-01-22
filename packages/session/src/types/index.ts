import type { User } from "@app/database/types"
import type { Session } from "@app/types/session"
import type { CookieOptions } from "hono/utils/cookie"

export type StorageAdapter = {
  del(...keys: string[]): Promise<void>
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T, options: { ex: number }): Promise<void>
}

export type CookieAdapter = {
  delete: (name: string) => void
  get: (name: string) => string | undefined
  set: (name: string, value: string, overrides?: CookieOptions) => void
}

export type SessionManagerConfig = {
  cookieAdapter: CookieAdapter
  storageAdapter: StorageAdapter
}

export type CreateSessionParams = Pick<Session, "token" | "ipAddress" | "userAgent"> & {
  user: User
}
