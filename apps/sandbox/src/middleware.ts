import { type NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const res = NextResponse.next()

  res.headers.append("Access-Control-Allow-Credentials", "true")
  res.headers.append("Access-Control-Allow-Origin", process?.env?.SERVER_URL!)
  res.headers.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT",
  )
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  )

  if (req.method === "OPTIONS") {
    return NextResponse.json({}, { status: 200, headers: res.headers })
  }

  return res
}
