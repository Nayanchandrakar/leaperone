import type { PermissionType } from "@app/database/types"
import { useQuery } from "@tanstack/react-query"
import { getPermission } from "@/lib/api"

export function usePermission(permission: PermissionType) {
  return useQuery({
    queryKey: ["permission", permission],
    queryFn: async () => {
      const { data } = await getPermission({ permission })
      return data
    },
  })
}
