"use server";

import { currentUser } from "@clerk/nextjs/server";
import { createCallerFactory } from "~/server/api/trpc";
import { appRouter } from "~/server/api/root";
import { db } from "~/server/db";

const createCaller = createCallerFactory(appRouter);

export async function syncUser() {
  const user = await currentUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const caller = createCaller({
    db,
    auth: {
      userId: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      name: `${user.firstName} ${user.lastName}`.trim(),
      image: user.imageUrl,
    },
  });

  await caller.auth.syncUser();
}
