import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "./routers/auth";
import { createCallerFactory } from "./trpc";
import { spaceRouter } from "./routers/spaces";
import { noteRouter } from "./routers/notes";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  note: noteRouter,
  auth: authRouter,
  space: spaceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
