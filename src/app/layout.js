import { commissioner } from "./fonts";
import "./globals.css";
import TabBar from "@/components/organisms/TabBar/TabBar";
import { Providers } from "./providers";

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={commissioner.className}>
        <div className="background" />
        <Providers>
          <TabBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

export const metadata = {
  metadataBase: new URL("https://www.quizakos.gr"),
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
