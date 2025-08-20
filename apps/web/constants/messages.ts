export const MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: "Login successful. Welcome back!",
    LOGOUT_SUCCESS: "You’ve been logged out successfully.",
    SIGNUP_SUCCESS: "Account created successfully! Welcome aboard.",
    UNAUTHORIZED: "Your session has expired. Please log in again.",
  },

  PASSWORD: {
    CHANGE_SUCCESS: "Your password has been updated successfully.",
    RESET_REQUEST_SUCCESS: "Password reset link sent to your email.",
    RESET_SUCCESS: "Your password has been reset successfully.",
  },

  GENERAL: {
    SUCCESS: "Action completed successfully.",
    ERROR: "Something went wrong. Please try again later.",
    PERMISSION_DENIED: "You don’t have permission to perform this action.",
  },
} as const
