"use client";

import { type RouterOutputs } from "~/utils/api";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Users, FileText, ChevronRight } from "lucide-react";

type Workspace = RouterOutputs["workspace"]["getAll"][number];

interface WorkspaceCardProps {
  workspace: Workspace;
  active?: boolean;
}

export function WorkspaceCard({
  workspace,
  active = false,
}: WorkspaceCardProps) {
  const router = useRouter();

  return (
    <Card
      active={active}
      className="cursor-pointer"
      onClick={() => router.push(`/dashboard/workspaces/${workspace.id}`)}
    >
      <div className="relative p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-md ${active ? "bg-cyan-500/20" : "bg-slate-700/50"}`}
            >
              {workspace.type === "TEAM" ? (
                <Users
                  className={`h-5 w-5 ${active ? "text-cyan-400" : "text-slate-300"}`}
                />
              ) : (
                <FileText
                  className={`h-5 w-5 ${active ? "text-cyan-400" : "text-slate-300"}`}
                />
              )}
            </div>
            <div>
              <h3 className="text-base font-medium text-white">
                {workspace.name}
              </h3>
              {workspace.description && (
                <p className="mt-1 text-xs text-slate-400">
                  {workspace.description}
                </p>
              )}
            </div>
          </div>
          <ChevronRight
            className={`h-5 w-5 ${active ? "text-cyan-400" : "text-slate-500"}`}
          />
        </div>

        {active && (
          <div className="mt-3 border-t border-slate-700/50 pt-3">
            <span className="text-xs text-cyan-400">Active</span>
          </div>
        )}
      </div>
    </Card>
  );
}
