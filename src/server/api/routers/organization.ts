import { z } from "zod";
import { MemberRole } from "@prisma/client";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const organizationRouter = createTRPCRouter({
  // Tag operations
  createTag: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        name: z.string().min(1).max(50),
        color: z
          .string()
          .regex(/^#[0-9A-Fa-f]{6}$/)
          .optional(),
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
        throw new Error("Not authorized to create tags in this workspace");
      }

      return ctx.db.tag.create({
        data: {
          name: input.name,
          color: input.color,
          workspace: { connect: { id: input.workspaceId } },
        },
      });
    }),

  getTags: protectedProcedure
    .input(z.object({ workspaceId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.tag.findMany({
        where: {
          workspaceId: input.workspaceId,
          workspace: {
            members: {
              some: {
                userId: ctx.auth.userId,
              },
            },
          },
        },
        include: {
          _count: {
            select: {
              notes: true,
            },
          },
        },
      });
    }),

  updateTag: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).max(50).optional(),
        color: z
          .string()
          .regex(/^#[0-9A-Fa-f]{6}$/)
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const tag = await ctx.db.tag.findFirst({
        where: {
          id: input.id,
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
      });

      if (!tag) {
        throw new Error("Not authorized to update this tag");
      }

      return ctx.db.tag.update({
        where: { id: input.id },
        data: {
          name: input.name,
          color: input.color,
        },
      });
    }),

  deleteTag: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const tag = await ctx.db.tag.findFirst({
        where: {
          id: input.id,
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
      });

      if (!tag) {
        throw new Error("Not authorized to delete this tag");
      }

      return ctx.db.tag.delete({
        where: { id: input.id },
      });
    }),

  // Category operations
  createCategory: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        name: z.string().min(1).max(100),
        description: z.string().max(500).optional(),
        parentId: z.string().optional(),
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
        throw new Error(
          "Not authorized to create categories in this workspace",
        );
      }

      // If parentId is provided, verify it exists in the same workspace
      if (input.parentId) {
        const parent = await ctx.db.category.findFirst({
          where: {
            id: input.parentId,
            workspaceId: input.workspaceId,
          },
        });

        if (!parent) {
          throw new Error("Parent category not found in this workspace");
        }
      }

      return ctx.db.category.create({
        data: {
          name: input.name,
          description: input.description,
          workspace: { connect: { id: input.workspaceId } },
          parent: input.parentId
            ? { connect: { id: input.parentId } }
            : undefined,
        },
        include: {
          parent: true,
          children: true,
        },
      });
    }),

  getCategories: protectedProcedure
    .input(z.object({ workspaceId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.category.findMany({
        where: {
          workspaceId: input.workspaceId,
          workspace: {
            members: {
              some: {
                userId: ctx.auth.userId,
              },
            },
          },
        },
        include: {
          parent: true,
          children: true,
          _count: {
            select: {
              notes: true,
            },
          },
        },
      });
    }),

  updateCategory: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).max(100).optional(),
        description: z.string().max(500).optional(),
        parentId: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.db.category.findFirst({
        where: {
          id: input.id,
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
      });

      if (!category) {
        throw new Error("Not authorized to update this category");
      }

      // If parentId is provided, verify it exists and prevent circular references
      if (input.parentId) {
        const parent = await ctx.db.category.findFirst({
          where: {
            id: input.parentId,
            workspaceId: category.workspaceId,
          },
        });

        if (!parent) {
          throw new Error("Parent category not found in this workspace");
        }

        // Check for circular reference
        let currentParent: typeof parent | null = parent;
        while (currentParent) {
          if (currentParent.id === category.id) {
            throw new Error(
              "Circular reference detected in category hierarchy",
            );
          }
          currentParent = await ctx.db.category.findFirst({
            where: { id: currentParent.parentId ?? "" },
          });
        }
      }

      return ctx.db.category.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          parent:
            input.parentId === null
              ? { disconnect: true }
              : input.parentId
                ? { connect: { id: input.parentId } }
                : undefined,
        },
        include: {
          parent: true,
          children: true,
        },
      });
    }),

  deleteCategory: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.db.category.findFirst({
        where: {
          id: input.id,
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
      });

      if (!category) {
        throw new Error("Not authorized to delete this category");
      }

      return ctx.db.category.delete({
        where: { id: input.id },
      });
    }),
});
