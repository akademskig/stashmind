import { createTRPCRouter, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  syncUser: protectedProcedure.mutation(async ({ ctx }) => {
    const existingUser = await ctx.db.clerkUser.findUnique({
      where: { clerkId: ctx.auth.userId },
    });

    if (!existingUser) {
      await ctx.db.clerkUser.create({
        data: {
          clerkId: ctx.auth.userId,
          email: ctx.auth.email as string,
          name: ctx.auth.name,
          image: ctx.auth.image,
        },
      });
    }

    return { success: true };
  }),
});
