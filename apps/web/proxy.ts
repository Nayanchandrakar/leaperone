import { dbHttp } from "@app/database/adapters/http"
import { getWorkspaceWithSubscription } from "@app/database/repository/subscription"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { sessionService } from "@/config/session"

// Pages that don't require authentication
const PUBLIC_ROUTES = new Set(["/login", "/sign-up", "/forgot-password", "/reset-password"])

// Pages that require authentication
const PROTECTED_ROUTES = new Set(["/dashboard"])

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()
  const session = await sessionService.fromCtx({ request, response })
  const isPublicRoute = PUBLIC_ROUTES.has(pathname)
  const isProtectedRoute = PROTECTED_ROUTES.has(pathname) || pathname.startsWith("/dashboard")
  // Redirect unauthenticated users trying to access protected routes
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
  // Check subscription status for dashboard routes
  if (session && isProtectedRoute) {
    try {
      const subscriptionData = await getWorkspaceWithSubscription(dbHttp, session.user.id)
      // No subscription at all - redirect to pricing
      if (!subscriptionData.subscription?.subscriptionId) {
        return NextResponse.redirect(new URL("/pricing", request.url))
      }
      const { active, cancelAtPeriodEnd } = subscriptionData.subscription
      // Subscription is not active (expired) - redirect to expired page
      if (!active) {
        return NextResponse.redirect(new URL("/expired", request.url))
      }
      // Subscription is canceled - redirect to cancelled page
      if (cancelAtPeriodEnd) {
        return NextResponse.redirect(new URL("/cancelled", request.url))
      }
    } catch (error) {
      console.error("Error checking subscription:", error)
      // On error, redirect to pricing page as fallback
      return NextResponse.redirect(new URL("/pricing", request.url))
    }
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
