import { commissioner } from "./fonts";
import "./globals.css";
import TabBar from "@/components/organisms/TabBar/TabBar";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="el">
      <body className={commissioner.className}>
        <Providers>
          <TabBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

export const metadata = {
  metadataBase: new URL("https://quizakos.gr"),
  title: {
    default: "Quizakos! - Παίξε και δοκίμασε τις γνώσεις σου!",
    template: "%s | Quizakos",
  },
  description:
    "Το Quizakos! είναι μια διασκεδαστική πλατφόρμα κουίζ όπου μπορείς να δοκιμάσεις τις γνώσεις σου στα βασικά μαθήματα του Δημοτικού και στη θεωρία μουσικής των Ωδείων.",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Quizakos! - Online Κουίζ",
    description:
      "Δοκίμασε τις γνώσεις σου με διαδραστικά κουίζ για τα παιδιά του Δημοτικύ και των Ωδείων.",
    url: "https://quizakos.gr",
    siteName: "Quizakos",
    locale: "el_GR",
    type: "website",
  },
};
