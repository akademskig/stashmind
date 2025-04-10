"use client";

import { type RouterOutputs } from "~/utils/api";
import { Card } from "./ui/card";
import { useRouter } from "next/navigation";
import { FileText, ChevronRight } from "lucide-react";

type Space = RouterOutputs["space"]["getAll"][number];

interface SpaceCardProps {
  space: Space;
  active?: boolean;
}

export function SpaceCard({ space, active = false }: SpaceCardProps) {
  const router = useRouter();

  return (
    <Card
      active={active}
      className="cursor-pointer"
      onClick={() => router.push(`/dashboard/spaces/${space.id}`)}
    >
      <div className="relative p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-md ${active ? "bg-cyan-500/20" : "bg-slate-700/50"}`}
            >
              <FileText
                className={`h-5 w-5 ${active ? "text-cyan-400" : "text-slate-300"}`}
              />
            </div>
            <div>
              <h3 className="text-base font-medium text-white">{space.name}</h3>
              {space.description && (
                <p className="mt-1 text-xs text-slate-400">
                  {space.description}
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
