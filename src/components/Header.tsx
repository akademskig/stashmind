import Link from "next/link";
import Image from "next/image";

export function Header() {
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
          <Link
            href="/features"
            className="text-sm text-blue-200 hover:text-white"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-blue-200 hover:text-white"
          >
            Pricing
          </Link>
          <Link href="/docs" className="text-sm text-blue-200 hover:text-white">
            Docs
          </Link>
          <Link
            href="/signin"
            className="rounded-lg bg-blue-800 px-4 py-2 text-sm text-white backdrop-blur-sm hover:bg-blue-700"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
