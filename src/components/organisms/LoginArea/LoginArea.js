import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { QuizContext } from "@/context/AppContext";
import styles from "./LoginArea.module.css";
import { motion } from "motion/react";

export default function LoginArea() {
  const { userData } = QuizContext();

  return (
    <motion.div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ duration: 0.5, delay: 1 }}
      className={styles.loginArea}
    >
      {/* Signed out: show login button */}
      <SignedOut>
        <SignInButton>
          <button className={styles.signInButton}>Σύνδεση</button>
        </SignInButton>
      </SignedOut>

      {/* Signed in: show name and user menu */}
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
        <p>{userData?.firstName}</p>
      </SignedIn>
    </motion.div>
  );
}
