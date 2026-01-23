export type SameSite = "strict" | "lax" | "none"
export type Priority = "low" | "medium" | "high"

export type CookieOptions = Partial<{
  path: string
  expires: Date
  domain: string
  maxAge: number
  secure: boolean
  httpOnly: boolean
  sameSite: SameSite
  priority: Priority
  partitioned: boolean
}>
