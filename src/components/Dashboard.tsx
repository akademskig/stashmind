'use client';

import { api } from "../utils/api";
import Link from "next/link";
import { type Workspace } from "@prisma/client";
import { Loader2 } from "lucide-react";

export function Dashboard() {
  const { data: workspaces, isLoading } = api.workspace.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (!workspaces?.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold text-white">
          No workspaces yet
        </h2>
        <Link
          href="/workspaces/new"
          className="rounded-lg bg-blue-800/90 px-6 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Create Workspace
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Your Workspaces</h2>
          <Link
            href="/workspaces/new"
            className="rounded-lg bg-blue-800/90 px-6 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Create Workspace
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workspaces.map((workspace: Workspace) => (
            <div
              key={workspace.id}
              className="glass-card rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-lg"
            >
              <h3 className="mb-2 text-xl font-semibold text-white">
                {workspace.name}
              </h3>
              <p className="text-blue-200">{workspace.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}