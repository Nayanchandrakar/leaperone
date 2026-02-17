export type User = {
  name: string
  id: string
  image: string | null
  jobRole: string | null
  stripeCustomerId: string | null
  email: string
  username: string
  isRestricted: boolean
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date | null
}

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
