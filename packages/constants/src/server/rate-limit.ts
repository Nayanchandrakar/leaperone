export const AUTH_LIMITS = {
  LOGIN: {
    MAX_REQUESTS: 3,
    WINDOW_MS: 30 * 60 * 1000, // 30 min
  },

  SIGNUP: {
    MAX_REQUESTS: 2,
    WINDOW_MS: 60 * 60 * 1000, // 1 hr
  },

  FORGOT_PWD: {
    MAX_REQUESTS: 3,
    WINDOW_MS: 30 * 60 * 1000, // 30 min
  },

  VERIFY_EMAIL: {
    MAX_REQUESTS: 3,
    WINDOW_MS: 60 * 60 * 1000, // 1 hr
  },
} as const

export const API_LIMITS = {
  GENERAL: {
    MAX_REQUESTS: 100,
    DURATION: "5 m",
  },
} as const
