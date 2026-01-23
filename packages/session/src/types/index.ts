import type { User } from "@app/database/types"
import type { CookieOptions, Session } from "@app/types"
import type { Context } from "hono"

export type StorageAdapter = {
  del(...keys: string[]): Promise<number>
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T, options: { ex: number }): Promise<"OK" | T | null>
}

export type CookieAdapter = {
  delete: (ctx: Context, name: string) => void
  get: (ctx: Context, name: string) => string | undefined
  set: (ctx: Context, name: string, value: string, overrides?: CookieOptions) => void
}

export type SessionServiceConfig = {
  cookieAdapter: CookieAdapter
  storageAdapter: StorageAdapter
}

export type CreateSessionParams = Pick<Session, "token" | "ipAddress" | "userAgent"> & {
  user: User
}
