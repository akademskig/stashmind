import { DashboardLayout } from "~/components/DashboardLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | StashMind",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
