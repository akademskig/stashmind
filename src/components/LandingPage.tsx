import Link from "next/link";

export function LandingPage() {
  return (
    <main className="hero-background relative flex h-screen flex-col">
      {/* Content wrapper */}
      <div className="relative z-10 flex flex-1 flex-col">
        {/* Hero Section */}
        <section className="px-4 pt-24">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
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
        </section>

        {/* Features Section */}
        <section className="mt-12 mb-12 flex-1 px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Personal Knowledge Card */}
              <div className="glass-card rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-lg">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20">
                  <svg
                    className="h-6 w-6 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  Personal Mind
                </h3>
                <p className="text-blue-200">
                  Your private space to capture, nurture, and grow your
                  knowledge.
                </p>
              </div>

              {/* Team Space Card */}
              <div className="glass-card rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-lg">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600/20">
                  <svg
                    className="h-6 w-6 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  Team Mind
                </h3>
                <p className="text-blue-200">
                  Collaborate and build collective wisdom with your team.
                </p>
              </div>

              {/* AI Features Card */}
              <div className="glass-card rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-lg">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600/20">
                  <svg
                    className="h-6 w-6 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  AI Power
                </h3>
                <p className="text-blue-200">
                  Smart summaries, connections, and memory boosters.
                </p>
              </div>

              {/* Capture Card */}
              <div className="glass-card rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-lg">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-600/20">
                  <svg
                    className="h-6 w-6 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  Quick Capture
                </h3>
                <p className="text-blue-200">
                  Save content from anywhere, in any format.
                </p>
              </div>

              {/* Organization Card */}
              <div className="glass-card rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-lg">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-600/20">
                  <svg
                    className="h-6 w-6 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  Smart Organization
                </h3>
                <p className="text-blue-200">
                  Auto-tagging and self-organizing knowledge.
                </p>
              </div>

              {/* Integration Card */}
              <div className="glass-card rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-lg">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/20">
                  <svg
                    className="h-6 w-6 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  Seamless Integration
                </h3>
                <p className="text-blue-200">
                  Works with your favorite tools and apps.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-auto bg-slate-900 py-8">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              Ready to Transform Your Knowledge Management?
            </h2>
            <Link
              href="/signup"
              className="glow-button inline-block rounded-lg bg-blue-800/90 px-8 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              Start Your Free Trial
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
} 