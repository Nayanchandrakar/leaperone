import { APP_NAME, USERNAME_HASH } from "@myleaper/constants/server"
import { dbHttp } from "@myleaper/database"
import { account, users, verification } from "@myleaper/database/schema"
import { redis } from "@myleaper/redis"
import { RedisStorage } from "@myleaper/redis/utils/auth-storage"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { beforeRequestMiddleware } from "./middleware/check-username"

export const auth = betterAuth({
  appName: APP_NAME,

  database: drizzleAdapter(dbHttp, {
    provider: "pg",
    schema: {
      user: users,
      account,
      verification,
    },
  }),

  // Add additional database fields
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        input: true,
        unique: true,
      },
    },
  },

  hooks: {
    before: beforeRequestMiddleware,
  },

  databaseHooks: {
    user: {
      create: {
        after: async (_, ctx) => {
          if (ctx?.body.username) {
            await redis.hset(USERNAME_HASH, {
              [ctx.body.username]: "1",
            })
          }
        },
      },
    },
  },

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
      domain: "localhost",
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
