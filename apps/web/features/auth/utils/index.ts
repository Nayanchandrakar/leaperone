import type {
  IGetUserNameStatus,
  ISetUserNameError,
  UserStatusState,
} from "@/features/auth/types"

export const getUserNameStatus = ({
  exists,
  isLoading,
  queryError,
  errorMessage,
  username,
}: IGetUserNameStatus): UserStatusState => {
  let state: UserStatusState = "available"

  if (queryError || errorMessage || (!isLoading && exists)) {
    state = "error"
  } else if (!username.length) {
    state = "empty"
  } else if (isLoading) {
    state = "pending"
  }

  return state
}

export const setUserNameError = ({
  error,
  isUserNameTaken,
  usernameErrorType,
}: ISetUserNameError) => {
  if (error) {
    return {
      action: "set",
      error: { type: "query", message: error.message },
    }
  }

  if (isUserNameTaken) {
    return {
      action: "set",
      error: { type: "available", message: "Username is already taken" },
    }
  }

  if (usernameErrorType && ["available", "query"].includes(usernameErrorType)) {
    return {
      action: "clear",
      error: null,
    }
  }

  return {
    action: "none",
    error: null,
  }
}
