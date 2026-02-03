import { commissioner } from "./fonts";
import "./globals.css";
import Header from "@/components/organisms/Header/Header";
import Footer from "@/components/organisms/Footer/Footer";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="el">
      <body className={commissioner.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Quizakos! - Παίξε και δοκίμασε τις γνώσεις σου!",
  description:
    "Το Quizakos! είναι μια διασκεδαστική πλατφόρμα κουίζ όπου μπορείς να δοκιμάσεις τις γνώσεις σου στα βασικά μαθήματα του Δημοτικού όπως επίσης και θεωρητικά μαθήματα μουσικής των Ωδείων!",
};
