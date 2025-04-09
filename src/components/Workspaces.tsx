"use client";

import { api } from "~/trpc/react";
import { WorkspaceCard } from "./WorkspaceCard";
import { Loader2 } from "lucide-react";

export function Workspaces() {
  const { data: workspaces, isLoading } = api.workspace.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!workspaces?.length) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/10 p-8 text-center">
        <h3 className="text-lg font-medium text-white">No workspaces yet</h3>
        <p className="mt-2 text-sm text-slate-400">
          Create your first workspace to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {workspaces.map((workspace) => (
        <WorkspaceCard key={workspace.id} workspace={workspace} />
      ))}
    </div>
  );
}
