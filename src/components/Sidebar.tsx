"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { Home, Users, EarthIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isMobileMenuOpen: boolean;
}

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    icon: Home,
    label: "Home",
  },
  {
    href: "/dashboard/spaces",
    icon: EarthIcon,
    label: "Spaces",
  },
  {
    href: "/dashboard/teams",
    icon: Users,
    label: "Teams",
  },
];

export function Sidebar({ isMobileMenuOpen }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-16 flex-shrink-0 flex-col bg-slate-900 transition-transform md:relative md:translate-x-0 ${
        isMobileMenuOpen
          ? "translate-x-0"
          : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div className="flex flex-col items-center gap-4 p-4">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="icon"
              className={`p-0 hover:cursor-pointer ${
                isActive(item.href)
                  ? "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
                  : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
              }`}
              title={item.label}
            >
              <item.icon className="h-5 w-5" />
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
