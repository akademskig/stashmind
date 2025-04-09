"use client";

import Link from "next/link";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Settings, LogOut, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

export function DashboardHeader() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-1 items-center justify-end md:justify-between">
      {/* Navigation Links */}
      <div className="ml-8 hidden items-center gap-6 md:flex">
        <Link
          href="/dashboard/workspaces"
          className="flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
        >
          <span>Workspaces</span>
        </Link>

        <Link
          href="/dashboard/teams"
          className="flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
        >
          <span>Teams</span>
        </Link>
      </div>

      {/* Search and User Menu */}
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-md border border-slate-800 bg-slate-900 py-2 pr-4 pl-10 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* User Menu */}
        <div className="relative">
          <Button
            variant="ghost"
            className="flex items-center gap-2 px-3 py-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <Image
                src={
                  user?.imageUrl ??
                  "https://ui-avatars.com/api/?name=User&background=818cf8&color=fff"
                }
                alt={user?.fullName ?? "User"}
                width={32}
                height={32}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm font-medium">
              {user?.fullName?.split(" ")[0] ?? "User"}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>

          {isMenuOpen && (
            <>
              {/* Backdrop for closing the menu on outside click */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsMenuOpen(false)}
              />

              {/* User menu dropdown */}
              <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-slate-700 bg-slate-800 py-1 shadow-lg">
                <Link
                  href="/dashboard/profile"
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>

                <SignOutButton>
                  <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-slate-700">
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </button>
                </SignOutButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
