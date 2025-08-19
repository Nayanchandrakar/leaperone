import type {
  IGetUserNameStatus,
  ISetUserNameError,
  UserStatusState,
} from "@/types/create-account"

export const getUserNameStatus = ({
  exists,
  isPending,
  queryError,
  errorMessage,
  username,
}: IGetUserNameStatus): UserStatusState => {
  let state: UserStatusState = "available"

  if (queryError || errorMessage || (!isPending && exists)) {
    state = "error"
  } else if (!username.length) {
    state = "empty"
  } else if (isPending) {
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
