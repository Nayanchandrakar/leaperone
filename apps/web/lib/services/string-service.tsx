import { clientEnv } from "@myleaper/env/client"

export class StringService {
  private constructor() {}

  static getBackendUrl() {
    return `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/api/trpc`
  }
}
