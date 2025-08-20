import { CLIENT_ENV } from "@myleaper/env/client"

export const URLS = {
  SERVER: `${CLIENT_ENV.NEXT_PUBLIC_SERVER_URL}/api/trpc`,
  AUTH_SERVER: `${CLIENT_ENV.NEXT_PUBLIC_SERVER_URL}/api/auth/get-session`,
} as const
