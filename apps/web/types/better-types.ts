import type { $Infer } from "@/lib/auth"

export type Session = typeof $Infer.Session
export type AuthResponse = Session | null
