import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// class NextJsCookieAdapter implements CookieAdapter {
//   constructor(
//     private request: NextRequest,
//     private response: NextResponse,
//   ) {}

//   delete(name: string): void {
//     this.response.cookies.set(name, "", {
//       path: "/",
//       httpOnly: true,
//       secure: true,
//       sameSite: "strict",
//       maxAge: 0,
//     })
//   }

//   get(name: string): string | undefined {
//     return this.request.cookies.get(name)?.value
//   }

//   set(name: string, value: string, overrides?: CookieOptions): void {
//     const cookieOptions = overrides || {}
//     this.response.cookies.set(name, value, {
//       path: cookieOptions.path || "/",
//       httpOnly: true,
//       secure: true,
//       sameSite: "strict",
//       maxAge: cookieOptions.maxAge,
//     })
//   }
// }

// class UpstashRedisAdapter implements StorageAdapter {
//   private redis: Redis

//   constructor() {
//     this.redis = new Redis({
//       url: SERVER_ENV.UPSTASH_REDIS_REST_URL,
//       token: SERVER_ENV.UPSTASH_REDIS_REST_TOKEN,
//     })
//   }

//   async del(...keys: string[]): Promise<void> {
//     await this.redis.del(...keys)
//   }

//   async get<T>(key: string): Promise<T | null> {
//     const result = await this.redis.get(key)
//     return result as T | null
//   }

//   async set<T>(key: string, value: T, options: { ex: number }): Promise<void> {
//     await this.redis.set(key, value, { ex: options.ex })
//   }
// }

export default async function proxy(request: NextRequest) {
  try {
    // const sessionManager = new SessionManager({
    //   storageAdapter: new UpstashRedisAdapter(),
    //   cookieAdapter: new NextJsCookieAdapter(request, response),
    // })

    // await sessionManager.fromCtx()

    // return NextResponse.redirect(new URL("/login", request.url))

    return NextResponse.next()
  } catch (error) {
    console.error("Proxy middleware error:", error)

    // Return a proper error response instead of letting it bubble up
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
