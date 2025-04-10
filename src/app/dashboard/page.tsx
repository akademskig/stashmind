"use client";

import { api } from "~/utils/api";
import Link from "next/link";
import { SpaceCard } from "~/components/SpaceCard";
import { Loader } from "~/components/ui/loader";

export default function DashboardPage() {
  const { data: spaces, isLoading } = api.space.getAll.useQuery();

  if (isLoading) {
    return <Loader fullPage size="lg" />;
  }

  return (
    <div className="space-y-8">
      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-gray-400">Total Spaces</h3>
          <p className="mt-2 text-3xl font-semibold text-white">
            {spaces?.length ?? 0}
          </p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-gray-400">Total Notes</h3>
          <p className="mt-2 text-3xl font-semibold text-white">
            {spaces?.reduce((acc, space) => acc + space._count.notes, 0) ?? 0}
          </p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-gray-400">Tags</h3>
          <p className="mt-2 text-3xl font-semibold text-white">
            {spaces?.reduce((acc, space) => acc + space._count.tags, 0) ?? 0}
          </p>
        </div>
      </div>

      {/* Recent Spaces Section */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Recent Spaces</h2>
          <Link
            href="/dashboard/spaces"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            View All Spaces
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {spaces
            ?.slice(0, 3)
            .map((space) => <SpaceCard key={space.id} space={space} />)}
        </div>
      </div>

      {/* Quick Actions Section */}
      <div>
        <h2 className="mb-6 text-2xl font-semibold text-white">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/dashboard/spaces/new"
            className="flex items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50 p-6 text-center backdrop-blur-sm hover:border-indigo-500"
          >
            <div>
              <h3 className="text-lg font-medium text-white">Create Space</h3>
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
