export const MESSAGES = {
  AUTH: {
    LOGOUT_SUCCESS: "You’ve been logged out successfully.",
    LOGIN_SUCCESS: "Welcome back! You’ve logged in successfully.",
    UNAUTHORIZED: "Your session has expired. Please log in again.",
  },

  USER: {
    NOT_FOUND: "User not found",
    USERNAME_EXISTS: "User name already in use.",
    ALREADY_EXISTS: "User already exists. Use another email.",
    EMAIL_NOT_FOUND: "User email not found",
    EMAIL_CANNOT_UPDATE: "Email can not be updated",
    FAILED_TO_CREATE: "Failed to create user",
    FAILED_TO_UPDATE: "Failed to update user",
    EMAIL_NOT_VERIFIED: "Verification link has been sent to your email.",
  },

  PASSWORD: {
    INVALID_EMAIL_OR_PASSWORD: "Invalid email or password",
    INVALID: "Invalid password",
    TOO_SHORT: "Password too short",
    TOO_LONG: "Password too long",
    CHANGE_SUCCESS: "Your password has been updated successfully.",
    RESET_REQUEST_SUCCESS: "Password reset link sent to your email.",
    RESET_SUCCESS: "Your password has been reset successfully.",
  },

  SESSION: {
    EXPIRED: "Session expired. Re-authenticate to perform this action.",
    FAILED_TO_CREATE: "Failed to create session",
    FAILED_TO_GET: "Failed to get session",
  },

  ACCOUNT: {
    NOT_FOUND: "Account not found",
    CREDENTIAL_NOT_FOUND: "Credential account not found",
    SOCIAL_ALREADY_LINKED: "Social account already linked",
    FAILED_TO_UNLINK_LAST: "You can't unlink your last account",
  },

  PROVIDER: {
    NOT_FOUND: "Provider not found",
    INVALID_TOKEN: "Invalid token",
    ID_TOKEN_NOT_SUPPORTED: "id_token not supported",
    FAILED_TO_GET_USER_INFO: "Failed to get user info",
  },

  GENERAL: {
    SUCCESS: "Action completed successfully.",
    ERROR: "Something went wrong. Please try again later.",
    PERMISSION_DENIED: "You don’t have permission to perform this action.",
  },
} as const

export default MESSAGES
