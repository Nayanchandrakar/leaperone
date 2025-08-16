import { APP_NAME } from "@myleaper/constants/server"
import { dbHttp } from "@myleaper/database"
import { account, users, verification } from "@myleaper/database/schema"
import { RedisStorage } from "@myleaper/redis/utils/auth-storage"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

export const auth = betterAuth({
  appName: APP_NAME,

  // Drizzle adapter
  database: drizzleAdapter(dbHttp, {
    provider: "pg",
    schema: {
      user: users,
      account,
      verification,
    },
  }),

  // Enable email and password authentication
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    resetPasswordTokenExpiresIn: 300,
    revokeSessionsOnPasswordReset: true,
    async sendResetPassword({ token, url, user }) {
      console.log(token, url, user)
    },
  },

  // Use Redis for ratelimiting
  secondaryStorage: RedisStorage,
  rateLimit: { storage: "secondary-storage" },

  // Advance configuration options
  advanced: {
    cookiePrefix: APP_NAME,
    crossSubDomainCookies: {
      enabled: true,
    },
    useSecureCookies: true,
    database: {
      generateId: false,
    },
  },

  // Enable cookie caching
  session: {
    cookieCache: {
      enabled: true,
    },
  },

  telemetry: {
    enabled: false,
  },

  emailVerification: {
    async sendVerificationEmail({ user, token, url }) {
      console.log(user, token, url)
    },
    sendOnSignUp: true,
    requireEmailVerification: true,
    autoSignInAfterVerification: true,
    expiresIn: 300,
  },
})
