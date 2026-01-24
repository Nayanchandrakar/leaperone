import type { User } from "@app/database/types"
import type { CookieOptions, Session } from "@app/types"

export type StorageAdapter = {
  del(...keys: string[]): Promise<number>
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T, options: { ex: number }): Promise<"OK" | T | null>
}

export type CookieAdapter<T> = {
  delete: (ctx: T, name: string) => void
  get: (ctx: T, name: string) => string | undefined
  set: (ctx: T, name: string, value: string, overrides?: CookieOptions) => void
}

export type CreateSessionParams = Pick<Session, "token" | "ipAddress" | "userAgent"> & {
  user: User
}
