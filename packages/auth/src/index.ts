import { APP_NAME, USERNAME_HASH } from "@myleaper/constants/server"
import { AUTH_LIMITS } from "@myleaper/constants/server/rate-limit"
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
      console.log("Password reset token: ", token, url, user)
    },
  },

  secondaryStorage: RedisStorage,
  rateLimit: {
    enabled: true,
    storage: "secondary-storage",
    customRules: {
      "/sign-in/email": {
        window: AUTH_LIMITS.LOGIN.WINDOW_MS,
        max: AUTH_LIMITS.LOGIN.MAX_REQUESTS,
      },

      "/sign-up/email": {
        window: AUTH_LIMITS.SIGNUP.WINDOW_MS,
        max: AUTH_LIMITS.SIGNUP.MAX_REQUESTS,
      },

      "/request-password-reset": {
        window: AUTH_LIMITS.FORGOT_PWD.WINDOW_MS,
        max: AUTH_LIMITS.FORGOT_PWD.MAX_REQUESTS,
      },
    },
  },

  // Advance configuration options
  advanced: {
    cookiePrefix: APP_NAME,
    ipAddress: {
      ipAddressHeaders: ["x-forwarded-for"],
      disableIpTracking: false,
    },
    crossSubDomainCookies: {
      enabled: true,
      domain: "localhost",
    },
    useSecureCookies: true,
    database: {
      generateId: false,
    },
  },

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
      console.log("Verification email sent: ", token, url, user)
    },
    sendOnSignUp: true,
    requireEmailVerification: true,
    autoSignInAfterVerification: true,
    expiresIn: 300,
  },
})
