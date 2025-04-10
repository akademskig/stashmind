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
          email: ctx.auth.email!,
          name: ctx.auth.name,
          imageUrl: ctx.auth.image,
        },
      });
    }

    return { success: true };
  }),
});
