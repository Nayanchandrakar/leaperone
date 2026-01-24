import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { sessionService } from "@/config/session"

// Pages that don't require authentication
const PUBLIC_ROUTES = new Set(["/login", "/sign-up", "/forgot-password", "/reset-password"])

// Pages that require authentication
const PROTECTED_ROUTES = new Set(["/dashboard"])

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const response = NextResponse.next()
  const session = await sessionService.fromCtx({ request, response })

  const isPublicRoute = PUBLIC_ROUTES.has(pathname)
  const isProtectedRoute = PROTECTED_ROUTES.has(pathname) || pathname.startsWith("/dashboard")

  // Redirect unauthenticated users trying to access protected routes
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect authenticated users away from public auth pages
  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return response
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
