import { z } from "zod";
import { ContentType, NoteType, ReferenceType } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        spaceId: z.string(),
        title: z.string().min(1).max(200),
        content: z.string(),
        contentType: z
          .enum([ContentType.MARKDOWN, ContentType.RICH_TEXT])
          .default(ContentType.MARKDOWN),
        noteType: z
          .enum([
            NoteType.NOTE,
            NoteType.ARTICLE,
            NoteType.QUOTE,
            NoteType.THOUGHT,
            NoteType.QUESTION,
          ])
          .default(NoteType.NOTE),
        tagIds: z.array(z.string()).optional(),
        sourceUrl: z.string().url().optional(),
        references: z
          .array(
            z.object({
              toNoteId: z.string(),
              referenceType: z.enum([
                ReferenceType.RELATED,
                ReferenceType.SUPPORTS,
                ReferenceType.CONTRADICTS,
                ReferenceType.QUESTIONS,
              ]),
              description: z.string().optional(),
            }),
          )
          .optional(),
        enableAI: z.boolean().default(true),
        enableMemory: z.boolean().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify user has access to knowledge space
      const space = await ctx.db.space.findFirst({
        where: {
          id: input.spaceId,
          ownerId: ctx.auth.userId,
        },
        include: {
          settings: true,
        },
      });

      if (!space) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Not authorized to create notes in this knowledge space",
        });
      }

      // Create the note with all its relationships
      const note = await ctx.db.note.create({
        data: {
          title: input.title,
          content: input.content,
          contentType: input.contentType,
          noteType: input.noteType,
          space: { connect: { id: input.spaceId } },
          author: { connect: { clerkId: ctx.auth.userId } },
          tags: input.tagIds
            ? {
                create: input.tagIds.map((tagId) => ({
                  tag: { connect: { id: tagId } },
                })),
              }
            : undefined,
          sourceUrl: input.sourceUrl,
          // Create references if provided
          references: input.references
            ? {
                create: input.references.map((ref) => ({
                  toNote: { connect: { id: ref.toNoteId } },
                  referenceType: ref.referenceType,
                  description: ref.description,
                })),
              }
            : undefined,
          // Create memory metadata if enabled
          memoryMetadata: input.enableMemory
            ? {
                create: {
                  isActive: true,
                },
              }
            : undefined,
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
          references: {
            include: {
              toNote: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
          memoryMetadata: true,
        },
      });

      // Process with AI if enabled
      if (input.enableAI && space.settings?.enableAIProcessing) {
        await ctx.db.aINoteMetadata.create({
          data: {
            noteId: note.id,
            // AI processing will be handled by a separate background job
            // This just creates the initial record
          },
        });
      }

      return note;
    }),

  getAllBySpace: protectedProcedure
    .input(
      z.object({
        spaceId: z.string(),
        tagIds: z.array(z.string()).optional(),
        noteType: z
          .enum([
            NoteType.NOTE,
            NoteType.ARTICLE,
            NoteType.QUOTE,
            NoteType.THOUGHT,
            NoteType.QUESTION,
          ])
          .optional(),
        search: z.string().optional(),
        includeArchived: z.boolean().default(false),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.note.findMany({
        where: {
          spaceId: input.spaceId,
          space: {
            ownerId: ctx.auth.userId,
          },
          tags: input.tagIds
            ? {
                some: {
                  tagId: {
                    in: input.tagIds,
                  },
                },
              }
            : undefined,
          noteType: input.noteType,
          isArchived: input.includeArchived ? undefined : false,
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
              name: true,
              imageUrl: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
          aiMetadata: true,
          memoryMetadata: true,
          references: {
            include: {
              toNote: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const note = await ctx.db.note.findFirst({
        where: {
          id: input.id,
          space: {
            ownerId: ctx.auth.userId,
          },
        },
        include: {
          author: {
            select: {
              name: true,
              imageUrl: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
          aiMetadata: true,
          memoryMetadata: true,
          references: {
            include: {
              toNote: {
                select: {
                  id: true,
                  title: true,
                  noteType: true,
                },
              },
            },
          },
          referencedBy: {
            include: {
              fromNote: {
                select: {
                  id: true,
                  title: true,
                  noteType: true,
                },
              },
            },
          },
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

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).max(200).optional(),
        content: z.string().optional(),
        noteType: z
          .enum([
            NoteType.NOTE,
            NoteType.ARTICLE,
            NoteType.QUOTE,
            NoteType.THOUGHT,
            NoteType.QUESTION,
          ])
          .optional(),
        tagIds: z.array(z.string()).optional(),
        sourceUrl: z.string().url().optional().nullable(),
        references: z
          .array(
            z.object({
              toNoteId: z.string(),
              referenceType: z.enum([
                ReferenceType.RELATED,
                ReferenceType.SUPPORTS,
                ReferenceType.CONTRADICTS,
                ReferenceType.QUESTIONS,
              ]),
              description: z.string().optional(),
            }),
          )
          .optional(),
        isArchived: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const note = await ctx.db.note.findFirst({
        where: {
          id: input.id,
          space: {
            ownerId: ctx.auth.userId,
          },
        },
        include: {
          tags: true,
          references: true,
        },
      });

      if (!note) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Note not found",
        });
      }

      // Remove existing tags if new ones are provided
      if (input.tagIds) {
        await ctx.db.tagsOnNotes.deleteMany({
          where: {
            noteId: input.id,
          },
        });
      }

      // Remove existing references if new ones are provided
      if (input.references) {
        await ctx.db.noteReference.deleteMany({
          where: {
            fromNoteId: input.id,
          },
        });
      }

      return ctx.db.note.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
          noteType: input.noteType,
          tags: input.tagIds
            ? {
                create: input.tagIds.map((tagId) => ({
                  tag: { connect: { id: tagId } },
                })),
              }
            : undefined,
          references: input.references
            ? {
                create: input.references.map((ref) => ({
                  toNote: { connect: { id: ref.toNoteId } },
                  referenceType: ref.referenceType,
                  description: ref.description,
                })),
              }
            : undefined,
          sourceUrl: input.sourceUrl,
          isArchived: input.isArchived,
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
          references: {
            include: {
              toNote: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
          aiMetadata: true,
          memoryMetadata: true,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const note = await ctx.db.note.findFirst({
        where: {
          id: input.id,
          space: {
            ownerId: ctx.auth.userId,
          },
        },
      });

      if (!note) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Note not found",
        });
      }

      return ctx.db.note.delete({
        where: { id: input.id },
      });
    }),
});
