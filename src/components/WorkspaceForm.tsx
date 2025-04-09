"use client";

import { useState } from "react";
import { api } from "~/utils/api";
import { Button } from "./ui/button";
import { Loader } from "./ui/loader";

interface WorkspaceFormProps {
  onSuccess?: () => void;
}

export function WorkspaceForm({ onSuccess }: WorkspaceFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"PERSONAL" | "TEAM">("PERSONAL");
  const [error, setError] = useState("");
  const utils = api.useUtils();
  const createWorkspace = api.workspace.create.useMutation({
    onSuccess: () => {
      utils.workspace.getAll.invalidate();
      onSuccess?.();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Workspace name is required");
      return;
    }

    createWorkspace.mutate({
      name: name.trim(),
      description: description.trim(),
      type,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-white"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
          placeholder="My Workspace"
          required
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium text-white"
        >
          Description <span className="text-slate-400">(optional)</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none"
          placeholder="A space for my notes and ideas"
          rows={3}
        />
      </div>

      <div>
        <span className="mb-1 block text-sm font-medium text-white">
          Type <span className="text-red-500">*</span>
        </span>
        <div className="grid grid-cols-2 gap-3">
          <label
            className={`flex cursor-pointer items-center justify-center rounded-md border p-3 text-sm ${
              type === "PERSONAL"
                ? "border-cyan-500 bg-slate-800 text-white"
                : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600"
            }`}
          >
            <input
              type="radio"
              className="sr-only"
              value="PERSONAL"
              checked={type === "PERSONAL"}
              onChange={() => setType("PERSONAL")}
            />
            <span>Personal</span>
          </label>

          <label
            className={`flex cursor-pointer items-center justify-center rounded-md border p-3 text-sm ${
              type === "TEAM"
                ? "border-cyan-500 bg-slate-800 text-white"
                : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600"
            }`}
          >
            <input
              type="radio"
              className="sr-only"
              value="TEAM"
              checked={type === "TEAM"}
              onChange={() => setType("TEAM")}
            />
            <span>Team</span>
          </label>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-400/10 px-3 py-2 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          variant="primary"
          disabled={createWorkspace.isPending}
          className="w-full sm:w-auto"
        >
          {createWorkspace.isPending ? (
            <>
              <Loader size="sm" className="mr-2" />
              Creating...
            </>
          ) : (
            "Create Workspace"
          )}
        </Button>
      </div>
    </form>
  );
}
