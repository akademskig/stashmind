"use client";

import { api } from "~/utils/api";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { WorkspaceCard } from "~/components/WorkspaceCard";

export default function DashboardPage() {
  const { data: workspaces, isLoading } = api.workspace.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-gray-400">
            Total Workspaces
          </h3>
          <p className="mt-2 text-3xl font-semibold text-white">
            {workspaces?.length ?? 0}
          </p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-gray-400">Total Notes</h3>
          <p className="mt-2 text-3xl font-semibold text-white">
            {workspaces?.reduce((acc, ws) => acc + ws._count.notes, 0) ?? 0}
          </p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-gray-400">Categories</h3>
          <p className="mt-2 text-3xl font-semibold text-white">
            {workspaces?.reduce((acc, ws) => acc + ws._count.categories, 0) ??
              0}
          </p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-gray-400">Tags</h3>
          <p className="mt-2 text-3xl font-semibold text-white">
            {workspaces?.reduce((acc, ws) => acc + ws._count.tags, 0) ?? 0}
          </p>
        </div>
      </div>

      {/* Recent Workspaces Section */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">
            Recent Workspaces
          </h2>
          <Link
            href="/dashboard/workspaces"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            View All Workspaces
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workspaces
            ?.slice(0, 3)
            .map((workspace) => (
              <WorkspaceCard key={workspace.id} workspace={workspace} />
            ))}
        </div>
      </div>

      {/* Quick Actions Section */}
      <div>
        <h2 className="mb-6 text-2xl font-semibold text-white">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/dashboard/workspaces/new"
            className="flex items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50 p-6 text-center backdrop-blur-sm hover:border-indigo-500"
          >
            <div>
              <h3 className="text-lg font-medium text-white">
                Create Workspace
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                Start organizing your knowledge
              </p>
            </div>
          </Link>
          <Link
            href="/dashboard/notes/new"
            className="flex items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50 p-6 text-center backdrop-blur-sm hover:border-indigo-500"
          >
            <div>
              <h3 className="text-lg font-medium text-white">Add Note</h3>
              <p className="mt-1 text-sm text-gray-400">
                Capture your thoughts quickly
              </p>
            </div>
          </Link>
          <Link
            href="/dashboard/categories"
            className="flex items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50 p-6 text-center backdrop-blur-sm hover:border-indigo-500"
          >
            <div>
              <h3 className="text-lg font-medium text-white">
                Manage Categories
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                Organize your content
              </p>
            </div>
          </Link>
          <Link
            href="/dashboard/tags"
            className="flex items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50 p-6 text-center backdrop-blur-sm hover:border-indigo-500"
          >
            <div>
              <h3 className="text-lg font-medium text-white">Manage Tags</h3>
              <p className="mt-1 text-sm text-gray-400">
                Label and find content easily
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
