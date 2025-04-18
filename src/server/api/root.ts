import { createTRPCRouter } from "~/server/api/trpc";
import { workspaceRouter } from "./routers/workspaces";
import { noteRouter } from "./routers/note";
import { organizationRouter } from "./routers/organization";
import { authRouter } from "./routers/auth";
import { createCallerFactory } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  workspace: workspaceRouter,
  note: noteRouter,
  organization: organizationRouter,
  auth: authRouter,
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
