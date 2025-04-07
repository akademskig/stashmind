"use client";

import Link from "next/link";

export function CreateWorkspaceButton() {
  return (
    <Link
      href="/workspaces/new"
      className="rounded-lg bg-blue-800/90 px-6 py-2 font-semibold text-white transition hover:bg-blue-700"
    >
      Create Workspace
    </Link>
  );
}
