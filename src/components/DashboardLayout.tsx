"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-slate-950">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-8">
        <div className="flex items-center gap-8">
          <Button
            variant="icon"
            className="md:hidden p-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <Link href="/dashboard">
            <Image
              src="/stashmind-logo-white.png"
              alt="StashMind"
              width={280}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Dashboard Header containing navigation and user menu */}
        <DashboardHeader />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} />

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-auto bg-slate-950 p-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
