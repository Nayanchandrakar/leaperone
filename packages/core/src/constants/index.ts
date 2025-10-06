// file
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
export const MIN_FILE_SIZE = 100 * 1024 // 100 KB
export const STORAGE_QUOTA = 2 * 1024 * 1024 * 1024 // 2GB
export const SIGNED_URL_EXPIRY = 120 // 2 minutes
export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
]

// session
export const SESSION_EXPIRY = 60 * 60 * 24 * 7
export const SESSION_COOKIE_NAME = "__Secure.leaper.session_token"
export const SESSSION_UPDATE_AGE = 60 * 60 * 24
export const PASSWORD_RESET_EXPIRY = 60 * 60 * 1

// subscription
export const TRIAL_PERIOD_DAYS = 7
