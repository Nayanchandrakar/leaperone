import "server-only"

import type { AppRouter } from "@myleaper/trpc/client"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { createTRPCClient, httpBatchLink } from "@trpc/client"
import {
  createTRPCOptionsProxy,
  type TRPCQueryOptions,
} from "@trpc/tanstack-react-query"
import { cache } from "react"
import SuperJSON from "superjson"
import { makeQueryClient } from "@/lib/tanstack/query-client"
import { URLS } from "@/utils/urls"

export const getQueryClient = cache(makeQueryClient)

export const trpc = createTRPCOptionsProxy({
  client: createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        transformer: SuperJSON,
        url: URLS.SERVER,
      }),
    ],
  }),
  queryClient: getQueryClient,
})

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  )
}

// biome-ignore lint: false positive
export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) {
  const queryClient = getQueryClient()
  if (queryOptions.queryKey[1]?.type === "infinite") {
    // biome-ignore lint: false positive
    void queryClient.prefetchInfiniteQuery(queryOptions as any)
  } else {
    void queryClient.prefetchQuery(queryOptions)
  }
}
