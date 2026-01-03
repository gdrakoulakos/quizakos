import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { QuizContext } from "@/context/AppContext";
import styles from "./LoginArea.module.css";

export default function LoginArea() {
  const { userData } = QuizContext();

  return (
    <div className={styles.loginArea}>
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
    </div>
  );
}
