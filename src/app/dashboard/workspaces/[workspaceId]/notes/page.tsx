"use client";

import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import { NoteCard } from "~/components/NoteCard";

export default function WorkspaceNotesPage() {
  const params = useParams();
  const id = params.workspaceId as string;

  const { data: workspace } = api.workspace.getById.useQuery({ id });
  const { data: notes } = api.note.getAllByWorkspace.useQuery({
    workspaceId: id,
  });

  if (!workspace) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Notes</h1>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          New Note
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notes?.length === 0 ? (
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
            <h3 className="mb-2 text-lg font-medium text-white">
              No notes yet
            </h3>
            <p className="text-sm text-slate-400">
              Create your first note to get started
            </p>
          </div>
        ) : (
          notes?.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              updatedAt={note.updatedAt}
              author={note.author}
            />
          ))
        )}
      </div>
    </div>
  );
}
