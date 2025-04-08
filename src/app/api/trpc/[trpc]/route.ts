import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { env } from "~/env";
import { appRouter } from "~/server/api/root";
import { auth } from "@clerk/nextjs/server";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => {
      const session = await auth();
      return {
        auth: {
          userId: session.userId,
          email: session.sessionClaims?.email as string | undefined,
          name: session.sessionClaims?.name as string | undefined,
          image: session.sessionClaims?.picture as string | undefined,
        },
        db: (await import("~/server/db")).db,
      };
    },
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };
