import router from "@app/nrpc"
import { Hono } from "hono"
import { secureHeaders } from "hono/secure-headers"
import { crossOriginRequest, csrfProtection } from "@/config"
import { ErrorHandler } from "@/utils"

export function bootStrap() {
  const sandbox = new Hono()

  sandbox.use(secureHeaders())
  sandbox.use(crossOriginRequest)
  sandbox.use(csrfProtection)
  sandbox.route("/", router)
  sandbox.onError(ErrorHandler)

  return sandbox
}
