import type { authClient } from "@/lib/auth"

type Session = typeof authClient.$Infer.Session

export type AuthResponse = Session | null
