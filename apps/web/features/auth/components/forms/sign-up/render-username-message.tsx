"use client"

import { useFormContext, useWatch } from "react-hook-form"
import {
  UserNameAvailable,
  UserNameEmpty,
  UserNameError,
  UserNameLoading,
} from "@/features/auth/components/forms/sign-up/username-states"
import { getUserNameStatus } from "@/features/auth/utils"

interface IRenderMessage {
  queryError: any
  isLoading: boolean
  exists: boolean
}

export const RenderMessage = ({ exists, isLoading, queryError }: IRenderMessage) => {
  const { control, formState } = useFormContext<{
    username: string
  }>()

  const username = useWatch({ control, name: "username" })
  const errorMessage = formState.errors.username?.message

  const status = getUserNameStatus({
    exists,
    queryError,
    isLoading,
    username,
    errorMessage,
  })

  switch (status) {
    case "available":
      return <UserNameAvailable />
    case "error":
      return <UserNameError error={errorMessage} />
    case "pending":
      return <UserNameLoading />
    case "empty":
      return <UserNameEmpty />
  }
}
