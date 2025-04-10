import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "~/trpc/provider";
import "~/styles/globals.css";
import "~/styles/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StashMind - Your Intelligent Knowledge Management System",
  description:
    "Organize, discover, and share information effortlessly with StashMind's AI-powered knowledge management system.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/stashmind-bg-main.png" />
      </head>
      <body className={inter.className}>
        <ClerkProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
