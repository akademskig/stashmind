import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoutes = createRouteMatcher(["/", "/signin(.*)", "/signup(.*)"]);
const ignoredRoutes = createRouteMatcher(["/api/webhook/clerk"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Handle public routes and ignored routes
  if (publicRoutes(req) || ignoredRoutes(req)) {
    return NextResponse.next();
  }
  // Handle users who are authenticated and on the landing page
  if (userId && req.url.endsWith("/")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  // Handle users who aren't authenticated and try to access a protected route
  return auth
    .protect({ unauthenticatedUrl: new URL("/", req.url).toString() })
    .then(() => NextResponse.next());
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
