import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "../index"

class Ratelimiter {
  private static instance: Ratelimiter | null = null
  private globalRatelimit: Ratelimit | null = null

  private constructor() {}

  static getInstance() {
    if (!Ratelimiter.instance) {
      Ratelimiter.instance = new Ratelimiter()
      return Ratelimiter.instance
    }
    return Ratelimiter.instance
  }

  getGlobalRatelimit() {
    if (!this.globalRatelimit) {
      this.globalRatelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "1 m"),
      })
      return this.globalRatelimit
    }

    return this.globalRatelimit
  }
}

export const rateLimit = Ratelimiter.getInstance()
