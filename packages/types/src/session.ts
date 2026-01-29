import type { User } from "@app/database/types"

export type Session = {
  token: string
  userId: string
  ipAddress: string | undefined
  userAgent: string | undefined
  impersonatedBy: string | null
  createdAt: Date
  updatedAt: Date
  expiresAt: Date
}

export type ActiveSession = {
  token: string
  expiresAt: number
}

export type FullSession = {
  user: User
  session: Session
}
