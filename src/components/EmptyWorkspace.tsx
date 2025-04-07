"use client";

import Link from "next/link";

export function EmptyWorkspace() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-semibold text-white">No workspaces yet</h2>
      <Link
        href="/workspaces/new"
        className="rounded-lg bg-blue-800/90 px-6 py-2 font-semibold text-white transition hover:bg-blue-700"
      >
        Create Workspace
      </Link>
    </div>
  );
}
