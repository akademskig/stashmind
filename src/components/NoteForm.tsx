"use client";

import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { Button } from "./ui/button";
import { Loader } from "./ui/loader";
import MDEditor from "@uiw/react-md-editor";
import { Card } from "./ui/card";
import { toast } from "sonner";

interface NoteFormProps {
  spaceId: string;
  onSuccess?: () => void;
  initialData?: {
    id: string;
    title: string;
    content: string;
  };
}

interface DraftNote {
  title: string;
  content: string;
  lastSaved: number;
}

const AUTOSAVE_DELAY = 2000; // 2 seconds
const DRAFT_KEY_PREFIX = "note_draft_";

export function NoteForm({ spaceId, onSuccess, initialData }: NoteFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [error, setError] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const utils = api.useUtils();

  const draftKey = `${DRAFT_KEY_PREFIX}${spaceId}${initialData?.id ?? "new"}`;

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      const draft: DraftNote = JSON.parse(savedDraft) as DraftNote;
      const draftAge = Date.now() - draft.lastSaved;
      const draftAgeHours = draftAge / (1000 * 60 * 60);

      // Only restore drafts less than 24 hours old
      if (draftAgeHours < 24) {
        const shouldRestore = window.confirm(
          "We found a saved draft. Would you like to restore it?",
        );
        if (shouldRestore) {
          setTitle(draft.title);
          setContent(draft.content);
          setLastSaved(new Date(draft.lastSaved));
        } else {
          localStorage.removeItem(draftKey);
        }
      } else {
        localStorage.removeItem(draftKey);
      }
    }
  }, [draftKey]);

  // Autosave effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title.trim() || content.trim()) {
        const draft: DraftNote = {
          title,
          content,
          lastSaved: Date.now(),
        };
        localStorage.setItem(draftKey, JSON.stringify(draft));
        setLastSaved(new Date());
      }
    }, AUTOSAVE_DELAY);

    return () => clearTimeout(timer);
  }, [title, content, draftKey]);

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void utils.note.getAllBySpace.invalidate({ spaceId });
      localStorage.removeItem(draftKey);
      toast.success("Note created successfully");
      onSuccess?.();
    },
    onError: (error) => {
      setError(error.message);
      toast.error("Failed to create note");
    },
  });

  const updateNote = api.note.update.useMutation({
    onSuccess: () => {
      void utils.note.getAllBySpace.invalidate({ spaceId });
      localStorage.removeItem(draftKey);
      toast.success("Note updated successfully");
      onSuccess?.();
    },
    onError: (error) => {
      setError(error.message);
      toast.error("Failed to update note");
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
        <Card className="min-h-[500px] overflow-hidden border-slate-700 bg-slate-800 p-0 [&_[data-color-mode='light']]:!bg-slate-800">
          <MDEditor
            value={content}
            onChange={(val) => setContent(val ?? "")}
            preview="live"
            height={500}
            hideToolbar={false}
            enableScroll={true}
            textareaProps={{
              placeholder:
                "Write your note here...\n\nSupports Markdown formatting",
            }}
            previewOptions={{
              className: "prose prose-invert max-w-none px-4",
            }}
          />
        </Card>
      </div>

      {error && (
        <div className="animate-fade-in rounded-md bg-red-400/10 px-3 py-2 text-sm text-red-400 transition-all duration-200">
          {error}
        </div>
      )}

      <div className="animate-fade-in flex items-center justify-between pt-2 [animation-delay:200ms]">
        <div className="text-sm text-slate-400">
          {lastSaved && (
            <span>Last saved {lastSaved.toLocaleTimeString()}</span>
          )}
        </div>
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
