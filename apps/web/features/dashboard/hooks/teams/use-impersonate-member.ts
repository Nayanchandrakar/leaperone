import type { ImpersonateSchema } from "@app/zod/types"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { impersonateMutation } from "@/lib/api"

type ImpersonateMemberInput = ImpersonateSchema & {
  path: string
}

export const useImpersonateMember = () => {
  return useMutation({
    mutationFn: async ({ memberId }: ImpersonateMemberInput) => {
      const { data } = await impersonateMutation({ memberId })
      return data
    },
    onSuccess: ({ message }, { path }) => {
      toast.success(message)
      window.location.assign(path)
    },
    onError: ({ message }) => {
      toast.error(message)
    },
  })
}
