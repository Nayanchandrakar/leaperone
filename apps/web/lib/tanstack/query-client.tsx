import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query"
import { SuperJSON } from "superjson"

/**
 * Creates and returns a configured instance of QueryClient for use with @tanstack/react-query.
 * This setup supports server-side rendering (SSR) with proper data serialization using SuperJSON.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        /**
         * Sets a default `staleTime` for all queries.
         * This helps reduce immediate refetching on the client after SSR by marking data as fresh for 30 seconds.
         */
        staleTime: 30 * 1000, // 30 seconds
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,

        /**
         * Determines whether a query should be dehydrated.
         * In addition to the default checks, we also dehydrate queries that are still in the "pending" state.
         */
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  })
}
