"use client";
import { commissioner } from "./fonts";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { CookiesProvider } from "react-cookie";
import Header from "@/components/organisms/Header/Header";
import Footer from "@/components/organisms/Footer/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="el">
      <body className={commissioner.className}>
        <CookiesProvider>
          <AppProvider>
            <Header />
            {children}
            <Footer />
          </AppProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
