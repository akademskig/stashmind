"use client";

import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import Link from "next/link";
import { FileText, Brain, Settings, BookOpen, Lightbulb } from "lucide-react";
import { Loader } from "~/components/ui/loader";

export default function SpacePage() {
  const params = useParams();
  const id = params.spaceId as string;

  const { data: space } = api.space.getById.useQuery({ id });

  if (!space) {
    return <Loader fullPage size="lg" />;
  }

  const purposeIcons = {
    GENERAL: FileText,
    LEARNING: Brain,
    READING: BookOpen,
    RESEARCH: Lightbulb,
    JOURNAL: FileText,
  };

  const PurposeIcon = purposeIcons[space.purpose];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/20`}
          >
            <PurposeIcon className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">{space.name}</h1>
            {space.description && (
              <p className="mt-1 text-slate-400">{space.description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href={`/dashboard/spaces/${id}/notes`}
          className="group rounded-lg border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
            <FileText className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-white group-hover:text-blue-400">
            Notes
          </h3>
          <p className="text-sm text-slate-400">
            Create and manage your knowledge notes
          </p>
        </Link>

        <Link
          href={`/dashboard/spaces/${id}/memory`}
          className="group rounded-lg border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
            <Brain className="h-6 w-6 text-purple-400" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-white group-hover:text-purple-400">
            Memory Review
          </h3>
          <p className="text-sm text-slate-400">
            Review and strengthen your knowledge
          </p>
        </Link>

        <Link
          href={`/dashboard/spaces/${id}/connections`}
          className="group rounded-lg border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
            <Lightbulb className="h-6 w-6 text-green-400" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-white group-hover:text-green-400">
            Connections
          </h3>
          <p className="text-sm text-slate-400">
            Explore relationships between your notes
          </p>
        </Link>

        <Link
          href={`/dashboard/spaces/${id}/settings`}
          className="group rounded-lg border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-500/10">
            <Settings className="h-6 w-6 text-slate-400" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-white group-hover:text-slate-300">
            Settings
          </h3>
          <p className="text-sm text-slate-400">
            Configure space settings and preferences
          </p>
        </Link>
      </div>
    </div>
  );
}
