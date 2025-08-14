import { dbHttp } from "@myleaper/database"
import { account, users, verification } from "@myleaper/database/schema"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { configuration } from "../config"

export const auth = betterAuth({
  appName: configuration.site.name,
  database: drizzleAdapter(dbHttp, {
    provider: "pg",
    schema: {
      user: users,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
  },
})
