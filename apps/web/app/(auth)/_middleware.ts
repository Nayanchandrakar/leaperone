import type { NextMiddleware } from "@rescale/nemo"
import { NextResponse } from "next/server"

export const auth: NextMiddleware = async (request, event) => {
  const session = event.storage.get("session")
  if (session) {
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }

  return NextResponse.next()
}
