"use client";

import { useState } from "react";
import { Workspaces } from "~/components/Workspaces";
import { Modal } from "~/components/Modal";
import { WorkspaceForm } from "~/components/WorkspaceForm";

export default function WorkspacesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Your Workspaces</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Create Workspace
        </button>
      </div>
      <Workspaces />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Workspace"
      >
        <WorkspaceForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
