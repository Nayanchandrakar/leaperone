// import { headers } from "next/headers"
// import type { AuthResponse } from "@/types/better-types"
// import { URLS } from "@/utils/urls"

// export const auth = async (): Promise<AuthResponse> => {
//   const header = await headers()
//   const cookie = header.get("cookie")!

//   const res = await fetch(URLS.AUTH_SERVER, { headers: { cookie } })
//   const data: AuthResponse = await res.json()

//   return data
// }
