import type { User } from "@myleaper/database/types"

export type Session = {
  userId: string
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
  token: string
  ipAddress?: string | null | undefined
  userAgent?: string | null | undefined
}

export type ActiveSession = {
  token: string
  expiresAt: number
}

export type ParsedSession = {
  session: Session
  user: User
}
