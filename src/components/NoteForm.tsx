"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { Loader } from "./ui/loader";

interface NoteFormProps {
  spaceId: string;
  onSuccess?: () => void;
  initialData?: {
    id: string;
    title: string;
    content: string;
  };
}

export function NoteForm({ spaceId, onSuccess, initialData }: NoteFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [error, setError] = useState("");
  const utils = api.useUtils();

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void utils.note.getAllBySpace.invalidate({ spaceId });
      onSuccess?.();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const updateNote = api.note.update.useMutation({
    onSuccess: () => {
      void utils.note.getAllBySpace.invalidate({ spaceId });
      onSuccess?.();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Note title is required");
      return;
    }

    if (initialData) {
      updateNote.mutate({
        id: initialData.id,
        title: title.trim(),
        content: content.trim(),
      });
    } else {
      createNote.mutate({
        spaceId,
        title: title.trim(),
        content: content.trim(),
        contentType: "MARKDOWN",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="animate-fade-in">
        <label
          htmlFor="title"
          className="mb-1 block text-sm font-medium text-white"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 transition-all duration-200 focus:border-cyan-500 focus:outline-none"
          placeholder="My Note"
          required
        />
      </div>

      <div className="animate-fade-in [animation-delay:100ms]">
        <label
          htmlFor="content"
          className="mb-1 block text-sm font-medium text-white"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 transition-all duration-200 focus:border-cyan-500 focus:outline-none"
          placeholder="Write your note here..."
          rows={8}
        />
      </div>

      {error && (
        <div className="animate-fade-in rounded-md bg-red-400/10 px-3 py-2 text-sm text-red-400 transition-all duration-200">
          {error}
        </div>
      )}

      <div className="animate-fade-in flex justify-end pt-2 [animation-delay:200ms]">
        <Button
          type="submit"
          variant="primary"
          disabled={createNote.isPending || updateNote.isPending}
          className="w-full transition-all duration-200 sm:w-auto"
        >
          {createNote.isPending || updateNote.isPending ? (
            <>
              <Loader size="sm" className="mr-2" />
              {initialData ? "Updating..." : "Creating..."}
            </>
          ) : initialData ? (
            "Update Note"
          ) : (
            "Create Note"
          )}
        </Button>
      </div>
    </form>
  );
}
