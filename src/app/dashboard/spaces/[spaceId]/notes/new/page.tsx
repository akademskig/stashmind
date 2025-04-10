"use client";

import { useParams, useRouter } from "next/navigation";
import { api } from "~/utils/api";
import { NoteForm } from "~/components/NoteForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewNotePage() {
  const params = useParams();
  const router = useRouter();
  const spaceId = params.spaceId as string;

  const { data: space } = api.space.getById.useQuery({ id: spaceId });

  const handleSuccess = () => {
    router.push(`/dashboard/spaces/${spaceId}/notes`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href={`/dashboard/spaces/${spaceId}/notes`}
            className="mb-2 inline-flex items-center text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Notes /   {space?.name && `in ${space.name}`}
          </Link>
        </div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <NoteForm spaceId={spaceId} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
