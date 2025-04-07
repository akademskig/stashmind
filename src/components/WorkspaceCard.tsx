"use client";

import { type Workspace } from "@prisma/client";
import Link from "next/link";

interface WorkspaceCardProps {
  workspace: Workspace;
}

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  return (
    <Link
      href={`/workspaces/${workspace.id}`}
      className="glass-card rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-lg transition hover:bg-white/20"
    >
      <h3 className="mb-2 text-xl font-semibold text-white">
        {workspace.name}
      </h3>
      <p className="text-blue-200">{workspace.description}</p>
    </Link>
  );
}
