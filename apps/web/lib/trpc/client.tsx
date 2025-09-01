"use client"

import type { AppRouter } from "@myleaper/trpc/client"
import type { QueryClient } from "@tanstack/react-query"
import { QueryClientProvider } from "@tanstack/react-query"
import { createTRPCClient, httpBatchLink } from "@trpc/client"
import { createTRPCContext } from "@trpc/tanstack-react-query"
import { useState } from "react"
import SuperJSON from "superjson"
import { makeQueryClient } from "@/lib/tanstack/query-client"
import { URLS } from "@/utils/urls"

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>()

let browserQueryClient: QueryClient

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient()
  }

  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

type TrpcNextProviderType = {
  children: React.ReactNode
}

export const TrpcNextProvider = ({ children }: TrpcNextProviderType) => {
  const queryClient = getQueryClient()
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          transformer: SuperJSON,
          url: URLS.SERVER,
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include",
              signal: options?.signal ?? null,
            })
          },
        }),
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  )
}
