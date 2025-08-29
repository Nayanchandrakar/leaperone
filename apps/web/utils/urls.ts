import { CLIENT_ENV } from "@myleaper/env/client"

export const URLS = {
  SERVER: `${CLIENT_ENV.NEXT_PUBLIC_SERVER_URL}/api/trpc`,
  PRICING_PAGE: `${CLIENT_ENV.NEXT_PUBLIC_APP_URL}/pricing`,
} as const
