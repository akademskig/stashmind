import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { WorkspaceType, MemberRole } from "@prisma/client";

export const workspaceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        description: z.string().max(500).optional(),
        type: z.enum([WorkspaceType.PERSONAL, WorkspaceType.TEAM]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.workspace.create({
        data: {
          name: input.name,
          description: input.description,
          type: input.type,
          owner: {
            connect: { id: ctx.auth.userId },
          },
          members: {
            create: {
              userId: ctx.auth.userId,
              role: MemberRole.OWNER,
            },
          },
        },
        include: {
          members: true,
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.workspace.findMany({
      where: {
        members: {
          some: {
            userId: ctx.auth.userId,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                imageUrl: true,
              },
            },
          },
        },
        _count: {
          select: {
            notes: true,
            categories: true,
            tags: true,
          },
        },
      },
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.workspace.findFirst({
        where: {
          id: input.id,
          members: {
            some: {
              userId: ctx.auth.userId,
            },
          },
        },
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  imageUrl: true,
                },
              },
            },
          },
          categories: true,
          tags: true,
          _count: {
            select: {
              notes: true,
            },
          },
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).max(100).optional(),
        description: z.string().max(500).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify user is owner or admin
      const workspace = await ctx.db.workspace.findFirst({
        where: {
          id: input.id,
          members: {
            some: {
              userId: ctx.auth.userId,
              role: {
                in: [MemberRole.OWNER, MemberRole.ADMIN],
              },
            },
          },
        },
      });

      if (!workspace) {
        throw new Error("Not authorized to update this workspace");
      }

      return ctx.db.workspace.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  addMember: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        userEmail: z.string().email(),
        role: z.enum([MemberRole.ADMIN, MemberRole.MEMBER, MemberRole.VIEWER]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify user is owner or admin
      const workspace = await ctx.db.workspace.findFirst({
        where: {
          id: input.workspaceId,
          members: {
            some: {
              userId: ctx.auth.userId,
              role: {
                in: [MemberRole.OWNER, MemberRole.ADMIN],
              },
            },
          },
        },
      });

      if (!workspace) {
        throw new Error("Not authorized to add members to this workspace");
      }

      const userToAdd = await ctx.db.clerkUser.findUnique({
        where: { email: input.userEmail },
      });

      if (!userToAdd) {
        throw new Error("User not found");
      }

      return ctx.db.workspaceMember.create({
        data: {
          workspace: { connect: { id: input.workspaceId } },
          user: { connect: { id: userToAdd.id } },
          role: input.role,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              imageUrl: true,
            },
          },
        },
      });
    }),

  removeMember: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify user is owner or admin
      const workspace = await ctx.db.workspace.findFirst({
        where: {
          id: input.workspaceId,
          members: {
            some: {
              userId: ctx.auth.userId,
              role: {
                in: [MemberRole.OWNER, MemberRole.ADMIN],
              },
            },
          },
        },
      });

      if (!workspace) {
        throw new Error("Not authorized to remove members from this workspace");
      }

      return ctx.db.workspaceMember.deleteMany({
        where: {
          workspaceId: input.workspaceId,
          userId: input.userId,
          // Prevent removing the owner
          role: { not: MemberRole.OWNER },
        },
      });
    }),
});
