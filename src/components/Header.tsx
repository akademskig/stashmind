"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "~/utils/cn";

export interface HeaderProps {
  links: {
    href: string;
    label: string;
    type?: "button" | "link";
  }[];
  className?: string;
}

export function Header({ links }: HeaderProps) {
  const pathname = usePathname();
  return (
    <header className="fixed top-0 z-50 w-full bg-slate-900/80 px-4 py-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
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
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm text-blue-200 hover:text-white",
                pathname === link.href ? "text-white" : "text-blue-200",
                link.type === "button"
                  ? "rounded-lg bg-blue-800 px-4 py-2 text-sm text-white backdrop-blur-sm hover:bg-blue-700"
                  : "",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
