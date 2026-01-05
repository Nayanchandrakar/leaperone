export const MSG = {
  AUTH: {
    LOGOUT_SUCCESS: "You’ve been logged out successfully.",
    LOGIN_SUCCESS: "Welcome back! You’ve logged in successfully.",
    UNAUTHORIZED: "Your session has expired. Please log in again.",
  },

  VERIFICATION: {
    ALREADY_VERIFIED: "Your email is already verified.",
    SUCCESS: "Your email has been verified successfully.",
    FAILED: "Verification failed. Please try again.",
    CODE_EXPIRED: "Verification code has expired. Request a new one.",
    CODE_INVALID: "Invalid verification code. Please try again.",
    LINK_SENT: "A verification link has been sent to your email.",
  },

  SUBSCRIPTION: {
    MISSING_SIGNATURE: "Missing stripe signature",
    SUBSCRIPTION_NOT_FOUND: "Subscription not found",
    SUBSCRIPTION_PLAN_NOT_FOUND: "Subscription plan not found",
    ALREADY_SUBSCRIBED_PLAN: "You're already subscribed to this plan",
    UNABLE_TO_CREATE_CUSTOMER: "Unable to create customer",
    FAILED_TO_FETCH_PLANS: "Failed to fetch plans",
    EMAIL_VERIFICATION_REQUIRED:
      "Email verification is required before you can subscribe to a plan",
    SUBSCRIPTION_NOT_ACTIVE:
      "Your subscription is not active. Please update your billing to continue.",
  },

  USER: {
    NOT_FOUND: "User not found",
    USERNAME_EXISTS: "Username has been already taken",
    ALREADY_EXISTS: "User already exists. Use another email.",
    EMAIL_NOT_FOUND: "User email not found",
    EMAIL_CANNOT_UPDATE: "Email can not be updated",
    FAILED_TO_CREATE: "Failed to create user",
    FAILED_TO_UPDATE: "Failed to update user",
    EMAIL_NOT_VERIFIED: "Verification link has been sent to your email.",
    RESTRICTED_USER: "Your account has been restricted.",
  },

  PASSWORD: {
    INVALID_PASSWORD: "Invalid email or password",
    INVALID: "Invalid password",
    TOO_SHORT: "Password too short",
    TOO_LONG: "Password too long",
    USER_NOT_FOUND: "If this email exists in our system, check your email for the reset link",
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
    NOT_FOUND: "Invitation not found",
    EXPIRED: "Invitation has expired",
    ALREADY_ACCEPTED: "Invitation has already been accepted",
    USERNAME_RESERVED: "Username is already reserved",
    EMAIL_RESERVED: "Email is already reserved",
    CREATED: "Invitation created successfully",
    ACCEPTED: "Invitation accepted successfully",
    ACCOUNT_CREATED: "Account created successfully",
  },
} as const
