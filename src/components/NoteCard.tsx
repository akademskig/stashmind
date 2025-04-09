import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FileText } from "lucide-react";

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  updatedAt: Date;
  author: {
    name: string | null;
    imageUrl: string | null;
  };
}

export function NoteCard({
  id,
  title,
  content,
  updatedAt,
  author,
}: NoteCardProps) {
  const preview =
    content.length > 100 ? content.slice(0, 100) + "..." : content;

  return (
    <Link
      href={`/dashboard/notes/${id}`}
      className="group rounded-lg border border-slate-800 bg-slate-900 p-4 transition hover:border-slate-700"
    >
      <div className="mb-2 flex items-center gap-2">
        <FileText className="h-4 w-4 text-slate-500" />
        <h3 className="font-medium text-white group-hover:text-blue-400">
          {title}
        </h3>
      </div>
      <p className="mb-4 text-sm text-slate-400">{preview}</p>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{formatDistanceToNow(updatedAt, { addSuffix: true })}</span>
        {author.name && <span>{author.name}</span>}
      </div>
    </Link>
  );
}
