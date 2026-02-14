import type { WorkspaceSettingsSchema } from "@app/zod/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getWorkspaceSettings, updateWorkspaceSettings } from "@/lib/api"

export const useWorkspaceSettings = () => {
  return useQuery({
    queryKey: ["workspace-settings"],
    queryFn: async () => {
      const { data } = await getWorkspaceSettings()
      return data
    },
  })
}

export const useUpdateWorkspaceSettings = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: WorkspaceSettingsSchema) => {
      const { data } = await updateWorkspaceSettings(params)
      return data
    },

    onSuccess: ({ message }, params) => {
      queryClient.setQueryData(["workspace-settings"], (old: any) => ({
        ...old,
        ...params,
      }))
      toast.success(message)
    },

    onError: ({ message }) => {
      toast.error(message)
    },
  })
}
