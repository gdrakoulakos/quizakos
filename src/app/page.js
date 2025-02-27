import styles from "./page.module.css";
import Header from "@/components/organisms/Header/Header";
import Footer from "@/components/organisms/Footer/Footer";
import TheoryQuizzes from "@/components/organisms/TheoryQuizzes/TheoryQuizzes";
import WelcomeBanner from "@/components/organisms/WelcomeBanner/WelcomeBanner";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <WelcomeBanner />
        <TheoryQuizzes />
      </main>
      <Footer />
    </div>
  );
}
