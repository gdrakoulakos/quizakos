"use client";

import { AppProvider } from "@/context/AppContext";
import { CookiesProvider } from "react-cookie";

export function Providers({ children }) {
  return (
    <CookiesProvider>
      <AppProvider>{children}</AppProvider>
    </CookiesProvider>
  );
}
