"use client";

import { EmptyWorkspace } from "~/components/EmptyWorkspace";
import { Loader2 } from "lucide-react";
import { api } from "~/utils/api";
import { CreateWorkspaceButton } from "~/components/CreateWorkspaceButton";
import { WorkspaceCard } from "~/components/WorkspaceCard";

export default function WorkspacesPage() {
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
    <div className="mb-8 flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-white">Your Workspaces</h2>
      <CreateWorkspaceButton />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workspaces.map((workspace) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} />
        ))}
      </div>
    </div>
  );
}
