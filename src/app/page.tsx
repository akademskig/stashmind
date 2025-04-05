import { Header } from "../components/Header";
import { auth } from "@clerk/nextjs/server";
import { Dashboard } from "../components/Dashboard";
import { LandingPage } from "../components/LandingPage";

export default async function Index() {
  const { userId } = await auth();
  console.log("userId", userId);
  if (userId) {
    return (
      <div className="h-screen">
        <Header />
        <Dashboard />
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Header />
      <LandingPage />
    </div>
  );
}
