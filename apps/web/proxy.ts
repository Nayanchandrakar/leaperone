import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export default async function proxy(request: NextRequest): Promise<NextResponse> {
  try {
    return NextResponse.next()
  } catch (error) {
    console.error("Proxy middleware error:", error)
    // Return a proper error response instead of letting it bubble up
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
