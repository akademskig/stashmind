import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const noteRouter = createTRPCRouter({
  // Get all notes for a workspace
  getAllByWorkspace: protectedProcedure
    .input(z.object({ workspaceId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.note.findMany({
        where: {
          authorId: ctx.auth.userId,
          workspaceId: input.workspaceId,
          isArchived: false,
        },
        include: {
          author: true,
          tags: {
            include: {
              tag: true,
            },
          },
          category: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
    }),

  // Get a single note by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const note = await ctx.db.note.findUnique({
        where: { id: input.id },
        include: {
          author: true,
          tags: {
            include: {
              tag: true,
            },
          },
          category: true,
        },
      });

      if (!note) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Note not found",
        });
      }

      return note;
    }),

  // Create a new note
  create: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        title: z.string().min(1),
        content: z.string(),
        contentType: z.enum(["MARKDOWN", "RICH_TEXT", "CODE", "CANVAS"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.note.create({
        data: {
          title: input.title,
          content: input.content,
          contentType: input.contentType,
          workspaceId: input.workspaceId,
          authorId: ctx.auth.userId,
        },
      });
    }),

  // Update a note
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        content: z.string().optional(),
        contentType: z
          .enum(["MARKDOWN", "RICH_TEXT", "CODE", "CANVAS"])
          .optional(),
        status: z.enum(["DRAFT", "PUBLISHED", "REVIEW"]).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      return ctx.db.note.update({
        where: { id },
        data: {
          ...data,
          version: {
            increment: 1,
          },
        },
      });
    }),

  // Delete a note
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.note.delete({
        where: { id: input.id },
      });
    }),
});
