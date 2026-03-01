import type { GetBusinessCardQuerySchema } from "@app/zod/types"
import { queryOptions } from "@tanstack/react-query"
import { getBusinessCard } from "@/lib/api"

export function getBusinessCardQueryOptions(enabled = true, params?: GetBusinessCardQuerySchema) {
  return queryOptions({
    queryKey: ["business-card", params],
    queryFn: async () => {
      const { data } = await getBusinessCard(params)
      return data
    },
    enabled,
  })
}
