import type { AppRouter } from "@app/nrpc"
import { createClient } from "@app/nstack"

export const client = createClient<AppRouter>({
  baseUrl: "http://localhost:8080/api",
})
