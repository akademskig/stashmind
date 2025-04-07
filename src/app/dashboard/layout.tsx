import { DashboardHeader } from "~/components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </div>
    </div>
  );
}
