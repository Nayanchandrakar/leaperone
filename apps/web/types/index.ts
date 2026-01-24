import type { NextRequest, NextResponse } from "next/server"

export type IconProps = React.HTMLAttributes<SVGElement>

export type FullSession = {
  session: {
    token: string
    userId: string
    createdAt: string
    updatedAt: string
    expiresAt: string
    ipAddress: string | undefined
    userAgent: string | undefined
  }
  user: {
    id: string
    email: string
    name: string
    username: string
    createdAt: string
    image: string | null
    isRestricted: boolean
    emailVerified: boolean
    updatedAt: string | null
    stripeCustomerId: string | null
  }
}

export type PanelType = "single" | "multiple"

export type Session = FullSession["session"]

export type User = FullSession["user"]

export type Nullable<T> = T | null

export type NextContext = { request: NextRequest; response: NextResponse }
