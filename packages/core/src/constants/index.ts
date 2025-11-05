// file
export const MAX_FILES = 50
export const MIN_FILE_SIZE = 5 * 1024 // 5 KB
export const SIGNED_URL_EXPIRY = 120 // 2 minutes
export const MAX_FILE_SIZE = 2 * 1024 * 1024 // 1 MB

export const SORT_OPTIONS = ["a-to-z", "z-to-a", "newest", "oldest"]
export const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg+xml"]
export const FILE_TYPES = IMAGE_TYPES

// session
export const SESSION_EXPIRY = 60 * 60 * 24 * 7
export const SESSION_COOKIE_NAME = "__Secure.leaper.session_token"
export const SESSSION_UPDATE_AGE = 60 * 60 * 24
export const PASSWORD_RESET_EXPIRY = 60 * 60 * 1

// subscription
export const TRIAL_PERIOD_DAYS = 7
