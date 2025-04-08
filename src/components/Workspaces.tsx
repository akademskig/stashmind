"use client";

import { api } from "~/utils/api";
import { WorkspaceCard } from "./WorkspaceCard";
import { EmptyWorkspace } from "./EmptyWorkspace";
import { Loader2 } from "lucide-react";

export function Workspaces() {
  const { data: workspaces, isLoading } = api.workspace.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (!workspaces?.length) {
    return <EmptyWorkspace />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {workspaces.map((workspace) => (
        <WorkspaceCard key={workspace.id} workspace={workspace} />
      ))}
    </div>
  );
}
