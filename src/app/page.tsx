import Link from "next/link";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="h-screen overflow-hidden">
        {/* Hero Section with Features */}
        <section className="hero-background relative h-[85vh] px-4 pt-20">
          <div className="flex h-full flex-col items-center justify-between py-12">
            {/* Hero Content */}
            <div className="hero-content max-w-4xl text-center">
              <h1 className="mb-6 text-5xl leading-tight font-bold text-white md:text-6xl">
                Welcome to StashMind
              </h1>
              <p className="mb-8 text-xl text-gray-200">
                Your intelligent knowledge management system that helps you
                organize, discover, and share information effortlessly.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/signup"
                  className="rounded-lg bg-blue-800/90 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Get Started
                </Link>
                <Link
                  href="/about"
                  className="bg-opacity-50 rounded-lg bg-violet-900/90 px-8 py-3 font-semibold text-white transition hover:bg-violet-800"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Features Grid */}
            <div className="w-full max-w-6xl px-4">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="glass-card rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-lg">
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Smart Organization
                  </h3>
                  <p className="text-blue-100">
                    Automatically categorize and tag your content for easy
                    retrieval
                  </p>
                </div>
                <div className="glass-card rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-lg">
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    AI-Powered Search
                  </h3>
                  <p className="text-blue-100">
                    Find what you need faster with our intelligent search
                    capabilities
                  </p>
                </div>
                <div className="glass-card rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-lg">
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Collaboration
                  </h3>
                  <p className="text-blue-100">
                    Share and work together with your team seamlessly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative h-[15vh] bg-slate-900 backdrop-blur-md">
          <div className="bg-slate-00 absolute inset-0 backdrop-blur-md"></div>
          <div className="relative flex h-full items-center justify-center">
            <div className="mx-auto max-w-4xl px-4 text-center">
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                Ready to Transform Your Knowledge Management
              </h2>
              <Link
                href="/signup"
                className="glow-button inline-block rounded-lg bg-blue-800/90 px-8 py-3 font-semibold text-white transition hover:bg-blue-600"
              >
                Start Your Free Trial
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
