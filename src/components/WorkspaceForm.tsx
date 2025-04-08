"use client";

import { useState } from "react";
import { api } from "~/utils/api";
import { Loader2 } from "lucide-react";

interface WorkspaceFormProps {
  onSuccess?: () => void;
}

export function WorkspaceForm({ onSuccess }: WorkspaceFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"PERSONAL" | "TEAM">("PERSONAL");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    type?: string;
  }>({});

  const utils = api.useUtils();
  const { mutate: createWorkspace, isPending } =
    api.workspace.create.useMutation({
      onSuccess: () => {
        utils.workspace.getAll.invalidate();
        onSuccess?.();
      },
      onError: (error) => {
        setError(error.message);
      },
    });

  const validateForm = () => {
    const errors: { name?: string; type?: string } = {};

    if (!name.trim()) {
      errors.name = "Workspace name is required";
    }

    if (!type) {
      errors.type = "Workspace type is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    createWorkspace({ name, description, type });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-400"
        >
          Workspace Name *
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (formErrors.name) {
              setFormErrors((prev) => ({ ...prev, name: undefined }));
            }
          }}
          className={`mt-1 block w-full rounded-lg border px-4 py-2 text-white backdrop-blur-sm focus:outline-none ${
            formErrors.name
              ? "border-red-500 bg-red-900/20"
              : "border-gray-800 bg-gray-900/50 focus:border-indigo-500"
          }`}
          required
        />
        {formErrors.name && (
          <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-400"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-2 text-white backdrop-blur-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-400"
        >
          Workspace Type *
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => {
            setType(e.target.value as "PERSONAL" | "TEAM");
            if (formErrors.type) {
              setFormErrors((prev) => ({ ...prev, type: undefined }));
            }
          }}
          className={`mt-1 block w-full rounded-lg border px-4 py-2 text-white backdrop-blur-sm focus:outline-none ${
            formErrors.type
              ? "border-red-500 bg-red-900/20"
              : "border-gray-800 bg-gray-900/50 focus:border-indigo-500"
          }`}
          required
        >
          <option value="PERSONAL">Personal</option>
          <option value="TEAM">Team</option>
        </select>
        {formErrors.type && (
          <p className="mt-1 text-sm text-red-500">{formErrors.type}</p>
        )}
      </div>

      {error && (
        <div className="rounded-lg bg-red-900/50 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Create Workspace"
          )}
        </button>
      </div>
    </form>
  );
}
