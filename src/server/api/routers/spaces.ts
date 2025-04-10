import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

const spacePurposeEnum = z.enum([
  "GENERAL",
  "LEARNING",
  "READING",
  "RESEARCH",
  "JOURNAL",
]);

export const spaceRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.space.findMany({
      where: {
        ownerId: ctx.auth.userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        _count: {
          select: {
            notes: true,
            tags: true,
          },
        },
      },
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const space = await ctx.db.space.findUnique({
        where: { id: input.id },
        include: {
          settings: true,
        },
      });

      if (!space) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Knowledge space not found",
        });
      }

      if (space.ownerId !== ctx.auth.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this knowledge space",
        });
      }

      return space;
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string().optional(),
        purpose: spacePurposeEnum,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.space.create({
        data: {
          name: input.name,
          description: input.description,
          purpose: input.purpose,
          owner: {
            connect: {
              clerkId: ctx.auth.userId,
            },
          },
          settings: {
            create: {
              defaultNoteType: "NOTE",
              enableSpacedRepetition: false,
              enableAIProcessing: true,
            },
          },
        },
        include: {
          settings: true,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1, "Name is required"),
        description: z.string().optional(),
        purpose: spacePurposeEnum,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const space = await ctx.db.space.findUnique({
        where: { id: input.id },
      });

      if (!space) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Knowledge space not found",
        });
      }

      if (space.ownerId !== ctx.auth.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this knowledge space",
        });
      }

      return ctx.db.space.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          purpose: input.purpose,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const space = await ctx.db.space.findUnique({
        where: { id: input.id },
      });

      if (!space) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Knowledge space not found",
        });
      }

      if (space.ownerId !== ctx.auth.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this knowledge space",
        });
      }

      return ctx.db.space.delete({
        where: { id: input.id },
      });
    }),

  updateSettings: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        settings: z.object({
          defaultNoteType: z.enum([
            "NOTE",
            "ARTICLE",
            "QUOTE",
            "THOUGHT",
            "QUESTION",
          ]),
          enableSpacedRepetition: z.boolean(),
          enableAIProcessing: z.boolean(),
          reviewSchedule: z.any().optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const space = await ctx.db.space.findUnique({
        where: { id: input.id },
        include: { settings: true },
      });

      if (!space) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Knowledge space not found",
        });
      }

      if (space.ownerId !== ctx.auth.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this knowledge space",
        });
      }

      return ctx.db.spaceSettings.upsert({
        where: {
          spaceId: input.id,
        },
        create: {
          spaceId: input.id,
          ...input.settings,
        },
        update: input.settings,
      });
    }),
});
