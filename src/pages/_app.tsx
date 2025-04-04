import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ClerkProvider } from "@clerk/nextjs";
import { type AppType } from "next/app";
import { Geist } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const geist = Geist({
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ClerkProvider>
        <div className={geist.className}>
          <Component {...pageProps} />
        </div>
      </ClerkProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
