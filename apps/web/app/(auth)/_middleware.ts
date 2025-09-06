import type { NextMiddleware } from "@rescale/nemo"
import { NextResponse } from "next/server"

export const auth: NextMiddleware = async (request, event) => {
  const session = await event.storage.get("session")
  const homeUrl = new URL("/", request.nextUrl)

  if (session) {
    return NextResponse.redirect(homeUrl)
  }

  return NextResponse.next()
}
