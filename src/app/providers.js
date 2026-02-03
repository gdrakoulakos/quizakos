"use client";

import { AppProvider } from "@/context/AppContext";
import { CookiesProvider } from "react-cookie";
import { ClerkProvider } from "@clerk/nextjs";
import { elGR } from "@clerk/localizations";

export function Providers({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      localization={elGR}
    >
      <CookiesProvider>
        <AppProvider>{children}</AppProvider>
      </CookiesProvider>
    </ClerkProvider>
  );
}
