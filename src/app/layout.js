"use client";
import { commissioner } from "./fonts";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { CookiesProvider } from "react-cookie";
import Header from "@/components/organisms/Header/Header";
import Footer from "@/components/organisms/Footer/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { elGR } from "@clerk/localizations";

export default function RootLayout({ children }) {
  return (
    <html lang="el">
      <head>
        <title>Quizakos! - Παίξε και δοκίμασε τις γνώσεις σου!</title>
      </head>
      <body className={commissioner.className}>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          localization={elGR}
        >
          <CookiesProvider>
            <AppProvider>
              <Header />
              {children}
              <Footer />
            </AppProvider>
          </CookiesProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
