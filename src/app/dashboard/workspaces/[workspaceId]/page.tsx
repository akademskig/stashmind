"use client";

import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import Link from "next/link";
import { FileText, Users, Settings } from "lucide-react";
import { Loader } from "~/components/ui/loader";

export default function WorkspacePage() {
  const params = useParams();
  const id = params.workspaceId as string;

  const { data: workspace } = api.workspace.getById.useQuery({ id });

  if (!workspace) {
    return <Loader fullPage />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            {workspace.name}
          </h1>
          {workspace.description && (
            <p className="mt-1 text-slate-400">{workspace.description}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href={`/dashboard/workspaces/${id}/notes`}
          className="group rounded-lg border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
            <FileText className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-white group-hover:text-blue-400">
            Notes
          </h3>
          <p className="text-sm text-slate-400">
            Create and manage your notes in this workspace
          </p>
        </Link>

        <Link
          href={`/dashboard/workspaces/${id}/teams`}
          className="group rounded-lg border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
            <Users className="h-6 w-6 text-purple-400" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-white group-hover:text-purple-400">
            Team
          </h3>
          <p className="text-sm text-slate-400">
            Manage team members and their permissions
          </p>
        </Link>

        <Link
          href={`/dashboard/workspaces/${id}/settings`}
          className="group rounded-lg border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-500/10">
            <Settings className="h-6 w-6 text-slate-400" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-white group-hover:text-slate-300">
            Settings
          </h3>
          <p className="text-sm text-slate-400">
            Configure workspace settings and preferences
          </p>
        </Link>
      </div>
    </div>
  );
}
