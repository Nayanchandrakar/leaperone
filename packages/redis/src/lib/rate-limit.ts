import { MAX_RELAX_WINDOW } from "@myleaper/constants/server"
import { Ratelimit as Limiter } from "@upstash/ratelimit"
import { redis } from "../index"

class Ratelimit {
  private static instance: Ratelimit | null = null
  private relaxedWindow: Limiter | null = null

  private constructor() {
    this.relaxedWindow = new Limiter({
      redis,
      limiter: Limiter.slidingWindow(MAX_RELAX_WINDOW, "5 m"),
    })
  }

  static getInstance() {
    if (!Ratelimit.instance) {
      Ratelimit.instance = new Ratelimit()
    }
    return Ratelimit.instance
  }

  getRelaxedWindow() {
    return this.relaxedWindow
  }
}

export const ratelimit = Ratelimit.getInstance()
