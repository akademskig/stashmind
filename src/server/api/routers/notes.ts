import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const notesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        summary: z.string().optional(),
        tags: z.array(z.string()).optional(),
        sourceUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      return await ctx.db.note.create({
        data: {
          title: input.title,
          content: input.content,
          summary: input.summary,
          tags: input.tags ?? [],
          sourceUrl: input.sourceUrl,
          userId,
        },
      });
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    return ctx.db.note.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }),
});
