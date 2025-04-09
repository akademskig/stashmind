"use client";

import { useState } from "react";
import { api } from "~/utils/api";
import { WorkspaceCard } from "~/components/WorkspaceCard";
import { Modal } from "~/components/Modal";
import { WorkspaceForm } from "~/components/WorkspaceForm";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { Loader } from "~/components/ui/loader";

export default function WorkspacesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: workspaces, isLoading } = api.workspace.getAll.useQuery();

  return (
    <div className="bg-slate-950 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Workspaces</h1>
            <p className="mt-2 text-slate-400">
              Organize your projects and collaborate with your team
            </p>
          </div>
          <Button
            variant="primary"
            className="flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Create Workspace
          </Button>
        </div>

        {/* Workspaces grid */}
        {isLoading ? (
          <Loader />
        ) : !workspaces?.length ? (
          <Card className="p-8 text-center">
            <h2 className="mb-2 text-xl font-semibold text-white">
              No workspaces yet
            </h2>
            <p className="mb-6 text-slate-400">
              Create your first workspace to start organizing your knowledge.
            </p>
            <Button
              variant="primary"
              className="mx-auto flex items-center gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Create Workspace
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workspaces.map((workspace) => (
              <WorkspaceCard key={workspace.id} workspace={workspace} />
            ))}
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create Workspace"
        >
          <WorkspaceForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>
      </div>
    </div>
  );
}
