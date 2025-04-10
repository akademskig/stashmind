"use client";

import { useParams } from "next/navigation";
import { api } from "~/utils/api";
import { NoteCard } from "~/components/NoteCard";
import { Loader } from "~/components/ui/loader";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function SpaceNotesPage() {
  const params = useParams();
  const id = params.spaceId as string;

  const { data: space } = api.space.getById.useQuery({ id });
  const { data: notes } = api.note.getAllBySpace.useQuery({
    spaceId: id,
  });

  if (!space) {
    return <Loader fullPage size="lg" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Notes</h1>
          <p className="mt-1 text-sm text-slate-400">
            {space.name && `in ${space.name}`}
          </p>
        </div>
        <Link href={`/dashboard/spaces/${id}/notes/new`}>
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Note
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notes?.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-slate-800 bg-slate-900 p-8 text-center">
            <h3 className="mb-2 text-lg font-medium text-white">
              No notes yet
            </h3>
            <p className="mb-6 text-sm text-slate-400">
              Create your first note to start organizing your knowledge
            </p>
            <Link href={`/dashboard/spaces/${id}/notes/new`}>
              <Button variant="primary" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create First Note
              </Button>
            </Link>
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
