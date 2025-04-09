"use client";

import { useParams } from "next/navigation";
import { api } from "~/utils/api";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Plus, Loader2, FileText, Users } from "lucide-react";

export default function WorkspacePage() {
  const { id } = useParams<{ id: string }>();
  const { data: workspace, isLoading } = api.workspace.getById.useQuery({ id });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (!workspace) {
    return (
      <Card className="p-8 text-center">
        <h2 className="mb-2 text-xl font-semibold text-white">
          Workspace not found
        </h2>
        <p className="text-slate-400">
          The workspace you are looking for does not exist or you don't have
          access to it.
        </p>
      </Card>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-md bg-cyan-500/20`}
          >
            {workspace.type === "TEAM" ? (
              <Users className="h-5 w-5 text-cyan-400" />
            ) : (
              <FileText className="h-5 w-5 text-cyan-400" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-white">{workspace.name}</h1>
        </div>
        {workspace.description && (
          <p className="mt-2 text-slate-400">{workspace.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex h-40 cursor-pointer items-center justify-center p-6 transition-all hover:scale-[1.02]">
          <Button
            variant="ghost"
            className="flex h-full w-full flex-col items-center justify-center gap-3"
          >
            <Plus className="h-8 w-8 text-cyan-400" />
            <span className="text-base font-medium">Create New Note</span>
          </Button>
        </Card>
      </div>
    </div>
  );
}
