"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <header className="border-b border-white/10 bg-slate-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/stashmind-logo-white.png"
            alt="StashMind Logo"
            width={200}
            height={44}
            className="h-auto w-[180px]"
            priority
          />
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/dashboard/workspaces"
            className="text-sm text-gray-300 hover:text-white"
          >
            Workspaces
          </Link>
          <Link
            href="/notes"
            className="text-sm text-gray-300 hover:text-white"
          >
            Notes
          </Link>
          <Link
            href="/settings"
            className="text-sm text-gray-300 hover:text-white"
          >
            Settings
          </Link>
          <UserButton afterSignOutUrl="/" />
        </nav>
      </div>
    </header>
  );
}
