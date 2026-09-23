"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { exitImpersonationMutation } from "@/lib/api"

export function useExitImpersonation() {
  return useMutation({
    mutationFn: async () => {
      const { data } = await exitImpersonationMutation()
      return data
    },
    onSuccess: () => {
      window.location.href = "/dashboard/teams"
    },
    onError: ({ message }) => {
      toast.error(message)
    },
  })
}
