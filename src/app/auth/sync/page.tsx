"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { syncUser } from "./action";

export default function SyncPage() {
  const router = useRouter();

  useEffect(() => {
    syncUser()
      .then(() => router.push("/"))
      .catch((error) => {
        console.error("Error syncing user:", error);
        router.push("/");
      });
  }, [router]);

  return null;
}
