import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoutes = createRouteMatcher(["/", "/signin(.*)", "/signup(.*)"]);
const ignoredRoutes = createRouteMatcher(["/api/webhook/clerk"]);

export default clerkMiddleware((auth, req) => {
  if (publicRoutes(req) || ignoredRoutes(req)) {
    return NextResponse.next();
  }
  return auth.protect().then(() => NextResponse.next());
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
