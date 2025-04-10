"use client";

import { useState } from "react";
import { api } from "~/utils/api";
import { Modal } from "~/components/Modal";
import { SpaceForm } from "~/components/SpaceForm";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { Loader } from "~/components/ui/loader";
import { SpaceCard } from "~/components/SpaceCard";

export default function SpacesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: spaces, isLoading } = api.space.getAll.useQuery();

  return (
    <div className="bg-slate-950 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Knowledge Spaces</h1>
            <p className="mt-2 text-slate-400">
              Organize and grow your personal knowledge collection
            </p>
          </div>
          <Button
            variant="primary"
            className="flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Create Space
          </Button>
        </div>

        {/* Knowledge Spaces grid */}
        {isLoading ? (
          <Loader size="lg" />
        ) : !spaces?.length ? (
          <Card className="p-8 text-center">
            <h2 className="mb-2 text-xl font-semibold text-white">
              No knowledge spaces yet
            </h2>
            <p className="mb-6 text-slate-400">
              Create your first knowledge space to start organizing your
              learning journey.
            </p>
            <Button
              variant="primary"
              className="mx-auto flex items-center gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Create Space
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {spaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create Knowledge Space"
        >
          <SpaceForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>
      </div>
    </div>
  );
}
