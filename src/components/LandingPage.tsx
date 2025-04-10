import Link from "next/link";
import { Header, type HeaderProps } from "./Header";
import {
  Brain,
  BookOpen,
  Sparkles,
  Chrome,
  Network,
  Clock,
} from "lucide-react";

const links: HeaderProps["links"] = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/signin", label: "Sign In", type: "button" },
];

export function LandingPage() {
  return (
    <>
      <Header links={links} />
      <main className="hero-background relative flex min-h-screen flex-col">
        <div className="relative z-10 flex flex-1 flex-col">
          {/* Hero Section */}
          <section className="px-4 pt-16">
            <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center text-center">
              <h1 className="mb-4 text-4xl leading-tight font-bold text-white md:text-5xl">
                Your Personal Knowledge Sanctuary
              </h1>
              <p className="mb-6 text-lg text-gray-200">
                Transform how you learn and retain knowledge. Build your second
                brain with smart tools for capturing, connecting, and truly
                remembering what matters to you.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/signup"
                  className="rounded-lg bg-blue-800/90 px-6 py-2 font-semibold text-white transition hover:bg-blue-700"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/pricing"
                  className="bg-opacity-50 rounded-lg bg-violet-900/90 px-6 py-2 font-semibold text-white transition hover:bg-violet-800"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mt-8 mb-8 flex flex-1 items-center px-4">
            <div className="mx-auto max-w-6xl">
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Memory Builder Card */}
                <div className="glass-card rounded-xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-lg">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20">
                    <Brain className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="mb-1.5 text-lg font-semibold text-white">
                    Memory Builder
                  </h3>
                  <p className="text-sm text-blue-200">
                    Never forget what you learn with smart spaced repetition and
                    active recall exercises tailored to your learning style.
                  </p>
                </div>

                {/* Zettelkasten Card */}
                <div className="glass-card rounded-xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-lg">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600/20">
                    <Network className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="mb-1.5 text-lg font-semibold text-white">
                    Connected Thinking
                  </h3>
                  <p className="text-sm text-blue-200">
                    Build a network of knowledge with Zettelkasten-style note
                    linking. Watch insights emerge as you connect ideas.
                  </p>
                </div>

                {/* AI Assistant Card */}
                <div className="glass-card rounded-xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-lg">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-green-600/20">
                    <Sparkles className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="mb-1.5 text-lg font-semibold text-white">
                    AI-Powered Insights
                  </h3>
                  <p className="text-sm text-blue-200">
                    Let AI help you summarize content, discover connections, and
                    generate review questions to deepen understanding.
                  </p>
                </div>

                {/* Chrome Extension Card */}
                <div className="glass-card rounded-xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-lg">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-red-600/20">
                    <Chrome className="h-5 w-5 text-red-400" />
                  </div>
                  <h3 className="mb-1.5 text-lg font-semibold text-white">
                    Quick Capture
                  </h3>
                  <p className="text-sm text-blue-200">
                    Save articles, highlights, and insights instantly with our
                    Chrome extension. Never lose valuable knowledge again.
                  </p>
                </div>

                {/* Knowledge Spaces Card */}
                <div className="glass-card rounded-xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-lg">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-600/20">
                    <BookOpen className="h-5 w-5 text-yellow-400" />
                  </div>
                  <h3 className="mb-1.5 text-lg font-semibold text-white">
                    Knowledge Spaces
                  </h3>
                  <p className="text-sm text-blue-200">
                    Organize your learning journey with dedicated spaces for
                    different subjects, projects, and reading lists.
                  </p>
                </div>

                {/* Review System Card */}
                <div className="glass-card rounded-xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-lg">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20">
                    <Clock className="h-5 w-5 text-indigo-400" />
                  </div>
                  <h3 className="mb-1.5 text-lg font-semibold text-white">
                    Active Learning
                  </h3>
                  <p className="text-sm text-blue-200">
                    Turn passive notes into active knowledge with scheduled
                    reviews, reflection prompts, and learning exercises.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-auto bg-slate-900 py-6">
            <div className="mx-auto max-w-4xl px-4 text-center">
              <h2 className="mb-2 text-xl font-bold text-white md:text-2xl">
                Start Building Your Second Brain
              </h2>
              <Link
                href="/signup"
                className="glow-button inline-block rounded-lg bg-blue-800/90 px-6 py-2 font-semibold text-white transition hover:bg-blue-600"
              >
                Start Your Free Trial
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
