import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export default function NotesPage() {
  return (
    <div>
      <SignedIn>
        <UserButton />
        <h1>Welcome back to StashMind 🌱</h1>
      </SignedIn>

      <SignedOut>
        <SignInButton />
        <p>You must sign in to access your knowledge garden.</p>
      </SignedOut>
    </div>
  );
}
