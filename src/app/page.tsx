import { Header } from "~/components/Header";
import { LandingPage } from "~/components/LandingPage";

export default async function Index() {
  return (
    <div className="h-screen">
      <Header />
      <LandingPage />
    </div>
  );
}
