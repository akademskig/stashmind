import { z } from "zod";
import { ContentType, NoteStatus, MemberRole } from "@prisma/client";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        title: z.string().min(1).max(200),
        content: z.string(),
        contentType: z
          .enum([
            ContentType.MARKDOWN,
            ContentType.RICH_TEXT,
            ContentType.CODE,
            ContentType.CANVAS,
          ])
          .default(ContentType.MARKDOWN),
        categoryId: z.string().optional(),
        tagIds: z.array(z.string()).optional(),
        sourceUrl: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify user has access to workspace
      const workspace = await ctx.db.workspace.findFirst({
        where: {
          id: input.workspaceId,
          members: {
            some: {
              userId: ctx.auth.userId,
            },
          },
        },
      });

      if (!workspace) {
        throw new Error("Not authorized to create notes in this workspace");
      }

      return ctx.db.note.create({
        data: {
          title: input.title,
          content: input.content,
          contentType: input.contentType,
          workspace: { connect: { id: input.workspaceId } },
          author: { connect: { id: ctx.auth.userId } },
          category: input.categoryId
            ? { connect: { id: input.categoryId } }
            : undefined,
          tags: input.tagIds
            ? {
                create: input.tagIds.map((tagId) => ({
                  tag: { connect: { id: tagId } },
                })),
              }
            : undefined,
          sourceUrl: input.sourceUrl,
        },
        include: {
          category: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
    }),

  getAll: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        categoryId: z.string().optional(),
        tagIds: z.array(z.string()).optional(),
        status: z
          .enum([NoteStatus.DRAFT, NoteStatus.PUBLISHED, NoteStatus.REVIEW])
          .optional(),
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.note.findMany({
        where: {
          workspaceId: input.workspaceId,
          workspace: {
            members: {
              some: {
                userId: ctx.auth.userId,
              },
            },
          },
          categoryId: input.categoryId,
          tags: input.tagIds
            ? {
                some: {
                  tagId: {
                    in: input.tagIds,
                  },
                },
              }
            : undefined,
          status: input.status,
          OR: input.search
            ? [
                { title: { contains: input.search, mode: "insensitive" } },
                { content: { contains: input.search, mode: "insensitive" } },
              ]
            : undefined,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              imageUrl: true,
            },
          },
          category: true,
          tags: {
            include: {
              tag: true,
            },
          },
          aiMetadata: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.note.findFirst({
        where: {
          id: input.id,
          workspace: {
            members: {
              some: {
                userId: ctx.auth.userId,
              },
            },
          },
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              imageUrl: true,
            },
          },
          category: true,
          tags: {
            include: {
              tag: true,
            },
          },
          aiMetadata: true,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).max(200).optional(),
        content: z.string().optional(),
        categoryId: z.string().optional().nullable(),
        tagIds: z.array(z.string()).optional(),
        status: z
          .enum([NoteStatus.DRAFT, NoteStatus.PUBLISHED, NoteStatus.REVIEW])
          .optional(),
        sourceUrl: z.string().url().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const note = await ctx.db.note.findFirst({
        where: {
          id: input.id,
          OR: [
            { authorId: ctx.auth.userId },
            {
              workspace: {
                members: {
                  some: {
                    userId: ctx.auth.userId,
                    role: {
                      in: [MemberRole.OWNER, MemberRole.ADMIN],
                    },
                  },
                },
              },
            },
          ],
        },
        include: {
          tags: true,
        },
      });

      if (!note) {
        throw new Error("Not authorized to update this note");
      }

      // Remove existing tags if new ones are provided
      if (input.tagIds) {
        await ctx.db.tagsOnNotes.deleteMany({
          where: {
            noteId: input.id,
          },
        });
      }

      return ctx.db.note.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
          category:
            input.categoryId === null
              ? { disconnect: true }
              : input.categoryId
                ? { connect: { id: input.categoryId } }
                : undefined,
          tags: input.tagIds
            ? {
                create: input.tagIds.map((tagId) => ({
                  tag: { connect: { id: tagId } },
                })),
              }
            : undefined,
          status: input.status,
          sourceUrl: input.sourceUrl,
          version: { increment: 1 },
        },
        include: {
          category: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const note = await ctx.db.note.findFirst({
        where: {
          id: input.id,
          OR: [
            { authorId: ctx.auth.userId },
            {
              workspace: {
                members: {
                  some: {
                    userId: ctx.auth.userId,
                    role: {
                      in: [MemberRole.OWNER, MemberRole.ADMIN],
                    },
                  },
                },
              },
            },
          ],
        },
      });

      if (!note) {
        throw new Error("Not authorized to delete this note");
      }

      return ctx.db.note.delete({
        where: { id: input.id },
      });
    }),

  archive: protectedProcedure
    .input(z.object({ id: z.string(), archive: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const note = await ctx.db.note.findFirst({
        where: {
          id: input.id,
          OR: [
            { authorId: ctx.auth.userId },
            {
              workspace: {
                members: {
                  some: {
                    userId: ctx.auth.userId,
                    role: {
                      in: [MemberRole.OWNER, MemberRole.ADMIN],
                    },
                  },
                },
              },
            },
          ],
        },
      });

      if (!note) {
        throw new Error("Not authorized to archive this note");
      }

      return ctx.db.note.update({
        where: { id: input.id },
        data: {
          isArchived: input.archive,
        },
      });
    }),
});
