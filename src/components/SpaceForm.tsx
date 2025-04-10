"use client";

import { useState } from "react";
import { api } from "~/utils/api";
import { Button } from "./ui/button";
import { Loader } from "./ui/loader";

interface SpaceFormProps {
  onSuccess?: () => void;
}

export function SpaceForm({ onSuccess }: SpaceFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [purpose, setPurpose] = useState<
    "GENERAL" | "LEARNING" | "READING" | "RESEARCH" | "JOURNAL"
  >("GENERAL");
  const [error, setError] = useState("");
  const utils = api.useUtils();

  const createKnowledgeSpace = api.space.create.useMutation({
    onSuccess: () => {
      void utils.space.getAll.invalidate();
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
      setError("Knowledge space name is required");
      return;
    }

    createKnowledgeSpace.mutate({
      name: name.trim(),
      description: description.trim(),
      purpose,
    });
  };

  const purposeOptions = [
    {
      value: "GENERAL",
      label: "General Notes",
      description: "For general note-taking and ideas",
    },
    {
      value: "LEARNING",
      label: "Learning",
      description: "For courses, tutorials, and learning projects",
    },
    {
      value: "READING",
      label: "Reading",
      description: "For book notes, articles, and papers",
    },
    {
      value: "RESEARCH",
      label: "Research",
      description: "For research projects and deep dives",
    },
    {
      value: "JOURNAL",
      label: "Journal",
      description: "For personal reflections and thoughts",
    },
  ] as const;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="animate-fade-in">
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
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 transition-all duration-200 focus:border-cyan-500 focus:outline-none"
          placeholder="My Knowledge Space"
          required
        />
      </div>

      <div className="animate-fade-in [animation-delay:100ms]">
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
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 transition-all duration-200 focus:border-cyan-500 focus:outline-none"
          placeholder="A space for organizing my knowledge"
          rows={3}
        />
      </div>

      <div className="animate-fade-in [animation-delay:200ms]">
        <span className="mb-1 block text-sm font-medium text-white">
          Purpose <span className="text-red-500">*</span>
        </span>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {purposeOptions.map((option) => (
            <label
              key={option.value}
              className={`flex cursor-pointer flex-col rounded-md border p-3 text-sm transition-all duration-200 ${
                purpose === option.value
                  ? "border-cyan-500 bg-slate-800 text-white"
                  : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600"
              }`}
            >
              <input
                type="radio"
                className="sr-only"
                value={option.value}
                checked={purpose === option.value}
                onChange={() => setPurpose(option.value)}
              />
              <span className="font-medium">{option.label}</span>
              <span className="mt-1 text-xs opacity-80">
                {option.description}
              </span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <div className="animate-fade-in rounded-md bg-red-400/10 px-3 py-2 text-sm text-red-400 transition-all duration-200">
          {error}
        </div>
      )}

      <div className="animate-fade-in flex justify-end pt-2 [animation-delay:300ms]">
        <Button
          type="submit"
          variant="primary"
          disabled={createKnowledgeSpace.isPending}
          className="w-full transition-all duration-200 sm:w-auto"
        >
          {createKnowledgeSpace.isPending ? (
            <>
              <Loader size="sm" className="mr-2" />
              Creating...
            </>
          ) : (
            "Create Knowledge Space"
          )}
        </Button>
      </div>
    </form>
  );
}
