export const MSG = {
  AUTH: {
    LOGOUT_SUCCESS: "You’ve been logged out successfully.",
    LOGIN_SUCCESS: "Welcome back! You’ve logged in successfully.",
    UNAUTHORIZED: "Your session has expired. Please log in again.",
  },

  VERIFICATION: {
    FAILED: "Verification failed. Please try again.",
    ALREADY_VERIFIED: "Your email is already verified.",
    SUCCESS: "Your email has been verified successfully.",
    CODE_INVALID: "Invalid verification code. Please try again.",
    LINK_SENT: "A verification link has been sent to your email.",
    CODE_EXPIRED: "Verification code has expired. Request a new one.",
  },

  SUBSCRIPTION: {
    MISSING_SIGNATURE: "Missing stripe signature",
    FAILED_TO_FETCH_PLANS: "Failed to fetch plans",
    SUBSCRIPTION_NOT_FOUND: "Subscription not found",
    UNABLE_TO_CREATE_CUSTOMER: "Unable to create customer",
    SUBSCRIPTION_PLAN_NOT_FOUND: "Subscription plan not found",
    ALREADY_SUBSCRIBED_PLAN: "You're already subscribed to this plan",
    EMAIL_VERIFICATION_REQUIRED:
      "Email verification is required before you can subscribe to a plan",
    SUBSCRIPTION_NOT_ACTIVE:
      "Your subscription is not active. Please update your billing to continue.",
  },

  USER: {
    NOT_FOUND: "User not found",
    EMAIL_NOT_FOUND: "User email not found",
    FAILED_TO_CREATE: "Failed to create user",
    FAILED_TO_UPDATE: "Failed to update user",
    EMAIL_CANNOT_UPDATE: "Email can not be updated",
    USERNAME_EXISTS: "Username has been already taken",
    RESTRICTED_USER: "Your account has been restricted.",
    ALREADY_EXISTS: "User already exists. Use another email.",
    EMAIL_NOT_VERIFIED: "Verification link has been sent to your email.",
  },

  PASSWORD: {
    INVALID: "Invalid password",
    TOO_LONG: "Password too long",
    TOO_SHORT: "Password too short",
    INVALID_PASSWORD: "Invalid email or password",
    RESET_SUCCESS: "Your password has been reset successfully.",
    CHANGE_SUCCESS: "Your password has been updated successfully.",
    RESET_REQUEST_SUCCESS: "Password reset link sent to your email.",
    USER_NOT_FOUND: "If this email exists in our system, check your email for the reset link",
  },

  SESSION: {
    FAILED_TO_GET: "Failed to get session",
    FAILED_TO_CREATE: "Failed to create session",
    EXPIRED: "Session expired. Re-authenticate to perform this action.",
  },

  ACCOUNT: {
    NOT_FOUND: "Account not found",
    CREDENTIAL_NOT_FOUND: "Credential account not found",
    SOCIAL_ALREADY_LINKED: "Social account already linked",
    FAILED_TO_UNLINK_LAST: "You can't unlink your last account",
  },

  WORKSPACE: {
    NOT_FOUND: "Workspace not found",
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
    PERMISSION_DENIED: "You do not have permission to perform this action.",
  },

  STORAGE: {
    NOT_FOUND: "Storage bucket not found",
  },

  CONTACTUS: {
    SUBMIT_SUCCESS: "Message received. We’ll be in touch soon.",
  },

  SUPPORT: {
    SUBMIT_SUCCESS: "Support request submitted. Our team will respond shortly.",
  },

  INVITATION: {
    EXPIRED: "Invitation has expired",
    NOT_FOUND: "Invitation not found",
    FAILED_TO_CREATE: "Failed to create invitation",
    FAILED_TO_ACCEPT: "Failed to accept invitation",
    INVITE_ACCEPTED: "Your invitation has been accepted.",
    INVITE_SENT: "Invitation has been sent successfully.",
    SELF_INVITE: "You cannot invite yourself to the workspace.",
    INVALID_OR_EXPIRED: "The invitation link is invalid or has expired.",
  },
} as const
