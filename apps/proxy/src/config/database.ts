import { Client } from "@neondatabase/serverless"
import type { Bindings } from "@/types/global.types"

export async function getDatabaseClient(env: Bindings) {
  const client = new Client(env.DATABASE_URL)
  await client.connect()
  return client
}
