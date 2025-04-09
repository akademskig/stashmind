"use client";

import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import { NoteCard } from "~/components/NoteCard";
import { Loader } from "~/components/ui/loader";
import { useState } from "react";
import { Modal } from "~/components/Modal";
import { NoteForm } from "~/components/NoteForm";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";

export default function WorkspaceNotesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const id = params.workspaceId as string;

  const { data: workspace } = api.workspace.getById.useQuery({ id });
  const { data: notes } = api.note.getAllByWorkspace.useQuery({
    workspaceId: id,
  });

  if (!workspace) {
    return <Loader fullPage size="lg" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Notes</h1>
        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Note
        </Button>
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Note"
      >
        <NoteForm onSuccess={() => setIsModalOpen(false)} workspaceId={id} />
      </Modal>
    </div>
  );
}
