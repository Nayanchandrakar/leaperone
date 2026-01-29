import type { User } from "@app/database/types"
import type { CookieOptions, Session } from "@app/types"

export type CookieAdapter<T> = {
  delete: (ctx: T, name: string) => void
  get: (ctx: T, name: string) => string | undefined
  set: (ctx: T, name: string, value: string, overrides?: CookieOptions) => void
}

export type CreateSessionParams = Pick<Session, "token" | "ipAddress" | "userAgent"> & {
  user: User
  overrides?: Partial<{
    ttl: number
    impersonatedBy: string
  }>
}
