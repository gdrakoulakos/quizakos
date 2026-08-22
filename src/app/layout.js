import { commissioner } from "./fonts";
import "./globals.css";
import TabBar from "@/components/organisms/TabBar/TabBar";
import { Providers } from "./providers";
import LoadingSpinner from "@/components/organisms/LoadingSpinner/LoadingSpinner";
import Footer from "@/components/organisms/Footer/Footer";

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Quizakos",
    alternateName: "quizakos.gr",
    url: "https://www.quizakos.gr/",
  };

  return (
    <html lang="el">
      <head>
        <link rel="apple-touch-startup-image" href="/splash/ios-splash.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>

      <body
        className={commissioner.className}
        style={{ boxSizing: "border-box" }}
      >
        <div className="background" />

        <Providers>
          <LoadingSpinner />

          <TabBar />

          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export const metadata = {
  metadataBase: new URL("https://www.quizakos.gr"),
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Quizakos",
  },

  title: {
    default: "Quizakos",
    template: "%s | Quizakos",
  },

  description:
    "Το Quizakos είναι μια διασκεδαστική πλατφόρμα κουίζ όπου μπορείς να δοκιμάσεις τις γνώσεις σου στα βασικά μαθήματα του Δημοτικού και στη θεωρία μουσικής των Ωδείων.",

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "Quizakos",
    description:
      "Δοκίμασε τις γνώσεις σου με διαδραστικά κουίζ για τα παιδιά του Δημοτικού και των Ωδείων.",
    url: "https://www.quizakos.gr",
    siteName: "Quizakos",
    locale: "el_GR",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#4c347c",
};
